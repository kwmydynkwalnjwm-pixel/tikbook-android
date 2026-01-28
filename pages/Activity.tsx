
import React from 'react';
import { ChevronRight, Heart, MessageSquare, AtSign, Video, Settings } from 'lucide-react';

const Activity: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const activities = [
    { id: '1', type: 'like', user: 'أحمد مشعل', avatar: 'https://picsum.photos/100/100?u=10', time: 'منذ 5د', postThumb: 'https://picsum.photos/100/150?u=p1' },
    { id: '2', type: 'mention', user: 'ليلى منصور', avatar: 'https://picsum.photos/100/100?u=11', time: 'منذ 1س', postThumb: 'https://picsum.photos/100/150?u=p2' },
    { id: '3', type: 'like', user: 'عمر القحطاني', avatar: 'https://picsum.photos/100/100?u=12', time: 'منذ 3س', postThumb: 'https://picsum.photos/100/150?u=p1' },
    { id: '4', type: 'comment', user: 'هيا السعد', avatar: 'https://picsum.photos/100/100?u=13', time: 'أمس', postThumb: 'https://picsum.photos/100/150?u=p3' },
  ];

  return (
    <div className="h-screen bg-white text-black font-sans flex flex-col" dir="rtl">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-zinc-50 sticky top-0 bg-white z-50 shrink-0">
        <button onClick={onBack} className="p-1 active:scale-90 transition-transform">
          <ChevronRight size={28} className="text-zinc-900" />
        </button>
        <h2 className="text-[17px] font-bold">النشاط</h2>
        <button className="p-1 text-zinc-400"><Settings size={22} /></button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="divide-y divide-zinc-50">
          {activities.map((act) => (
            <div key={act.id} className="flex items-center gap-4 px-4 py-4 active:bg-zinc-50 transition-colors cursor-pointer">
              <div className="relative shrink-0">
                <img src={act.avatar} className="w-12 h-12 rounded-full object-cover border border-zinc-100" />
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white ${
                  act.type === 'like' ? 'bg-red-500' : act.type === 'comment' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {act.type === 'like' ? <Heart size={8} fill="white" className="text-white" /> : 
                   act.type === 'comment' ? <MessageSquare size={8} fill="white" className="text-white" /> : 
                   <AtSign size={8} className="text-white" />}
                </div>
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[13px] text-zinc-900 leading-tight">
                  <span className="font-black">{act.user}</span>{' '}
                  {act.type === 'like' ? 'أعجب بمنشورك.' : 
                   act.type === 'comment' ? 'علق على منشورك.' : 
                   'ذكرك في منشور.'}
                </p>
                <span className="text-[10px] text-zinc-400 font-bold">{act.time}</span>
              </div>
              <div className="w-12 h-16 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-50">
                <img src={act.postThumb} className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
