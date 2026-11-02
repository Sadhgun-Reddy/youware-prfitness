import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useDataStore } from '../store/useDataStore';
import { LayoutDashboard, Users, MapPin, BarChart3, PlayCircle, Settings, Dumbbell, LogOut, Menu, X, Utensils } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout() {
  const { admin, logout } = useAuthStore();
  const { getAdminStats } = useDataStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = getAdminStats();

  const navItems = [
    { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
    { path: '/admin/members', label: 'Members', icon: Users, badge: stats.activeMembers },
    { path: '/admin/checkins', label: 'Today Check-Ins', icon: MapPin, badge: stats.todayCheckIns },
    { path: '/admin/progress', label: 'Progress Reviews', icon: BarChart3, badge: stats.pendingReviews, badgeColor: 'bg-[#C0392B]' },
    { path: '/admin/workout-plans', label: 'Workout Plans', icon: Dumbbell },
    { path: '/admin/diet-plans', label: 'Diet Plans', icon: Utensils },
    { path: '/admin/videos', label: 'Video Library', icon: PlayCircle },
    { path: '/admin/settings', label: 'Gym Settings', icon: Settings },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200/80 flex-col z-40">
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1A3C5E] text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
            </div>
            <span className="text-base font-black text-[#1A3C5E] tracking-tight">Admin Portal</span>
          </div>
          <span className="text-[10px] bg-orange-100 text-[#E87722] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
            FitZone
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Management</p>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive(item.path, item.exact)
                  ? 'bg-[#1A3C5E] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#1A3C5E]'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`ml-auto text-[10px] font-black min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center ${
                  isActive(item.path, item.exact)
                    ? 'bg-white/20 text-white'
                    : item.badgeColor
                    ? 'bg-[#C0392B] text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin Info & Sign Out */}
        <div className="p-4 border-t border-slate-200/80 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-[#1A3C5E] text-white flex items-center justify-center text-xs font-bold">
              {admin?.name?.charAt(0) || 'R'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1A3C5E] truncate">{admin?.name || 'Ravi Sharma'}</p>
              <p className="text-[10px] text-slate-400">Head Trainer / Owner</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1A3C5E] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
          </div>
          <span className="text-base font-black text-[#1A3C5E]">Admin Portal</span>
        </div>

        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-slate-600">
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col justify-between">
            <div>
              <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200">
                <span className="font-black text-[#1A3C5E] text-sm">Admin Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold ${
                      isActive(item.path, item.exact) ? 'bg-[#1A3C5E] text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Viewport */}
      <main className="md:ml-64 pt-16 md:pt-8 pb-16 px-4 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
