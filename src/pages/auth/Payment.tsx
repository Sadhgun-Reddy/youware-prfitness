import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { MembershipPlan } from '../../types';

export default function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upi' | 'cards' | 'netbanking'>('upi');
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>('personal_training');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  useEffect(() => {
    const saved = sessionStorage.getItem('selectedPlan') as MembershipPlan | null;
    if (saved) setSelectedPlan(saved);
  }, []);

  const isPT = selectedPlan === 'personal_training';
  const planName = isPT ? 'Personal Training Plan' : 'Normal Membership Plan';
  const totalAmount = isPT ? 3500 : 1500;
  const baseAmount = Math.round(totalAmount / 1.18);
  const gstAmount = totalAmount - baseAmount;

  const handlePay = (simulateFailure = false) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (simulateFailure) {
        navigate('/register/payment-failure');
      } else {
        navigate('/register/payment-success');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-10 px-4 bg-gradient-to-br from-[#1A3C5E] via-[#0F2942] to-[#0A1A2A]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#E87722]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Modal */}
      <div className="relative z-10 w-full max-w-[500px]">
        {/* Back Link */}
        <div className="mb-4 flex items-center justify-between text-white/80 text-sm">
          <Link to="/register/plan-select" className="flex items-center gap-1 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Change Plan
          </Link>
          <span className="text-xs text-white/60 font-medium">Secured by Razorpay</span>
        </div>

        {/* Razorpay Checkout Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
          {/* Modal Header */}
          <div className="p-6 bg-slate-50 flex justify-between items-center border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A3C5E] rounded-xl flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-xl">fitness_center</span>
              </div>
              <div>
                <h2 className="text-sm font-black text-[#1A3C5E] tracking-wider uppercase">FitSync Pro</h2>
                <p className="text-[11px] text-slate-500 font-semibold tracking-wide">RAZORPAY SECURE PAYMENT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Amount</p>
              <p className="text-2xl font-black text-[#1A3C5E]">₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Product Summary */}
          <div className="px-6 py-3.5 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E87722] text-lg font-bold">verified</span>
              <span className="text-xs font-bold text-slate-800">{planName} (1 Month)</span>
            </div>
            <span className="text-xs font-semibold text-slate-500">Includes 18% GST</span>
          </div>

          {/* Razorpay Tabs */}
          <div className="p-6">
            <div className="flex border-b border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`flex-1 pb-3 text-xs font-bold tracking-wider uppercase transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'upi' ? 'text-[#1A3C5E] border-[#1A3C5E]' : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <span className="material-symbols-outlined text-base">qr_code</span>
                UPI
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cards')}
                className={`flex-1 pb-3 text-xs font-bold tracking-wider uppercase transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'cards' ? 'text-[#1A3C5E] border-[#1A3C5E]' : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <span className="material-symbols-outlined text-base">credit_card</span>
                Cards
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`flex-1 pb-3 text-xs font-bold tracking-wider uppercase transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'netbanking' ? 'text-[#1A3C5E] border-[#1A3C5E]' : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <span className="material-symbols-outlined text-base">account_balance</span>
                Netbanking
              </button>
            </div>

            {/* Tab 1: UPI */}
            {activeTab === 'upi' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-xs font-semibold text-slate-600 mb-2">Scan QR code using any UPI App</p>
                  <div className="w-36 h-36 bg-white mx-auto p-2 rounded-lg border border-slate-200 flex items-center justify-center shadow-inner">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=fitsync@razorpay&pn=FitSyncPro&am=${totalAmount}&cu=INR`}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-mono">Google Pay • PhonePe • Paytm • BHIM</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Or enter UPI ID / VPA</label>
                  <input
                    type="text"
                    placeholder="username@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1A3C5E]"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Cards */}
            {activeTab === 'cards' && (
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1A3C5E]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1A3C5E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#1A3C5E]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Netbanking */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Select Popular Bank</label>
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedBank === bank ? 'border-[#1A3C5E] bg-blue-50/50 text-[#1A3C5E] font-bold' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price breakdown */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs space-y-1.5 text-slate-500">
              <div className="flex justify-between">
                <span>Base Subscription:</span>
                <span>₹{baseAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100 text-sm">
                <span>Total Payable:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Pay Button */}
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => handlePay(false)}
                disabled={loading}
                className="w-full py-4 bg-[#E87722] hover:bg-[#D06A1C] text-white font-bold text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  <>
                    <span>Pay ₹{totalAmount.toLocaleString('en-IN')}</span>
                    <span className="material-symbols-outlined text-lg">lock</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handlePay(true)}
                className="w-full text-center text-[11px] text-slate-400 hover:text-red-500 py-1 transition-colors"
              >
                Simulate Payment Failure (QA Test)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
