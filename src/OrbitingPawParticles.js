// OrbitingPawParticles.js
// Renders the original paw particles, but makes them spin in orbits around a target element (e.g., Home card)
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./PawParticles.css";

const PAW_COLORS = ["#ffb86b", "#ffb6c1", "#aeefff", "#fffbe0"];

const randomBetween = (min, max) => Math.random() * (max - min) + min;

export default function OrbitingPawParticles({ count = 16, targetRef }) {
  // Memoized function to create a paw with randomized properties
  const createPaw = useCallback((index) => {
    const size = randomBetween(28, 48);
    const orbitRadius = randomBetween(80, 140) + index * 10;
    // Randomly spin half the paws in the opposite direction
    let speed = randomBetween(0.09, 0.19) + (index * 0.011);
    if (Math.random() < 0.5) speed = -speed;
    const initialAngle = randomBetween(0, 2 * Math.PI);
    const color = PAW_COLORS[Math.floor(Math.random() * PAW_COLORS.length)];
    return {
      key: `paw-${index}-${Date.now()}`,
      size,
      orbitRadius,
      speed,
      initialAngle,
      color,
    };
  }, []);

  const [paws, setPaws] = React.useState([]);
  const itemRefs = useRef([]);

  // Memoize initial paws
  const initialPaws = useMemo(
    () => Array.from({ length: count }, (_, i) => createPaw(i)),
    [count, createPaw]
  );

  useEffect(() => {
    setPaws(initialPaws);
  }, [initialPaws]);

  useEffect(() => {
    let frame;
    function animate() {
      const now = performance.now() / 1000;
      paws.forEach((paw, i) => {
        const el = itemRefs.current[i];
        let centerX, centerY, r;
        if (el && targetRef && targetRef.current) {
          const rect = targetRef.current.getBoundingClientRect();
          centerX = rect.left + rect.width / 2;
          centerY = rect.top + rect.height / 2;
          r = (rect.width / 2) + paw.orbitRadius + 24;
        } else if (el) {
          centerX = window.innerWidth / 2;
          centerY = window.innerHeight / 2;
          r = 180 + paw.orbitRadius;
        }
        if (el && centerX && centerY && r) {
          const angle = now * paw.speed + paw.initialAngle;
          const x = centerX + Math.cos(angle) * r - paw.size / 2;
          const y = centerY + Math.sin(angle) * (r * 0.7) - paw.size / 2;
          el.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [paws, targetRef]);

  // Respawn paw with new random properties after a set time (simulate re-randomizing like original)
  useEffect(() => {
    const timers = [];
    paws.forEach((paw, i) => {
      timers[i] = setInterval(() => {
        setPaws(oldPaws => {
          const newPaws = [...oldPaws];
          newPaws[i] = createPaw(i);
          return newPaws;
        });
      }, randomBetween(9000, 17000));
    });
    return () => timers.forEach(t => clearInterval(t));
  }, [paws, createPaw]);

  return (
    <div style={{ pointerEvents: 'none', zIndex: 15, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }} aria-hidden="true">
      {paws.map((paw, i) => (
        <span
          key={paw.key}
          ref={el => (itemRefs.current[i] = el)}
          style={{
            width: paw.size,
            height: paw.size,
            opacity: 0.93 - i * 0.097,
            filter: 'drop-shadow(0 2px 12px #fffbe0cc) drop-shadow(0 0 0.5px #ffb6c1)',
            willChange: 'transform',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            top: 0
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 40 40"
            width={paw.size}
            height={paw.size}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            focusable="false"
          >
            <title>Cute SVG Paw Print</title>
            <desc>A classic cute cartoon paw print with a big round pad and four round toe beans</desc>
            {/* Main pad: larger oval */}
            <ellipse cx="20" cy="29" rx="10" ry="7.2" fill={paw.color} />
            {/* Outer toe beans, spaced */}
            <ellipse cx="9.5" cy="14" rx="3.3" ry="3.7" fill={paw.color} />
            <ellipse cx="30.5" cy="14" rx="3.3" ry="3.7" fill={paw.color} />
            {/* Top/inner toe beans, slightly farther apart */}
            <ellipse cx="16.5" cy="7.7" rx="2.8" ry="3.2" fill={paw.color} />
            <ellipse cx="23.5" cy="7.7" rx="2.8" ry="3.2" fill={paw.color} />
          </svg>
        </span>
      ))}
    </div>
  );
}
