import React from 'react';
import { motion } from 'framer-motion';
import './about.css'; 

// Page Animation Variants
const containerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
};

// Section Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const AboutUs = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      className="about-container"
    >
      <h1>About <span className="highlight">SignNova</span></h1>
      <p className="tagline">"Breaking Barriers, Connecting Worlds Through Sign Language"</p>

      {/* What is SignNova? */}
      <motion.section 
        className="about-section"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        whileHover={{ scale: 1.05 }}
      >
        <h2>What is SignNova?</h2>
        <p>
          SignNova is an AI-powered platform that translates sign language into text and speech in real time.
          Using machine learning and computer vision, it bridges communication gaps between deaf, 
          hard-of-hearing individuals, and the hearing world.
        </p>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="about-section"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        whileHover={{ scale: 1.05 }}
      >
        <h2>How It Works</h2>
        <p>
          SignNova uses AI-driven gesture recognition to interpret sign language and convert it into 
          text or voice output. It supports multiple sign languages and works across various devices, 
          ensuring accessibility anywhere.
        </p>
      </motion.section>

      {/* Why It Matters */}
      <motion.section 
        className="about-section"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        whileHover={{ scale: 1.05 }}
      >
        <h2>Why It Matters</h2>
        <p>
          Over 466 million people worldwide experience hearing loss, often leading to social isolation 
          and limited opportunities. SignNova promotes inclusivity by making sign language 
          accessible in education, workplaces, and healthcare.
        </p>
      </motion.section>

      {/* Our Vision */}
      <motion.section 
        className="about-section"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        whileHover={{ scale: 1.05 }}
      >
        <h2>Our Vision</h2>
        <p>
          We aim to create a fully inclusive society where technology enhances communication for everyone.
          Future developments include AI-powered video calls with sign language translation, 
          wearable tech for instant sign recognition, and an expanded global sign language database.
        </p>
      </motion.section>

      {/* Call to Action */}
      <div className="cta-section">
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AboutUs;
