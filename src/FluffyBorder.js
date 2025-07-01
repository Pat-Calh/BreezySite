// FluffyBorder.js
// Adds a playful, animated fur/fluffy SVG border to wrap content on all four sides
import React from 'react';

export default function FluffyBorder({ children, color = '#ffb6c1', size = 24, style = {}, ...props }) {
  // Fur path for a single edge (horizontal)
  const furPath = `M0,${size/2} Q10,${size*1.2} 20,${size/2} Q30,0 40,${size/2} Q50,${size*1.3} 60,${size/2} Q70,0 80,${size/2} Q90,${size*1.2} 100,${size/2} Q110,0 120,${size/2} Q130,${size*1.3} 140,${size/2} Q150,0 160,${size/2} Q170,${size*1.2} 180,${size/2} Q190,0 200,${size/2} Q210,${size*1.3} 220,${size/2} Q230,0 240,${size/2} Q250,${size*1.2} 260,${size/2} Q270,0 280,${size/2} Q290,${size*1.3} 300,${size/2} Q310,0 320,${size/2} Q330,${size*1.2} 340,${size/2} Q350,0 360,${size/2} Q370,${size*1.3} 380,${size/2} Q390,0 400,${size/2} Q410,${size} 420,${size/2}`;
  // Fur path for a single edge (vertical)
  const furPathV = `M${size/2},0 Q${size*1.2},10 ${size/2},20 Q0,30 ${size/2},40 Q${size*1.3},50 ${size/2},60 Q0,70 ${size/2},80 Q${size*1.2},90 ${size/2},100 Q0,110 ${size/2},120 Q${size*1.3},130 ${size/2},140 Q0,150 ${size/2},160 Q${size*1.2},170 ${size/2},180 Q0,190 ${size/2},200 Q${size*1.3},210 ${size/2},220 Q0,230 ${size/2},240 Q${size*1.2},250 ${size/2},260 Q0,270 ${size/2},280 Q${size*1.3},290 ${size/2},300 Q0,310 ${size/2},320 Q${size*1.2},330 ${size/2},340 Q0,350 ${size/2},360 Q${size*1.3},370 ${size/2},380 Q0,390 ${size/2},400 Q${size},410 ${size/2},420`;
  const borderLength = 420;

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
      {/* Top border */}
      <svg
        viewBox={`0 0 ${borderLength} ${size}`}
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
      {/* Bottom border */}
      <svg
        viewBox={`0 0 ${borderLength} ${size}`}
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
      {/* Left border */}
      <svg
        viewBox={`0 0 ${size} ${borderLength}`}
        width={size}
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d={furPathV}
          fill="none"
          stroke={color}
          strokeWidth={size/1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fluffy-fur"
          opacity="0.88"
        />
      </svg>
      {/* Right border */}
      <svg
        viewBox={`0 0 ${size} ${borderLength}`}
        width={size}
        height="100%"
        style={{ position: 'absolute', top: 0, right: 0, zIndex: 2, pointerEvents: 'none', transform: 'scaleX(-1)' }}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d={furPathV}
          fill="none"
          stroke={color}
          strokeWidth={size/1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fluffy-fur"
          opacity="0.88"
        />
      </svg>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
    </div>
  );
}

