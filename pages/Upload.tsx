
import React, { useState, useRef } from 'react';
import { Camera, Music, Type, MapPin, ChevronRight, Upload as UploadIcon, X, Play, Check, Sparkles, Loader2 } from 'lucide-react';
import { Post } from '../types';
import { MOCK_USER } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface UploadProps {
  onBack: () => void;
  onUpload: (post: Post) => void;
}

const Upload: React.FC<UploadProps> = ({ onBack, onUpload }) => {
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string>('أحمد مشعل - الصوت الأصلي');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // وظيفة لتوليد صورة مصغرة من الفيديو
  const generateThumbnail = (videoSrc: string): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.crossOrigin = 'anonymous';
      video.currentTime = 1; // التقاط إطار من الثانية الأولى
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      video.onerror = () => resolve(videoSrc); // Fallback
    });
  };

  const handleSmartCaption = async () => {
    if (!description && !preview) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أنت خبير سوشيال ميديا، اقترح وصفاً جذاباً وقصيراً جداً باللغة العربية العامية و3 هاشتاجات لهذا المنشور: ${description || 'فيديو جديد'}`,
      });
      setDescription(response.text || description);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        const type = file.type.startsWith('video') ? 'video' : 'image';
        setFileType(type);
        
        if (type === 'video') {
          const thumb = await generateThumbnail(result);
          setThumbnail(thumb);
        } else {
          setThumbnail(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (!preview) return;
    const currentUser = JSON.parse(localStorage.getItem('tikbook_user') || JSON.stringify(MOCK_USER));
    
    const newPost: Post = {
      id: `p-${Date.now()}`,
      userId: currentUser.id,
      type: fileType || 'video',
      url: preview,
      thumbnail: thumbnail || preview,
      description: description || 'فيديو جديد وحصري! 🔥 #تيك_بوك',
      musicTitle: selectedMusic,
      likes: 0,
      comments: 0,
      shares: 0,
      views: Math.floor(Math.random() * 50), // بداية ببعض المشاهدات للتجميل
      hashtags: ['تيك_بوك', 'جديد']
    };
    onUpload(newPost);
  };

  return (
    <div className="fixed inset-0 bg-black text-white font-sans flex flex-col z-[150]" dir="rtl">
      <div className="p-4 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="p-1"><ChevronRight size={28} /></button>
        <h2 className="text-[17px] font-black tracking-widest text-yellow-500 italic uppercase">إنشاء منشور</h2>
        <button onClick={handlePublish} disabled={!preview} className={`text-sm font-black ${preview ? 'text-[#ff0050]' : 'text-zinc-600'}`}>نشر</button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative aspect-[9/14] w-full rounded-[40px] border-2 border-dashed border-zinc-800 bg-zinc-900/30 flex flex-col items-center justify-center gap-4 group cursor-pointer overflow-hidden"
        >
          {preview ? (
            <div className="w-full h-full relative">
              {fileType === 'video' ? (
                <video src={preview} className="w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <img src={preview} className="w-full h-full object-cover" />
              )}
              <button onClick={(e) => { e.stopPropagation(); setPreview(null); setThumbnail(null); }} className="absolute top-6 left-6 p-2 bg-black/50 rounded-full"><X size={20} /></button>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-2xl shadow-yellow-500/20"><UploadIcon size={32} strokeWidth={3} /></div>
              <p className="font-black text-lg text-zinc-400">اختر فيديو أو صورة</p>
            </>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="video/*,image/*" className="hidden" />

        <div className="space-y-4">
          <div className="bg-zinc-900/50 rounded-3xl p-5 border border-white/5 relative">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصفاً مميزاً..."
              className="w-full bg-transparent border-none focus:ring-0 text-sm h-24 resize-none leading-relaxed"
            />
            <button 
              onClick={handleSmartCaption}
              disabled={isGenerating}
              className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-black active:scale-95 transition-transform"
            >
              {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              وصف ذكي
            </button>
          </div>
          <div className="flex gap-4">
             <button className="flex-1 bg-zinc-900 border border-white/5 py-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2"><Music size={16} /> إضافة صوت</button>
             <button className="flex-1 bg-zinc-900 border border-white/5 py-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2"><MapPin size={16} /> الموقع</button>
          </div>
        </div>
      </div>

      <div className="p-6 pb-12">
        <button 
          onClick={handlePublish}
          disabled={!preview}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${preview ? 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/10' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
        >
          نشر الآن
        </button>
      </div>
    </div>
  );
};

export default Upload;
