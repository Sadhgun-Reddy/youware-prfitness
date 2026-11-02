import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upi' | 'cards' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');

  const orderDetails = {
    plan: 'Personal Training',
    duration: '1 Month',
    planAmount: 2966.10,
    gst: 533.90,
    total: 3500.00,
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/register/payment-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 overflow-x-hidden bg-[#f8f9fb]">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(25, 28, 30, 0.4), rgba(25, 28, 30, 0.4)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuBikkdHcvJGWBWaEJXiwHQrewU-iU1V7ME5uLX_sSZfh8LNMpMHufrql4BFRAkOAoVkJp5tAr8sU5_FLuPG0iR_XTwINkwWitPvHiFHkF7tj2r--GKd0DajVlnMC-DXoVRKAYfzfT7qESsh01WxhYHncFBrs5w0BdhEODslr_uzpQ69rVKBIXjsqDrWvOlxV5LAXoeKip_a78oE0sS9t3hQZ64xUuRsGsVkbkRlVt55iorIwUgqEltfCsYbsqqiiR5r9uuO7vQPoMo)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="fixed inset-0 z-10 bg-[#002645]/20 backdrop-blur-sm" />

      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md flex items-center justify-between px-6 h-16 shadow-[0_4px_30px_rgba(26,60,94,0.12)]">
        <div className="text-xl font-bold text-[#1A3C5E] uppercase tracking-widest font-['Inter']">FitSync Pro</div>
        <div className="flex items-center gap-4">
          <button className="active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-[480px] flex flex-col gap-6">
        {/* Razorpay Checkout Modal */}
        <main className="bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(26,60,94,0.3)]">
          {/* Modal Header */}
          <div className="p-6 bg-[#eceef0] flex justify-between items-center border-b border-[#c3c6cf]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A3C5E] rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">fitness_center</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-[#1A3C5E] tracking-widest uppercase">FitSync Pro</h1>
                <p className="text-[10px] text-[#43474E] font-medium tracking-wide">SECURE CHECKOUT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#43474E] font-medium">Amount</p>
              <p className="text-lg font-bold text-[#1A3C5E]">₹3,500.00</p>
            </div>
          </div>

          {/* Product Brief */}
          <div className="px-6 py-4 bg-[#1A3C5E]/5 border-b border-[#c3c6cf]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3395FF] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-sm font-semibold text-[#191C1E]">Personal Training — 1 Month</span>
            </div>
            <span className="material-symbols-outlined text-[#43474E] cursor-pointer">info</span>
          </div>

          {/* Razorpay Styled Content */}
          <div className="p-6">
            {/* Navigation Tabs */}
            <div className="flex border-b border-[#c3c6cf]/30 mb-6">
              <button 
                onClick={() => setActiveTab('upi')}
                className={`flex-1 pb-3 text-sm font-bold transition-colors ${activeTab === 'upi' ? 'text-[#3395FF] border-b-2 border-[#3395FF]' : 'text-[#43474E] hover:text-[#1A3C5E]'}`}
              >
                UPI
              </button>
              <button 
                onClick={() => setActiveTab('cards')}
                className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === 'cards' ? 'text-[#3395FF] border-b-2 border-[#3395FF]' : 'text-[#43474E] hover:text-[#1A3C5E]'}`}
              >
                Cards
              </button>
              <button 
                onClick={() => setActiveTab('netbanking')}
                className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === 'netbanking' ? 'text-[#3395FF] border-b-2 border-[#3395FF]' : 'text-[#43474E] hover:text-[#1A3C5E]'}`}
              >
                Netbanking
              </button>
            </div>

            {/* UPI Content */}
            {activeTab === 'upi' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-[#43474E] mb-2 uppercase tracking-wider">Pay via UPI ID</label>
                  <div className="relative">
                    <input 
                      className="w-full bg-[#F2F4F6] border border-[#73777f] rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#3395FF] focus:border-[#3395FF] outline-none transition-all"
                      placeholder="example@upi"
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#3395FF]">VERIFY</button>
                  </div>
                </div>

                {/* App Shortcuts */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#73777f]/40 hover:bg-[#eceef0] transition-all active:scale-95 group">
                    <div className="w-8 h-8 rounded-lg bg-[#5f259f]/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[#5f259f]">account_balance_wallet</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#43474E]">PhonePe</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#73777f]/40 hover:bg-[#eceef0] transition-all active:scale-95 group">
                    <div className="w-8 h-8 rounded-lg bg-[#3395FF]/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[#3395FF]">payments</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#43474E]">GPay</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#73777f]/40 hover:bg-[#eceef0] transition-all active:scale-95 group">
                    <div className="w-8 h-8 rounded-lg bg-[#00baf2]/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[#00baf2]">wallet</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#43474E]">Paytm</span>
                  </button>
                </div>

                {/* Pay Button */}
                <button 
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full bg-[#3395FF] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ₹3,500
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Cards Content */}
            {activeTab === 'cards' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Card Number</label>
                  <input
                    className="w-full bg-[#F2F4F6] border-none rounded-lg py-3 px-4 focus:ring-1 focus:ring-[#3395FF] text-sm font-medium tracking-widest"
                    placeholder="XXXX XXXX XXXX XXXX"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Expiry</label>
                    <input
                      className="w-full bg-[#F2F4F6] border-none rounded-lg py-3 px-4 focus:ring-1 focus:ring-[#3395FF] text-sm font-medium"
                      placeholder="MM / YY"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#43474E]">CVV</label>
                    <input
                      className="w-full bg-[#F2F4F6] border-none rounded-lg py-3 px-4 focus:ring-1 focus:ring-[#3395FF] text-sm font-medium"
                      placeholder="***"
                      type="password"
                    />
                  </div>
                </div>
                <button 
                  onClick={handlePay}
                  className="w-full bg-[#3395FF] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Pay ₹3,500
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            )}

            {/* Netbanking Content */}
            {activeTab === 'netbanking' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI', 'Kotak Bank', 'Yes Bank'].map(bank => (
                    <button key={bank} className="p-3 border border-[#73777f]/30 rounded-lg text-sm font-medium text-[#43474E] hover:border-[#1A3C5E] hover:bg-[#F2F4F6] transition-all text-left">
                      {bank}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handlePay}
                  className="w-full bg-[#3395FF] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Pay ₹3,500
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            )}
          </div>

          {/* Razorpay Branding */}
          <div className="p-4 bg-[#F2F4F6] flex justify-center items-center gap-2 grayscale opacity-60">
            <span className="text-[10px] font-medium tracking-widest text-[#43474E]">POWERED BY</span>
            <span className="text-sm font-black text-[#1A3C5E]">Razorpay</span>
          </div>
        </main>

        {/* Order Summary & Trust Badges */}
        <section className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Personal Training (1 Month)</span>
              <span className="text-sm font-semibold text-white">₹2,966.10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">GST (18%)</span>
              <span className="text-sm font-semibold text-white">₹533.90</span>
            </div>
            <div className="h-[1px] bg-white/10 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-white">Total</span>
              <span className="text-base font-bold text-[#ffdbc8]">₹3,500.00</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-around items-center pt-4 border-t border-white/10">
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-white/60 text-lg">lock</span>
              <span className="text-[9px] font-bold text-white/50 uppercase tracking-tighter">Secure SSL</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-white/60 text-lg">shield</span>
              <span className="text-[9px] font-bold text-white/50 uppercase tracking-tighter">PCI Compliant</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-white/60 text-lg">update</span>
              <span className="text-[9px] font-bold text-white/50 uppercase tracking-tighter">Instant Access</span>
            </div>
          </div>
        </section>

        {/* Footer Action */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Membership Plans</span>
          </button>
        </div>
      </div>
    </div>
  );
}
