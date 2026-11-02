import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { membershipPlans } from '../../data/mock';

export default function MembershipPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    planType: 'personal_training' as const,
    membershipStartDate: '2025-01-15',
    membershipEndDate: '2025-02-15',
    status: 'active' as const,
  };

  const isPT = currentMember.planType === 'personal_training';
  const planConfig = membershipPlans.find(p => p.id === currentMember.planType) || membershipPlans[1];

  const now = new Date();
  const endDate = new Date(currentMember.membershipEndDate);
  const daysUntilExpiry = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isExpired = currentMember.status === 'expired' || daysUntilExpiry === 0;
  const isExpiringSoon = daysUntilExpiry <= 7;

  const handleRenew = () => {
    sessionStorage.setItem('selectedPlan', currentMember.planType);
    navigate('/register/payment');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722]">card_membership</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Subscription & Billing</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Membership Management</h1>
          <p className="text-xs text-slate-500 mt-1">Review active plan privileges, billing cycle, and renewal status</p>
        </div>

        <Link
          to="/register/plan-select"
          className="px-4 py-2 border border-slate-200 text-[#1A3C5E] hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
        >
          Explore All Plans
        </Link>
      </div>

      {/* Current Plan Overview Card */}
      <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border ${
        isExpired
          ? 'border-red-300 ring-2 ring-red-100'
          : isExpiringSoon
          ? 'border-amber-300 ring-2 ring-amber-100'
          : 'border-slate-200/80'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-md ${
              isPT ? 'bg-[#E87722]' : 'bg-[#1A3C5E]'
            }`}>
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-[#1A3C5E]">{planConfig.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isExpired ? 'bg-red-100 text-red-700' : isExpiringSoon ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Recurring Monthly Coaching Subscription via Razorpay</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-[#1A3C5E]">₹{planConfig.price.toLocaleString('en-IN')}</span>
            <span className="text-slate-400 text-xs font-medium"> /month</span>
          </div>
        </div>

        {/* Dates Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Start Date</span>
            <span className="font-bold text-slate-800 text-sm">
              {new Date(currentMember.membershipStartDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Expiry Date</span>
            <span className="font-bold text-slate-800 text-sm">
              {new Date(currentMember.membershipEndDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Remaining Period</span>
            <span className={`font-black text-sm ${isExpiringSoon ? 'text-amber-600' : 'text-emerald-700'}`}>
              {daysUntilExpiry} Days Remaining
            </span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Privileges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {planConfig.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-slate-50/70 rounded-xl">
                <span className="material-symbols-outlined text-base text-[#1E7A45]">check_circle</span>
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Action Trigger */}
        {(isExpired || isExpiringSoon) && (
          <div className="p-5 bg-orange-50 border border-orange-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black text-[#1A3C5E]">
                {isExpired ? 'Your Membership Has Expired' : 'Renew Early — Preserve Unbroken Streak'}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Renewing before expiry automatically adds 30 days onto your current end date without resetting your streak.
              </p>
            </div>
            <button
              onClick={handleRenew}
              className="px-6 py-3 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 flex-shrink-0"
            >
              Renew for ₹{planConfig.price.toLocaleString('en-IN')}
            </button>
          </div>
        )}
      </div>

      {/* Upgrade Callout if on Normal Plan */}
      {!isPT && (
        <div className="bg-gradient-to-r from-[#1A3C5E] to-[#15324E] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <span className="px-3 py-1 bg-white/10 text-orange-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Upgrade to Personal Training
            </span>
            <h3 className="text-2xl font-black mt-2">Ready for custom workouts & nutrition?</h3>
            <p className="text-white/70 text-xs sm:text-sm max-w-lg mt-1">
              Unlock day-by-day tailored workout plans, macro targets, and direct coaching directives from Coach Ravi Sharma for ₹3,500/month.
            </p>
          </div>
          <Link
            to="/register/plan-select"
            className="px-6 py-3.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex-shrink-0"
          >
            Upgrade Plan
          </Link>
        </div>
      )}
    </div>
  );
}
