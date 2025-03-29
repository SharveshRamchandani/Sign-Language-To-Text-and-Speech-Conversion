import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to SignNova AI! How can I help you with sign language translation today?", 
      sender: 'bot' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSignDetectionActive, setIsSignDetectionActive] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const messagesEndRef = useRef(null);
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize webcam
  useEffect(() => {
    if (isSignDetectionActive) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error('Error accessing webcam:', err);
          alert('Error accessing webcam. Please make sure you have granted camera permissions.');
        });
    }
  }, [isSignDetectionActive]);

  // WebSocket connection
  useEffect(() => {
    if (isSignDetectionActive) {
      wsRef.current = new WebSocket('ws://localhost:8000/ws');
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        sendFrame();
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setDetectedText(data.previous_chars.join(''));
        setConfidence(data.confidence);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        stopSignDetection();
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket closed');
        stopSignDetection();
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isSignDetectionActive]);

  // Send video frame to server
  const sendFrame = () => {
    if (!isSignDetectionActive || !wsRef.current || !videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    
    const imageData = {
      image: canvas.toDataURL('image/jpeg').split(',')[1]
    };

    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(imageData));
    }

    requestAnimationFrame(sendFrame);
  };

  // Start sign detection
  const startSignDetection = () => {
    setIsSignDetectionActive(true);
  };

  // Stop sign detection
  const stopSignDetection = () => {
    setIsSignDetectionActive(false);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  // Simple bot response logic
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hi there! I'm ready to help you with sign language translation.";
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('translate')) {
      return "I can help you translate between spoken language and sign language. What would you like to translate?";
    }
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! Feel free to come back anytime you need sign language translation.";
    }
    
    return "I'm processing your request. Our AI is working on the most accurate sign language translation.";
  };

  // Send message handler
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };

    // Add bot response
    const newBotMessage = {
      id: messages.length + 2,
      text: getBotResponse(inputMessage),
      sender: 'bot'
    };

    setMessages([...messages, newUserMessage, newBotMessage]);
    setInputMessage('');
  };

  // Handle input key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Close chat and return to home
  const handleCloseChat = () => {
    stopSignDetection();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
        {/* Chatbot Header */}
        <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-bold">SignNova AI Translator</h2>
          <button 
            onClick={handleCloseChat}
            className="text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-grow overflow-hidden">
          {/* Video Feed */}
          <div className="w-1/2 p-4 border-r">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
                style={{ display: isSignDetectionActive ? 'block' : 'none' }}
              />
              {!isSignDetectionActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500">Click Start to begin sign detection</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={startSignDetection}
                disabled={isSignDetectionActive}
                className={`px-4 py-2 rounded ${
                  isSignDetectionActive
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Start Detection
              </button>
              <button
                onClick={stopSignDetection}
                disabled={!isSignDetectionActive}
                className={`px-4 py-2 rounded ${
                  !isSignDetectionActive
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                Stop Detection
              </button>
            </div>
            {detectedText && (
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <p className="font-semibold">Detected Text:</p>
                <p>{detectedText}</p>
                <p className="text-sm text-gray-600">
                  Confidence: {(confidence * 100).toFixed(2)}%
                </p>
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div className="w-1/2 flex flex-col">
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'bot' 
                      ? 'bg-blue-100 text-black self-start' 
                      : 'bg-blue-500 text-white self-end ml-auto'
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t flex">
              <input 
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded-l-lg"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;