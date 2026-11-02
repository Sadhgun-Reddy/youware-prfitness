import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import type { User, MembershipPlan } from '../../types';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { user, loginAsUser, updateUser } = useAuthStore();
  const { addMember, updateMember, members } = useDataStore();

  const [loading, setLoading] = useState(true);
  const [activatedUser, setActivatedUser] = useState<User | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>('personal_training');
  const [transactionId] = useState(`pay_${Math.random().toString(36).substring(2, 9).toUpperCase()}${Date.now().toString().slice(-4)}`);

  useEffect(() => {
    // Check registration form or existing renewal
    const savedPlan = (sessionStorage.getItem('selectedPlan') as MembershipPlan) || 'personal_training';
    setSelectedPlan(savedPlan);

    const savedReg = sessionStorage.getItem('regForm');
    const now = new Date();
    const startDate = now.toISOString().split('T')[0];
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    let currentOrNewUser: User;

    if (savedReg) {
      try {
        const formData = JSON.parse(savedReg);
        currentOrNewUser = {
          id: `m-${Date.now()}`,
          name: formData.fullName || 'New Member',
          email: formData.email || `member${Date.now()}@example.com`,
          dob: formData.dob || '1995-01-01',
          gender: formData.gender || 'male',
          height: Number(formData.height) || 175,
          weight: Number(formData.weight) || 70,
          fitnessGoal: formData.fitnessGoal || 'general_fitness',
          gymName: formData.gymName || 'FitZone Gym',
          gymLocation: formData.gymLocation || 'Mumbai',
          healthConditions: formData.healthConditions || '',
          planType: savedPlan,
          membershipStartDate: startDate,
          membershipEndDate: endDate,
          status: 'active',
          createdAt: now.toISOString(),
        };

        addMember(currentOrNewUser);
        loginAsUser(currentOrNewUser);
        setActivatedUser(currentOrNewUser);
        sessionStorage.removeItem('regForm');
      } catch (e) {
        console.error(e);
      }
    } else if (user) {
      // Existing user renewal
      const currentExpiry = new Date(user.membershipEndDate);
      const baseDate = currentExpiry > now ? currentExpiry : now;
      const renewedEnd = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      updateMember(user.id, {
        status: 'active',
        planType: savedPlan,
        membershipEndDate: renewedEnd,
      });
      updateUser({
        status: 'active',
        planType: savedPlan,
        membershipEndDate: renewedEnd,
      });

      currentOrNewUser = {
        ...user,
        status: 'active',
        planType: savedPlan,
        membershipEndDate: renewedEnd,
      };
      setActivatedUser(currentOrNewUser);
    } else {
      // Default demo PT member
      const defaultUser = members[0] || {
        id: 'm1',
        name: 'Arjun Mehta',
        email: 'arjun@example.com',
        dob: '1995-06-15',
        gender: 'male',
        height: 175,
        weight: 72,
        fitnessGoal: 'muscle_gain',
        gymName: 'FitZone Gym',
        gymLocation: 'Mumbai',
        healthConditions: '',
        planType: savedPlan,
        membershipStartDate: startDate,
        membershipEndDate: endDate,
        status: 'active',
        createdAt: now.toISOString(),
      };
      loginAsUser(defaultUser);
      setActivatedUser(defaultUser);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const isPT = selectedPlan === 'personal_training';
  const planTitle = isPT ? 'Personal Training' : 'Normal Membership';
  const amountPaid = isPT ? 3500 : 1500;
  const memberName = activatedUser?.name || user?.name || 'Member';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A3C5E] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-[#E87722] rounded-full animate-spin mb-4" />
        <h2 className="text-xl font-bold">Confirming Razorpay Payment...</h2>
        <p className="text-white/60 text-sm mt-1">Activating your gym membership profile</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1A3C5E] min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A3C5E] to-[#0B1E2E] z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E87722]/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

      {/* Success Card */}
      <main className="relative z-10 w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="pt-10 pb-6 px-6 flex flex-col items-center text-center bg-gradient-to-b from-emerald-50/50 to-white">
          <div className="w-16 h-16 bg-[#1E7A45] rounded-full flex items-center justify-center shadow-lg mb-4 text-white">
            <span className="material-symbols-outlined text-3xl font-bold">check</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A3C5E] mb-1">Payment Confirmed! 🎉</h1>
          <p className="text-slate-600 text-sm">
            Welcome to FitZone Gym, <span className="font-bold text-slate-800">{memberName}</span>!
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="px-6 mb-6">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                isPT ? 'bg-orange-100 text-[#E87722]' : 'bg-slate-200 text-slate-700'
              }`}>
                {planTitle}
              </span>
              <span className="text-lg font-black text-[#1A3C5E]">₹{amountPaid.toLocaleString('en-IN')} paid</span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="font-bold text-[#1E7A45] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1E7A45]"></span>
                  Active / Confirmed
                </span>
              </div>
              <div className="flex justify-between">
                <span>Billing Period:</span>
                <span className="font-medium text-slate-800">30 Days (Monthly)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-mono text-[11px]">
                <span className="text-slate-400">Razorpay ID:</span>
                <span className="text-slate-700">{transactionId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps List */}
        <div className="px-6 mb-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">What's Next?</h3>
          <div className="flex items-start gap-3 text-xs text-slate-700">
            <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#E87722] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">location_on</span>
            </div>
            <div>
              <p className="font-bold text-[#1A3C5E]">Daily Gym Check-In</p>
              <p className="text-slate-500">Check in via geolocation when within 100m of the gym to maintain your streak.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-xs text-slate-700">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1A3C5E] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-base">calendar_month</span>
            </div>
            <div>
              <p className="font-bold text-[#1A3C5E]">Sunday Progress Submission</p>
              <p className="text-slate-500">Submit weight and progress photos every Sunday for trainer review.</p>
            </div>
          </div>
          {isPT && (
            <div className="flex items-start gap-3 text-xs text-slate-700">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-base">fitness_center</span>
              </div>
              <div>
                <p className="font-bold text-[#1A3C5E]">Personalized Plans</p>
                <p className="text-slate-500">Your trainer will review your physical profile and assign your workout and diet plans.</p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
          <button
            onClick={handleDashboard}
            className="w-full py-3.5 bg-[#E87722] hover:bg-[#D06A1C] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Access Member Dashboard</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
