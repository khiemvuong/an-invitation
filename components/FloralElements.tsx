'use client';

import React from 'react';

// Daisy Blossom - Daisy flower with green leaves
export const FlowerBlossom = ({ 
  className = '', 
  size = 100,
  color = '#ffffff', // White petals
  style
}: { 
  className?: string; 
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 100 100" 
    fill="none"
    style={style}
  >
    {/* Green Leaves */}
    <path d="M50,50 Q20,20 10,40 Q20,60 50,50" fill="#a8d08d" opacity="0.8"/>
    <path d="M50,50 Q80,20 90,40 Q80,60 50,50" fill="#a8d08d" opacity="0.8"/>
    
    {/* 8 Petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <ellipse key={angle} cx="50" cy="30" rx="6" ry="16" fill={color} opacity="0.9" transform={`rotate(${angle} 50 50)`}/>
    ))}
    
    {/* Yellow Center */}
    <circle cx="50" cy="50" r="10" fill="#ffc000" opacity="0.9"/>
  </svg>
);

// Detailed Daisy - More petals and leaf details
export const CherryBlossom = ({ 
  className = '', 
  size = 80,
  color = '#ffffff', // White petals
  style
}: { 
  className?: string; 
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 100 100" 
    fill="none"
    style={style}
  >
    {/* Green Leaves */}
    <ellipse cx="30" cy="50" rx="20" ry="8" fill="#8fbc8f" opacity="0.8" transform="rotate(-30 30 50)"/>
    <ellipse cx="70" cy="60" rx="20" ry="8" fill="#8fbc8f" opacity="0.8" transform="rotate(45 70 60)"/>
    
    {/* 12 Petals */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
      <ellipse key={angle} cx="50" cy="32" rx="4" ry="14" fill={color} opacity="0.85" transform={`rotate(${angle} 50 50)`}/>
    ))}
    
    {/* Yellow Center */}
    <circle cx="50" cy="50" r="12" fill="#ffb347" opacity="0.9"/>
    <circle cx="50" cy="50" r="8" fill="#ffcc5c" opacity="1"/>
  </svg>
);

// Floral Branch - Decorative branch with daisies and leaves
export const FloralBranch = ({ 
  className = '', 
  width = 200,
  height = 200
}: { 
  className?: string; 
  width?: number;
  height?: number;
}) => (
  <svg 
    className={className} 
    width={width} 
    height={height}
    viewBox="0 0 200 200" 
    fill="none"
  >
    {/* Main branch */}
    <path 
      d="M20,180 Q60,140 100,120 Q140,100 180,80" 
      stroke="#7cb342" 
      strokeWidth="4" 
      fill="none"
      opacity="0.6"
    />
    
    {/* Leaves along branch */}
    <path d="M40,160 Q30,130 50,140 Q50,160 40,160" fill="#8fbc8f" opacity="0.7"/>
    <path d="M80,130 Q90,100 100,120 Q80,130 80,130" fill="#8fbc8f" opacity="0.7"/>
    <path d="M120,110 Q110,80 130,90 Q140,110 120,110" fill="#8fbc8f" opacity="0.7"/>
    
    {/* Daisies along branch */}
    {/* Daisy 1 */}
    <g transform="translate(60, 130) scale(0.6)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <ellipse key={angle} cx="0" cy="-15" rx="5" ry="12" fill="#fff" opacity="0.9" transform={`rotate(${angle} 0 0)`}/>
      ))}
      <circle cx="0" cy="0" r="8" fill="#ffc000"/>
    </g>
    
    {/* Daisy 2 */}
    <g transform="translate(100, 110) scale(0.8)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <ellipse key={angle} cx="0" cy="-15" rx="5" ry="12" fill="#fff" opacity="0.9" transform={`rotate(${angle} 0 0)`}/>
      ))}
      <circle cx="0" cy="0" r="8" fill="#ffc000"/>
    </g>
    
    {/* Daisy 3 */}
    <g transform="translate(150, 90) scale(0.5)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <ellipse key={angle} cx="0" cy="-15" rx="5" ry="12" fill="#fff" opacity="0.9" transform={`rotate(${angle} 0 0)`}/>
      ))}
      <circle cx="0" cy="0" r="8" fill="#ffc000"/>
    </g>
  </svg>
);

// Falling Petal - Single petal for animation
export const FallingPetal = ({ 
  className = '', 
  size = 20,
  color = 'var(--secondary-rose)',
  style
}: { 
  className?: string; 
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 20 20" 
    fill="none"
    style={style}
  >
    <ellipse cx="10" cy="10" rx="6" ry="9" fill={color} opacity="0.6"/>
  </svg>
);

// Corner Decoration - Ornamental corner piece
export const CornerDecoration = ({ 
  className = '', 
  size = 150,
  style
}: { 
  className?: string; 
  size?: number;
  style?: React.CSSProperties;
}) => (
  <svg 
    className={className} 
    width={size} 
    height={size}
    viewBox="0 0 150 150" 
    fill="none"
    style={style}
  >
    {/* Curved lines */}
    <path 
      d="M10,10 Q40,10 40,40" 
      stroke="var(--primary-pink)" 
      strokeWidth="2" 
      fill="none"
      opacity="0.4"
    />
    <path 
      d="M10,20 Q50,20 50,60" 
      stroke="var(--secondary-rose)" 
      strokeWidth="1.5" 
      fill="none"
      opacity="0.3"
    />
    {/* Small flowers */}
    <circle cx="15" cy="15" r="5" fill="var(--primary-pink)" opacity="0.5"/>
    <circle cx="35" cy="35" r="4" fill="var(--accent-lavender)" opacity="0.5"/>
    <circle cx="50" cy="55" r="3" fill="var(--soft-peach)" opacity="0.5"/>
  </svg>
);

// Scattered Petals - Group of petals
// Pre-generated random values (pure - outside component)
const generatePetalData = (count: number) => 
  Array.from({ length: count }).map((_, i) => ({
    left: (i * 23 + 17) % 100, // Pseudo-random but deterministic
    top: (i * 37 + 29) % 100,
    rotation: (i * 73) % 360,
    opacity: 0.3 + ((i * 0.13) % 0.4),
    size: 15 + ((i * 3) % 10)
  }));

export const ScatteredPetals = ({ 
  className = '', 
  count = 5
}: { 
  className?: string; 
  count?: number;
}) => {
  const petals = generatePetalData(count);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {petals.map((petal, i) => (
        <FallingPetal
          key={i}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}%`,
            transform: `rotate(${petal.rotation}deg)`,
            opacity: petal.opacity
          }}
          size={petal.size}
        />
      ))}
    </div>
  );
};
