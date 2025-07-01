// App.js
// Main entry for Breezy the Fox's fursona website
// Context: Built as a cute, playful, mobile-friendly React site for a fursona persona.
// Features: animated gradient overlay, floating paw particles, GIF background, responsive & accessible design.
// Social links and custom GIF image showcase the character's personality.
//
// All comments reference user design goals and conversation context.

// Import main stylesheet for app-wide styles
import './App.css';
// Import the animated paw particle effect component
import PawParticles from './PawParticles';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home, { homeCardRef } from './pages/Home';
import PageTransition from './PageTransition';
import About from './pages/About';
import Contact from './pages/Contact';
// Import the interactive animated background gradient component
import InteractiveBackground from './InteractiveBackground';
import OrbitingPawParticles from './OrbitingPawParticles';

// Utility function to detect if the user is on a mobile device
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Main App component for Breezy the Fox's website
import React, { useState } from 'react';

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function App() {

  // Show fewer paw particles on mobile for better performance
  const pawCount = isMobile() ? 8 : 16;
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [showMotionBtn, setShowMotionBtn] = useState(isIOS() && typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function');

  const handleEnableMotion = () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          setMotionEnabled(true);
          setShowMotionBtn(false);
        }
      });
    }
  };

  const location = useLocation();


  return (
    // Root container: sets up background image and layout
    <div
      className="App cute-theme"
    >
      {showMotionBtn && (
        <button
          className="motion-btn"
          onClick={handleEnableMotion}
          style={{
            position: 'absolute',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '0.75em 1.5em',
            borderRadius: '2em',
            background: 'rgba(255,255,255,0.92)',
            border: '2px solid #ffb6c1',
            color: '#ff69b4',
            fontWeight: 'bold',
            fontSize: '1.1em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Enable Motion Background
        </button>
      )}

      <div
  className="bg-image"
  style={{
    backgroundImage: "url('/lost in japan.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    mixBlendMode: 'lighten',
    opacity: 0.93,
  }}
></div>

      {/* Orbiting paw particles around the Home card */}
      {window.location.pathname === '/' && <OrbitingPawParticles targetRef={homeCardRef} />}
      {/* Interactive animated gradient background overlay */}
      <InteractiveBackground />
      {/* Animated floating paw prints background effect (disabled for orbiting mode) */}
      {/* <PawParticles count={pawCount} /> */}

      {/* Floating Nav + Card Container */}
      <div className="card-nav-flex">
        <nav className="main-nav">
          <ul>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/about">About</Link></li>
            <li><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <main>
          <PageTransition locationKey={location.key}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </main>
      </div>

    </div>
  );
}

// Export the App component as the default export
export default App;
