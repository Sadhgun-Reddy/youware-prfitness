import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate POST /auth/forgot-password
    setTimeout(() => {
      // For demonstration, arbitrarily fail if email is "error@example.com"
      if (email === 'error@example.com') {
        setStatus('error');
      } else {
        setStatus('success');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="w-8 h-8 text-accent-500" />
            <span className="text-xl font-bold text-navy-600">FitSync Pro</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-600">Forgot Password</h1>
          <p className="text-sm text-navy-600/60 mt-1">
            {status === 'success' ? 'Email sent successfully' : "Enter your registered email address and we'll send you a reset link."}
          </p>
        </div>

        <div className="card p-8">
          {status === 'success' ? (
            <div className="text-center animate-fade-in py-4">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
              </div>
              <p className="text-navy-600 font-medium mb-8 leading-relaxed">
                If this email is registered, a reset link has been sent. Check your inbox.
              </p>
              <Link to="/login" className="btn-primary w-full flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="input-field w-full" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-3 rounded-xl flex items-start gap-2 animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading' || !email} 
                className="btn-primary w-full disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          {status !== 'success' && (
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-navy-600/60 hover:text-accent-500 hover:underline flex items-center justify-center gap-1 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
