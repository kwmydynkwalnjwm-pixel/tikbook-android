
import React from 'react';
import { Hexagon, Triangle, Diamond } from 'lucide-react';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level, size = 'md', showLabel = false }) => {
  const getLevelConfig = (lvl: number) => {
    if (lvl >= 50) return { color: 'from-yellow-400 via-pink-500 to-yellow-600', icon: 'VI', shape: 'Icosahedron', label: 'المستوى 50+' };
    if (lvl >= 40) return { color: 'from-yellow-400 to-purple-600', icon: 'V', shape: 'Star', label: 'المستوى 40 - المستوى 49' };
    if (lvl >= 30) return { color: 'from-purple-500 to-yellow-500', icon: 'IV', shape: 'Diamond', label: 'المستوى 30 - المستوى 39' };
    if (lvl >= 20) return { color: 'from-purple-600 to-blue-500', icon: 'III', shape: 'Diamond', label: 'المستوى 20 - المستوى 29' };
    if (lvl >= 10) return { color: 'from-blue-600 to-purple-400', icon: 'II', shape: 'Octahedron', label: 'المستوى 10 - المستوى 19' };
    return { color: 'from-blue-400 to-blue-600', icon: 'I', shape: 'Triangle', label: 'المستوى 1 - المستوى 9' };
  };

  const config = getLevelConfig(level);
  
  const sizeClasses = {
    sm: 'w-6 h-4 text-[7px]',
    md: 'w-10 h-6 text-[10px]',
    lg: 'w-16 h-10 text-[14px]'
  };

  const renderIcon = () => {
    switch (config.shape) {
       case 'Triangle': return <Triangle size={8} fill="currentColor" className="opacity-80" />;
       case 'Octahedron': return <Diamond size={8} fill="currentColor" className="opacity-80" />;
       case 'Diamond': return <Diamond size={8} fill="currentColor" className="opacity-80" />;
       default: return <Diamond size={8} fill="currentColor" className="opacity-80" />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${sizeClasses[size]} bg-gradient-to-r ${config.color} rounded-md flex items-center justify-center gap-1 px-1.5 shadow-lg border border-white/20 text-white font-black italic`}>
         {renderIcon()}
         <span>{level}</span>
      </div>
      {showLabel && <span className="text-[10px] text-zinc-400 font-bold">{config.label}</span>}
    </div>
  );
};

export default LevelBadge;
