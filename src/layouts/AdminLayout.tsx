import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LayoutDashboard, Users, MapPin, BarChart3, PlayCircle, Settings, Dumbbell, LogOut, Menu, X, Bell } from 'lucide-react';
import { mockAdminStats } from '../data/mock';
import { useState } from 'react';

const navItems = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/admin/members', label: 'Members', icon: Users, badge: () => mockAdminStats.activeMembers },
  { path: '/admin/checkins', label: 'Check-Ins', icon: MapPin, badge: () => mockAdminStats.todayCheckIns },
  { path: '/admin/progress', label: 'Progress', icon: BarChart3, badge: () => mockAdminStats.pendingReviews, badgeColor: 'bg-error' },
  { path: '/admin/videos', label: 'Videos', icon: PlayCircle },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { admin, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-offwhite-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-offwhite-300/60 flex-col z-40">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-offwhite-300/60">
          <Dumbbell className="w-7 h-7 text-accent-500" />
          <span className="text-lg font-bold text-navy-600">FitSync Pro</span>
          <span className="text-[10px] bg-navy-600 text-white px-2 py-0.5 rounded-full font-medium ml-auto">Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(item.path, item.exact) ? 'bg-navy-600 text-white' : 'text-navy-600/70 hover:bg-offwhite-200'
              }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.badge && (
                <span className={`ml-auto text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                  isActive(item.path, item.exact) ? 'bg-white/20 text-white' :
                  item.badgeColor === 'bg-error' ? 'bg-error text-white' : 'bg-offwhite-200 text-navy-600'
                }`}>{item.badge()}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-offwhite-300/60 space-y-2">
          <div className="flex items-center gap-3 px-3">
            <div className="w-9 h-9 rounded-xl bg-navy-600 flex items-center justify-center text-white text-sm font-bold">
              {admin?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-navy-600 truncate">{admin?.name}</p>
              <p className="text-xs text-navy-600/40">Gym Admin</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-error hover:bg-error-light w-full transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-offwhite-300/60 z-40 flex items-center justify-between px-4">
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-xl hover:bg-offwhite-200">
          <Menu className="w-5 h-5 text-navy-600" />
        </button>
        <div className="flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-accent-500" />
          <span className="text-base font-bold text-navy-600">Admin</span>
        </div>
        <div className="relative p-2">
          <Bell className="w-5 h-5 text-navy-600" />
          {mockAdminStats.pendingReviews > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />}
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="h-14 flex items-center justify-between px-4 border-b border-offwhite-300/60">
              <span className="font-bold text-navy-600">Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-offwhite-200">
                <X className="w-5 h-5 text-navy-600" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                    isActive(item.path, item.exact) ? 'bg-navy-600 text-white' : 'text-navy-600/70'
                  }`}>
                  <item.icon className="w-5 h-5" /> {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="page-container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
