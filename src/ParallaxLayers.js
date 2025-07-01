// ParallaxLayers.js
// Adds multiple pastel parallax layers that move at different speeds with mouse or device tilt
import React, { useEffect, useRef } from 'react';

const LAYERS = [
  {
    // Fluffy pastel clouds
    type: 'clouds',
    speed: 0.07,
    svg: (
      <svg width="100%" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="60" rx="50" ry="28" fill="#fffbe0" opacity="0.7" />
        <ellipse cx="120" cy="50" rx="32" ry="18" fill="#ffb6c1" opacity="0.5" />
        <ellipse cx="200" cy="65" rx="44" ry="22" fill="#c1f7ff" opacity="0.6" />
        <ellipse cx="300" cy="55" rx="36" ry="20" fill="#f7d6ff" opacity="0.55" />
        <ellipse cx="370" cy="70" rx="22" ry="14" fill="#ffe066" opacity="0.4" />
      </svg>
    )
  },
  {
    // Floating pastel hearts
    type: 'hearts',
    speed: 0.12,
    svg: (
      <svg width="100%" height="80" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 40 Q40 20 60 20 Q80 20 80 40 Q80 60 60 72 Q40 60 40 40 Z" fill="#ff7eb9" opacity="0.5" />
        <path d="M180 30 Q180 10 200 10 Q220 10 220 30 Q220 50 200 62 Q180 50 180 30 Z" fill="#c1f7ff" opacity="0.4" />
        <path d="M320 50 Q320 30 340 30 Q360 30 360 50 Q360 70 340 72 Q320 70 320 50 Z" fill="#ffe066" opacity="0.4" />
      </svg>
    )
  },
  {
    // Sparkle stars
    type: 'stars',
    speed: 0.18,
    svg: (
      <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,30 55,45 70,45 58,54 62,68 50,58 38,68 42,54 30,45 45,45" fill="#fffbe0" opacity="0.7" />
        <polygon points="200,20 204,32 216,32 206,40 210,52 200,44 190,52 194,40 184,32 196,32" fill="#ffb6c1" opacity="0.5" />
        <polygon points="350,40 353,48 362,48 355,54 357,62 350,56 343,62 345,54 338,48 347,48" fill="#c1f7ff" opacity="0.6" />
      </svg>
    )
  }
];

export default function ParallaxLayers({ targetRef }) {
  const containerRef = useRef();
  const animRefs = useRef([]);

  useEffect(() => {
    let frame;
    function animate() {
      const now = performance.now() / 1000;
      LAYERS.forEach((layer, i) => {
        const el = animRefs.current[i];
        if (el && targetRef && targetRef.current) {
          // Get bounding rect of the target (center card)
          const cardRect = targetRef.current.getBoundingClientRect();
          const centerX = cardRect.left + cardRect.width / 2;
          const centerY = cardRect.top + cardRect.height / 2;
          // Orbit radius for each layer
          const r = (cardRect.width / 2) + 48 + i * 32;
          // Animate in a loop
          const angle = now * (0.22 + i * 0.11) + i * 1.2;
          const x = centerX + Math.cos(angle) * r - (el.offsetWidth / 2);
          const y = centerY + Math.sin(angle + i) * (r * 0.6) - (el.offsetHeight / 2);
          el.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [targetRef]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 6,
      }}
      aria-hidden="true"
    >
      {LAYERS.map((layer, i) => (
        <div
          key={layer.type}
          ref={el => (animRefs.current[i] = el)}
          style={{
            position: 'absolute',
            width: 220,
            height: 100,
            willChange: 'transform',
            opacity: 0.92 - i * 0.19,
            filter: 'blur(0.5px) drop-shadow(0 2px 12px #fffbe0cc)',
            transition: 'opacity 0.3s',
          }}
        >
          {layer.svg}
        </div>
      ))}
    </div>
  );
}
