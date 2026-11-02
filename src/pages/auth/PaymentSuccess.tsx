import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A3C5E] flex items-center justify-center p-6">
        <div className="w-[60px] h-[60px] bg-white/10 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-4xl animate-spin">sync</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A3C5E] min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A3C5E] to-[#0F2942] z-0" />
      
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#E87722] opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-[#87A7CE] opacity-10 blur-[100px] rounded-full" />

      {/* Main Success Card */}
      <main className="relative z-10 w-full max-w-[480px] bg-white rounded-2xl shadow-[0px_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
        {/* Top Success Header */}
        <div className="relative pt-12 pb-8 flex flex-col items-center">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(#E87722 1px, transparent 1px), radial-gradient(#1A3C5E 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
              opacity: 0.1,
            }}
          />
          
          {/* Success Checkmark */}
          <div className="relative z-10 w-[60px] h-[60px] bg-[#22B573] rounded-full flex items-center justify-center shadow-lg mb-6">
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontWeight: 600 }}>check</span>
          </div>
          
          <h1 className="relative z-10 text-[#1A3C5E] text-3xl font-extrabold tracking-tight mb-2">Payment Successful! 🎉</h1>
          <h2 className="relative z-10 text-[#43474E] text-lg font-medium">Welcome to FitZone Gym, Arjun!</h2>
        </div>

        {/* Plan Confirmation Section */}
        <div className="px-8 mb-8">
          <div className="bg-[#F2F4F6] rounded-xl p-6 border border-[#c3c6cf]/10">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-[#ffdbc8] text-[#743400] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Personal Training</span>
              <span className="text-[#1A3C5E] font-bold text-xl">₹3,500 paid</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#43474E] text-sm">calendar_today</span>
                <p className="text-[#43474E] text-sm font-medium">Effective: <span className="text-[#191C1E] font-semibold">15 June 2025</span></p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#43474E] text-sm">event_available</span>
                <p className="text-[#43474E] text-sm font-medium">Valid until: <span className="text-[#191C1E] font-semibold">15 July 2025</span></p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#c3c6cf]/20">
              <p className="text-[10px] font-mono text-[#73777f] uppercase tracking-widest mb-1">Transaction ID</p>
              <p className="text-xs font-mono text-[#43474E]">pay_OJGNAb12X3Cd56</p>
            </div>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="px-8 mb-10">
          <h3 className="text-[#1A3C5E] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            What's next?
            <div className="h-[1px] flex-1 bg-[#c3c6cf]/30" />
          </h3>
          
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#E87722]">location_on</span>
              </div>
              <div>
                <p className="text-[#191C1E] font-semibold text-sm leading-tight">Check in at the gym</p>
                <p className="text-[#43474E] text-xs mt-1">Visit our main facility to activate your RFID access card.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#E87722]">photo_camera</span>
              </div>
              <div>
                <p className="text-[#191C1E] font-semibold text-sm leading-tight">Submit weekly progress every Sunday</p>
                <p className="text-[#43474E] text-xs mt-1">Log your weight and photos in the app for tracking.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#E87722]">fitness_center</span>
              </div>
              <div>
                <p className="text-[#191C1E] font-semibold text-sm leading-tight">Your trainer will assign your workout plan</p>
                <p className="text-[#43474E] text-xs mt-1">Review your custom routine under the 'Workouts' tab.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 pb-10 text-center">
          <button 
            onClick={handleDashboard}
            className="w-full bg-[#E87722] hover:bg-[#D46611] text-white font-bold py-4 rounded-xl shadow-[0px_10px_20px_rgba(232,119,34,0.2)] transition-all active:scale-95 mb-4"
          >
            Access My Dashboard
          </button>
          
          <Link to="#" className="inline-flex items-center gap-2 text-[#1A3C5E] font-semibold text-sm hover:underline">
            <span className="material-symbols-outlined text-lg">download</span>
            Download Receipt
          </Link>
          
          <div className="mt-8">
            <p className="text-[11px] text-[#43474E]/70 leading-relaxed">
              A welcome email has been sent to <span className="text-[#1A3C5E] font-medium">arjun@example.com</span>
            </p>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Gradient */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E87722] to-transparent opacity-40" />
    </div>
  );
}
