'use client';

import React from 'react';

export const StarSparkle = ({ 
  size = 20, 
  color = '#ff9ec4', 
  style 
}: { 
  size?: number; 
  color?: string; 
  style?: React.CSSProperties;
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    style={{ ...style, filter: `drop-shadow(0 0 5px ${color})` }}
  >
    <path 
      d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" 
      fill={color} 
      className="animate-pulse"
    />
  </svg>
);

export const GlowingOrb = ({ 
  size = 100, 
  color = '#c9b3ff', 
  opacity = 0.2,
  style 
}: { 
  size?: number; 
  color?: string; 
  opacity?: number;
  style?: React.CSSProperties;
}) => (
  <div 
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity: opacity,
      filter: 'blur(20px)',
      ...style
    }}
    className="ambient-glow"
  />
);

export const AmbientElements = () => {
  return (
    <div className="ambient-container">
      {/* Top Left */}
      <GlowingOrb size={300} color="#ff9ec4" opacity={0.15} style={{ left: '-5%', top: '10%' }} />
      <StarSparkle size={30} color="#ffb3d9" style={{ left: '15%', top: '20%', animationDelay: '0.5s' }} />
      <StarSparkle size={15} color="#fff" style={{ left: '8%', top: '25%', animationDelay: '1.2s' }} />
      
      {/* Bottom Left */}
      <GlowingOrb size={400} color="#c9b3ff" opacity={0.1} style={{ left: '5%', bottom: '5%' }} />
      <StarSparkle size={25} color="#c9b3ff" style={{ left: '12%', bottom: '15%', animationDelay: '2.1s' }} />
      
      {/* Top Right */}
      <GlowingOrb size={350} color="#ffc299" opacity={0.12} style={{ right: '0%', top: '5%' }} />
      <StarSparkle size={20} color="#ffc299" style={{ right: '10%', top: '15%', animationDelay: '0.8s' }} />
      <StarSparkle size={12} color="#fff" style={{ right: '18%', top: '8%', animationDelay: '1.5s' }} />
      
      {/* Bottom Right */}
      <GlowingOrb size={250} color="#ff9ec4" opacity={0.15} style={{ right: '5%', bottom: '10%' }} />
      <StarSparkle size={35} color="#ff9ec4" style={{ right: '15%', bottom: '20%', animationDelay: '3s' }} />
      
      {/* Random Sparkles */}
      <StarSparkle size={10} color="#fff" style={{ left: '45%', top: '12%', animationDelay: '4s' }} />
      <StarSparkle size={10} color="#fff" style={{ right: '40%', bottom: '15%', animationDelay: '2.5s' }} />
    </div>
  );
};
