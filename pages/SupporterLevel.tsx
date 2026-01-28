
import React, { useState } from 'react';
import { ChevronRight, Info, Crown, Diamond, Sparkles, Shield, Star, History, Gift as GiftIcon, ChevronLeft, Lock } from 'lucide-react';
import { User, AppRoute } from '../types';
import LevelBadge from '../components/LevelBadge';

interface SupporterLevelProps {
  user: User;
  onBack: () => void;
  onNavigate: (route: AppRoute) => void;
}

const SupporterLevel: React.FC<SupporterLevelProps> = ({ user, onBack, onNavigate }) => {
  const currentLevel = user.supporterLevel || 1;
  const exp = user.supporterExp || 0;

  // تعريف الفئات بناءً على الصور بدقة متناهية
  const tiers = [
    { id: 1, range: 'المستوى 1 - المستوى 9', min: 1, max: 9, roman: 'I', shape: '🔺', color: 'from-blue-400 to-blue-600', badgeColor: 'bg-blue-500', label: 'المستوى 1', glow: 'shadow-blue-500/20' },
    { id: 2, range: 'المستوى 10 - المستوى 19', min: 10, max: 19, roman: 'II', shape: '🔹', color: 'from-blue-600 to-purple-500', badgeColor: 'bg-blue-600', label: 'المستوى 10', glow: 'shadow-blue-600/20' },
    { id: 3, range: 'المستوى 20 - المستوى 29', min: 20, max: 29, roman: 'III', shape: '💎', color: 'from-purple-600 to-blue-500', badgeColor: 'bg-purple-600', label: 'المستوى 20', glow: 'shadow-purple-500/20' },
    { id: 4, range: 'المستوى 30 - المستوى 39', min: 30, max: 39, roman: 'IV', shape: '💠', color: 'from-purple-500 to-yellow-500', badgeColor: 'bg-yellow-600', label: 'المستوى 30', glow: 'shadow-yellow-500/20' },
    { id: 5, range: 'المستوى 40 - المستوى 49', min: 40, max: 49, roman: 'V', shape: '👑', color: 'from-yellow-400 to-purple-600', badgeColor: 'bg-yellow-500', label: 'المستوى 40', glow: 'shadow-orange-500/20' },
    { id: 6, range: 'المستوى +50', min: 50, max: 100, roman: 'VI', shape: '🏆', color: 'from-yellow-400 via-pink-500 to-yellow-600', badgeColor: 'bg-gradient-to-r from-yellow-400 to-pink-500', label: 'المستوى 50', glow: 'shadow-pink-500/30' },
  ];

  const initialTierIndex = tiers.findIndex(t => currentLevel >= t.min && currentLevel <= t.max);
  const [viewingTierIndex, setViewingTierIndex] = useState(initialTierIndex === -1 ? 0 : initialTierIndex);

  const activeTier = tiers[viewingTierIndex];
  const isUserInThisTier = currentLevel >= activeTier.min && currentLevel <= activeTier.max;

  const nextTier = () => setViewingTierIndex(p => (p + 1) % tiers.length);
  const prevTier = () => setViewingTierIndex(p => (p - 1 + tiers.length) % tiers.length);

  // SVG Shapes to mimic the screenshots
  const renderShape = (tierId: number) => {
    const commonProps = "w-48 h-48 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]";
    switch(tierId) {
      case 1: return <div className="text-[140px] leading-none select-none drop-shadow-2xl">🔺</div>;
      case 2: return <div className="text-[140px] leading-none select-none drop-shadow-2xl">🔹</div>;
      case 3: return <div className="text-[140px] leading-none select-none drop-shadow-2xl">💎</div>;
      case 4: return <div className="text-[140px] leading-none select-none drop-shadow-2xl">💠</div>;
      case 5: return <div className="text-[140px] leading-none select-none drop-shadow-2xl">👑</div>;
      case 6: return <div className="text-[140px] leading-none select-none drop-shadow-2xl">🏆</div>;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-[#080808] text-white font-sans flex flex-col overflow-hidden select-none" dir="rtl">
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${activeTier.color} opacity-10 blur-[150px] transition-all duration-700`}></div>

      {/* Top Header */}
      <div className="p-4 flex items-center justify-between relative z-50 bg-black/30 backdrop-blur-xl">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-full active:scale-90 transition-transform">
          <ChevronRight size={24} />
        </button>
        <div className="flex items-center gap-1.5 cursor-pointer">
           <span className="text-[14px] font-black text-white/90">فلتنضم لفتح هدايا "خزينة الهدايا"</span>
           <ChevronLeft size={16} className="text-white/40" />
        </div>
        <button className="p-2 text-white/30"><Info size={24} /></button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 pb-44 z-10">
        {/* User Card */}
        <div className="flex items-center justify-between bg-white/5 p-4 rounded-[32px] border border-white/5">
           <div className="flex items-center gap-4">
              <div className="relative">
                 <img src={user.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500/30 p-0.5 shadow-lg shadow-black" />
                 <div className="absolute -bottom-1 -right-1">
                    <LevelBadge level={currentLevel} size="sm" />
                 </div>
              </div>
              <div className="text-right">
                 <h3 className="text-lg font-black italic">{user.name}</h3>
                 <div className="flex items-center gap-2 mt-0.5">
                    <div className="bg-white/5 px-3 py-0.5 rounded-full flex items-center gap-2 border border-white/5">
                       <span className="text-[12px] font-black">{user.coins.toLocaleString()}</span>
                       <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Diamond size={10} className="text-black" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           <button className="p-3 bg-white/5 rounded-full text-white/40"><History size={20} /></button>
        </div>

        {/* Level Map Dots */}
        <div className="flex justify-between items-center px-8 relative h-10">
           <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-white/10 -translate-y-1/2"></div>
           {tiers.map((t, i) => (
             <div 
               key={i} 
               onClick={() => setViewingTierIndex(i)}
               className={`relative z-10 flex flex-col items-center cursor-pointer transition-all duration-300 ${viewingTierIndex === i ? 'scale-150' : 'opacity-30'}`}
             >
                <div className={`w-3 h-3 rounded-full ${viewingTierIndex === i ? 'bg-gradient-to-r ' + t.color + ' shadow-[0_0_10px_white]' : 'bg-zinc-700'}`}></div>
                {viewingTierIndex === i && <div className="absolute -bottom-1 w-0.5 h-0.5 bg-white rounded-full"></div>}
             </div>
           ))}
        </div>

        {/* Main Shape & Level Indicator */}
        <div className="relative flex flex-col items-center justify-center min-h-[400px]">
           <div className={`w-full relative bg-gradient-to-br from-zinc-900 to-black rounded-[48px] p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-500 ${activeTier.glow}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${activeTier.color} opacity-[0.03]`}></div>
              
              {/* Swipe/Nav Arrows */}
              <button onClick={prevTier} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/5 rounded-full text-white/20 active:scale-90 transition-transform z-20"><ChevronRight className="rotate-180" size={24} /></button>
              <button onClick={nextTier} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/5 rounded-full text-white/20 active:scale-90 transition-transform z-20"><ChevronRight size={24} /></button>

              <div className="relative z-10 space-y-4 w-full">
                 <div className="animate-float">
                    {renderShape(activeTier.id)}
                 </div>

                 <div className="space-y-1">
                    <div className="flex items-center justify-center gap-3">
                       <div className="w-10 h-px bg-white/10"></div>
                       <h1 className="text-7xl font-black italic tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{activeTier.roman}</h1>
                       <div className="w-10 h-px bg-white/10"></div>
                    </div>
                    <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.1em]">{activeTier.range}</p>
                 </div>

                 <div className="w-full mt-8">
                    {!isUserInThisTier && currentLevel < activeTier.min ? (
                       <div className="py-4 bg-black/40 rounded-2xl border border-white/5">
                          <p className="text-white/50 text-[13px] font-black">لم تصل حتى الآن إلى مستوى الداعمين هذا.</p>
                       </div>
                    ) : (
                       <div className="w-full px-2">
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 shadow-inner">
                             <div className={`h-full bg-gradient-to-r ${activeTier.color} transition-all duration-1000`} style={{ width: `${Math.min(100, (exp / 10000) * 100)}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[11px] font-black mt-3">
                             <div className="flex items-center gap-1.5 text-white/90">
                                <span>{exp.toLocaleString()}</span>
                                <span className="text-white/30">/</span>
                                <span>10,000</span>
                             </div>
                             <span className="text-white/30 italic">أرسل هدية لتفعيل مكافآتك</span>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Ghost Perk Card */}
        <div className="bg-gradient-to-r from-zinc-900 to-black p-6 rounded-[32px] border border-white/5 flex items-center justify-between relative overflow-hidden group active:scale-[0.98] transition-all">
           <div className={`absolute inset-0 bg-blue-500/5 ${currentLevel >= 30 ? 'block' : 'hidden'}`}></div>
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center shrink-0 border border-white/10 shadow-xl group-hover:scale-110 transition-transform">
                 <Shield size={32} className={`${currentLevel >= 30 ? 'text-blue-400' : 'text-zinc-700'}`} />
              </div>
              <div className="text-right">
                 <h4 className="text-[16px] font-black">المخفي 🎭</h4>
                 <p className="text-[11px] text-white/40 font-bold leading-relaxed">تحكم في الأمور وأنت مستور.</p>
              </div>
           </div>
           {currentLevel < 30 ? <Lock size={18} className="text-white/10" /> : <div className="bg-blue-500/20 px-3 py-1 rounded-full text-[10px] font-black text-blue-400">مفعل</div>}
        </div>

        {/* Rewards List */}
        <div className="space-y-4">
           <h3 className="text-sm font-black px-2 flex items-center gap-2">
             <Sparkles size={16} className="text-yellow-500" /> مكافآت المستوى
           </h3>
           
           <div className="bg-zinc-900/40 p-5 rounded-[32px] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 ${activeTier.badgeColor} rounded-2xl flex items-center justify-center shadow-2xl shadow-black border border-white/20`}>
                    <LevelBadge level={activeTier.min} size="sm" />
                 </div>
                 <div className="text-right">
                    <h4 className="text-[14px] font-black">شارة الداعمين {activeTier.min}</h4>
                    <p className="text-[10px] text-white/40 font-bold">تظهر بجوار اسمك في كل مكان</p>
                 </div>
              </div>
              {!isUserInThisTier && currentLevel < activeTier.min && <Lock size={16} className="text-white/10" />}
           </div>

           {activeTier.id >= 4 && (
             <div className="bg-zinc-900/40 p-5 rounded-[32px] border border-white/5 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-black rounded-2xl flex items-center justify-center border border-yellow-500/20">
                      <Crown size={24} className="text-yellow-500" />
                   </div>
                   <div className="text-right">
                      <h4 className="text-[14px] font-black">ميزة الدخول الملكي 👑</h4>
                      <p className="text-[10px] text-white/40 font-bold">تأثير بصري فاخر عند دخول غرف البث</p>
                   </div>
                </div>
                {!isUserInThisTier && currentLevel < activeTier.min && <Lock size={16} className="text-white/10" />}
             </div>
           )}
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6 pb-12 bg-gradient-to-t from-black via-black/90 to-transparent fixed bottom-0 left-0 right-0 z-[100]">
        <button 
          onClick={() => onNavigate(AppRoute.STORE)}
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black py-4.5 rounded-[28px] font-black text-lg shadow-[0_15px_40px_rgba(234,179,8,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 border-t border-white/20"
        >
          <GiftIcon size={24} strokeWidth={2.5} /> شحن عملات لزيادة الليفل
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); filter: brightness(1.2); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow { animation: pulse 3s infinite; }
      `}</style>
    </div>
  );
};

export default SupporterLevel;
