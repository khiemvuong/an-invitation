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

// Falling Leaf - Single leaf for decoration
export const FallingPetal = ({ 
  className = '', 
  size = 20,
  color = '#8fbc8f',
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
    <path d="M10,2 Q14,8 10,18 Q6,8 10,2" fill={color} opacity="0.7"/>
    <path d="M10,4 L10,16" stroke="#5a8a5a" strokeWidth="0.5" opacity="0.4"/>
  </svg>
);

// Corner Vine - Decorative green vine corner piece with tiny daisies
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
    {/* Main vine curves */}
    <path 
      d="M5,5 Q40,5 60,30 Q75,50 70,80" 
      stroke="#7cb342" 
      strokeWidth="2.5" 
      fill="none"
      opacity="0.6"
    />
    <path 
      d="M5,15 Q30,20 45,45 Q55,65 50,100" 
      stroke="#8fbc8f" 
      strokeWidth="2" 
      fill="none"
      opacity="0.5"
    />
    
    {/* Leaves along vines */}
    <path d="M25,12 Q20,2 30,5 Q35,10 25,12" fill="#a8d08d" opacity="0.8"/>
    <path d="M45,28 Q38,18 50,20 Q55,28 45,28" fill="#8fbc8f" opacity="0.7"/>
    <path d="M60,50 Q52,40 65,42 Q68,50 60,50" fill="#a8d08d" opacity="0.7"/>
    <path d="M20,30 Q12,22 25,22 Q28,28 20,30" fill="#8fbc8f" opacity="0.6"/>
    <path d="M38,55 Q30,45 42,48 Q45,55 38,55" fill="#a8d08d" opacity="0.6"/>
    
    {/* Tiny daisy at the junction */}
    <g transform="translate(50, 32) scale(0.35)">
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <ellipse key={angle} cx="0" cy="-12" rx="4" ry="10" fill="#fff" opacity="0.9" transform={`rotate(${angle} 0 0)`}/>
      ))}
      <circle cx="0" cy="0" r="5" fill="#ffc000"/>
    </g>
    
    {/* Another tiny daisy */}
    <g transform="translate(25, 20) scale(0.25)">
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <ellipse key={angle} cx="0" cy="-12" rx="4" ry="10" fill="#fff" opacity="0.85" transform={`rotate(${angle} 0 0)`}/>
      ))}
      <circle cx="0" cy="0" r="5" fill="#ffb347"/>
    </g>
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

// Cherry - Two red cherries with stem and leaf
export const Cherry = ({ 
  className = '', 
  size = 60,
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
    viewBox="0 0 60 60" 
    fill="none"
    style={style}
  >
    {/* Stems */}
    <path d="M30,8 Q28,20 22,32" stroke="#5a8a3a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M30,8 Q34,22 38,30" stroke="#5a8a3a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    
    {/* Leaf at top */}
    <path d="M30,8 Q38,2 42,6 Q38,12 30,8" fill="#7cb342" opacity="0.9"/>
    <path d="M30,8 Q36,4 38,7" stroke="#5a8a3a" strokeWidth="0.8" fill="none"/>
    
    {/* Left cherry */}
    <circle cx="20" cy="36" r="10" fill="#dc3545"/>
    <circle cx="20" cy="36" r="10" fill="url(#cherryGrad1)"/>
    <ellipse cx="16" cy="32" rx="3" ry="2" fill="rgba(255,255,255,0.35)" transform="rotate(-30 16 32)"/>
    
    {/* Right cherry */}
    <circle cx="40" cy="34" r="9" fill="#dc3545"/>
    <circle cx="40" cy="34" r="9" fill="url(#cherryGrad2)"/>
    <ellipse cx="36" cy="30" rx="2.5" ry="1.8" fill="rgba(255,255,255,0.35)" transform="rotate(-30 36 30)"/>
    
    {/* Gradients for 3D look */}
    <defs>
      <radialGradient id="cherryGrad1" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ff4d5a" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#8b0000" stopOpacity="0.4"/>
      </radialGradient>
      <radialGradient id="cherryGrad2" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ff4d5a" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#8b0000" stopOpacity="0.4"/>
      </radialGradient>
    </defs>
  </svg>
);
