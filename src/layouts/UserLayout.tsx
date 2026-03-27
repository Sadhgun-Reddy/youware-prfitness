import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Home, MapPin, BarChart3, PlayCircle, User, Dumbbell, Clock, MessageSquare, Menu, X, Bell } from 'lucide-react';
import { mockNotifications } from '../data/mock';
import { useState } from 'react';

const normalNavItems = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/checkin', label: 'Check In', icon: MapPin },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/videos', label: 'Videos', icon: PlayCircle },
  { path: '/profile', label: 'Profile', icon: User },
];

const ptNavItems = [
  { path: '/plan/workout', label: 'Workout', icon: Dumbbell },
  { path: '/plan/diet', label: 'Diet', icon: Clock },
  { path: '/remarks', label: 'Remarks', icon: MessageSquare },
];

export default function UserLayout() {
  const { user } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isPT = user?.planType === 'personal_training';
  const unreadNotifs = mockNotifications.filter(n => !n.isRead).length;

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/');
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-offwhite-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-offwhite-300/60 flex-col z-40">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-offwhite-300/60">
          <Dumbbell className="w-7 h-7 text-accent-500" />
          <span className="text-lg font-bold text-navy-600">FitSync Pro</span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-medium text-navy-600/30 uppercase tracking-wider px-3 mb-2">Menu</p>
          {normalNavItems.map(item => (
            <NavLink key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(item.path) ? 'bg-navy-600 text-white' : 'text-navy-600/70 hover:bg-offwhite-200'
              }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}

          {isPT && (
            <>
              <p className="text-xs font-medium text-navy-600/30 uppercase tracking-wider px-3 mb-2 mt-6">PT Exclusive</p>
              {ptNavItems.map(item => (
                <NavLink key={item.path} to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path) ? 'bg-accent-500 text-white' : 'text-navy-600/70 hover:bg-accent-50'
                  }`}>
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.label === 'Remarks' && unreadNotifs > 0 && (
                    <span className="ml-auto w-5 h-5 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadNotifs}</span>
                  )}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-offwhite-300/60">
          <div className="flex items-center gap-3 px-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-600 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-navy-600 truncate">{user?.name}</p>
              <p className="text-xs text-navy-600/40 truncate">{isPT ? 'Personal Training' : 'Normal'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-offwhite-300/60 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-accent-500" />
          <span className="text-base font-bold text-navy-600">FitSync Pro</span>
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/notifications" className="relative p-2 rounded-xl hover:bg-offwhite-200">
            <Bell className="w-5 h-5 text-navy-600" />
            {unreadNotifs > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />}
          </NavLink>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-xl hover:bg-offwhite-200">
            <Menu className="w-5 h-5 text-navy-600" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="h-14 flex items-center justify-between px-4 border-b border-offwhite-300/60">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-accent-500" />
                <span className="font-bold text-navy-600">Menu</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-offwhite-200">
                <X className="w-5 h-5 text-navy-600" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {normalNavItems.map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path) ? 'bg-navy-600 text-white' : 'text-navy-600/70'
                  }`}>
                  <item.icon className="w-5 h-5" /> {item.label}
                </NavLink>
              ))}
              {isPT && ptNavItems.map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path) ? 'bg-accent-500 text-white' : 'text-navy-600/70'
                  }`}>
                  <item.icon className="w-5 h-5" /> {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-offwhite-300/60 z-40 flex items-center justify-around px-2">
        {normalNavItems.slice(0, 5).map(item => (
          <NavLink key={item.path} to={item.path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              isActive(item.path) ? 'text-accent-500' : 'text-navy-600/40'
            }`}>
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="page-container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
