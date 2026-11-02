import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { MembershipPlan } from '../../types';

export default function PlanSelection() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'normal' | 'pt' | null>(null);

  const plans = {
    normal: {
      name: 'Normal Membership',
      price: 1500,
      features: [
        { included: true, text: 'Full access to gym equipment' },
        { included: true, text: 'Locker room & shower access' },
        { included: true, text: 'Free Wi-Fi & Lounge' },
        { included: false, text: 'One-on-one personal coach' },
        { included: false, text: 'Custom meal planning' },
      ],
    },
    pt: {
      name: 'Personal Training',
      price: 3500,
      highlighted: true,
      features: [
        { included: true, text: 'All features from Normal Plan' },
        { included: true, text: 'Dedicated Personal Trainer (4 sessions/week)', highlighted: true },
        { included: true, text: 'Customized AI Diet & Nutrition Plan', highlighted: true },
        { included: true, text: 'Monthly Body Composition Analysis', highlighted: true },
        { included: true, text: 'Priority Equipment Access', highlighted: true },
      ],
    },
  };

  const handleSelect = (plan: 'normal' | 'pt') => {
    setSelectedPlan(plan);
  };

  const handleProceed = () => {
    if (selectedPlan) {
      navigate('/register/payment');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F6] text-[#191C1E]">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md shadow-[0_4px_20px_rgba(26,60,94,0.08)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-black tracking-tight text-[#1A3C5E]">FitSync Pro</Link>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#1A3C5E]">account_circle</span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 flex flex-col items-center px-4">
        <div className="max-w-[900px] w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-[2.5rem] font-extrabold text-[#1A3C5E] mb-3 tracking-tight">Choose Your Plan</h1>
            <p className="text-[#43474E] text-lg max-w-lg mx-auto leading-relaxed">
              Start your fitness journey with the plan that suits you best. High-performance results await.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-16 gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E87722]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-[#43474E] font-medium text-sm">Account Created</span>
            </div>
            <div className="w-8 h-px bg-[#c3c6cf]/30"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ffdbc8] rounded-full">
              <span className="w-6 h-6 rounded-full bg-[#743400] text-white flex items-center justify-center text-xs font-bold">2</span>
              <span className="text-[#743400] font-bold text-sm">Choose Plan</span>
            </div>
            <div className="w-8 h-px bg-[#c3c6cf]/30"></div>
            <div className="flex items-center gap-2 opacity-40">
              <span className="w-6 h-6 rounded-full bg-[#e0e3e5] text-[#43474E] flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-[#43474E] font-medium text-sm">Payment</span>
            </div>
            <div className="w-8 h-px bg-[#c3c6cf]/30"></div>
            <div className="flex items-center gap-2 opacity-40">
              <span className="material-symbols-outlined text-[#e0e3e5]">flag</span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Normal Plan Card */}
            <button
              type="button"
              onClick={() => handleSelect('normal')}
              className={`bg-white rounded-xl shadow-[0_4px_12px_rgba(26,60,94,0.06)] p-8 flex flex-col h-full border border-[#c3c6cf]/10 relative overflow-hidden text-left transition-all ${
                selectedPlan === 'normal' ? 'ring-2 ring-[#E87722]' : ''
              }`}
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#e6e8ea] rounded-full text-[#43474E] text-[10px] font-bold uppercase tracking-widest mb-4">Normal Membership</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-extrabold text-[#1A3C5E]">₹1,500</span>
                  <span className="text-[#43474E] font-medium text-sm">/month</span>
                </div>
              </div>
              <div className="flex-grow space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1A3C5E] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-[#191C1E] text-sm">Full access to gym equipment</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1A3C5E] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-[#191C1E] text-sm">Locker room & shower access</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1A3C5E] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-[#191C1E] text-sm">Free Wi-Fi & Lounge</span>
                </div>
                <div className="flex items-start gap-3 opacity-40">
                  <span className="material-symbols-outlined text-[#73777f] text-xl">lock</span>
                  <span className="text-[#43474E] text-sm italic">One-on-one personal coach</span>
                </div>
                <div className="flex items-start gap-3 opacity-40">
                  <span className="material-symbols-outlined text-[#73777f] text-xl">lock</span>
                  <span className="text-[#43474E] text-sm italic">Custom meal planning</span>
                </div>
              </div>
              <div className={`w-full py-4 px-6 border-2 font-bold rounded-xl transition-colors ${
                selectedPlan === 'normal'
                  ? 'border-[#E87722] bg-[#E87722] text-white'
                  : 'border-[#1A3C5E] text-[#1A3C5E] hover:bg-[#d1e4ff]'
              }`}>
                {selectedPlan === 'normal' ? 'Selected' : 'Select Normal Plan'}
              </div>
            </button>

            {/* PT Plan Card (Prominent) */}
            <button
              type="button"
              onClick={() => handleSelect('pt')}
              className={`bg-white rounded-xl shadow-[0_12px_40px_rgba(26,60,94,0.12)] p-8 flex flex-col h-full border-l-4 border-t-4 border-[#1A3C5E] relative overflow-hidden ring-2 transition-all text-left ${
                selectedPlan === 'pt' ? 'ring-[#E87722]' : 'ring-[#1A3C5E]/5'
              }`}
            >
              {/* Orange Ribbon */}
              <div className="absolute -right-12 top-6 bg-[#E87722] text-white px-12 py-1 rotate-45 text-[10px] font-black tracking-[0.2em] shadow-md uppercase">
                Most Popular
              </div>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#ffdbc8] text-[#743400] rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Personal Training</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-extrabold text-[#1A3C5E]">₹3,500</span>
                  <span className="text-[#43474E] font-medium text-sm">/month</span>
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1A3C5E] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-[#191C1E] text-sm font-semibold">All features from Normal Plan</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#E87722] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[#191C1E] text-sm">Dedicated Personal Trainer (4 sessions/week)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#E87722] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[#191C1E] text-sm">Customized AI Diet & Nutrition Plan</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#E87722] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[#191C1E] text-sm">Monthly Body Composition Analysis</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#E87722] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-[#191C1E] text-sm">Priority Equipment Access</span>
                </div>
              </div>

              <div className={`w-full py-4 px-6 font-bold rounded-xl shadow-lg transition-all ${
                selectedPlan === 'pt'
                  ? 'bg-[#1A3C5E] text-white'
                  : 'bg-gradient-to-br from-[#E87722] to-[#D16618] text-white hover:brightness-110'
              }`}>
                {selectedPlan === 'pt' ? 'Selected' : 'Select Personal Training'}
              </div>
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#eceef0] rounded-full" style={{ boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.05), inset -4px -4px 8px rgba(255,255,255,0.9)' }}>
              <span className="material-symbols-outlined text-[#43474E] text-lg">info</span>
              <p className="text-[#43474E] text-sm">
                Not sure? You can <span className="text-[#1A3C5E] font-bold">upgrade anytime</span> through your profile settings.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Proceed Button */}
      {selectedPlan && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c3c6cf]/30 p-4 flex justify-center z-50">
          <button
            onClick={handleProceed}
            className="bg-gradient-to-br from-[#E87722] to-[#D16618] text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
          >
            Proceed to Payment
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}

      {/* Visual Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#d1e4ff] blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-[#ffb68b] blur-3xl"></div>
      </div>
    </div>
  );
}
