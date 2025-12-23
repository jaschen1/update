
import React, { useState } from 'react';

interface GiftLinkGeneratorProps {
  userTextureUrls: string[];
  onClose: () => void;
  style: React.CSSProperties;
}

export const GiftLinkGenerator: React.FC<GiftLinkGeneratorProps> = ({ userTextureUrls, onClose, style }) => {
  const [customId, setCustomId] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [shareLink, setShareLink] = useState('');

  const handleGenerate = async () => {
    if (!customId.trim()) return;
    if (userTextureUrls.length === 0) {
        setStatus('ERROR');
        setErrorMessage("Please decorate your tree with photos first.");
        return;
    }

    setStatus('LOADING');
    setErrorMessage('');

    try {
      const response = await fetch('/api/save-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customId: customId.trim(), photoUrls: userTextureUrls }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setStatus('ERROR');
        setErrorMessage('This name is already taken. Please choose another.');
      } else if (!response.ok) {
        throw new Error(data.error || 'Failed to seal the gift.');
      } else {
        setStatus('SUCCESS');
        setShareLink(`${window.location.origin}/?id=${customId.trim()}`);
      }
    } catch (err: any) {
      setStatus('ERROR');
      setErrorMessage(err.message || 'A magical error occurred.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    // Could add a toast here, but simple alert fits the minimal dependency constraint
    // Using a custom styled feedback would be better but keeping it simple for now
  };

  // Romantic Glass Style override
  const romanticGlassStyle = {
    background: 'rgba(10, 5, 0, 0.85)',
    backdropFilter: 'blur(24px) saturate(120%)',
    WebkitBackdropFilter: 'blur(24px) saturate(120%)',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(255, 215, 0, 0.05)',
  };

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500"
        onClick={onClose}
    >
      <div 
        className="relative w-[90%] max-w-[400px] p-8 flex flex-col items-center text-center overflow-hidden group"
        style={{ ...romanticGlassStyle, borderRadius: '30px' }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#FFD700] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#D40000] rounded-full blur-[80px] opacity-10 pointer-events-none"></div>

        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-5 text-[#FFD700]/40 hover:text-[#FFD700] transition-colors font-serif text-xl"
        >
            ✕
        </button>

        {status === 'SUCCESS' ? (
             <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-700">
                <div className="mb-4">
                    <span className="text-4xl">🎁</span>
                </div>
                <h3 
                    className="text-4xl md:text-5xl text-[#FFD700] mb-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                    style={{ fontFamily: '"Great Vibes", cursive' }}
                >
                    Sent with Love
                </h3>
                <p 
                    className="text-[#FFD700]/70 text-sm italic mb-6 tracking-wide"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    Your memory has been sealed in time.
                </p>

                {/* QR Code Frame */}
                <div className="p-3 bg-white/5 border border-[#FFD700]/30 rounded-xl mb-6 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                     <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareLink)}&bgcolor=10-5-0&color=d4-af-37&margin=10`} 
                        alt="QR Code" 
                        className="w-32 h-32 rounded-lg opacity-90"
                     />
                </div>

                <div className="w-full bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-3 mb-4 flex items-center justify-between gap-2 group/link">
                    <span className="flex-1 text-[#FFD700]/60 text-[10px] font-mono truncate text-left select-all">{shareLink}</span>
                </div>

                <button 
                    onClick={copyToClipboard}
                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#E5C100] hover:from-[#FFE55C] hover:to-[#FFD700] text-[#1a0505] py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_4px_20px_rgba(255,215,0,0.3)] hover:shadow-[0_6px_30px_rgba(255,215,0,0.5)] active:scale-95"
                    style={{ fontFamily: '"Cinzel", serif' }}
                >
                    Copy Link
                </button>
             </div>
        ) : (
            <div className="flex flex-col items-center w-full">
                <h3 
                    className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] to-[#FFD700] mb-3 drop-shadow-sm"
                    style={{ fontFamily: '"Great Vibes", cursive', lineHeight: 1.2 }}
                >
                    A Timeless Gift
                </h3>
                
                <p 
                    className="text-white/60 text-sm italic mb-8 max-w-[260px] leading-relaxed"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    "Seal your moments into this digital tree, and share the warmth with someone special."
                </p>

                <div className="w-full relative mb-6">
                    <input 
                        type="text" 
                        value={customId}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
                            setCustomId(val);
                        }}
                        placeholder="Name your gift (e.g. ForEmma)"
                        className="peer w-full bg-transparent border-b border-[#FFD700]/30 text-[#FFD700] px-2 py-3 focus:outline-none focus:border-[#FFD700] transition-all font-serif text-lg text-center placeholder-[#FFD700]/20"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FFD700] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-500"></div>
                </div>

                {status === 'ERROR' && (
                    <p className="text-[#ff6b6b] text-xs font-serif italic mb-4 animate-pulse">
                        ✦ {errorMessage}
                    </p>
                )}

                <button 
                    onClick={handleGenerate}
                    disabled={status === 'LOADING' || !customId}
                    className="w-full relative overflow-hidden group/btn bg-transparent border border-[#FFD700]/40 text-[#FFD700] py-3.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#FFD700] hover:bg-[#FFD700]/5"
                >
                    <span 
                        className="relative z-10 text-xs font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2"
                        style={{ fontFamily: '"Cinzel", serif' }}
                    >
                        {status === 'LOADING' ? (
                            <>
                                <span className="animate-spin text-base">✧</span> Wrapping...
                            </>
                        ) : (
                            <>Create Gift <span className="text-base">✨</span></>
                        )}
                    </span>
                    <div className="absolute inset-0 bg-[#FFD700] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left opacity-10"></div>
                </button>
                
                <p className="mt-6 text-[#FFD700]/30 text-[9px] uppercase tracking-widest">
                    {userTextureUrls.length} Memories Selected
                </p>
            </div>
        )}
      </div>
    </div>
  );
};
