
import React, { useRef, useState, useEffect } from 'react';
import { TreeState } from '../types';
import { GiftLinkGenerator } from './GiftLinkGenerator';

interface OverlayProps {
  currentState: TreeState;
  onToggle: () => void;
  onUpload: (files: FileList) => void;
  onGenerate: () => void;
  // Added to pass down to generator
  userTextureUrls?: string[];
}

export const Overlay: React.FC<OverlayProps> = ({ currentState, onToggle, onUpload, onGenerate, userTextureUrls = [] }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileCount, setFileCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showGiftGenerator, setShowGiftGenerator] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileCount(e.target.files.length);
      onUpload(e.target.files);
      onGenerate();
      setIsSubmitted(true);
      e.target.value = ''; 
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const liquidGlassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(20px) saturate(150%)',
    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  };

  return (
    <>
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-20">
        
        {/* Bottom Left: Upload Button - Positioned to be tightly packed with the tracker above it */}
        <div className="pointer-events-auto absolute left-[20px] bottom-[20px] z-50 flex flex-col gap-2">
            
            {/* NEW: Share Button */}
            <div style={{ width: '12vw', maxWidth: '160px', minWidth: '140px' }}>
                <button
                    onClick={() => setShowGiftGenerator(true)}
                    className="w-full mb-2 py-2 text-[#FFD700] font-bold font-serif text-[10px] md:text-xs tracking-[0.15em] uppercase transition-all duration-300 ease-out hover:scale-105 active:scale-95 flex justify-center items-center gap-2"
                    style={{ ...liquidGlassStyle, borderRadius: '12px' }}
                >
                    <span className="drop-shadow-md">🎁 Share Gift</span>
                </button>
            </div>

            <div style={{ width: '12vw', maxWidth: '160px', minWidth: '140px' }}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple className="hidden" />
                
                <button
                onClick={handleButtonClick}
                className={`
                    relative w-full py-2.5
                    text-[#FFD700] font-bold font-serif text-[10px] md:text-xs tracking-[0.15em] uppercase
                    transition-all duration-300 ease-out
                    group flex justify-center items-center
                    hover:scale-105 active:scale-95
                `}
                style={{
                    ...liquidGlassStyle,
                    borderRadius: '12px', /* Matched corner radius with tracker for visual continuity */
                }}
                >
                <span className="relative z-10 drop-shadow-md flex items-center gap-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {isSubmitted ? `Added ${fileCount}` : "上传照片"}
                </span>
                
                <div 
                    className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                    }}
                />
                </button>
            </div>
        </div>

        {/* Bottom Right: Gesture Instructions */}
        <div 
            className={`
                absolute bottom-[20px] right-[20px] 
                w-[140px] md:w-[160px] 
                p-4 text-white/90 font-serif
                transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                pointer-events-auto origin-bottom-right
                ${showInstructions ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}
            `}
            style={{
                ...liquidGlassStyle,
                borderRadius: '24px',
            }}
        >
            <div className="flex justify-between items-center mb-3 border-b border-white/20 pb-2">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FFD700] opacity-90">Gestures</h3>
                <button onClick={() => setShowInstructions(false)} className="text-[10px] opacity-50 hover:opacity-100 transition-opacity hover:text-white">✕</button>
            </div>
            
            <ul className="space-y-3 text-xs opacity-90">
                <li className="flex items-center gap-3">
                    <span className="text-xl drop-shadow-md filter grayscale-[0.3]">✊</span>
                    <div className="flex flex-col leading-tight">
                        <strong className="block text-white text-[10px] uppercase tracking-wide opacity-80">握拳</strong>
                        <span className="text-[9px] text-white/50 font-sans">Form Tree</span>
                    </div>
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-xl drop-shadow-md filter grayscale-[0.3]">👐</span>
                    <div className="flex flex-col leading-tight">
                        <strong className="block text-white text-[10px] uppercase tracking-wide opacity-80">张手</strong>
                        <span className="text-[9px] text-white/50 font-sans">Disperse</span>
                    </div>
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-xl drop-shadow-md filter grayscale-[0.3]">👌</span>
                    <div className="flex flex-col leading-tight">
                        <strong className="block text-white text-[10px] uppercase tracking-wide opacity-80">捏拖</strong>
                        <span className="text-[9px] text-white/50 font-sans">Rotate/Zoom</span>
                    </div>
                </li>
                <li className="flex items-center gap-3">
                    <span className="text-xl drop-shadow-md filter grayscale-[0.3]">☝️</span>
                    <div className="flex flex-col leading-tight">
                        <strong className="block text-white text-[10px] uppercase tracking-wide opacity-80">食指</strong>
                        <span className="text-[9px] text-white/50 font-sans">Select</span>
                    </div>
                </li>
            </ul>
        </div>

        {!showInstructions && (
            <button 
                onClick={() => setShowInstructions(true)}
                className="pointer-events-auto absolute bottom-[20px] right-[20px] w-12 h-12 flex items-center justify-center text-[#FFD700] text-xl transition-all duration-300 hover:scale-110 active:scale-95"
                style={{
                    ...liquidGlassStyle,
                    borderRadius: '50%',
                    padding: 0
                }}
            >
                <span className="drop-shadow-sm font-serif italic">?</span>
            </button>
        )}
        </div>

        {showGiftGenerator && (
            <GiftLinkGenerator 
                userTextureUrls={userTextureUrls} 
                onClose={() => setShowGiftGenerator(false)} 
                style={liquidGlassStyle} 
            />
        )}
    </>
  );
};
