import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { mockAdmin } from '../../data/mock';

export default function Login() {
  const navigate = useNavigate();
  const { loginAsUser, loginAsAdmin } = useAuthStore();
  const { members, adminSettings } = useDataStore();

  const [email, setEmail] = useState('arjun@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Quick switcher for demo testing
  const selectQuickAccount = (role: 'pt' | 'normal' | 'admin') => {
    setError('');
    if (role === 'admin') {
      setEmail(adminSettings.email || mockAdmin.email);
      setPassword('admin123');
    } else if (role === 'pt') {
      const ptUser = members.find(m => m.planType === 'personal_training') || members[0];
      setEmail(ptUser ? ptUser.email : 'arjun@example.com');
      setPassword('password123');
    } else {
      const normalUser = members.find(m => m.planType === 'normal') || members[1];
      setEmail(normalUser ? normalUser.email : 'vikram@example.com');
      setPassword('password123');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();

      // Check Admin
      const adminEmail = (adminSettings.email || mockAdmin.email).toLowerCase();
      if (trimmedEmail === adminEmail) {
        loginAsAdmin(adminSettings || mockAdmin);
        setLoading(false);
        navigate('/admin');
        return;
      }

      // Check Members
      const matchedUser = members.find(m => m.email.toLowerCase() === trimmedEmail);
      if (matchedUser) {
        loginAsUser(matchedUser);
        setLoading(false);
        navigate('/dashboard');
        return;
      }

      // Fallback for custom registered user or test email
      if (trimmedEmail.includes('@')) {
        const fallbackUser = members[0] || {
          id: 'm1',
          name: 'Arjun Mehta',
          email: trimmedEmail,
          dob: '1995-06-15',
          gender: 'male',
          height: 175,
          weight: 72,
          fitnessGoal: 'muscle_gain',
          gymName: 'FitZone Gym',
          gymLocation: 'Mumbai',
          healthConditions: '',
          planType: 'personal_training',
          membershipStartDate: new Date().toISOString().split('T')[0],
          membershipEndDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          status: 'active',
          createdAt: new Date().toISOString(),
        };
        loginAsUser(fallbackUser);
        setLoading(false);
        navigate('/dashboard');
        return;
      }

      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      {/* LEFT PANEL: Brand & Visuals */}
      <section className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#1A3C5E] via-[#15324E] to-[#0B1E2E] p-10 lg:p-16 flex-col justify-between relative overflow-hidden">
        {/* Background Abstract Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 w-full h-full pointer-events-none">
          <svg className="w-full h-full scale-150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.7,88.7,-0.9C86.9,13.8,78.2,27.7,69,40.1C59.8,52.5,50,63.4,38.1,71.1C26.1,78.8,13.1,83.3,-0.6,84.4C-14.3,85.5,-28.7,83.2,-41.6,76C-54.6,68.8,-66.2,56.7,-74.3,42.9C-82.4,29.1,-87,14.5,-86.3,0.4C-85.6,-13.7,-79.6,-27.4,-70.7,-39.8C-61.8,-52.2,-49.9,-63.3,-36.4,-70.6C-22.9,-77.9,-7.7,-81.4,7.4,-82.7C22.4,-84,31.3,-83.6,44.7,-76.4Z" fill="white" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[#1A3C5E] text-2xl font-black">fitness_center</span>
            </div>
            <div>
              <span className="text-white text-2xl font-black tracking-tight">FitSync Pro</span>
              <p className="text-xs text-white/60 font-medium">Gym Management & Member Experience</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 my-8">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            Track. Progress. <br /><span className="text-[#E87722]">Perform.</span>
          </h1>
          <p className="text-base lg:text-lg text-white/70 max-w-md font-normal leading-relaxed">
            Your gym journey, unified in one platform. High-accountability tracking, geo-verified attendance, and personalized coaching.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2.5">
          <div className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#E87722]">location_on</span> Geo Check-In
          </div>
          <div className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#E87722]">leaderboard</span> Weekly Progress
          </div>
          <div className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#E87722]">assignment_turned_in</span> Personalised Plans
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: Login Form */}
      <section className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-black text-[#1A3C5E] mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-[#43474E] text-sm font-medium">Log in to your FitZone Gym account.</p>
          </div>

          {/* Quick Demo Switcher */}
          <div className="mb-6 p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Demo Accounts:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => selectQuickAccount('pt')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#E8EEF4] text-[#1A3C5E] hover:bg-[#D1DDE9] transition-colors truncate text-center"
                title="Personal Training Member"
              >
                PT Member
              </button>
              <button
                type="button"
                onClick={() => selectQuickAccount('normal')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors truncate text-center"
                title="Normal Membership"
              >
                Normal Member
              </button>
              <button
                type="button"
                onClick={() => selectQuickAccount('admin')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors truncate text-center"
                title="Admin (Gym Owner)"
              >
                Admin (Ravi)
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-[#1A3C5E] text-sm focus:border-[#1A3C5E] focus:ring-1 focus:ring-[#1A3C5E] focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block" htmlFor="password">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-[#E87722] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <input
                  id="password"
                  name="password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-300 bg-white text-[#1A3C5E] text-sm focus:border-[#1A3C5E] focus:ring-1 focus:ring-[#1A3C5E] focus:outline-none transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#1A3C5E] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-base flex-shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#E87722] hover:bg-[#D06A1C] text-white font-bold text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-200 space-y-4 text-center">
            <p className="text-sm text-[#43474E]">
              New to FitZone Gym?
              <Link to="/register/step-1" className="text-[#1A3C5E] font-bold hover:underline ml-1.5">
                Create Account
              </Link>
            </p>
            <div>
              <button
                type="button"
                onClick={() => selectQuickAccount('admin')}
                className="text-xs font-semibold text-slate-500 hover:text-[#1A3C5E] inline-flex items-center gap-1 transition-colors"
              >
                <span>Switch to Admin Portal Credentials</span>
                <span className="material-symbols-outlined text-sm">east</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
