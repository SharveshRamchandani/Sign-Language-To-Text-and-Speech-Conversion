// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import './App.css';
// import Logo from './Logo.png';
// import Model from './model';
// import AboutUs from './about_us'; // Updated import

// // Animation Variants
// const pageVariants = {
//   initial: { opacity: 0, y: 50 },
//   in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   out: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
// };

// // Landing Page Component
// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       initial="initial"
//       animate="in"
//       exit="out"
//       variants={pageVariants}
//       className="App"
//     >
//       <div className="landing-container">
//         <motion.div 
//           className="animated-background"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }}
//         ></motion.div>

//         <motion.img 
//           className="App-logo" 
//           src={Logo} 
//           alt="Logo"
//           initial={{ scale: 0.5, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }}
//         />

//         <motion.div 
//           className="button-container"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut", delay: 0.5 } }}
//         >
//           <motion.button
//             className="primary-button"
//             whileTap={{ scale: 0.9 }}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => navigate('/about_us')} // Updated route
//           >
//             About Us
//           </motion.button>
//           <motion.button
//             className="secondary-button"
//             whileTap={{ scale: 0.9 }}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => navigate('/model')}
//           >
//             Model
//           </motion.button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// // Main App Component
// function App() {
//   return (
//     <Router>
//       <AnimatePresence mode="wait">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/model" element={<Model />} />
//           <Route path="/about_us" element={<AboutUs />} /> {/* Updated route */}
//         </Routes>
//       </AnimatePresence>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Logo from './Logo.png';
import Model from './model';
import AboutUs from './about_us';
import Chatbot from './Chatbot';

// Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  out: { opacity: 0, y: -50, transition: { duration: 0.6, ease: "easeIn" } },
};

// Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="App"
    >
      <div className="landing-container">
        <motion.div
          className="animated-background"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }}
        ></motion.div>
        
        <motion.img
          className="App-logo"
          src={Logo}
          alt="Logo"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }}
        />
        
        <motion.div
          className="button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut", delay: 0.5 } }}
        >
          <motion.button
            className="primary-button"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/about_us')}
          >
            About Us
          </motion.button>
          
          <motion.button
            className="secondary-button"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/model')}
          >
            Model
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut", delay: 1 } }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleStartChat}
          >
            Start Chat
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/model" element={<Model />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;