'use client';

import React from 'react';

// Flower Blossom - Simple 5-petal flower
export const FlowerBlossom = ({ 
  className = '', 
  size = 100,
  color = 'var(--primary-pink)',
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
    <circle cx="50" cy="50" r="8" fill={color} opacity="0.6"/>
    <path d="M50,42 Q45,35 50,30 Q55,35 50,42" fill={color} opacity="0.5"/>
    <path d="M58,50 Q65,45 70,50 Q65,55 58,50" fill={color} opacity="0.5"/>
    <path d="M50,58 Q55,65 50,70 Q45,65 50,58" fill={color} opacity="0.5"/>
    <path d="M42,50 Q35,55 30,50 Q35,45 42,50" fill={color} opacity="0.5"/>
  </svg>
);

// Cherry Blossom - More detailed flower
export const CherryBlossom = ({ 
  className = '', 
  size = 80,
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
    viewBox="0 0 100 100" 
    fill="none"
    style={style}
  >
    <circle cx="50" cy="50" r="6" fill={color} opacity="0.7"/>
    {/* 5 petals */}
    <ellipse cx="50" cy="30" rx="8" ry="12" fill={color} opacity="0.6"/>
    <ellipse cx="70" cy="43" rx="8" ry="12" fill={color} opacity="0.6" transform="rotate(72 50 50)"/>
    <ellipse cx="62" cy="68" rx="8" ry="12" fill={color} opacity="0.6" transform="rotate(144 50 50)"/>
    <ellipse cx="38" cy="68" rx="8" ry="12" fill={color} opacity="0.6" transform="rotate(216 50 50)"/>
    <ellipse cx="30" cy="43" rx="8" ry="12" fill={color} opacity="0.6" transform="rotate(288 50 50)"/>
  </svg>
);

// Floral Branch - Decorative branch with multiple flowers
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
      stroke="var(--primary-pink)" 
      strokeWidth="3" 
      fill="none"
      opacity="0.4"
    />
    {/* Flowers along branch */}
    <circle cx="40" cy="160" r="10" fill="var(--secondary-rose)" opacity="0.5"/>
    <circle cx="70" cy="135" r="8" fill="var(--accent-lavender)" opacity="0.5"/>
    <circle cx="100" cy="120" r="9" fill="var(--soft-peach)" opacity="0.5"/>
    <circle cx="130" cy="105" r="7" fill="var(--primary-pink)" opacity="0.5"/>
    <circle cx="160" cy="90" r="8" fill="var(--secondary-rose)" opacity="0.5"/>
    {/* Small leaves */}
    <ellipse cx="50" cy="150" rx="6" ry="3" fill="var(--accent-lavender)" opacity="0.3" transform="rotate(45 50 150)"/>
    <ellipse cx="85" cy="128" rx="6" ry="3" fill="var(--accent-lavender)" opacity="0.3" transform="rotate(30 85 128)"/>
    <ellipse cx="115" cy="112" rx="6" ry="3" fill="var(--accent-lavender)" opacity="0.3" transform="rotate(20 115 112)"/>
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
