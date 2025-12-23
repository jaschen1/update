
import React from 'react';

export const BackgroundHeader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center pt-12 md:pt-16 pointer-events-none z-50">
      <style>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 8px rgba(170, 119, 28, 0.4), 0 0 16px rgba(212, 175, 55, 0.15); }
          50% { text-shadow: 0 0 16px rgba(255, 215, 0, 0.7), 0 0 28px rgba(255, 223, 0, 0.35); }
        }
      `}</style>
      
      <div 
        className="flex flex-col items-center px-4"
        style={{ animation: 'subtleFloat 6s ease-in-out infinite' }}
      >
        <h1 
            className="text-5xl md:text-8xl tracking-wider leading-none" 
            style={{
                fontFamily: '"Great Vibes", cursive',
                color: '#fff5d7',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'glowPulse 4s ease-in-out infinite',
                padding: '0.1em 0',
            }}
        >
          Merry Christmas
        </h1>
      </div>
    </div>
  );
};
