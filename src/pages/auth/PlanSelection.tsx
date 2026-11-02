import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { MembershipPlan } from '../../types';

export default function PlanSelection() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>('personal_training');

  useEffect(() => {
    const savedPlan = sessionStorage.getItem('selectedPlan') as MembershipPlan | null;
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
  }, []);

  const handleSelect = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    sessionStorage.setItem('selectedPlan', plan);
  };

  const handleProceed = () => {
    sessionStorage.setItem('selectedPlan', selectedPlan);
    navigate('/register/payment');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191C1E] flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="sticky top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black text-[#1A3C5E]">
            <span className="material-symbols-outlined text-[#E87722] text-2xl">fitness_center</span>
            FitSync Pro
          </Link>
          <Link to="/register/step-3" className="text-sm font-semibold text-slate-500 hover:text-[#1A3C5E] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Registration
          </Link>
        </div>
      </header>

      <main className="py-12 px-4 flex flex-col items-center flex-1">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-[#E8EEF4] text-[#1A3C5E] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              Step 2 of 3 • Plan Selection
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A3C5E] mb-3 tracking-tight">Choose Your Membership Plan</h1>
            <p className="text-[#43474E] text-base max-w-lg mx-auto">
              Select the level of coaching that best fits your fitness goals and budget. You can upgrade anytime.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch mb-12">
            {/* Normal Plan Card */}
            <div
              onClick={() => handleSelect('normal')}
              className={`bg-white rounded-2xl shadow-sm hover:shadow-md p-8 flex flex-col h-full border-2 transition-all cursor-pointer relative ${
                selectedPlan === 'normal' ? 'border-[#1A3C5E] ring-2 ring-[#1A3C5E]/20 bg-slate-50/40' : 'border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Standard Tier
                  </span>
                  <h3 className="text-2xl font-black text-[#1A3C5E]">Normal Membership</h3>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'normal' ? 'border-[#1A3C5E] bg-[#1A3C5E] text-white' : 'border-slate-300'}`}>
                  {selectedPlan === 'normal' && <span className="material-symbols-outlined text-sm">check</span>}
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-[#1A3C5E]">₹1,500</span>
                <span className="text-slate-500 font-medium text-sm">/month</span>
              </div>

              <div className="flex-grow space-y-3.5 mb-8 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-[#1E7A45] text-xl">check_circle</span>
                  <span>Full access to gym equipment & facilities</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-[#1E7A45] text-xl">check_circle</span>
                  <span>Geo-verified daily gym check-ins</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-[#1E7A45] text-xl">check_circle</span>
                  <span>Weekly progress photo & weight submission</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-[#1E7A45] text-xl">check_circle</span>
                  <span>Curated workout video library access</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 opacity-60">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
                  <span className="italic">Personalized trainer workout plan</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 opacity-60">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
                  <span className="italic">Customized nutrition & diet guidance</span>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                  selectedPlan === 'normal'
                    ? 'bg-[#1A3C5E] text-white shadow-md'
                    : 'bg-slate-100 text-[#1A3C5E] hover:bg-slate-200'
                }`}
              >
                {selectedPlan === 'normal' ? 'Selected' : 'Select Normal Plan'}
              </button>
            </div>

            {/* PT Plan Card (Prominent) */}
            <div
              onClick={() => handleSelect('personal_training')}
              className={`bg-white rounded-2xl shadow-md hover:shadow-lg p-8 flex flex-col h-full border-2 transition-all cursor-pointer relative overflow-hidden ${
                selectedPlan === 'personal_training' ? 'border-[#E87722] ring-2 ring-[#E87722]/30 bg-orange-50/20' : 'border-slate-200'
              }`}
            >
              {/* Highlight Badge */}
              <div className="absolute top-0 right-0 bg-[#E87722] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-sm">
                Trainer Recommended
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-[#E87722] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    Premium Coaching Tier
                  </span>
                  <h3 className="text-2xl font-black text-[#1A3C5E]">Personal Training</h3>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'personal_training' ? 'border-[#E87722] bg-[#E87722] text-white' : 'border-slate-300'}`}>
                  {selectedPlan === 'personal_training' && <span className="material-symbols-outlined text-sm">check</span>}
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-[#1A3C5E]">₹3,500</span>
                <span className="text-slate-500 font-medium text-sm">/month</span>
              </div>

              <div className="flex-grow space-y-3.5 mb-8 text-sm">
                <div className="flex items-center gap-3 text-slate-800 font-medium">
                  <span className="material-symbols-outlined text-[#E87722] text-xl">verified</span>
                  <span>Everything in Normal Membership included</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 font-medium">
                  <span className="material-symbols-outlined text-[#E87722] text-xl">verified</span>
                  <span>Dedicated Personal Trainer assigned</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 font-medium">
                  <span className="material-symbols-outlined text-[#E87722] text-xl">verified</span>
                  <span>Personalised Day-by-Day Workout Plan</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 font-medium">
                  <span className="material-symbols-outlined text-[#E87722] text-xl">verified</span>
                  <span>Customised Nutrition & Macro Diet Plan</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 font-medium">
                  <span className="material-symbols-outlined text-[#E87722] text-xl">verified</span>
                  <span>Direct Trainer Remarks & Progress Reviews</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 font-medium">
                  <span className="material-symbols-outlined text-[#E87722] text-xl">verified</span>
                  <span>Priority coach adjustments & advice</span>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                  selectedPlan === 'personal_training'
                    ? 'bg-[#E87722] text-white shadow-md'
                    : 'bg-orange-50 text-[#E87722] border border-[#E87722]/30 hover:bg-[#E87722] hover:text-white'
                }`}
              >
                {selectedPlan === 'personal_training' ? 'Selected' : 'Select Personal Training'}
              </button>
            </div>
          </div>

          {/* Continue CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Selected</p>
              <p className="text-lg font-bold text-[#1A3C5E]">
                {selectedPlan === 'personal_training' ? 'Personal Training Plan — ₹3,500/month' : 'Normal Membership Plan — ₹1,500/month'}
              </p>
            </div>
            <button
              onClick={handleProceed}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#E87722] hover:bg-[#D06A1C] text-white font-bold text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Continue to Payment</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        FitSync Pro © 2026. Secure 256-bit SSL encrypted transactions powered by Razorpay.
      </footer>
    </div>
  );
}
