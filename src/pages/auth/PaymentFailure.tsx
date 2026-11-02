import { useNavigate, Link } from 'react-router-dom';

export default function PaymentFailure() {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/register/payment');
  };

  const handleTryDifferent = () => {
    navigate('/register/payment');
  };

  return (
    <div className="bg-[#F2F4F6] min-h-screen flex flex-col items-center justify-center p-4">
      {/* Top Branding */}
      <header className="fixed top-0 w-full z-50 py-6 px-8 flex justify-center">
        <span className="text-2xl font-black italic tracking-tighter text-[#1A3C5E]">FitSync Pro</span>
      </header>

      <main className="w-full max-w-[480px] mt-12 mb-8">
        {/* Main Failure Card */}
        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,60,94,0.12)] p-8 flex flex-col items-center text-center">
          {/* Warning Icon Section */}
          <div className="w-[60px] h-[60px] bg-[#E87722] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-white text-3xl">close</span>
          </div>

          {/* Header Content */}
          <h1 className="text-2xl font-black tracking-tight text-[#1A3C5E] mb-3">Payment Unsuccessful</h1>
          <p className="text-[#43474E] leading-relaxed mb-6 px-2">
            Don't worry — your account has been created and no money was charged.
          </p>

          {/* Reason Card */}
          <div className="w-full bg-[#FFF3E0] border-l-4 border-[#E87722] p-4 rounded-lg mb-8 text-left">
            <p className="text-sm font-medium text-[#743400]">
              <span className="font-bold">Reason:</span> UPI payment timed out. Your UPI app may not have been opened in time.
            </p>
          </div>

          {/* Action Cluster */}
          <div className="w-full flex flex-col md:flex-row gap-3 mb-8">
            <button 
              onClick={handleTryAgain}
              className="flex-1 bg-[#E87722] text-white py-3.5 px-6 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all"
            >
              Try Again
            </button>
            <button 
              onClick={handleTryDifferent}
              className="flex-1 border-2 border-[#1A3C5E] text-[#1A3C5E] py-3.5 px-6 rounded-xl font-semibold hover:bg-[#1A3C5E] hover:text-white active:scale-95 transition-all"
            >
              Try a Different Method
            </button>
          </div>

          {/* Persistence Message */}
          <div className="space-y-4">
            <p className="text-xs text-[#73777f] leading-tight">
              Your plan selection has been saved. You can also log in later and complete payment.
            </p>
            <Link to="/register/plans" className="inline-block text-[#E87722] font-bold text-sm tracking-wide hover:underline">
              Return to Plan Selection
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-4 bg-[#c2d9fe]/30 backdrop-blur-sm p-5 rounded-2xl flex items-start gap-4">
          <div className="mt-1">
            <span className="material-symbols-outlined text-[#1A3C5E]">support_agent</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#1A3C5E] mb-1">Need help?</h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-[#011c39]">
                <span className="material-symbols-outlined text-base">mail</span>
                <span>support@fitsyncp.in</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#011c39]">
                <span className="material-symbols-outlined text-base">chat</span>
                <span>WhatsApp +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Background Accents */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#c2d9fe]/20 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#ffb68b]/20 rounded-full blur-[100px] -z-10" />
    </div>
  );
}
