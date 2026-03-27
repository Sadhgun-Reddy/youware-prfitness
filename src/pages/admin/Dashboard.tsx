import { useDataStore } from '../../store/useDataStore';
import { Users, MapPin, BarChart3, Clock, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { getAdminStats, checkIns, progressSubmissions, members } = useDataStore();
  const stats = getAdminStats();

  const kpiCards = [
    { label: 'Total Members', value: stats.totalMembers, icon: Users, color: 'bg-navy-600', change: '' },
    { label: 'Active Members', value: stats.activeMembers, icon: CheckCircle, color: 'bg-success', change: '' },
    { label: 'Today Check-Ins', value: stats.todayCheckIns, icon: MapPin, color: 'bg-accent-500', change: '' },
    { label: 'Pending Reviews', value: stats.pendingReviews, icon: BarChart3, color: 'bg-error', change: '' },
    { label: 'Expiring Soon', value: stats.expiringSoon, icon: Clock, color: 'bg-amber-500', change: '7 days' },
  ];

  const todayStr = new Date().toDateString();
  const recentCheckIns = checkIns.filter(c => new Date(c.checkedInAt).toDateString() === todayStr).slice(0, 10);
  const pendingReviews = progressSubmissions.filter(p => !p.reviewed).slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-600">Overview</h1>
          <p className="text-sm text-navy-600/50">Welcome back. Here's what's happening today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {kpiCards.map(kpi => (
          <div key={kpi.label} className="card !p-4">
            <div className={`w-9 h-9 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-2xl font-bold text-navy-600">{kpi.value}</p>
            <p className="text-xs text-navy-600/50">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Split View: Check-ins + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Check-ins */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2"><MapPin className="w-4 h-4" /> Today's Check-ins</h3>
            <Link to="/admin/checkins" className="text-xs text-accent-500 font-medium hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {recentCheckIns.map(ci => (
              <div key={ci.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-offwhite-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-navy-600/10 flex items-center justify-center text-sm font-bold text-navy-600">
                  {ci.memberName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-600 truncate">{ci.memberName}</p>
                  <p className="text-xs text-navy-600/40">{new Date(ci.checkedInAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
            ))}
            {recentCheckIns.length === 0 && <p className="text-sm text-navy-600/40 text-center py-4">No check-ins yet today</p>}
          </div>
        </div>

        {/* Pending Progress Reviews */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Pending Reviews</h3>
            <Link to="/admin/progress" className="text-xs text-accent-500 font-medium hover:underline">View All</Link>
          </div>
          <div className="space-y-2">
            {pendingReviews.map(p => (
              <Link key={p.id} to={`/admin/progress/${p.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-offwhite-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-accent-50 flex items-center justify-center text-sm font-bold text-accent-700">
                  {p.memberName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-600 truncate">{p.memberName}</p>
                  <p className="text-xs text-navy-600/40">Week of {p.weekStartDate}</p>
                </div>
                <Eye className="w-4 h-4 text-navy-600/30" />
              </Link>
            ))}
            {pendingReviews.length === 0 && (
              <p className="text-sm text-navy-600/40 text-center py-4">All reviews caught up! 🎉</p>
            )}
          </div>
        </div>
      </div>

      {/* Expiring Members */}
      {stats.expiringSoon > 0 && (
        <div className="card !p-5 bg-amber-50 border-amber-200/50 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="font-semibold text-amber-800">Expiring Soon</h3>
          </div>
          <div className="space-y-2">
            {members.filter(m => {
              const exp = new Date(m.membershipEndDate);
              const diff = (exp.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
              return diff <= 7 && diff >= 0 && m.status === 'active';
            }).map(u => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-amber-800 font-medium">{u.name}</span>
                <span className="text-amber-600/70">Expires {new Date(u.membershipEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
