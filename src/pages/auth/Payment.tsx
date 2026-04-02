import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { membershipPlans } from '../../data/mock';
import { CheckCircle, Clock } from 'lucide-react';

// MVP Payment page: mock Razorpay-like flow
export default function Payment() {
  const navigate = useNavigate();
  const { user } = useAuthStore((s) => s);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<{ id: string; name: string; price: number } | null>(null);

  useEffect(() => {
    // Read the selected plan from session storage (set by PlanSelection)
    const p = sessionStorage.getItem('selectedPlan');
    if (p) {
      const found = (membershipPlans as any).find((x: any) => x.id === p);
      if (found) setPlan({ id: found.id, name: found.name, price: found.price });
    }
  }, []);

  const handlePay = () => {
    if (!plan) return;
    setLoading(true);
    // Simulate async payment processing
    setTimeout(() => {
      // In a real app, we'd verify payment with server via webhook
      // For MVP: redirect to success view
      setLoading(false);
      navigate('/register/payment-success');
    }, 1200);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-navy-600">Plan Payment</h1>
          <p className="text-sm text-navy-600/60 mt-1">Securely pay to activate your membership</p>
        </div>

        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-navy-600/50">Selected Plan</p>
              <p className="font-semibold text-navy-600">{plan?.name ?? 'Plan'}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₹{plan?.price?.toLocaleString?.() ?? ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-600/70">
            <Clock className="w-4 h-4" />
            <span>Instant activation after payment</span>
          </div>
          <button
            className="btn-primary w-full mt-2"
            onClick={handlePay}
            disabled={loading || !plan}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
