
import React, { useState } from 'react';
import { Gift, Zap, Rocket, ExternalLink, ChevronRight, X } from 'lucide-react';

export const AnnouncementBoard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Refined Ultra-Transparent Liquid Glass Style
  const liquidGlassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
    backdropFilter: 'blur(24px) saturate(180%) brightness(1.05)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(1.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: `
      0 40px 80px -15px rgba(0, 0, 0, 0.6), 
      inset 0 1px 2px rgba(255, 255, 255, 0.3),
      inset 0 0 30px rgba(255, 255, 255, 0.05)
    `,
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none overflow-y-auto z-[100]">
      <div 
        className="max-w-md w-full rounded-[3rem] p-6 sm:p-8 pointer-events-auto transform transition-all flex flex-col gap-6 my-auto relative overflow-hidden"
        style={liquidGlassStyle}
      >
        {/* Subtle Liquid Shine Animation Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-12 translate-x-[-50%] animate-[shine_10s_infinite_linear]" />
        </div>
        
        <style>{`
          @keyframes shine {
            from { transform: translateX(-120%) rotate(15deg); }
            to { transform: translateX(250%) rotate(15deg); }
          }
        `}</style>

        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/50 hover:text-white transition-colors z-20 border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pr-10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400/20 p-2 rounded-xl border border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <Rocket className="text-yellow-400 w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">重磅更新 <span className="text-yellow-400">V2.0</span></h1>
          </div>
        </div>
        
        <div className="text-[10px] font-semibold text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider w-fit relative z-10 backdrop-blur-md">
          2025-12-24 15:00 上线
        </div>

        {/* Real Xiaohongshu Profile Card Recreation */}
        <div className="relative overflow-hidden bg-[#ff2442] rounded-[2.5rem] shadow-2xl border border-white/20 z-10 transition-transform hover:scale-[1.02] duration-500">
          <div className="h-24 bg-gradient-to-b from-black/20 to-transparent absolute top-0 inset-x-0 pointer-events-none" />
          
          <div className="p-6 relative">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full border-[3px] border-white/90 overflow-hidden shadow-xl mb-4 bg-white/10">
              <img 
                src="avatar.png" 
                alt="文弱李工 Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as any).parentElement;
                  if (parent) parent.innerHTML = '<div class="w-full h-full bg-white/20 flex items-center justify-center text-white/50 text-[10px] font-bold">头像</div>';
                }}
              />
            </div>

            {/* Profile Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-sm">文弱李工</h2>
              <p className="text-white/80 text-xs mb-4 font-medium opacity-90">小红书号：592437221</p>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-white/95 text-[13px] font-medium">
                  <span>📟</span> <span>芯片厂程序员</span> <span>👩🏻‍💻</span> <span>Crypto 量化</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/95 text-[13px] font-medium">
                  <span>📍</span> <span>SH &lt;-&gt; HK</span> <span>✈️</span> <span>记录双城生活...</span>
                </div>
              </div>
            </div>

            <div className="h-[0.5px] bg-white/30 w-full mb-6" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="bg-white rounded-full px-3 py-1.5 w-fit flex items-center justify-center shadow-md">
                  <span className="text-[#ff2442] font-black text-xs tracking-tighter">小红书</span>
                </div>
                <div className="text-white/90 text-[11px] leading-tight font-medium">
                  扫描二维码<br/>在小红书找到我
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-1.5 rounded-2xl shadow-2xl w-20 h-20 flex items-center justify-center overflow-hidden">
                <img 
                  src="qrcode.png" 
                  alt="文弱李工 QR Code" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as any).parentElement;
                    if (parent) parent.innerHTML = '<div class="text-[8px] text-[#ff2442] font-bold text-center">二维码</div>';
                  }}
                />
              </div>
            </div>
          </div>

          <a 
            href="https://xhslink.com/m/3DuTYG5OTfi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 text-white text-[12px] font-bold border border-white/20 transition-all active:scale-95 shadow-lg group"
          >
            关注 @文弱李工 <ExternalLink size={14} />
          </a>
        </div>

        {/* Features list */}
        <div className="space-y-5 relative z-10">
          <div className="flex gap-4 group">
            <div className="bg-blue-400/10 rounded-xl w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-blue-400/20 transition-colors border border-blue-400/20 shadow-inner">
              <Zap className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold mb-0.5 text-white">优化手势操作</h3>
              <p className="text-white/70 text-sm leading-relaxed">更顺滑的交互体验，旋转缩放响应灵敏，指尖丝滑掌控。</p>
            </div>
          </div>

          <div className="flex gap-4 group">
            <div className="bg-pink-400/10 rounded-xl w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-pink-400/20 transition-colors border border-pink-400/20 shadow-inner">
              <Gift className="text-pink-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold mb-0.5 text-white">新增礼赠功能</h3>
              <p className="text-white/70 text-sm leading-relaxed">一键定制专属链接，赠送他人后对方无需重复上传照片，惊喜即刻开启。</p>
            </div>
          </div>
        </div>

        {/* Christmas Message Section */}
        <div className="space-y-4 relative z-10">
          <div className="bg-white/5 border border-amber-500/30 rounded-3xl p-5 text-center shadow-inner backdrop-blur-md">
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed font-semibold">
              圣诞节期间流量骤增，本站服务器已满载，<br/>
              请<span className="text-amber-400 underline underline-offset-4 decoration-amber-500/50">点赞收藏评论点好</span>作者的最新笔记，<br/>
              可获得最新网址优先使用
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/30 text-[10px] uppercase tracking-[0.3em] font-black relative z-10">
          Merry Christmas 2025 • @文弱李工
        </p>
      </div>
    </div>
  );
};
