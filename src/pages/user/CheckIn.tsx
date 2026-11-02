import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

type CheckInState = 'ready' | 'loading' | 'success' | 'outside_radius' | 'permission_denied';

export default function CheckIn() {
  const { user } = useAuthStore();
  const [state, setState] = useState<CheckInState>('ready');
  const [streakDays] = useState(7);
  const [currentTime, setCurrentTime] = useState('7:23 AM');

  const weekDays = [
    { day: 'M', done: true },
    { day: 'T', done: true },
    { day: 'W', done: true },
    { day: 'T', done: true },
    { day: 'F', done: false, isToday: true },
    { day: 'S', done: false },
    { day: 'S', done: false },
  ];

  const stats = {
    thisWeek: 3,
    thisMonth: 12,
    total: 47,
  };

  const handleCheckIn = () => {
    setState('loading');
    setTimeout(() => {
      setState('success');
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    }, 2000);
  };

  const handleTryAgain = () => {
    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 2000);
  };

  return (
    <div className="bg-[#F4F6F8] font-body text-[#191C1E] min-h-screen">
      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#1A3C5E]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            <span className="text-[#1A3C5E] font-bold text-sm tracking-widest uppercase">The Kinetic Sanctuary • HQ</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1A3C5E] tracking-tight">Gym Check-In</h1>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-[0_4px_12px_rgba(26,60,94,0.05)] border border-[#C3C6CF]/10">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span className="text-sm font-semibold text-[#43474E]">System Online</span>
        </div>
      </header>

      {/* Streak Banner */}
      <section className="mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-[0_12px_40px_rgba(26,60,94,0.06)] border border-white/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[#E87722] text-4xl font-black block">🔥 {streakDays}-Day Streak!</span>
              <p className="text-[#43474E] font-medium">You're on fire! {10 - streakDays} more days for your reward.</p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
              {weekDays.map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[50px]">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                    data.done 
                      ? 'bg-[#E87722] text-white' 
                      : data.isToday 
                        ? 'border-4 border-[#E87722] text-[#E87722] bg-white' 
                        : 'bg-[#F2F4F6] text-[#43474E]/40'
                  }`}>
                    {data.done ? (
                      <span className="material-symbols-outlined">check</span>
                    ) : (
                      <span className="font-black">{data.day}</span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${data.isToday ? 'text-[#E87722]' : 'text-[#43474E]/60'}`}>{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive States Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* STATE 1: READY */}
        {state === 'ready' && (
          <div className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 shadow-md hover:shadow-xl transition-all duration-300 border border-white">
            <button 
              onClick={handleCheckIn}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E87722] to-[#FA8530] flex items-center justify-center shadow-[0_12px_24px_rgba(232,119,34,0.3)] active:scale-95 transition-transform cursor-pointer group"
            >
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
            </button>
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-[#1A3C5E]">Check In</h3>
              <div className="flex items-center gap-2 justify-center text-[#43474E]/70">
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-sm font-medium">Location not yet detected</span>
              </div>
            </div>
          </div>
        )}

        {/* STATE 2: LOADING */}
        {state === 'loading' && (
          <div className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 shadow-md opacity-70">
            <div className="w-24 h-24 rounded-full bg-[#E87722]/50 flex items-center justify-center relative">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="material-symbols-outlined text-white text-4xl">location_searching</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-[#1A3C5E]">Verifying</h3>
              <p className="text-sm font-medium text-[#43474E]">Detecting your location...</p>
            </div>
          </div>
        )}

        {/* STATE 3: SUCCESS */}
        {state === 'success' && (
          <div className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 shadow-md border-2 border-emerald-500/20">
            <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_12px_24px_rgba(16,185,129,0.3)]">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-xl text-[#1A3C5E]">Checked In! ✓</h3>
              <div className="bg-[#F2F4F6] px-4 py-1.5 rounded-full inline-block">
                <span className="text-sm font-bold text-[#1A3C5E]">Today, {currentTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* STATE 4: OUTSIDE RADIUS */}
        {state === 'outside_radius' && (
          <div className="bg-[#FFF8F4] p-6 rounded-3xl col-span-1 md:col-span-2 shadow-md border border-[#E87722]/10 overflow-hidden flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E87722]/11 flex items-center justify-center text-[#E87722]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <div>
                <h3 className="font-black text-2xl text-[#1A3C5E] leading-tight">You're too far from the gym</h3>
                <p className="text-[#43474E] mt-2 max-w-xs">Move within 50 meters of the Sanctuary entrance to verify your session.</p>
              </div>
              <button onClick={handleTryAgain} className="bg-[#1A3C5E] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide">TRY AGAIN</button>
            </div>
            <div className="flex-1 h-48 md:h-auto rounded-2xl relative bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover grayscale opacity-80" alt="Map view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXk_3GChwx9GJb9NmEC57ULJZIcF4zE2xHqK_sZZpl3dvhJtmXKZ6oTz6Kb4lJIJXIKrWRR_zrqY2z7Goi-qETmJC9Sov8yUj2PE7w60MiyzzuWIW-25LfhCkwj7v5jENkQOS316Ic-HXkb-FWmXQIfG5W1Y1xB6l7vIF7_WmfJe7F84sa6VSh0Qc-qNscbsUjgdXNhwNxpXVbsuAcj3ssefgMvJNODeE8OWQR9COuDAozEiqYNe9tlFqOv14XypV2kli68mQGfC0" />
              <div className="absolute inset-0 bg-[#1A3C5E]/10 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE 5: PERMISSION DENIED */}
        {state === 'permission_denied' && (
          <div className="bg-[#FFFEEB] p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 shadow-md border border-yellow-200">
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
              <span className="material-symbols-outlined text-4xl">location_off</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-[#1A3C5E]">Location access required</h3>
              <p className="text-sm text-[#43474E] leading-relaxed px-4">Please enable GPS to allow FitSync Pro to verify your check-in.</p>
            </div>
            <button className="text-yellow-800 font-bold text-sm underline decoration-2 underline-offset-4">Open Settings</button>
          </div>
        )}
      </section>

      {/* Attendance Stats Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-white/50 flex items-center gap-4 group hover:bg-[#F2F4F6] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#F2F4F6] flex items-center justify-center text-[#1A3C5E] group-hover:bg-white transition-colors">
              <span className="material-symbols-outlined">calendar_view_week</span>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#43474E]/60 uppercase tracking-widest block">This Week</span>
              <span className="text-xl font-black text-[#1A3C5E]">{stats.thisWeek} sessions</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-white/50 flex items-center gap-4 group hover:bg-[#F2F4F6] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#F2F4F6] flex items-center justify-center text-[#1A3C5E] group-hover:bg-white transition-colors">
              <span className="material-symbols-outlined">calendar_month</span>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#43474E]/60 uppercase tracking-widest block">This Month</span>
              <span className="text-xl font-black text-[#1A3C5E]">{stats.thisMonth} sessions</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-white/50 flex items-center gap-4 group hover:bg-[#F2F4F6] transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#F2F4F6] flex items-center justify-center text-[#E87722] group-hover:bg-white transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
            <div>
              <span className="text-[10px] font-black text-[#43474E]/60 uppercase tracking-widest block">Total</span>
              <span className="text-xl font-black text-[#1A3C5E]">{stats.total} sessions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Decor */}
      <div className="fixed top-0 right-0 -z-10 pointer-events-none w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px]"></div>
      <div className="fixed bottom-0 left-0 -z-10 pointer-events-none w-[300px] h-[300px] bg-[#E87722]/5 rounded-full blur-[80px]"></div>
    </div>
  );
}
