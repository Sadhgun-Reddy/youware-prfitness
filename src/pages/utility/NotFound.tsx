import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8 text-center bg-white shadow-xl rounded-2xl">
        <div className="text-[120px] font-black text-accent-500 mb-2 opacity-90 leading-none drop-shadow-md">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-600 mb-3 tracking-tight">Page Not Found</h1>
        <p className="text-navy-500/80 mb-8 px-4 text-sm md:text-base leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-lg shadow-lg">
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
