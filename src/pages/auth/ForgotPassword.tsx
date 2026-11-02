import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('alex.trainer@fitsync.pro');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('success');
  const [countdown, setCountdown] = useState(58);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-[#F4F6F8] font-body text-[#191C1E] min-h-screen flex flex-col items-center justify-center py-12 px-6">
      {/* Brand Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-[#1A3C5E] tracking-tight">FitSync Pro</h1>
        <p className="text-[#43474E] text-sm mt-2 font-['Inter'] uppercase tracking-widest">Management Portal</p>
      </div>

      {/* State Comparison Container */}
      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl justify-center items-start">
        {/* INITIAL STATE CARD */}
        <div className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(26,60,94,0.12)]">
          <div className="flex flex-col items-center text-center">
            {/* Icon Header */}
            <div className="w-16 h-16 bg-[#F2F4F6] rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#1A3C5E] text-3xl">lock_reset</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1A3C5E] mb-3 tracking-tight">Forgot Your Password?</h2>
            <p className="text-[#43474E] leading-relaxed mb-8">
              Don't worry, it happens to the best of us. Enter your email and we'll send you a link to reset your account.
            </p>

            {/* Form Section */}
            <div className="w-full space-y-6">
              <div className="relative">
                <label className="absolute -top-2.5 left-3 px-1 bg-white text-xs font-semibold text-[#43474E] tracking-wider uppercase">Email Address</label>
                <div className="flex items-center bg-[#F2F4F6] rounded-lg p-3 transition-all focus-within:ring-1 focus-within:ring-[#1A3C5E]/40 focus-within:bg-white">
                  <span className="material-symbols-outlined text-[#43474E] mr-3">mail</span>
                  <input
                    className="bg-transparent border-none focus:ring-0 w-full text-[#191C1E] placeholder:text-[#73777f]/50"
                    placeholder="alex.trainer@fitsync.pro"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-br from-[#002645] to-[#1A3C5E] text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg shadow-[#002645]/20"
              >
                Send Reset Link
              </button>

              {/* Navigation Footer */}
              <div className="pt-2">
                <Link to="/login" className="flex items-center justify-center text-[#28496b] font-semibold hover:text-[#1A3C5E] transition-colors text-sm">
                  <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SUCCESS STATE CARD */}
        {status === 'success' && (
          <div className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(26,60,94,0.12)] relative overflow-hidden">
            {/* Subtle Tonal Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#4CAF50]" />

            <div className="flex flex-col items-center text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#4CAF50] text-3xl">mark_email_read</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1A3C5E] mb-3 tracking-tight">Reset Link Sent!</h2>
              <p className="text-[#43474E] leading-relaxed mb-8">
                We've sent an email to <span className="font-bold text-[#1A3C5E]">{email}</span> with instructions to reset your password.
              </p>

              {/* Confirmation Context */}
              <div className="w-full bg-[#F2F4F6] rounded-xl p-6 mb-8 text-sm">
                <div className="flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#E87722] mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                  <span className="text-[#43474E] font-medium">Wait {countdown} seconds to resend</span>
                </div>
                <div className="w-full bg-[#e6e8ea] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#fa8530] h-full w-[80%]" />
                </div>
              </div>

              {/* Footer Links */}
              <div className="w-full space-y-4">
                <p className="text-[#43474E] text-sm">
                  Didn't receive the email? <Link to="#" className="text-[#401a00] font-bold hover:underline decoration-2 underline-offset-4">Resend</Link>
                </p>
                <div className="pt-4 border-t border-[#e6e8ea]">
                  <Link to="/login" className="flex items-center justify-center text-[#28496b] font-semibold hover:text-[#1A3C5E] transition-colors text-sm">
                    <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Supplemental Info Footer */}
      <div className="mt-16 max-w-2xl text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="#" className="text-xs font-['Inter'] uppercase tracking-widest text-[#43474E] hover:text-[#1A3C5E] transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-xs font-['Inter'] uppercase tracking-widest text-[#43474E] hover:text-[#1A3C5E] transition-colors">Terms of Service</Link>
          <Link to="#" className="text-xs font-['Inter'] uppercase tracking-widest text-[#43474E] hover:text-[#1A3C5E] transition-colors">Security Standards</Link>
        </div>
        <p className="text-xs text-[#73777f] leading-loose">
          Locked out? Contact your facility administrator for manual credential recovery if you no longer have access to your primary email address.
        </p>
      </div>
    </div>
  );
}
