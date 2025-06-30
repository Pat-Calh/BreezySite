// PawParticles.js
// For Breezy the Fox's fursona site: renders a floating, animated paw print background
// as a cute, playful effect behind the main content. Responsive and mobile-friendly.
import React, { useEffect, useRef } from "react";
import "./PawParticles.css";

// Array of pastel colors for paw prints
// Array of pastel colors for paw prints, matching the site's palette
const PAW_COLORS = ["#ffb86b", "#ffb6c1", "#aeefff", "#fffbe0"];

// Returns a random number between min and max
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Creates a new paw with randomized properties for animation
function createPaw(index) {
  const size = randomBetween(28, 48);
  const left = randomBetween(0, 100);
  const duration = randomBetween(8, 18);
  const delay = randomBetween(0, 10);
  const rotate = randomBetween(-30, 30);
  const color = PAW_COLORS[Math.floor(Math.random() * PAW_COLORS.length)];
  return {
    key: `paw-${index}-${Date.now()}`,
    size,
    left,
    duration,
    delay,
    rotate,
    color,
  };
}

// PawParticles component: renders animated floating paw prints as background particles
export default function PawParticles({ count = 16 }) {
  // paws: array of paw particle objects, each with unique animation properties
  const [paws, setPaws] = React.useState([]);
  const timeoutRef = useRef();

  // On mount or when count changes, (re)generate all paws
  useEffect(() => {
    setPaws(Array.from({ length: count }, (_, i) => createPaw(i)));
    return () => clearTimeout(timeoutRef.current);
  }, [count]);

  // When a paw's animation ends, respawn it with new random properties
  const handleAnimationEnd = (i) => {
    setPaws((oldPaws) => {
      const newPaws = [...oldPaws];
      newPaws[i] = createPaw(i);
      return newPaws;
    });
  };

  // Render all paw particles as absolutely positioned, animated <span>s with SVG paw prints
  return (
    <div className="paw-particles">
      {paws.map((paw, i) => (
        <span
          key={paw.key}
          className="paw-particle"
          style={{
            left: `${paw.left}%`,
            width: paw.size,
            height: paw.size,
            animationDuration: `${paw.duration}s`,
            animationDelay: `${paw.delay}s`,
            transform: `rotate(${paw.rotate}deg)`
          }}
          onAnimationEnd={() => handleAnimationEnd(i)}
        >
          {/* SVG for a cute paw print */}
          <svg viewBox="0 0 32 32" fill={paw.color} width={paw.size} height={paw.size} xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="24" rx="8" ry="6" />
            <ellipse cx="7" cy="14" rx="3" ry="4" />
            <ellipse cx="25" cy="14" rx="3" ry="4" />
            <ellipse cx="11" cy="8" rx="2" ry="3" />
            <ellipse cx="21" cy="8" rx="2" ry="3" />
          </svg>
        </span>
      ))}
    </div>
  );
}
