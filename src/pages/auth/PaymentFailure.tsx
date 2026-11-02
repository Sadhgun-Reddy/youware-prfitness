import { useNavigate, Link } from 'react-router-dom';

export default function PaymentFailure() {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/register/payment');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center p-4">
      {/* Top Branding */}
      <header className="fixed top-0 w-full z-50 py-4 px-8 flex justify-center bg-white/80 backdrop-blur-md border-b border-slate-200">
        <Link to="/" className="text-2xl font-black tracking-tight text-[#1A3C5E] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#E87722]">fitness_center</span>
          FitSync Pro
        </Link>
      </header>

      <main className="w-full max-w-[480px] mt-16 mb-8">
        {/* Main Failure Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-slate-200">
          {/* Warning Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-5 text-[#C0392B]">
            <span className="material-symbols-outlined text-3xl font-bold">close</span>
          </div>

          {/* Header Content */}
          <h1 className="text-2xl font-black tracking-tight text-[#1A3C5E] mb-2">Payment Incomplete</h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            The transaction could not be processed. No funds have been deducted from your account.
          </p>

          {/* Reason Card */}
          <div className="w-full bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl mb-6 text-left">
            <p className="text-xs font-semibold text-amber-900">
              <span className="font-bold">Notice:</span> The payment session timed out or was cancelled by the bank. You can retry with the same or another payment method.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 mb-6">
            <button 
              onClick={handleTryAgain}
              className="flex-1 bg-[#E87722] hover:bg-[#D06A1C] text-white py-3 px-5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              Retry Payment
            </button>
            <Link 
              to="/register/plan-select"
              className="flex-1 border-2 border-[#1A3C5E] text-[#1A3C5E] hover:bg-[#1A3C5E] hover:text-white py-3 px-5 rounded-xl font-bold text-sm text-center transition-all active:scale-95 flex items-center justify-center"
            >
              Change Plan
            </Link>
          </div>

          {/* Direct Support */}
          <p className="text-xs text-slate-400">
            Need assistance? Contact support at <span className="font-semibold text-slate-600">support@fitsyncp.in</span>
          </p>
        </div>
      </main>
    </div>
  );
}
