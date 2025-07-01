/*
  App.js
  Main entry for Breezy the Fox's fursona website
  - Cute, playful, multi-page React app for a fursona persona
  - Features: animated gradient overlay, floating paw particles, GIF background
  - Fully responsive, mobile-optimized, and accessible
  - Social links and custom GIF image showcase the character's personality
  - All comments reference user design goals and conversation context
*/

import React, { useState } from 'react';
import './App.css';
// PawParticles is currently unused (orbiting mode preferred for Home)
// import PawParticles from './PawParticles';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home, { homeCardRef } from './pages/Home';
import PageTransition from './PageTransition';
import About from './pages/About';
import Contact from './pages/Contact';
import InteractiveBackground from './InteractiveBackground';
import OrbitingPawParticles from './OrbitingPawParticles';


// Utility function to detect if the user is on a mobile device (used for performance optimizations)
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Utility function to detect iOS (for motion permission UI)
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function App() {
  // Reduce paw particle count on mobile for better performance
  const pawCount = isMobile() ? 8 : 16;
  // State to track if motion background is enabled (iOS)
  const [motionEnabled, setMotionEnabled] = useState(false);
  // Only show motion permission button if on iOS and permission API is available
  const [showMotionBtn, setShowMotionBtn] = useState(
    isIOS() && typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'
  );

  // Handler for enabling motion-based backgrounds on iOS
  const handleEnableMotion = () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          setMotionEnabled(true);
          setShowMotionBtn(false);
        }
      });
    }
  };

  // Get current location for animated route transitions
  const location = useLocation();

  return (
    // Root container: sets up background image and layout
    <div className="App cute-theme">

      {/*
        iOS motion permission button
        - Only visible on iOS devices with DeviceMotionEvent support
        - Allows user to enable tilt-based background movement
      */}
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

      {/*
        Main animated background image
        - Blended with gradient overlay for dreamy effect
        - Uses fixed positioning for parallax feel
      */}
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

      {/*
        Orbiting paw particles (only on Home)
        - Animated SVG paws orbit the Home card for playful effect
      */}
      {window.location.pathname === '/' && <OrbitingPawParticles targetRef={homeCardRef} />}

      {/*
        Interactive animated gradient overlay
        - Reacts to mouse/tilt for magical background
      */}
      <InteractiveBackground />

      {/*
        Floating paw particles (disabled for orbiting mode)
        - Use <PawParticles count={pawCount} /> to enable classic floating mode
      */}
      {/* <PawParticles count={pawCount} /> */}

      {/*
        Floating navigation and card container
        - Contains nav bar and animated page transitions
      */}
      <div className="card-nav-flex">
        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/about">About</Link></li>
            <li><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <main>
          {/*
            PageTransition animates route changes for a smooth, dreamy feel
            - Uses location.key for unique transitions
          */}
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
