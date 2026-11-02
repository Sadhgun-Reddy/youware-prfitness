import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function Profile() {
  const { user, logout } = useAuthStore();

  const member = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    dob: '1995-06-15',
    gender: 'male',
    height: 175,
    weight: 72,
    fitnessGoal: 'muscle_gain',
    gymName: 'FitZone Gym',
    gymLocation: 'Andheri West, Mumbai',
    healthConditions: 'None',
    planType: 'personal_training' as const,
    membershipStartDate: '2025-01-15',
    membershipEndDate: '2025-02-15',
    status: 'active' as const,
    createdAt: '2025-01-15',
  };

  const isPT = member.planType === 'personal_training';
  const planLabel = isPT ? 'Personal Training' : 'Normal Membership';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722]">person</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Account & Profile</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Member Profile</h1>
          <p className="text-xs text-slate-500 mt-1">Personal and biometric fitness records</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/profile/edit"
            className="px-5 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            Edit Profile
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Log Out
          </button>
        </div>
      </div>

      {/* Main Profile Identity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A3C5E] to-[#E87722] text-white flex items-center justify-center font-black text-3xl shadow-md flex-shrink-0">
          {member.name.charAt(0)}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-2xl font-black text-[#1A3C5E]">{member.name}</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              isPT ? 'bg-orange-100 text-[#E87722]' : 'bg-slate-100 text-slate-700'
            }`}>
              {planLabel}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Active Status
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Member ID: <span className="font-mono text-slate-700">{member.id}</span> • Member at <span className="font-semibold text-slate-800">{member.gymName}</span>
          </p>

          <p className="text-xs text-slate-400">
            Enrolled since {new Date(member.createdAt || member.membershipStartDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Contact Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="material-symbols-outlined text-[#1A3C5E] text-xl">contact_mail</span>
            <h3 className="text-base font-bold text-[#1A3C5E]">Personal & Contact Details</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Email Address:</span>
              <span className="font-bold text-slate-800">{member.email}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Phone Number:</span>
              <span className="font-bold text-slate-800">{member.phone || '+91 98765 43210'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Date of Birth:</span>
              <span className="font-bold text-slate-800">
                {new Date(member.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400 font-medium">Gender:</span>
              <span className="font-bold text-slate-800 capitalize">{member.gender}</span>
            </div>
          </div>
        </div>

        {/* Physical & Health Profile */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="material-symbols-outlined text-[#E87722] text-xl">monitor_weight</span>
            <h3 className="text-base font-bold text-[#1A3C5E]">Physical & Health Profile</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Height:</span>
              <span className="font-bold text-slate-800">{member.height} cm</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Current Weight:</span>
              <span className="font-bold text-slate-800">{member.weight} kg</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Fitness Goal:</span>
              <span className="font-bold text-[#E87722] uppercase tracking-wider">
                {member.fitnessGoal.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400 font-medium">Medical / Health Conditions:</span>
              <span className="font-bold text-slate-800">{member.healthConditions || 'None reported'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Membership & Subscription Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1A3C5E] text-xl">card_membership</span>
            <h3 className="text-base font-bold text-[#1A3C5E]">Membership Details</h3>
          </div>
          <Link to="/dashboard/membership" className="text-xs font-bold text-[#E87722] hover:underline">
            Manage Subscription
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-1">Plan Tier</span>
            <span className="font-bold text-[#1A3C5E] text-sm">{planLabel}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-1">Effective Start</span>
            <span className="font-bold text-slate-800 text-sm">
              {new Date(member.membershipStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block mb-1">Expiry Date</span>
            <span className="font-bold text-slate-800 text-sm">
              {new Date(member.membershipEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
