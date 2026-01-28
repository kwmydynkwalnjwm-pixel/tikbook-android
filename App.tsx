import React, { useState, useEffect } from 'react';
import { Home, Radio, Plus, Inbox, User, ShieldCheck, MessageSquare, UserCircle, ChevronRight, Users, Heart, Archive, Bell, Info } from 'lucide-react';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Admin from './pages/Admin';
import LiveRoom from './pages/LiveRoom';
import LiveList from './pages/LiveList';
import ChatList from './pages/ChatList';
import ChatDetail from './pages/ChatDetail';
import Explore from './pages/Explore';
import Upload from './pages/Upload';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import StoryUpload from './pages/StoryUpload';
import StoryView from './pages/StoryView';
import Earnings from './pages/Earnings';
import Referral from './pages/Referral';
import Login from './pages/Login';
import Followers from './pages/Followers';
import Activity from './pages/Activity';
import SystemNotifs from './pages/SystemNotifs';
import VerificationRequestPage from './pages/VerificationRequestPage';
import SupporterLevel from './pages/SupporterLevel';
import { AppRoute, Post, User as UserType, Gift, SystemNotification, Story, VerificationRequest, WithdrawalRequest } from './types';
import { MOCK_POSTS, MOCK_USER, MOCK_CHATS } from './constants';

