import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [validationState, setValidationState] = useState<'validating' | 'valid' | 'expired' | 'success'>('validating');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password', { replace: true });
      return;
    }

    const validateToken = () => {
      setTimeout(() => {
        if (token === 'expired') {
          setValidationState('expired');
        } else if (token === 'success') {
          setValidationState('success');
        } else {
          setValidationState('valid');
        }
      }, 1000);
    };

    validateToken();
  }, [token, navigate]);

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setValidationState('success');
    }, 1000);
  };

  const passwordChecks = [
    { label: '8+ characters', valid: password.length >= 8 },
    { label: 'At least one uppercase', valid: /[A-Z]/.test(password) },
    { label: 'At least one number', valid: /[0-9]/.test(password) },
    { label: 'Special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  if (validationState === 'validating') {
    return (
      <div className="bg-[#F2F4F6] font-body text-[#191C1E] min-h-screen flex items-center justify-center p-6">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#ffdbc8] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#1A3C5E] text-3xl animate-spin">sync</span>
          </div>
          <p className="text-[#43474E] font-medium tracking-wide">Validating your reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F6] font-body text-[#191C1E] antialiased min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md shadow-[0_4px_20px_rgba(26,60,94,0.08)] px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight text-[#1A3C5E]">Kinetic Sanctuary</div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#43474E] cursor-pointer hover:bg-slate-100 p-2 rounded-full transition-all">help_outline</span>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* STATE 1: VALID TOKEN */}
            {validationState === 'valid' && (
              <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(26,60,94,0.12)] p-8 w-full max-w-[440px] mx-auto border border-[#c3c6cf]/20">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-14 h-14 rounded-full bg-[#ffdbc8] flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[#743400] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1A3C5E] tracking-tight mb-3">Set New Password</h2>
                  <p className="text-[#43474E] text-sm leading-relaxed">Create a strong password for your account. Your old password will no longer work.</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#011c39]">New Password</label>
                    <div className="relative">
                      <input
                        className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#43474E]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    <div className="pt-2">
                      <div className="h-1.5 w-full bg-[#e6e8ea] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getPasswordStrength() >= 3 ? 'bg-green-500' : 'bg-[#E87722]'}`} style={{ width: `${getPasswordStrength() * 25}%` }}></div>
                      </div>
                      <p className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${getPasswordStrength() >= 3 ? 'text-green-600' : 'text-[#E87722]'}`}>
                        {getPasswordStrength() <= 1 ? 'Weak' : getPasswordStrength() === 2 ? 'Fair' : getPasswordStrength() === 3 ? 'Good' : 'Strong'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#011c39]">Confirm New Password</label>
                    <input
                      className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all"
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-3 py-2">
                    {passwordChecks.map((check, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={`material-symbols-outlined text-lg ${check.valid ? 'text-green-500' : 'text-[#73777f]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="text-[#43474E]">{check.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || password !== confirmPassword || getPasswordStrength() < 3}
                    className="w-full bg-gradient-to-br from-[#E87722] to-[#D1661A] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all text-sm tracking-wide disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'UPDATE PASSWORD'}
                  </button>
                </form>
              </div>
            )}

            {/* STATE 2: SUCCESS */}
            {validationState === 'success' && (
              <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(26,60,94,0.12)] p-8 w-full max-w-[440px] mx-auto border border-[#c3c6cf]/20 flex flex-col items-center justify-center min-h-[500px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-8">
                    <span className="material-symbols-outlined text-green-500 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1A3C5E] tracking-tight mb-3">Password Updated!</h2>
                  <p className="text-[#43474E] text-sm leading-relaxed mb-10 max-w-[280px]">You can now log in to your Kinetic Sanctuary account with your new password.</p>
                  <Link
                    to="/login"
                    className="w-full bg-gradient-to-br from-[#E87722] to-[#D1661A] text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    LOG IN NOW
                    <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
                  </Link>
                </div>
              </div>
            )}

            {/* STATE 3: EXPIRED TOKEN */}
            {validationState === 'expired' && (
              <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(26,60,94,0.12)] p-8 w-full max-w-[440px] mx-auto border border-[#c3c6cf]/20 flex flex-col justify-between min-h-[500px]">
                <div className="flex flex-col items-center text-center mt-8">
                  <div className="w-16 h-16 rounded-full bg-[#ffdad6]/40 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1A3C5E] tracking-tight mb-3">Reset Link Expired</h2>
                  <p className="text-[#43474E] text-sm leading-relaxed max-w-[300px]">This link has expired. Reset links are valid for 60 minutes for your security.</p>
                </div>
                <div className="space-y-4 mb-4">
                  <Link
                    to="/forgot-password"
                    className="w-full bg-gradient-to-br from-[#E87722] to-[#D1661A] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    REQUEST A NEW LINK
                    <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
                  </Link>
                  <Link to="/login" className="flex items-center justify-center gap-2 text-[#1A3C5E] font-bold text-xs uppercase tracking-widest hover:text-[#E87722] transition-colors py-2">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 bg-[#eceef0]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-black text-[#1A3C5E] uppercase tracking-tighter">Kinetic Sanctuary</div>
          <div className="flex gap-8">
            <Link to="#" className="text-sm font-medium tracking-wide uppercase text-slate-500 hover:text-[#1A3C5E] transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm font-medium tracking-wide uppercase text-slate-500 hover:text-[#1A3C5E] transition-colors">Terms of Service</Link>
            <Link to="#" className="text-sm font-medium tracking-wide uppercase text-slate-500 hover:text-[#1A3C5E] transition-colors">Support</Link>
          </div>
          <div className="text-xs font-medium tracking-widest text-slate-400 uppercase">© 2024 Kinetic Sanctuary. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
