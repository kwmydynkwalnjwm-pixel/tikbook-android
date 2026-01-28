
import React, { useState, useEffect } from 'react';
import { Users, Mic, MicOff, MessageCircle, X, Gift as GiftIcon, Send, UserPlus, Heart, Share2, Crown, Star, Sparkles, Check } from 'lucide-react';
import { MOCK_ROOMS, GIFTS, MOCK_USER } from '../constants';
import { Gift, User } from '../types';
import LevelBadge from '../components/LevelBadge';

const LiveRoom: React.FC<{ roomId: string; onExit: () => void; onProfileClick?: (userId: string) => void }> = ({ roomId, onExit, onProfileClick }) => {
  const room = MOCK_ROOMS.find(r => r.id === roomId) || MOCK_ROOMS[0];
  const [showGifts, setShowGifts] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<number | 'all' | null>(null);
  
  const currentUser: User = JSON.parse(localStorage.getItem('tikbook_user') || JSON.stringify(MOCK_USER));

  const [messages, setMessages] = useState<any[]>([
    { id: 'msg-sys', type: 'system', text: `أهلاً بك في غرفة ${room.title} ✨`, level: 1 },
  ]);
  const [inputText, setInputText] = useState('');
  const [activeGiftOnSeat, setActiveGiftOnSeat] = useState<{ seat: number | 'all', gift: Gift } | null>(null);

  // Simulate entry on mount
  useEffect(() => {
    const entryMsg = { 
      id: `join-${Date.now()}`, 
      type: 'join', 
      user: currentUser.name, 
      level: currentUser.supporterLevel,
      isRoyal: currentUser.supporterLevel >= 30
    };
    
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, entryMsg]);
      // If royal, play a sound effect (simulated)
      if (currentUser.supporterLevel >= 30) {
        console.log("Royal Entry Sound Triggered!");
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const seats = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    user: i === 0 ? currentUser : (i < 6 ? { name: `مستخدم ${i}`, avatar: `https://picsum.photos/100/100?u=${i + 20}`, supporterLevel: i * 8 + 1 } : null),
    isSpeaking: i === 0 || i === 2,
    giftCount: Math.floor(Math.random() * 100)
  }));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { 
      id: Date.now().toString(), 
      user: currentUser.name, 
      text: inputText, 
      level: currentUser.supporterLevel 
    }]);
    setInputText('');
  };

  const handleGift = (gift: Gift) => {
    if (!selectedSeat && selectedSeat !== 0) {
      alert('يرجى اختيار مقعد أو "الكل" لإرسال الهدية');
      return;
    }
    setActiveGiftOnSeat({ seat: selectedSeat, gift });
    setShowGifts(false);
    
    setMessages(prev => [...prev, {
       id: `gift-${Date.now()}`,
       type: 'gift-announcement',
       user: currentUser.name,
       giftIcon: gift.icon,
       giftName: gift.name,
       level: currentUser.supporterLevel
    }]);

    setTimeout(() => setActiveGiftOnSeat(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-[500] bg-[#080808] text-white flex flex-col font-sans overflow-hidden" dir="rtl">
      <div className="absolute top-[-10%] left-[-10%] w-full h-[60%] bg-gradient-to-b from-purple-500/10 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="p-4 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => onProfileClick?.(room.hostId)}>
            <img src={`https://picsum.photos/100/100?u=${room.hostId}`} className="w-11 h-11 rounded-2xl object-cover border-2 border-yellow-500 shadow-lg shadow-yellow-500/20" />
            <div className="absolute -bottom-1 -right-1 bg-red-600 px-1.5 rounded-full text-[7px] font-black border border-black uppercase animate-pulse">Live</div>
          </div>
          <div>
            <h3 className="text-sm font-black line-clamp-1">{room.title}</h3>
            <div className="flex items-center gap-3 text-[9px] text-zinc-400 mt-0.5">
              <span className="flex items-center gap-1 font-bold"><Users size={10} className="text-yellow-500" /> {room.viewers}</span>
              <span className="bg-white/5 px-2 py-0.5 rounded-full border border-white/5 font-bold uppercase">{room.category}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-black text-[10px] transition-all ${isFollowing ? 'bg-zinc-800 text-zinc-400' : 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 active:scale-95'}`}
           >
             {isFollowing ? <Check size={14} /> : <UserPlus size={14} />} {isFollowing ? 'متابع' : 'متابعة'}
           </button>
           <button onClick={onExit} className="p-2.5 bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-500 rounded-full border border-white/5 transition-all"><X size={20} /></button>
        </div>
      </div>

      <div className="flex-1 p-4 grid grid-cols-4 gap-x-2 gap-y-6 content-start relative overflow-y-auto no-scrollbar pt-8">
        {seats.map((seat, i) => (
          <div key={i} onClick={() => setSelectedSeat(i)} className="flex flex-col items-center gap-2 relative group cursor-pointer">
            <div className={`relative w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all duration-300 ${
              selectedSeat === i ? 'ring-4 ring-yellow-500 scale-105' : 'ring-2 ring-white/5'
            } ${seat.isSpeaking ? 'bg-gradient-to-tr from-yellow-600 to-yellow-400' : 'bg-zinc-900/80 backdrop-blur-md'}`}>
              
              {seat.user ? (
                <div className="w-full h-full rounded-full p-1 overflow-hidden">
                  <img src={seat.user.avatar} className="w-full h-full rounded-full object-cover border-2 border-black/20" />
                  {seat.isSpeaking && <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-20"></div>}
                </div>
              ) : (
                <Mic size={24} className="text-zinc-700" />
              )}

              <div className="absolute -top-1 -left-1 bg-black/60 backdrop-blur-md border border-white/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                 <Crown size={8} className="text-yellow-500" />
                 <span className="text-[7px] font-black">{seat.giftCount}</span>
              </div>
              
              {seat.user && (
                <div className="absolute -bottom-1 -right-1">
                   <LevelBadge level={(seat.user as any).supporterLevel || 1} size="sm" />
                </div>
              )}

              {activeGiftOnSeat && (activeGiftOnSeat.seat === i || activeGiftOnSeat.seat === 'all') && (
                <div className="absolute inset-0 z-50 flex items-center justify-center animate-gift-land">
                   <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]">{activeGiftOnSeat.gift.icon}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <span className={`text-[9px] font-black tracking-wide ${seat.user ? 'text-white' : 'text-zinc-600'}`}>
                {seat.user ? seat.user.name.split(' ')[0] : `${i + 1}`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-t from-black via-black/90 to-transparent relative z-10">
        <div className="h-44 overflow-y-auto mb-4 space-y-2 no-scrollbar px-2">
          {messages.map(msg => {
            if (msg.type === 'join') {
              const isRoyal = msg.isRoyal;
              return (
                <div key={msg.id} className={`p-2.5 rounded-[20px] flex items-center gap-3 animate-slide-in border ${
                  isRoyal 
                  ? 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-black border-yellow-500/40 shadow-lg shadow-yellow-500/10' 
                  : 'bg-white/5 border-white/5'
                }`}>
                  <LevelBadge level={msg.level} size="sm" />
                  <p className={`text-[11px] font-black ${isRoyal ? 'text-yellow-400' : 'text-white/60'}`}>
                    انضم <span className={isRoyal ? 'text-white' : ''}>{msg.user}</span> إلى الغرفة {isRoyal ? 'بفخامة! 👑' : '✨'}
                  </p>
                  {isRoyal && <Sparkles size={12} className="text-yellow-400 animate-pulse ml-auto" />}
                </div>
              );
            }
            if (msg.type === 'gift-announcement') {
              return (
                <div key={msg.id} className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-xl flex items-center gap-2 animate-slide-in">
                   <LevelBadge level={msg.level} size="sm" />
                   <p className="text-[10px] font-black text-yellow-500">أرسل {msg.user} {msg.giftIcon} {msg.giftName} 🎁</p>
                </div>
              );
            }
            if (msg.type === 'system') {
              return <p key={msg.id} className="text-[9px] text-zinc-500 text-center font-bold">{msg.text}</p>;
            }
            return (
              <div key={msg.id} className="flex items-start gap-2 bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-white/5 animate-slide-in">
                <div className="shrink-0 mt-0.5">
                   <LevelBadge level={msg.level} size="sm" />
                </div>
                <span className="text-[10px] font-black text-white/60">{msg.user}:</span>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-medium">{msg.text}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSendMessage} className="flex-1 relative group">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="اكتب رسالة..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-10 text-xs font-bold focus:outline-none focus:border-yellow-500/50 transition-all placeholder-zinc-600" />
            <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-yellow-500 hover:scale-110 transition-transform"><Send size={18} /></button>
          </form>
          <button onClick={() => setShowGifts(true)} className="p-3.5 bg-gradient-to-tr from-yellow-600 to-yellow-400 rounded-2xl text-black shadow-xl shadow-yellow-500/20 active:scale-90 transition-all relative overflow-hidden group">
            <GiftIcon size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {showGifts && (
        <div className="absolute inset-0 z-[600] bg-black/40 backdrop-blur-md flex items-end">
           <div className="w-full bg-[#121212] rounded-t-[48px] p-6 pb-12 animate-slide-up h-[70vh] flex flex-col border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6 shrink-0"></div>
              <div className="flex justify-between items-center mb-6">
                 <div>
                   <h4 className="text-xl font-black text-white">متجر الهدايا الفاخر</h4>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-zinc-500">إرسال إلى:</span>
                      <button onClick={() => setSelectedSeat('all')} className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${selectedSeat === 'all' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white/40 border border-white/5'}`}>الكل 🌍</button>
                      {selectedSeat !== 'all' && selectedSeat !== null && <span className="text-[10px] font-black text-yellow-500">المقعد {selectedSeat + 1} 💺</span>}
                   </div>
                 </div>
                 <button onClick={() => setShowGifts(false)} className="p-2 bg-white/5 rounded-full text-zinc-400"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-4 mb-6 no-scrollbar pb-6">
                {GIFTS.map(gift => (
                  <button key={gift.id} onClick={() => handleGift(gift)} className="flex flex-col items-center gap-1.5 p-3 rounded-[32px] bg-white/5 border border-white/5 hover:border-yellow-500/50 transition-all active:scale-95 group">
                    <span className="text-4xl">{gift.icon}</span>
                    <span className="text-[9px] font-black text-white/80 truncate w-full text-center">{gift.name}</span>
                    <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full">
                       <Star size={8} fill="currentColor" className="text-yellow-500" />
                       <span className="text-[9px] font-black text-yellow-500">{gift.price.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-[32px] flex justify-between items-center shadow-inner">
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-zinc-500">رصيدك الحالي</span>
                   <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20"><Crown size={12} className="text-black" /></div>
                      <span className="font-black text-lg">{currentUser.coins.toLocaleString()}</span>
                   </div>
                </div>
                <button className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-8 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">شحن رصيد</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LiveRoom;
