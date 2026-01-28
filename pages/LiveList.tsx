
import React, { useState } from 'react';
import { Search, Plus, Users, Flame, Trophy, Crown, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { MOCK_ROOMS } from '../constants';

interface LiveListProps {
  onRoomSelect: (id: string) => void;
  onProfileClick?: (userId: string) => void;
}

const LiveList: React.FC<LiveListProps> = ({ onRoomSelect, onProfileClick }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomCover, setRoomCover] = useState<string | null>(null);
  
  const categories = ['الكل', 'موسيقى', 'دردشة', 'ألعاب', 'حب', 'شعر'];

  const handleCreateRoom = () => {
    if (!roomTitle) return;
    // محاكاة إنشاء الغرفة
    onRoomSelect('new-room');
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 pb-24 font-sans relative" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pt-4">
        <h1 className="text-2xl font-black flex items-center gap-2 bg-gradient-to-l from-yellow-500 to-white bg-clip-text text-transparent">
          عالم لايف <Sparkles size={20} className="text-yellow-500" />
        </h1>
        <div className="flex gap-3">
          <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-400 px-4 py-2 rounded-2xl text-black font-black text-xs shadow-lg shadow-yellow-500/20 active:scale-95 transition-all">
            <Plus size={18} strokeWidth={3} /> إنشاء غرفة
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
              i === 0 ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Live Rooms Grid */}
      <div className="grid grid-cols-2 gap-4">
        {MOCK_ROOMS.map((room) => (
          <div 
            key={room.id} 
            className="group relative aspect-[4/5] rounded-[32px] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl active:scale-95 transition-transform cursor-pointer"
          >
            <img 
              onClick={() => onRoomSelect(room.id)}
              src={room.coverImage} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 p-4 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start pointer-events-auto">
                <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Flame size={10} fill="currentColor" /> مباشر
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                  <Users size={10} /> {room.viewers}
                </span>
              </div>

              <div className="pointer-events-auto">
                <div className="flex items-center gap-2 mb-1 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                  <div 
                    onClick={(e) => { e.stopPropagation(); onProfileClick?.(room.hostId); }}
                    className="w-7 h-7 rounded-full border border-yellow-500 overflow-hidden cursor-pointer"
                  >
                    <img src={`https://picsum.photos/100/100?u=${room.hostId}`} alt="host" className="w-full h-full object-cover" />
                  </div>
                  <span onClick={() => onRoomSelect(room.id)} className="text-[11px] font-black text-white truncate flex-1">{room.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create Room */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-[#121212] rounded-[40px] p-8 border border-white/10 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-yellow-500">إعداد غرفة البث</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-500"><X size={24} /></button>
            </div>

            <div className="space-y-6">
              <div 
                className="aspect-video w-full rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden relative"
                onClick={() => setRoomCover(`https://picsum.photos/800/600?random=${Date.now()}`)}
              >
                {roomCover ? (
                  <img src={roomCover} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={32} className="text-zinc-700" />
                    <span className="text-xs font-bold text-zinc-500">أضف غلافاً للغرفة</span>
                  </>
                )}
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-500 mb-2 block px-2">عنوان الغرفة</label>
                <input 
                  type="text" 
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  placeholder="مثال: سهرة طربية مع الأصدقاء..."
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-1 focus:ring-yellow-500 outline-none"
                />
              </div>

              <button 
                onClick={handleCreateRoom}
                className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-black text-lg shadow-xl shadow-yellow-500/20 active:scale-95 transition-all"
              >
                بدء البث الآن
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default LiveList;
