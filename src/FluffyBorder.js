// FluffyBorder.js
// Adds a playful, animated fur/fluffy SVG border to wrap content
import React from 'react';

export default function FluffyBorder({ children, color = '#ffb6c1', size = 24, style = {}, ...props }) {
  // Gentle, pastel, moderately jagged path
  const furPath = `M0,${size/2} Q10,${size*1.2} 20,${size/2} Q30,0 40,${size/2} Q50,${size*1.3} 60,${size/2} Q70,0 80,${size/2} Q90,${size*1.2} 100,${size/2} Q110,0 120,${size/2} Q130,${size*1.3} 140,${size/2} Q150,0 160,${size/2} Q170,${size*1.2} 180,${size/2} Q190,0 200,${size/2} Q210,${size*1.3} 220,${size/2} Q230,0 240,${size/2} Q250,${size*1.2} 260,${size/2} Q270,0 280,${size/2} Q290,${size*1.3} 300,${size/2} Q310,0 320,${size/2} Q330,${size*1.2} 340,${size/2} Q350,0 360,${size/2} Q370,${size*1.3} 380,${size/2} Q390,0 400,${size/2} Q410,${size} 420,${size/2}`;
  return (
    <div style={{ position: 'relative', ...style, zIndex: 3 }} {...props}>
      <style>{`
        .fluffy-fur {
          filter: blur(1.5px) brightness(1.15) drop-shadow(0 0 8px #fffbe0cc);
          stroke-dasharray: 8 6 4 10 6 8;
          stroke-width: 10px;
          animation: fluffy-shimmer 2.5s linear infinite;
        }
        @keyframes fluffy-shimmer {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 40; }
        }
      `}</style>
      <svg
        viewBox={`0 0 420 ${size}`}
        width="100%"
        height={size}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d={furPath}
          fill="none"
          stroke={color}
          strokeWidth={size/1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fluffy-fur"
          opacity="0.88"
        />
      </svg>
      <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
      <svg
        viewBox={`0 0 420 ${size}`}
        width="100%"
        height={size}
        style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 2, pointerEvents: 'none', transform: 'scaleY(-1)' }}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d={furPath}
          fill="none"
          stroke={color}
          strokeWidth={size/1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fluffy-fur"
          opacity="0.88"
        />
      </svg>
    </div>
  );
}
