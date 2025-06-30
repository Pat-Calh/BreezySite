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
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
// Import the interactive animated background gradient component
import InteractiveBackground from './InteractiveBackground';

// Utility function to detect if the user is on a mobile device
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Main App component for Breezy the Fox's website
function App() {
  // Show fewer paw particles on mobile for better performance
  const pawCount = isMobile() ? 8 : 16;
  return (
    // Root container: sets up background image and layout
    <div
      className="App cute-theme"
    >
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
      {/* Interactive animated gradient background overlay */}
      <InteractiveBackground />
      {/* Animated floating paw prints background effect */}
      <PawParticles count={pawCount} />

      {/* Navigation Bar */}
      <nav className="main-nav">
        <ul>
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/about">About</Link></li>
          <li><Link className="nav-link" to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>


    </div>
  );
}

// Export the App component as the default export
export default App;
