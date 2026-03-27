import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { membershipPlans } from '../../data/mock';
import { CheckCircle, ChevronRight } from 'lucide-react';
import type { MembershipPlan } from '../../types';

export default function PlanSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<MembershipPlan | null>(null);

  const handleProceed = () => {
    if (!selected) return;
    sessionStorage.setItem('selectedPlan', selected);
    navigate('/register/payment');
  };

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-600">Choose Your Plan</h1>
          <p className="text-sm text-navy-600/60 mt-1">Select the membership that fits your goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {membershipPlans.map(plan => (
            <button key={plan.id} type="button" onClick={() => setSelected(plan.id)}
              className={`card p-6 text-left transition-all duration-200 ${selected === plan.id
                ? 'border-2 border-accent-500 ring-2 ring-accent-500/20'
                : 'border-2 border-transparent hover:border-navy-200'}`}>
              {plan.highlighted && (
                <span className="inline-flex items-center gap-1 bg-accent-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                  Recommended
                </span>
              )}
              <h3 className="text-lg font-bold text-navy-600 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-navy-600">₹{plan.price.toLocaleString()}</span>
                <span className="text-navy-600/50 text-sm">/month</span>
              </div>
              <ul className="space-y-2.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-navy-600/70">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-accent-500' : 'text-success'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={handleProceed} disabled={!selected}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed !px-10">
            Proceed to Payment <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-xs text-navy-600/40 mt-4">Secure payment powered by Razorpay</p>
      </div>
    </div>
  );
}
