import { Link } from 'react-router-dom';
import { Clock, LogIn } from 'lucide-react';

export default function SessionExpired() {
  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8 md:p-10 text-center bg-white shadow-xl rounded-2xl border-t-4 border-t-navy-400">
        <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-navy-500 shadow-sm">
          <Clock className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy-600 mb-3 leading-tight tracking-tight">
          Your Session Has Expired
        </h1>
        <p className="text-navy-500/80 mb-8 px-2 text-sm md:text-base leading-relaxed">
          You were logged out due to inactivity. Please log in again to continue.
        </p>
        <Link 
          to="/login" 
          className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 md:py-4 text-base md:text-lg shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <LogIn className="w-5 h-5" />
          Log In Again
        </Link>
      </div>
    </div>
  );
}
