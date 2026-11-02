import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { mockUsers, mockAdmin } from '../../data/mock';

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'member' | 'pt' | 'admin'>('member');
  const [email, setEmail] = useState('alex.jordan@performance.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('Incorrect email or password');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginAsUser, loginAsAdmin } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (selectedRole === 'admin') {
        loginAsAdmin(mockAdmin);
        navigate('/admin');
      } else {
        // pick a representative user per role
        let user = mockUsers.find(u => u.planType === 'personal_training') || mockUsers[0];
        if (selectedRole === 'member') {
          // prefer a normal member (non-PT) if available
          const normal = mockUsers.find(u => u.planType === 'normal');
          user = normal || user;
          loginAsUser(user);
          navigate('/dashboard');
        } else if (selectedRole === 'pt') {
          // PT route
          user = mockUsers.find(u => u.planType === 'personal_training') || mockUsers[0];
          loginAsUser(user);
          navigate('/plan/workout');
        }
      }
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
        {/* LEFT PANEL: Brand & Visuals */}
      <section className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#1A3C5E] to-[#0F2942] p-12 lg:p-20 flex-col justify-between relative overflow-hidden">
        {/* Background Abstract Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 w-full h-full pointer-events-none">
          <svg className="w-full h-full scale-150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.7,88.7,-0.9C86.9,13.8,78.2,27.7,69,40.1C59.8,52.5,50,63.4,38.1,71.1C26.1,78.8,13.1,83.3,-0.6,84.4C-14.3,85.5,-28.7,83.2,-41.6,76C-54.6,68.8,-66.2,56.7,-74.3,42.9C-82.4,29.1,-87,14.5,-86.3,0.4C-85.6,-13.7,-79.6,-27.4,-70.7,-39.8C-61.8,-52.2,-49.9,-63.3,-36.4,-70.6C-22.9,-77.9,-7.7,-81.4,7.4,-82.7C22.4,-84,31.3,-83.6,44.7,-76.4Z" fill="white" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[#1A3C5E] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
            </div>
            <span className="text-white text-2xl font-black tracking-tighter">FitSync Pro</span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Track. Progress. <br /><span className="text-[#fa8530]">Perform.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-md font-medium leading-relaxed">
            Your gym journey, all in one place. Experience high-end tracking and personalized insights designed for peak performance.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <div className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">location_on</span> Geo Check-In
          </div>
          <div className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">leaderboard</span> Progress Tracking
          </div>
          <div className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span> Personalised Plans
          </div>
        </div>
      </section>

        {/* RIGHT PANEL: Login Form */}
        <section className="w-full lg:w-2/5 flex flex-col items-center justify-center bg-white/50 relative px-6 py-12">
          {/* Role selector */}
          <div className="mb-4 w-full max-w-md flex gap-3 justify-center">
            {[
              { id: 'member', label: 'Member' },
              { id: 'pt', label: 'PT' },
              { id: 'admin', label: 'Admin' },
            ].map(r => {
              const active = selectedRole === r.id;
              const base = 'px-4 py-2 rounded-full text-xs font-bold transition-colors';
              const cls = active
                ? base + ' bg-[#eef6ff] text-[#1A3C5E] border border-[#1A3C5E] shadow-sm'
                : base + ' bg-white text-slate-700 border border-slate-200 hover:bg-slate-50';
              return (
                <button key={r.id} onClick={() => setSelectedRole(r.id as any)} className={cls}>
                  {r.label}
                </button>
              );
            })}
          </div>
          {/* existing login card will render below this patch keeps structure intact */}
        </section>
      <section className="w-full md:w-1/2 bg-[#f8f9fb] flex flex-col items-center justify-center p-6 lg:p-24 min-h-screen">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-[#1A3C5E] mb-3">Welcome Back</h1>
            <p className="text-[#43474E] font-medium">Log in to your FitZone Gym account.</p>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-[#1A3C5E] uppercase tracking-widest block px-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-xl">mail</span>
                </div>
                <input
                  className="w-full pl-11 pr-4 py-4 rounded-xl border-2 bg-[#F2F4F6] text-[#1A3C5E] focus:ring-0 focus:outline-none transition-all"
                  style={{ boxShadow: 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff' }}
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Error State */}
              {error && (
                <p className="text-[#ba1a1a] text-sm font-semibold flex items-center gap-1.5 mt-1 px-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {error}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-[#1A3C5E] uppercase tracking-widest block px-1" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-xl">lock</span>
                </div>
                <input
                  className="w-full pl-11 pr-12 py-4 rounded-xl border-2 bg-[#F2F4F6] text-[#1A3C5E] focus:ring-0 focus:outline-none transition-all"
                  style={{ boxShadow: 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff' }}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#43474E] hover:text-[#1A3C5E] transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>

            {/* Utilities */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    className="peer h-5 w-5 rounded border-[#c3c6cf] bg-[#F2F4F6] text-[#401a00] focus:ring-transparent transition-all"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined absolute opacity-0 peer-checked:opacity-100 text-white text-[16px] left-0.5 pointer-events-none">check</span>
                </div>
                <span className="text-sm font-semibold text-[#43474E] group-hover:text-[#1A3C5E] transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-bold text-[#401a00] hover:text-[#401a00] transition-colors">Forgot your password?</Link>
            </div>

            {/* Submit */}
            <button
              className="w-full py-4 bg-[#E87722] text-white font-black text-lg rounded-xl shadow-[0_10px_20px_-5px_rgba(232,119,34,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : (
                <>
                  Log In
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-12 space-y-8 text-center">
            <p className="text-[#43474E] font-medium">
              New to FitZone Gym?
              <Link to="/register/step-1" className="text-[#1A3C5E] font-bold hover:underline underline-offset-4 ml-1">Create Account</Link>
            </p>
            <div className="pt-8 border-t border-[#eceef0]">
              <Link to="/admin" className="text-sm font-bold text-[#495f7f] flex items-center justify-center gap-1.5 hover:text-[#1A3C5E] transition-colors">
                Admin login
                <span className="material-symbols-outlined text-[18px]">east</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Corner Gradient */}
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#ffb68b]/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="fixed top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#d1e4ff]/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
    </main>
  );
}
