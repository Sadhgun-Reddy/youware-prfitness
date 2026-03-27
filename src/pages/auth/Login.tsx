import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { mockUsers, mockAdmin } from '../../data/mock';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAsUser, loginAsAdmin } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email === 'admin@fitsyncp.in') {
        loginAsAdmin(mockAdmin);
        navigate('/admin');
      } else if (email) {
        const user = mockUsers.find(u => u.email === email) || mockUsers[0];
        loginAsUser(user);
        navigate('/dashboard');
      } else {
        setError('Please enter your email');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="w-8 h-8 text-accent-500" />
            <span className="text-xl font-bold text-navy-600">FitSync Pro</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-600">Welcome Back</h1>
          <p className="text-sm text-navy-600/60 mt-1">Login to your account</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Email Address</label>
              <input type="email" className="input-field" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Password</label>
              <input type="password" className="input-field" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {error && (
              <div className="bg-error-light text-error text-sm p-3 rounded-xl">{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/forgot-password" className="text-sm text-accent-500 hover:underline">Forgot Password?</a>
          </div>

          <div className="mt-4 text-center text-sm text-navy-600/60">
            Don't have an account?{' '}
            <Link to="/register/step-1" className="text-accent-500 font-medium hover:underline">Register</Link>
          </div>

          {/* Demo login hints */}
          <div className="mt-6 pt-6 border-t border-offwhite-300">
            <p className="text-xs text-navy-600/40 text-center mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { loginAsUser(mockUsers[0]); navigate('/dashboard'); }}
                className="text-xs bg-offwhite-100 hover:bg-offwhite-200 text-navy-600 py-2 px-3 rounded-lg transition-colors">
                Member (PT)
              </button>
              <button onClick={() => { loginAsAdmin(mockAdmin); navigate('/admin'); }}
                className="text-xs bg-navy-600 hover:bg-navy-700 text-white py-2 px-3 rounded-lg transition-colors">
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
