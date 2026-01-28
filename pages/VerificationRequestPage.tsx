
import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Star, Send, Camera, Info, CheckCircle, Clock } from 'lucide-react';
import { User, VerificationRequest } from '../types';

interface VerificationProps {
  user: User;
  onBack: () => void;
  onSubmit: (request: Omit<VerificationRequest, 'id' | 'timestamp' | 'status'>) => void;
}

const VerificationRequestPage: React.FC<VerificationProps> = ({ user, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: 'مبدع محتوى',
    reason: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['مبدع محتوى', 'شخصية عامة', 'موسيقي/فنان', 'لاعب محترف', 'أعمال/علامة تجارية'];

  const handleSubmit = () => {
    if (user.verificationStatus === 'pending') return;
    if (!formData.reason.trim()) {
      alert('يرجى كتابة سبب طلب التوثيق.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        category: formData.category,
        reason: formData.reason,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  if (user.isVerified) {
    return (
      <div className="h-screen bg-black text-white p-6 flex flex-col items-center justify-center text-center font-sans">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
           <ShieldCheck size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-black mb-2">حسابك موثق بالفعل!</h1>
        <p className="text-zinc-500 text-sm">أنت الآن عضو موثق في عائلة تيك بوك الفاخرة.</p>
        <button onClick={onBack} className="mt-8 bg-zinc-900 px-8 py-3 rounded-2xl font-bold">العودة</button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#050505] text-white font-sans flex flex-col overflow-hidden" dir="rtl">
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl shrink-0">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-full"><ChevronRight size={24} /></button>
        <h2 className="text-lg font-black tracking-tight">طلب توثيق الحساب</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32">
        <div className="relative bg-gradient-to-br from-blue-900/40 to-black rounded-[40px] p-8 border border-blue-500/20 shadow-2xl overflow-hidden">
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6">
                 <ShieldCheck size={32} className="text-white" />
              </div>
              <h1 className="text-xl font-black mb-2">احصل على الشارة الزرقاء</h1>
              <p className="text-xs text-zinc-400 font-bold leading-relaxed max-w-[250px]">
                ميزة التوثيق تمنح حسابك المصداقية وتبرز حضورك في المنصة.
              </p>
           </div>
        </div>

        {user.verificationStatus === 'pending' ? (
           <div className="bg-zinc-900/50 p-8 rounded-[40px] border border-white/5 text-center">
              <Clock size={40} className="text-yellow-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-black">طلبك قيد المراجعة</h3>
              <p className="text-xs text-zinc-500 mt-2">يتم فحص بياناتك من قبل فريق الإدارة، ستصلك رسالة قريباً.</p>
           </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2 mb-2 block">فئة التوثيق</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border ${formData.category === cat ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 text-zinc-500'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2 mb-2 block">لماذا تطلب التوثيق؟</label>
              <textarea 
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="اشرح لنا نشاطك وأهمية توثيق حسابك..."
                className="w-full bg-zinc-900/50 border border-white/5 rounded-3xl p-5 text-sm h-32 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-3xl flex gap-4 items-start">
               <Info size={20} className="text-blue-500 shrink-0" />
               <p className="text-[10px] text-blue-400 leading-relaxed font-bold">
                  تأكد من أن اسمك الحقيقي وصورتك الشخصية واضحة في ملفك قبل التقديم. الرفض قد يؤدي لعدم إمكانية التقديم مرة أخرى لمدة 30 يوماً.
               </p>
            </div>
          </div>
        )}
      </div>

      {user.verificationStatus !== 'pending' && (
        <div className="p-6 pb-12 bg-gradient-to-t from-black via-black/80 to-transparent fixed bottom-0 left-0 right-0">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? <CheckCircle className="animate-spin" /> : <Send size={20} />} إرسال الطلب للمراجعة
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationRequestPage;
