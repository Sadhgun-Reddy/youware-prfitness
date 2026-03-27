import { useAuthStore } from '../../store/useAuthStore';
import { membershipPlans } from '../../data/mock';
import { CheckCircle, CalendarDays, CreditCard, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function MembershipPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  if (!user) return null;

  const currentPlan = membershipPlans.find(p => p.id === user.planType);
  const daysUntilExpiry = Math.max(0, Math.ceil((new Date(user.membershipEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const isExpired = user.status === 'expired';

  return (
    <div className="pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-navy-600" />
        </button>
        <h1 className="page-header">Membership</h1>
      </div>

      {/* Current Plan Card */}
      <div className={`card !p-6 mb-6 ${isExpired ? 'border-2 border-error/30' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-navy-600/50 uppercase tracking-wide font-medium">Current Plan</p>
            <p className="text-xl font-bold text-navy-600 mt-1">{currentPlan?.name || 'Membership'}</p>
          </div>
          {isExpired ? (
            <span className="badge-error">Expired</span>
          ) : daysUntilExpiry <= 7 ? (
            <span className="bg-accent-50 text-accent-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Expiring Soon</span>
          ) : (
            <span className="badge-success">Active</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-offwhite-100 rounded-xl p-3">
            <p className="text-xs text-navy-600/50">Start Date</p>
            <p className="text-sm font-semibold text-navy-600 flex items-center gap-1 mt-0.5">
              <CalendarDays className="w-3.5 h-3.5" /> {new Date(user.membershipStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className="bg-offwhite-100 rounded-xl p-3">
            <p className="text-xs text-navy-600/50">Expiry Date</p>
            <p className="text-sm font-semibold text-navy-600 flex items-center gap-1 mt-0.5">
              <CalendarDays className="w-3.5 h-3.5" /> {new Date(user.membershipEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {currentPlan?.features.map(f => (
            <div key={f} className="flex items-center gap-2 text-sm text-navy-600/70">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" /> {f}
            </div>
          ))}
        </div>
      </div>

      {/* Renew CTA */}
      {(isExpired || daysUntilExpiry <= 7) && (
        <div className="card !p-5 bg-accent-50 border-accent-500/20 text-center">
          <CreditCard className="w-8 h-8 text-accent-500 mx-auto mb-2" />
          <p className="font-semibold text-navy-600 mb-1">{isExpired ? 'Your membership has expired' : 'Renew to avoid interruption'}</p>
          <p className="text-sm text-navy-600/50 mb-4">{isExpired ? 'Renew now to continue your fitness journey.' : `Your plan expires in ${daysUntilExpiry} days.`}</p>
          <button className="btn-primary">Renew Now — ₹{currentPlan?.price.toLocaleString()}</button>
        </div>
      )}

      {/* Upgrade CTA (Normal → PT) */}
      {user.planType === 'normal' && !isExpired && (
        <div className="card !p-5 text-center mt-4">
          <p className="font-semibold text-navy-600 mb-1">Upgrade to Personal Training</p>
          <p className="text-sm text-navy-600/50 mb-4">Get custom workout plans, diet plans, and direct trainer feedback.</p>
          <Link to="/register/plan-select" className="btn-outline border-accent-500 text-accent-500 hover:!bg-accent-500 hover:!text-white w-full text-center block">
            View Plans
          </Link>
        </div>
      )}
    </div>
  );
}
