import { Outlet, NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useDataStore } from '../store/useDataStore';
import { Home, MapPin, BarChart3, PlayCircle, User, Dumbbell, Clock, MessageSquare, Menu, X, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';

const normalNavItems = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/checkin', label: 'Check In', icon: MapPin },
  { path: '/attendance', label: 'Attendance', icon: Clock },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/videos', label: 'Videos', icon: PlayCircle },
  { path: '/profile', label: 'Profile', icon: User },
];

const ptNavItems = [
  { path: '/plan/workout', label: 'Workout Plan', icon: Dumbbell },
  { path: '/plan/diet', label: 'Diet Plan', icon: Clock },
  { path: '/remarks', label: 'Trainer Remarks', icon: MessageSquare },
];

export default function UserLayout() {
  const { user, logout } = useAuthStore();
  const { adminSettings } = useDataStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPT = user?.planType === 'personal_training';
  const gymName = adminSettings?.gymName || user?.gymName || 'FitZone Gym';

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200/80 flex-col z-40">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-200/80">
          <div className="w-9 h-9 rounded-xl bg-[#1A3C5E] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-xl">fitness_center</span>
          </div>
          <span className="text-lg font-black text-[#1A3C5E] tracking-tight">FitSync Pro</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Member Menu</p>
          {normalNavItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive(item.path)
                  ? 'bg-[#1A3C5E] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#1A3C5E]'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* PT Exclusive Nav */}
          {isPT && (
            <div className="pt-5 mt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold text-[#E87722] uppercase tracking-wider px-3 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">stars</span>
                PT Exclusive
              </p>
              {ptNavItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive(item.path)
                      ? 'bg-[#E87722] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-orange-50/60 hover:text-[#E87722]'
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </nav>

        {/* User Card & Logout at bottom */}
        <div className="p-4 border-t border-slate-200/80 space-y-3">
          <Link to="/profile" className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A3C5E] to-[#E87722] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0) || 'M'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1A3C5E] truncate">{user?.name || 'Member'}</p>
              <p className="text-[10px] text-slate-400 capitalize truncate">
                {isPT ? 'Personal Training' : 'Normal Plan'}
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 right-0 left-64 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-30">
        <div className="flex items-center justify-between h-full px-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1A3C5E]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-black">{gymName}</span>
          </div>

          <div className="flex items-center gap-4">
            <NavLink to="/notifications" className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E87722] rounded-full" />
            </NavLink>

            <Link to="/profile" className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#1A3C5E] text-white flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) || 'M'}
              </div>
              <span className="text-xs font-bold text-slate-700">{user?.name?.split(' ')[0] || 'Member'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1A3C5E] text-white rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">fitness_center</span>
          </div>
          <span className="text-base font-black text-[#1A3C5E]">FitSync Pro</span>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/notifications" className="p-2 text-slate-600">
            <Bell className="w-5 h-5" />
          </NavLink>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-slate-600">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col justify-between">
            <div>
              <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200">
                <span className="font-black text-[#1A3C5E] text-sm">Member Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1.5">
                {normalNavItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold ${
                      isActive(item.path) ? 'bg-[#1A3C5E] text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}

                {isPT && (
                  <div className="pt-4 border-t border-slate-100 mt-2 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#E87722] px-3">PT Exclusive</p>
                    {ptNavItems.map(item => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold ${
                          isActive(item.path) ? 'bg-[#E87722] text-white' : 'text-slate-700 hover:bg-orange-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </nav>
            </div>

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-40 flex items-center justify-around px-2">
        {normalNavItems.slice(0, 5).map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
              isActive(item.path) ? 'text-[#E87722] font-bold' : 'text-slate-400'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Main Content Viewport */}
      <main className="lg:ml-64 pt-16 lg:pt-20 pb-20 lg:pb-12 px-4 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
