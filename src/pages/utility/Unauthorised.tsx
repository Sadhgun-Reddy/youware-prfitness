import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function Unauthorised() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const role = useAuthStore(s => s.role);

  let redirectPath = '/';
  if (isAuthenticated) {
    redirectPath = role === 'admin' ? '/admin' : '/dashboard';
  }

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8 text-center bg-white shadow-xl rounded-2xl border-t-4 border-t-amber-500">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-sm">
          <Lock className="w-12 h-12" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-navy-600 mb-3 tracking-tight">Access Denied</h1>
        <p className="text-navy-500/80 mb-8 text-sm md:text-base leading-relaxed">
          You don't have permission to view this page.
        </p>
        <Link 
          to={redirectPath} 
          className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base shadow-md hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
