import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './model.css';

const ModelPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to SignNova AI! How can I help you with sign language translation today?", 
      sender: 'bot',
      type: 'ai'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.text && data.text.trim()) {
          // Add the sign language message
          const signMessage = {
            id: messages.length + 1,
            text: data.text,
            sender: 'user',
            type: 'sign'
          };
          
          setMessages(prev => [...prev, signMessage]);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Send message handler
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      type: 'typed'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
  };

  // Handle input key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Clear chat handler
  const handleClearChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "Welcome to SignNova AI! How can I help you with sign language translation today?", 
        sender: 'bot',
        type: 'ai'
      }
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } }}
      className="model-container"
    >
      <h1>Welcome to <span className="highlight">SignNova AI</span></h1>
      <p className="tagline">Your smart AI assistant for sign language translation.</p>

      <motion.div 
        className="model-card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2>AI Sign Translator</h2>
        <p>Experience sign language translation with our AI-powered chatbot.</p>
        
        {/* Chat Messages */}
        <div className="chat-messages">
          <div className="messages-container">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`message ${message.type}`}
                data-label={message.type === 'ai' ? 'AI' : message.type === 'sign' ? 'SignNova User' : 'User'}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="input-area">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>
              Send
            </button>
            <button onClick={handleClearChat} className="clear-button">
              Clear
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModelPage;
