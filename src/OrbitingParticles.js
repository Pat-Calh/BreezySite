// OrbitingParticles.js
// Renders playful particles (paws, hearts, orbs) that spin in orbits around a target element (e.g., Home card)
import React, { useEffect, useRef } from 'react';

const PARTICLES = [
  { type: 'paw', color: '#ffb6c1', size: 38, speed: 0.15, icon: '/paw1.png' },
  { type: 'paw', color: '#ffe066', size: 32, speed: 0.11, icon: '/paw2.png' },
  { type: 'heart', color: '#ff7eb9', size: 28, speed: 0.19, icon: null },
  { type: 'orb', color: '#c1f7ff', size: 24, speed: 0.08, icon: null },
  { type: 'star', color: '#f7d6ff', size: 26, speed: 0.13, icon: null },
  { type: 'paw', color: '#fffbe0', size: 36, speed: 0.17, icon: '/paw3.png' },
];

export default function OrbitingParticles({ targetRef }) {
  const containerRef = useRef();
  const itemRefs = useRef([]);

  useEffect(() => {
    let frame;
    function animate() {
      const now = performance.now() / 1000;
      PARTICLES.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (el && targetRef && targetRef.current) {
          const rect = targetRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const r = (rect.width / 2) + 62 + i * 24;
          const angle = now * p.speed + i * (2 * Math.PI / PARTICLES.length);
          const x = centerX + Math.cos(angle) * r - p.size / 2;
          const y = centerY + Math.sin(angle) * (r * 0.7) - p.size / 2;
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
        zIndex: 7,
      }}
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          ref={el => (itemRefs.current[i] = el)}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            opacity: 0.92 - i * 0.11,
            filter: 'drop-shadow(0 2px 8px #fffbe0bb)',
            willChange: 'transform',
            transition: 'opacity 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {p.icon ? (
            <img src={p.icon} alt={p.type} style={{ width: '100%', height: '100%' }} />
          ) : p.type === 'heart' ? (
            <svg width={p.size} height={p.size} viewBox="0 0 40 40"><path d="M20 36 Q8 28 8 18 Q8 10 20 10 Q32 10 32 18 Q32 28 20 36 Z" fill={p.color} /></svg>
          ) : p.type === 'star' ? (
            <svg width={p.size} height={p.size} viewBox="0 0 40 40"><polygon points="20,6 24,16 35,16 26,23 29,34 20,27 11,34 14,23 5,16 16,16" fill={p.color} /></svg>
          ) : (
            <svg width={p.size} height={p.size} viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill={p.color} /></svg>
          )}
        </div>
      ))}
    </div>
  );
}
