import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './model.css';

const ModelPage = () => {
  const navigate = useNavigate();

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
        <p>Experience real-time sign language translation with our AI-powered chatbot.</p>
        <button className="start-btn" onClick={() => navigate('')}>
          Start Chat
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ModelPage;
