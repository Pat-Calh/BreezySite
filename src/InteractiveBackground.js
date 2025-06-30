// InteractiveBackground.js
// For Breezy the Fox's fursona site: provides a dreamy, animated gradient overlay
// that blends with the GIF background for a magical, playful effect.
// Reacts to mouse (desktop) or device tilt (mobile) for interactivity.
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// BG_COLORS: pastel color stops for the animated gradient background
// Pastel color stops for the animated gradient background
// Matches the site's cute, playful, pastel palette
const BG_COLORS = [
  "#ffb86b", // soft orange
  "#fffbe0", // creamy white
  "#aeefff", // light blue
  "#ffb6c1"  // pastel pink
];

// Linear interpolation helper for smooth transitions
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * InteractiveBackground
 * Renders a full-screen animated gradient that reacts to mouse movement (desktop)
 * or device tilt (mobile), creating a dynamic, playful background effect.
 */
export default function InteractiveBackground() {
  const [gradient, setGradient] = useState({ angle: 120, stops: BG_COLORS });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const tiltRef = useRef(null); // { beta, gamma }

  useEffect(() => {
    let isMobile = /Mobi|Android/i.test(navigator.userAgent);
    let useTilt = false;

    // Device orientation handler
    function handleOrientation(event) {
      // gamma: left/right (-90 to 90), beta: front/back (-180 to 180)
      let gamma = event.gamma || 0; // left/right
      let beta = event.beta || 0;   // front/back
      // Normalize to 0-1
      let x = (gamma + 90) / 180;
      let y = (beta + 180) / 360;
      tiltRef.current = { x, y };
      useTilt = true;
    }

    // Mouse fallback
    function handleMouseMove(e) {
      if (!useTilt) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        mouseRef.current = { x, y };
      }
    }

    if (isMobile && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (isMobile && window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Animate the gradient based on tilt (mobile) or mouse (desktop)
  useEffect(() => {
    let running = true;
    // Store last position for smooth animation
    let last = { x: 0.5, y: 0.5 };
    function animate() {
      if (!running) return;
      // Use tilt if available, otherwise mouse
      let source = tiltRef.current || mouseRef.current;
      // Interpolate for smooth, natural movement
      last.x = lerp(last.x, source.x, 0.12);
      last.y = lerp(last.y, source.y, 0.12);
      // Calculate angle based on X (left/right)
      let angle = lerp(90, 270, last.x);
      // Shift color stops based on Y (up/down)
      let stops = BG_COLORS.map((c, i) => {
        let shift = lerp(0, 30, last.y) * i;
        return { color: c, pos: 20 + i * 20 + shift };
      });
      setGradient({
        angle,
        stops: stops.map(s => s.color + ' ' + s.pos + '%')
      });
      requestAnimationFrame(animate);
    }
    animate();
    // Cleanup: stop animation loop when unmounted
    return () => { running = false; };
  }, []);

  // Render the animated gradient as a fixed background <div>
  return (
    <div
      className="interactive-bg"
      style={{
        background: `linear-gradient(${gradient.angle}deg, ${gradient.stops.join(", ")})`
      }}
    />
  );
}