const SUPER_ADMIN_EMAIL = "ssocialmediaservice573@gmail.com"; 
const SUPER_ADMIN_PASS = "admin123"; 

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    const saved = localStorage.getItem('tikbook_session');
    return saved ? AppRoute.HOME : AppRoute.LOGIN;
  });
  
  const [allUsers, setAllUsers] = useState<(UserType & { password?: string })[]>(() => {
    const saved = localStorage.getItem('tikbook_all_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<UserType>(() => {
    try {
      const saved = localStorage.getItem('tikbook_user');
      return saved ? JSON.parse(saved) : { ...MOCK_USER, role: 'user', status: 'active', earnings: 0, coins: 0, isVerified: false, supporterLevel: 1, supporterExp: 0 };
    } catch (e) {
      return { ...MOCK_USER, role: 'user', status: 'active', earnings: 0, coins: 0, isVerified: false, supporterLevel: 1, supporterExp: 0 };
    }
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('tikbook_posts');
      return saved ? JSON.parse(saved) : MOCK_POSTS.map(p => ({ ...p, privacy: 'public' }));
    } catch (e) {
      return MOCK_POSTS;
    }
  });

  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem('tikbook_stories');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    try {
      const saved = localStorage.getItem('tikbook_notifications');
      return saved ? JSON.parse(saved) : [
        { id: '1', userId: 'all', title: 'مرحباً بك!', description: 'استمتع بأفضل تجربة تواصل في تيك بوك.', timestamp: new Date().toISOString(), type: 'system' }
      ];
    } catch (e) {
      return [];
    }
  });

  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(() => {
    const saved = localStorage.getItem('tikbook_verification_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('tikbook_withdrawal_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);

  useEffect(() => { 
    localStorage.setItem('tikbook_user', JSON.stringify(currentUser)); 
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...currentUser } : u));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('tikbook_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => { localStorage.setItem('tikbook_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('tikbook_stories', JSON.stringify(stories)); }, [stories]);
  useEffect(() => { localStorage.setItem('tikbook_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('tikbook_verification_requests', JSON.stringify(verificationRequests)); }, [verificationRequests]);
  useEffect(() => { localStorage.setItem('tikbook_withdrawal_requests', JSON.stringify(withdrawalRequests)); }, [withdrawalRequests]);

  const handleLogin = (formData: any, mode: 'login' | 'signup') => {
    if (mode === 'login') {
      if (formData.identifier === SUPER_ADMIN_EMAIL) {
        if (formData.password === SUPER_ADMIN_PASS) {
          const existingAdmin = allUsers.find(u => u.email === SUPER_ADMIN_EMAIL);
          const adminUser: UserType = existingAdmin || { 
            ...MOCK_USER, 
            id: 'admin-root', 
            email: SUPER_ADMIN_EMAIL, 
            role: 'admin', 
            name: 'المسؤول الرئيسي', 
            username: 'admin_root', 
            coins: 1000000,
            earnings: 0,
            isVerified: true,
            supporterLevel: 50,
            supporterExp: 1000000
          };
          if (!existingAdmin) setAllUsers(prev => [...prev, { ...adminUser, password: SUPER_ADMIN_PASS }]);
          setCurrentUser(adminUser);
          localStorage.setItem('tikbook_session', 'active');
          setCurrentRoute(AppRoute.HOME);
          return;
        } else {
          alert('كلمة المرور للمسؤول غير صحيحة.');
          return;
        }
      }

      const existingUser = allUsers.find(u => 
        (u.email === formData.identifier || u.username === formData.identifier) && 
        u.password === formData.password
      );

      if (existingUser) {
        setCurrentUser(existingUser);
        localStorage.setItem('tikbook_session', 'active');
        setCurrentRoute(AppRoute.HOME);
      } else {
        alert('بيانات الدخول غير صحيحة.');
      }
    } else {
      const userExists = allUsers.some(u => u.email === formData.email || u.username === formData.username);
      if (userExists) {
        alert('اسم المستخدم أو البريد الإلكتروني مسجل بالفعل.');
        return;
      }

      const isSuperAdmin = formData.email === SUPER_ADMIN_EMAIL;
      const newUser: UserType & { password?: string } = {
        id: `u-${Date.now()}`,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatar: 'https://picsum.photos/200/200?random=' + Math.floor(Math.random() * 100),
        bio: 'مرحباً بك في عالم تيك بوك الفاخر 👑',
        followers: 0,
        following: 0,
        likes: 0,
        coins: formData.referralCode && formData.referralCode.trim().length > 0 ? 10 : 0,
        earnings: 0, 
        supporterLevel: isSuperAdmin ? 50 : 1,
        supporterExp: 0,
        role: isSuperAdmin ? 'admin' : 'user',
        isVerified: isSuperAdmin, 
        status: 'active',
        referralCode: `TB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
      };

      setAllUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      localStorage.setItem('tikbook_session', 'active');
      setCurrentRoute(AppRoute.HOME);
    }
  };

  const handleWithdrawRequest = (data: Omit<WithdrawalRequest, 'id' | 'timestamp' | 'status'>) => {
    const newRequest: WithdrawalRequest = {
      ...data,
      id: `wr-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setWithdrawalRequests(prev => [...prev, newRequest]);
    setCurrentUser(prev => ({ ...prev, earnings: (prev.earnings || 0) - data.amount }));
  };

  const handleWithdrawAction = (requestId: string, status: 'completed' | 'rejected') => {
    const request = withdrawalRequests.find(r => r.id === requestId);
    if (!request) return;
    setWithdrawalRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
    if (status === 'completed') {
      const notif: SystemNotification = {
        id: `n-wr-${Date.now()}`,
        userId: request.userId,
        title: 'تم تحويل أرباحك بنجاح! ✅',
        description: `تم إرسال مبلغ ${request.amount} ج.م إلى محفظتك فودافون كاش بنجاح. شكراً لاستخدامك تيك بوك!`,
        timestamp: new Date().toISOString(),
        type: 'reward'
      };
      setNotifications(prev => [notif, ...prev]);
    } else {
      setAllUsers(prev => prev.map(u => u.id === request.userId ? { ...u, earnings: (u.earnings || 0) + request.amount } : u));
      if (request.userId === currentUser.id) {
        setCurrentUser(prev => ({ ...prev, earnings: (prev.earnings || 0) + request.amount }));
      }
      alert('تم رفض طلب السحب وإعادة المبلغ لرصيد المستخدم.');
    }
  };

  const handleVerificationStatus = (requestId: string, status: 'approved' | 'rejected', reason?: string) => {
    const request = verificationRequests.find(r => r.id === requestId);
    if (!request) return;
    setVerificationRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
    const updates: Partial<UserType> = { isVerified: status === 'approved', verificationStatus: status === 'approved' ? 'none' : 'rejected' };
    setAllUsers(prev => prev.map(u => u.id === request.userId ? { ...u, ...updates } : u));
    if (request.userId === currentUser.id) setCurrentUser(prev => ({ ...prev, ...updates }));
    const notif: SystemNotification = {
      id: `n-vr-${Date.now()}`,
      userId: request.userId,
      title: status === 'approved' ? 'تهانينا! تم توثيق حسابك 🎉' : 'عذراً، تم رفض طلب التوثيق',
      description: status === 'approved' ? 'لقد تمت الموافقة على طلبك وأصبح حسابك يحمل الشارة الزرقاء.' : `السبب: ${reason || 'عدم استيفاء الشروط'}.`,
      timestamp: new Date().toISOString(),
      type: status === 'approved' ? 'reward' : 'security'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const navigateToProfile = (userId?: string | null) => {
    setSelectedProfileId(userId || null);
    setCurrentRoute(AppRoute.PROFILE);
  };

  const handleUpdateUser = (userId: string, updates: Partial<UserType>) => {
    if (userId === currentUser.id) setCurrentUser(prev => ({ ...prev, ...updates }));
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
  };

  const handleDeletePost = (postId: string) => { if (confirm('حذف الفيديو؟')) setPosts(prev => prev.filter(p => p.id !== postId)); };

  const renderPage = () => {
    if (currentUser.status === 'blocked') {
      return (
        <div className="h-screen bg-black flex flex-col items-center justify-center p-10 text-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6 text-white font-black">X</div>
          <h1 className="text-2xl font-black text-white">تم حظر حسابك</h1>
          <p className="text-zinc-500 mt-2">يرجى التواصل مع الدعم الفني.</p>
        </div>
      );
    }

    switch (currentRoute) {
      case AppRoute.LOGIN: return <Login onLogin={handleLogin} />;
      case AppRoute.HOME: return <Feed posts={posts || []} onProfileNavigate={navigateToProfile} onDeletePost={handleDeletePost} />;
      case AppRoute.CHAT: return <ChatList notifications={notifications} currentUser={currentUser} stories={stories} onChatSelect={(id) => { setSelectedChatId(id); setCurrentRoute(AppRoute.CHAT_DETAIL); }} onStorySelect={(story) => { setViewingStory(story); setCurrentRoute(AppRoute.STORY_VIEW); }} onNavigate={setCurrentRoute} />;
      case AppRoute.CHAT_DETAIL: return <ChatDetail chatId={selectedChatId || 'dummy'} onBack={() => setCurrentRoute(AppRoute.CHAT)} onProfileClick={navigateToProfile} />;
      case AppRoute.STORY_UPLOAD: return <StoryUpload currentUser={currentUser} onBack={() => setCurrentRoute(AppRoute.CHAT)} onUpload={(newStory) => { setStories(prev => [newStory, ...prev]); setCurrentRoute(AppRoute.CHAT); }} />;
      case AppRoute.STORY_VIEW: return <StoryView story={viewingStory} onBack={() => setCurrentRoute(AppRoute.CHAT)} />;
      case AppRoute.FOLLOWERS: return <Followers onBack={() => setCurrentRoute(AppRoute.CHAT)} onProfileClick={navigateToProfile} />;
      case AppRoute.ACTIVITY: return <Activity onBack={() => setCurrentRoute(AppRoute.CHAT)} />;
      case AppRoute.SYSTEM_NOTIFS: return <SystemNotifs notifications={notifications} onBack={() => setCurrentRoute(AppRoute.CHAT)} />;
      case AppRoute.PROFILE: return <Profile posts={posts || []} userId={selectedProfileId} currentUser={currentUser} onBack={() => setCurrentRoute(AppRoute.HOME)} onNavigate={setCurrentRoute} onDeletePost={handleDeletePost} />;
      case AppRoute.EDIT_PROFILE: return <EditProfile onBack={() => setCurrentRoute(AppRoute.PROFILE)} currentUser={currentUser} onUpdateUser={handleUpdateUser} />;
      case AppRoute.EARNINGS: return <Earnings user={currentUser} onBack={() => setCurrentRoute(AppRoute.PROFILE)} onWithdrawRequest={handleWithdrawRequest} />;
      case AppRoute.STORE: return <Wallet onBack={() => setCurrentRoute(AppRoute.PROFILE)} onChargeSuccess={(amt) => setCurrentUser(p => ({ ...p, coins: p.coins + amt }))} />;
      case AppRoute.LIVE: return <LiveList onRoomSelect={(id) => { setSelectedRoomId(id); setCurrentRoute(AppRoute.ROOM_DETAIL); }} onProfileClick={navigateToProfile} />;
      case AppRoute.ROOM_DETAIL: return selectedRoomId ? <LiveRoom roomId={selectedRoomId} onExit={() => setCurrentRoute(AppRoute.LIVE)} onProfileClick={navigateToProfile} /> : null;
      case AppRoute.SETTINGS: return <Settings onBack={() => setCurrentRoute(AppRoute.PROFILE)} onLogout={() => { localStorage.removeItem('tikbook_session'); setCurrentRoute(AppRoute.LOGIN); }} onNavigate={setCurrentRoute} />;
      case AppRoute.UPLOAD: return <Upload onBack={() => setCurrentRoute(AppRoute.HOME)} onUpload={(p) => { setPosts(prev => [p, ...prev]); setCurrentRoute(AppRoute.HOME); }} />;
      case AppRoute.REFERRAL: return <Referral user={currentUser} onBack={() => setCurrentRoute(AppRoute.SETTINGS)} />;
      case AppRoute.VERIFICATION: return <VerificationRequestPage user={currentUser} onBack={() => setCurrentRoute(AppRoute.SETTINGS)} onSubmit={(d) => setVerificationRequests(p => [...p, {...d, id: Date.now().toString(), timestamp: new Date().toISOString(), status: 'pending'}])} />;
      case AppRoute.ADMIN: return <Admin users={allUsers} posts={posts} verificationRequests={verificationRequests} withdrawalRequests={withdrawalRequests} onUserUpdate={handleUpdateUser} onUserDelete={(id) => setAllUsers(p => p.filter(u => u.id !== id))} onSendNotif={(n) => setNotifications(prev => [{...n, id: Date.now().toString(), timestamp: new Date().toISOString()}, ...prev])} onDeletePost={handleDeletePost} onHandleVerification={handleVerificationStatus} onHandleWithdrawal={handleWithdrawAction} onBack={() => setCurrentRoute(AppRoute.PROFILE)} />;
      /* Adding missing onNavigate prop to SupporterLevel */
      case AppRoute.SUPPORTER_LEVEL: return <SupporterLevel user={currentUser} onBack={() => setCurrentRoute(AppRoute.PROFILE)} onNavigate={setCurrentRoute} />;
      default: return <Feed posts={posts || []} onProfileNavigate={navigateToProfile} />;
    }
  };

  const isNavVisible = !['chat-detail', 'room-detail', 'upload', 'settings', 'story-upload', 'story-view', 'followers', 'activity', 'system-notifs', 'earnings', 'referral', 'store', 'login', 'admin', 'edit-profile', 'verification', 'supporter-level'].includes(currentRoute);

  return (
    <div className="max-w-md mx-auto h-screen bg-black shadow-2xl relative overflow-hidden font-sans border-x border-white/5" dir="rtl">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {renderPage()}
      </div>
      {isNavVisible && (
        <nav className={`absolute bottom-0 left-0 right-0 h-[84px] flex items-center justify-around px-2 z-[100] border-t pb-2 transition-colors duration-300 ${currentRoute === AppRoute.HOME ? 'bg-transparent border-transparent' : 'bg-white border-zinc-100'}`}>
          <button onClick={() => setCurrentRoute(AppRoute.HOME)} className={`flex flex-col items-center gap-1 transition-colors ${currentRoute === AppRoute.HOME ? 'text-white' : 'text-zinc-400'}`}>
            <Home size={26} strokeWidth={currentRoute === AppRoute.HOME ? 2.5 : 2} />
            <span className="text-[10px] font-bold">الرئيسية</span>
          </button>
          <button onClick={() => setCurrentRoute(AppRoute.LIVE)} className={`flex flex-col items-center gap-1 transition-colors ${currentRoute === AppRoute.LIVE ? 'text-black' : 'text-zinc-400'}`}>
            <Radio size={26} />
            <span className="text-[10px] font-bold">غرفة البث</span>
          </button>
          <button onClick={() => setCurrentRoute(AppRoute.UPLOAD)} className="mx-1 active:scale-95 transition-transform"><div className={`p-2 rounded-xl transition-colors ${currentRoute === AppRoute.HOME ? 'bg-white text-black' : 'bg-black text-white'}`}><Plus size={24} strokeWidth={3} /></div></button>
          <button onClick={() => setCurrentRoute(AppRoute.CHAT)} className={`flex flex-col items-center gap-1 relative transition-colors ${currentRoute === AppRoute.CHAT ? 'text-black' : 'text-zinc-400'}`}>
            <div className="relative"><MessageSquare size={26} fill={currentRoute === AppRoute.CHAT ? "currentColor" : "none"} /><span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-white">1</span></div>
            <span className="text-[10px] font-bold">صندوق الوارد</span>
          </button>
          <button onClick={() => navigateToProfile()} className={`flex flex-col items-center gap-1 transition-colors ${currentRoute === AppRoute.PROFILE ? 'text-black' : 'text-zinc-400'}`}><UserCircle size={26} /><span className="text-[10px] font-bold">الملف الشخصي</span></button>
        </nav>
      )}
    </div>
  );
};

export default App;