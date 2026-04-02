import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function Header() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-brand-500" />
          <span className="font-semibold text-gray-800">FitSync Pro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:underline">Home</Link>
          {isAuthenticated ? (
            <span className="text-gray-600">{role === 'admin' ? 'Admin' : 'Member'}</span>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register/step-1" className="hover:underline">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
