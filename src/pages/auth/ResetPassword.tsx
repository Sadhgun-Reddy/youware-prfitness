import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Loader2, AlertCircle } from 'lucide-react';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [validationState, setValidationState] = useState<'validating' | 'valid' | 'expired' | 'used'>('validating');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password', { replace: true });
      return;
    }

    const validateToken = () => {
      // Simulate GET /auth/reset-password/validate?token=XXX
      setTimeout(() => {
        if (token === 'expired') {
          setValidationState('expired');
        } else if (token === 'used') {
          setValidationState('used');
        } else {
          setValidationState('valid');
        }
      }, 1000);
    };

    validateToken();
  }, [token, navigate]);

  const handleBlurPassword = () => {
    if (password && password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleBlurConfirm = () => {
    if (confirmPassword && confirmPassword !== password) {
      setConfirmError('Passwords do not match.');
    } else {
      setConfirmError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8 || password !== confirmPassword) {
      handleBlurPassword();
      handleBlurConfirm();
      return;
    }

    setLoading(true);
    setError('');

    // Simulate POST /auth/reset-password
    setTimeout(() => {
      // Artificial failure for demonstration when password is 'errorerror'
      if (password === 'errorerror') {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      } else {
        setLoading(false);
        // Navigate with state so standard toast providers or the Login component can render it
        navigate('/login', { state: { message: 'Password updated. Please log in with your new password.', toastType: 'success' } });
      }
    }, 1000);
  };

  // Helper template for expired or used states
  const renderInvalidState = (message: string) => (
    <div className="card p-8 text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <AlertCircle className="w-16 h-16 text-amber-500" />
      </div>
      <p className="text-navy-600 font-medium mb-8 leading-relaxed">
        {message}
      </p>
      <Link to="/forgot-password" className="btn-primary w-full inline-block">
        Request a New Reset Link
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="w-8 h-8 text-accent-500" />
            <span className="text-xl font-bold text-navy-600">FitSync Pro</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-600">
            {validationState === 'validating' ? 'Checking Link' :
             validationState === 'valid' ? 'Set New Password' :  
             'Invalid Link'}
          </h1>
        </div>

        {validationState === 'validating' && (
          <div className="card p-12 flex flex-col items-center justify-center animate-pulse">
            <Loader2 className="w-12 h-12 text-accent-500 animate-spin mb-4" />
            <p className="text-navy-600/70 font-medium tracking-wide">Validating your reset link...</p>
          </div>
        )}

        {validationState === 'expired' && (
          renderInvalidState("This reset link has expired. Reset links are valid for 60 minutes.")
        )}

        {validationState === 'used' && (
          renderInvalidState("This reset link has already been used.")
        )}

        {validationState === 'valid' && (
          <div className="card p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">New Password</label>
                <input 
                  type="password" 
                  className={`input-field w-full ${passwordError ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="At least 8 characters" 
                  value={password} 
                  onChange={e => {
                    setPassword(e.target.value);
                    if (passwordError && e.target.value.length >= 8) setPasswordError('');
                  }} 
                  onBlur={handleBlurPassword}
                  required
                  disabled={loading}
                />
                {passwordError && <p className="text-red-500 text-xs mt-1.5 font-medium">{passwordError}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  className={`input-field w-full ${confirmError ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Re-enter your password" 
                  value={confirmPassword} 
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    if (confirmError && e.target.value === password) setConfirmError('');
                  }} 
                  onBlur={handleBlurConfirm}
                  required
                  disabled={loading}
                />
                {confirmError && <p className="text-red-500 text-xs mt-1.5 font-medium">{confirmError}</p>}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-3 rounded-xl flex items-start gap-2 animate-fade-in mt-4">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading || password.length < 8 || password !== confirmPassword} 
                className="btn-primary w-full disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Setting Password...' : 'Set New Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
