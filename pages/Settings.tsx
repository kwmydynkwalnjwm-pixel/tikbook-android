import React, { useState } from 'react';
import { 
  ChevronLeft, Video, Hourglass, Home, User, Lock, Shield, BarChart3, 
  Share2, Bell, Radio, Activity, Users, Megaphone, Play, Moon, 
  Languages, Accessibility, CloudDownload, Trash2, Droplets, Grid, 
  Headphones, Info, LogOut, RefreshCcw, ArrowRight, Check, ShieldCheck,
  EyeOff, MessageSquare, Globe, Smartphone, Key, History, Download, Coins, UserPlus
} from 'lucide-react';
import { AppRoute } from '../types';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (route: AppRoute) => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, onLogout, onNavigate }) => {
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    private_account: false,
    save_data: true,
    notifications: true,
    dark_mode: false
  });

  const toggleHandler = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Fix: Explicitly type sections as any[] to avoid complex union mismatch errors in the map function on line 287
  const sections: any[] = [
    {
      items: [
        { id: 'store', icon: <Coins className="text-yellow-500" size={20} />, title: 'شراء العملات', action: () => onNavigate(AppRoute.STORE) },
        { id: 'referral', icon: <UserPlus className="text-cyan-500" size={20} />, title: 'إحالة الأصدقاء', action: () => onNavigate(AppRoute.REFERRAL) },
        { id: 'verification', icon: <ShieldCheck className="text-blue-500" size={20} />, title: 'طلب توثيق الحساب', action: () => onNavigate(AppRoute.VERIFICATION) },
      ]
    },
    {
      title: 'الحساب',
      items: [
        { id: 'account', icon: <User className="text-zinc-500" size={20} />, title: 'الحساب' },
        { id: 'privacy', icon: <Lock className="text-zinc-500" size={20} />, title: 'الخصوصية' },
        { id: 'security', icon: <Shield className="text-zinc-500" size={20} />, title: 'الأمان والأذونات' },
        { id: 'analytics', icon: <BarChart3 className="text-zinc-500" size={20} />, title: 'التحليلات' },
        { id: 'share_profile', icon: <Share2 className="text-zinc-500" size={20} />, title: 'مشاركة الملف الشخصي' },
      ]
    },
    {
      title: 'المحتوى والعرض',
      items: [
        { id: 'notifications', icon: <Bell className="text-zinc-500" size={20} />, title: 'الإشعارات' },
        { id: 'live_settings', icon: <Radio className="text-zinc-500" size={20} />, title: 'LIVE' },
        { id: 'activity_center', icon: <Activity className="text-zinc-500" size={20} />, title: 'مركز الأنشطة' },
        { id: 'audience_control', icon: <Users className="text-zinc-500" size={20} />, title: 'عناصر التحكم في الجمهور' },
        { id: 'ads', icon: <Megaphone className="text-zinc-500" size={20} />, title: 'الإعلانات' },
        { id: 'playback', icon: <Play className="text-zinc-500" size={20} />, title: 'تشغيل' },
        { id: 'display', icon: <Moon className="text-zinc-500" size={20} />, title: 'العرض' },
        { id: 'language', icon: <Languages className="text-zinc-500" size={20} />, title: 'اللغة' },
        { id: 'accessibility', icon: <Accessibility className="text-zinc-500" size={20} />, title: 'صلاحية الوصول', badge: true },
      ]
    },
    {
      title: 'ذاكرة التخزين المؤقت والبيانات',
      items: [
        { id: 'offline_videos', icon: <CloudDownload className="text-zinc-500" size={20} />, title: 'فيديوهات دون اتصال بالإنترنت' },
        { id: 'clear_space', icon: <Trash2 className="text-zinc-500" size={20} />, title: 'تحرير المساحة' },
        { id: 'data_saver', icon: <Droplets className="text-zinc-500" size={20} />, title: 'توفير البيانات' },
        { id: 'background', icon: <Grid className="text-zinc-500" size={20} />, title: 'الخلفية' },
      ]
    },
    {
      title: 'الدعم وحول التطبيق',
      items: [
        { id: 'help_center', icon: <Headphones className="text-zinc-500" size={20} />, title: 'مركز المساعدة' },
        { id: 'privacy_center', icon: <Lock className="text-zinc-500" size={20} />, title: 'مركز الخصوصية' },
        { id: 'terms', icon: <Info className="text-zinc-500" size={20} />, title: 'الشروط والسياسات' },
      ]
    },
    {
      title: 'تسجيل الدخول',
      items: [
        { id: 'switch_account', icon: <RefreshCcw className="text-zinc-500" size={20} />, title: 'تبديل الحساب', extra: <img src="https://picsum.photos/30/30?random=1" className="w-6 h-6 rounded-full border border-zinc-200" /> },
        { id: 'logout', icon: <LogOut className="text-red-500" size={20} />, title: 'تسجيل الخروج', action: onLogout },
      ]
    }
  ];

  const CustomSwitch = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-green-500 shadow-inner' : 'bg-zinc-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${active ? 'right-7' : 'right-1'}`}></div>
    </button>
  );

  const renderSubPage = () => {
    switch (activeSubPage) {
      case 'account':
        return (
          <div className="animate-fade-in bg-white h-full pb-24">
            <div className="p-6 text-center border-b border-zinc-50">
               <div className="w-20 h-20 bg-zinc-100 rounded-full mx-auto mb-4 flex items-center justify-center relative">
                  <User size={40} className="text-zinc-300" />
                  <button className="absolute bottom-0 right-0 bg-yellow-500 text-black p-1.5 rounded-full border-2 border-white shadow-sm"><Smartphone size={14} /></button>
               </div>
               <h3 className="font-bold">معلومات الحساب</h3>
               <p className="text-xs text-zinc-400 mt-1">ahmed_dev@example.com</p>
            </div>
            <div className="mt-4">
              {[
                { label: 'رقم الهاتف', value: '+966 50 *** ****' },
                { label: 'البريد الإلكتروني', value: 'ahm***@gmail.com' },
                { label: 'تاريخ الميلاد', value: '15 أكتوبر 1995' },
                { label: 'المنطقة', value: 'المملكة العربية السعودية' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-zinc-50 active:bg-zinc-50">
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">{item.value}</span>
                    <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 px-6 pb-10">
              <button className="w-full py-4 text-red-500 font-bold border border-red-100 rounded-2xl active:scale-95 transition-transform">تعطيل أو حذف الحساب</button>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="animate-fade-in bg-white h-full pb-20">
            <h3 className="px-6 py-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">اكتشاف الحساب</h3>
            <div className="bg-white border-y border-zinc-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50">
                <div className="text-right">
                  <p className="text-sm font-bold">حساب خاص</p>
                  <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">عندما يكون حسابك خاصاً، يمكن فقط للمتابعين الذين وافقت عليهم مشاهدة فيديوهاتك وبثك المباشر.</p>
                </div>
                <CustomSwitch active={toggles.private_account} onToggle={() => toggleHandler('private_account')} />
              </div>
            </div>

            <h3 className="px-6 py-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-4">التفاعلات</h3>
            <div className="bg-white border-y border-zinc-100">
              {[
                { icon: <MessageSquare size={18} />, title: 'التعليقات', value: 'الجميع' },
                { icon: <Users size={18} />, title: 'المنشن والإشارات', value: 'الأصدقاء' },
                { icon: <Globe size={18} />, title: 'الرسائل المباشرة', value: 'الجميع' },
                { icon: <Video size={18} />, title: 'الدويتو', value: 'مغلق' },
                { icon: <Download size={18} />, title: 'التنزيلات', value: 'مفعل' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-zinc-50 active:bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-400">{item.icon}</span>
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">{item.value}</span>
                    <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="animate-fade-in bg-white h-full pb-20">
            <div className="p-8 bg-green-50/50 flex flex-col items-center border-b border-green-100">
               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-green-500/20">
                  <ShieldCheck size={32} />
               </div>
               <h3 className="font-bold text-green-800">حسابك آمن</h3>
               <p className="text-xs text-green-600 mt-1">تم إجراء آخر فحص أمان منذ ساعتين</p>
            </div>
            <div className="mt-4">
              {[
                { icon: <Smartphone size={20} />, title: 'تنبيهات الأمان', badge: false },
                { icon: <Smartphone size={20} />, title: 'إدارة الأجهزة', extra: '3 أجهزة' },
                { icon: <Key size={20} />, title: 'التحقق بخطوتين', extra: 'مفعل' },
                { icon: <History size={20} />, title: 'سجل النشاطات', badge: false },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-zinc-50 active:bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-400">{item.icon}</span>
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.extra && <span className="text-xs text-zinc-400">{item.extra}</span>}
                    <ChevronLeft size={16} className="text-zinc-300 rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'clear_space':
        return (
          <div className="animate-fade-in bg-white h-full p-6 text-center pb-20">
            <div className="relative w-48 h-48 mx-auto mb-10">
               <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f4f4f5" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#eab308" strokeWidth="8" strokeDasharray="210 283" strokeLinecap="round" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">74%</span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">المساحة المستخدمة</span>
               </div>
            </div>
            <div className="space-y-4 text-right mb-10">
               <div className="bg-zinc-50 p-5 rounded-3xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">ذاكرة التخزين المؤقت</h4>
                    <p className="text-[10px] text-zinc-400 mt-1">مسح الصور والبيانات المؤقتة لتسريع التطبيق</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-black">240.5 MB</span>
                    <button onClick={() => alert('تم المسح بنجاح')} className="text-xs bg-white border border-zinc-200 px-4 py-1.5 rounded-full font-bold active:scale-95">مسح</button>
                  </div>
               </div>
               <div className="bg-zinc-50 p-5 rounded-3xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">التنزيلات</h4>
                    <p className="text-[10px] text-zinc-400 mt-1">الفيديوهات والمسودات التي قمت بتحميلها</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-black">1.2 GB</span>
                    <button className="text-xs bg-white border border-zinc-200 px-4 py-1.5 rounded-full font-bold text-red-500 active:scale-95">إدارة</button>
                  </div>
               </div>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed px-4">تتضمن ذاكرة التخزين المؤقت الملفات المؤقتة التي يمكن حذفها دون التأثير على بياناتك الأساسية.</p>
          </div>
        );

      case 'language':
        return (
          <div className="animate-fade-in bg-white h-full pb-20">
            <h3 className="px-6 py-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">لغة التطبيق</h3>
            <div className="bg-white border-y border-zinc-100">
               {['العربية (العالم العربي)', 'English (US)', 'Français (France)', 'Türkçe (Türkiye)', 'Deutsch (Deutschland)'].map(lang => (
                 <button key={lang} className="w-full flex justify-between items-center px-6 py-5 border-b border-zinc-50 last:border-none active:bg-zinc-50">
                    <span className="text-sm font-medium">{lang}</span>
                    {lang.includes('العربية') && <div className="bg-yellow-500 text-black p-1 rounded-full"><Check size={14} strokeWidth={4} /></div>}
                 </button>
               ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-10 text-center animate-fade-in bg-white min-h-[400px]">
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
              <Activity size={40} className="text-zinc-200" />
            </div>
            <h3 className="text-lg font-bold mb-2">هذا القسم قيد التجهيز</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">نحن نعمل جاهدين لتوفير أفضل تجربة مستخدم. سيتم تفعيل هذا القسم في التحديث القادم للتطبيق.</p>
            <button 
              onClick={() => setActiveSubPage(null)}
              className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform"
            >
              العودة للإعدادات
            </button>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-[#F8F8F8] text-black font-sans flex flex-col overflow-hidden" dir="rtl">
      {/* Header - Classy White Style */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-zinc-100 sticky top-0 z-50 shrink-0">
        <button 
          onClick={activeSubPage ? () => setActiveSubPage(null) : onBack} 
          className="p-2 hover:bg-zinc-50 rounded-full transition-colors"
        >
          <ArrowRight size={24} className="rotate-0" />
        </button>
        <h2 className="text-lg font-black tracking-tight">
          {/* Fix: Cast flattened items and search predicate to 'any' to avoid type mismatches on diverse settings item properties */}
          {activeSubPage ? (sections.flatMap(s => s.items) as any[]).find((i: any) => i.id === activeSubPage)?.title : 'الإعدادات والخصوصية'}
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Main Content Area - Fixed Scrolling */}
      <div className="flex-1 overflow-y-auto no-scrollbar touch-pan-y">
        <div className="pb-24">
          {activeSubPage ? (
            renderSubPage()
          ) : (
            <div className="animate-fade-in">
              {sections.map((section, idx) => (
                <div key={idx} className="mt-4">
                  {section.title && (
                    <h3 className="px-6 py-2 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{section.title}</h3>
                  )}
                  <div className="bg-white border-y border-zinc-100">
                    {section.items.map((item: any) => (
                      <button 
                        key={item.id} 
                        onClick={item.action ? item.action : () => setActiveSubPage(item.id)}
                        className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-50 last:border-none active:bg-zinc-50 transition-colors group text-right"
                      >
                        <div className="flex items-center gap-4">
                          <span className="group-active:scale-110 transition-transform opacity-70 shrink-0">{item.icon}</span>
                          <span className={`text-sm font-medium ${item.id === 'logout' ? 'text-red-500' : 'text-zinc-800'}`}>{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                          {item.extra && item.extra}
                          <ChevronLeft size={18} className="text-zinc-200 rotate-180 shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="p-12 text-center">
                <p className="text-[10px] text-zinc-300 font-bold tracking-widest uppercase mb-1">تيك بوك - الإصدار v3.2.0</p>
                <p className="text-[8px] text-zinc-200">صنع بكل فخر لمحبي الإبداع</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Settings;