import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { membershipPlans } from '../../data/mock';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  
  const [status, setStatus] = useState<'loading' | 'success' | 'pending'>('loading');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const verifyMembership = async () => {
      // Mock API call GET /memberships/me
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentStatus = user?.status || 'inactive';
      
      if (currentStatus === 'active') {
        setStatus('success');
      } else {
        if (retryCount < 3) {
          timeoutId = setTimeout(() => {
            setRetryCount(prev => prev + 1);
            setStatus('loading');
          }, 3000);
        } else {
          setStatus('pending');
        }
      }
    };

    if (status === 'loading') {
      verifyMembership();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [retryCount, status, user?.status]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const planName = membershipPlans.find(p => p.id === user.planType)?.name || 'Membership Plan';
  
  // Format dates nicely
  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const expiryDate = user.membershipEndDate ? formatDate(user.membershipEndDate) : 'N/A';

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl relative overflow-hidden text-navy-600 border border-navy-100">
        
        <div className="relative z-10">
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-6" />
              <h2 className="text-2xl font-bold mb-2">Activating your membership...</h2>
              <p className="text-navy-600/70">Please wait while we confirm your payment details.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center animate-fade-in">
              <div className="mb-6 transform transition-all duration-500 scale-110">
                <CheckCircle2 className="w-24 h-24 text-emerald-500 drop-shadow-md" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-navy-600/80 mb-8">Your membership has been activated successfully.</p>
              
              <div className="w-full bg-navy-50 rounded-xl p-5 mb-8 text-left border border-navy-100 shadow-inner">
                <div className="mb-4 pb-4 border-b border-navy-100">
                  <p className="text-xs uppercase font-bold tracking-wider text-navy-400 mb-1">Activated Plan</p>
                  <p className="text-xl font-bold">{planName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold tracking-wider text-navy-400 mb-1">Expiry Date</p>
                  <p className="text-xl font-bold">{expiryDate}</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-primary w-full py-4 text-lg font-bold shadow-lg transition-transform active:scale-[0.98]"
              >
                Access Your Dashboard
              </button>
            </div>
          )}

          {status === 'pending' && (
            <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
              <div className="mb-6">
                <AlertCircle className="w-20 h-20 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Pending Confirmation</h2>
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 mb-8">
                <p className="text-amber-800 leading-relaxed text-sm font-medium">
                  Your payment is being confirmed. This may take a few minutes. You can safely close this tab and return later — your access will activate automatically.
                </p>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-outline w-full py-3.5 font-bold"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
