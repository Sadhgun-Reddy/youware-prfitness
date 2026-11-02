import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';
import { Users, MapPin, BarChart3, Clock, AlertTriangle, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const { getAdminStats, checkIns, progressSubmissions, members, updateMember } = useDataStore();
  const stats = getAdminStats();

  const kpiCards = [
    { label: 'Active Members', value: stats.activeMembers, icon: Users, color: 'bg-[#1A3C5E]', link: '/admin/members' },
    { label: 'PT Tier Subscribers', value: stats.ptPlanMembers, icon: ShieldCheck, color: 'bg-[#E87722]', link: '/admin/members' },
    { label: "Today's Check-Ins", value: stats.todayCheckIns, icon: MapPin, color: 'bg-[#1E7A45]', link: '/admin/checkins' },
    { label: 'Pending Reviews', value: stats.pendingReviews, icon: BarChart3, color: 'bg-[#C0392B]', link: '/admin/progress' },
    { label: 'Expiring in 7 Days', value: stats.expiringSoon, icon: Clock, color: 'bg-amber-500', link: '/admin/members' },
  ];

  const todayStr = new Date().toDateString();
  const todayCheckIns = useMemo(() => {
    return checkIns
      .filter(c => {
        const d = new Date(c.checkedInAt);
        return !isNaN(d.getTime()) && d.toDateString() === todayStr;
      })
      .slice(0, 10);
  }, [checkIns, todayStr]);

  const pendingSubmissions = useMemo(() => {
    return progressSubmissions.filter(p => !p.reviewed).slice(0, 10);
  }, [progressSubmissions]);

  const expiringMembers = useMemo(() => {
    const now = new Date();
    return members.filter(m => {
      const exp = new Date(m.membershipEndDate);
      const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7 && diff >= 0 && m.status === 'active';
    });
  }, [members]);

  const handleNotifyRenewal = (memberId: string, memberName: string) => {
    alert(`Renewal notification prompt dispatched to ${memberName}.`);
  };

  const handleExtendExpiry = (memberId: string, currentEnd: string) => {
    const cur = new Date(currentEnd);
    const newEnd = new Date(cur.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    updateMember(memberId, { membershipEndDate: newEnd });
    alert(`Extended membership for 7 grace days until ${newEnd}.`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gym Operations Live Feed</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Admin Overview</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time gym attendance, pending reviews, and membership metrics</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/members"
            className="px-4 py-2 bg-[#1A3C5E] text-white rounded-xl text-xs font-bold hover:bg-[#15324E] transition-colors"
          >
            Manage Members
          </Link>
          <Link
            to="/admin/workout-plans"
            className="px-4 py-2 bg-[#E87722] text-white rounded-xl text-xs font-bold hover:bg-[#D06A1C] transition-colors"
          >
            Workout Builder
          </Link>
        </div>
      </div>

      {/* KPI Cards (PRD F-016: 5 Clickable KPI Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiCards.map(kpi => (
          <Link
            key={kpi.label}
            to={kpi.link}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${kpi.color} text-white flex items-center justify-center shadow-sm`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1A3C5E] group-hover:translate-x-0.5 transition-all" />
            </div>

            <div>
              <p className="text-3xl font-black text-[#1A3C5E] mb-1">{kpi.value}</p>
              <p className="text-xs font-semibold text-slate-500 leading-tight">{kpi.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Split View: Live Check-Ins Feed + Pending Progress Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Today's Check-Ins (F-006, US-008) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#1E7A45] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#1A3C5E]">Today's Live Check-Ins</h3>
                <p className="text-[11px] text-slate-400">Members physically verified at gym today</p>
              </div>
            </div>

            <Link to="/admin/checkins" className="text-xs font-bold text-[#E87722] hover:underline">
              View All ({checkIns.length})
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {todayCheckIns.map(ci => (
              <div key={ci.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A3C5E] text-white flex items-center justify-center font-bold text-xs">
                    {ci.memberName?.charAt(0) || 'M'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A3C5E]">{ci.memberName}</p>
                    <p className="text-[11px] text-slate-400">
                      Logged at {new Date(ci.checkedInAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-lg border border-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Verified
                </span>
              </div>
            ))}

            {todayCheckIns.length === 0 && (
              <div className="py-12 text-center text-slate-400 space-y-1">
                <MapPin className="w-8 h-8 mx-auto opacity-30 mb-2" />
                <p className="text-xs font-bold text-slate-600">No member check-ins recorded yet today.</p>
                <p className="text-[11px]">As members check in via the member app, they appear here live.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Pending Weekly Progress Submissions (F-009, US-012) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#E87722] flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#1A3C5E]">Pending Progress</h3>
                <p className="text-[11px] text-slate-400">Weekly logs awaiting feedback</p>
              </div>
            </div>

            <Link to="/admin/progress" className="text-xs font-bold text-[#E87722] hover:underline">
              Reviews Hub
            </Link>
          </div>

          <div className="space-y-2.5">
            {pendingSubmissions.map(p => (
              <Link
                key={p.id}
                to={`/admin/progress/${p.id}`}
                className="p-3.5 rounded-xl border border-slate-200/70 hover:border-[#1A3C5E] hover:bg-slate-50 transition-all flex items-center justify-between gap-3 group block"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-bold text-[#1A3C5E]">{p.memberName}</p>
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded uppercase">
                      New
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Week of {p.weekStartDate} • Scale: <span className="font-bold text-slate-700">{p.weight} kg</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#E87722] group-hover:translate-x-0.5 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Review</span>
                </div>
              </Link>
            ))}

            {pendingSubmissions.length === 0 && (
              <div className="py-12 text-center text-slate-400 space-y-1">
                <BarChart3 className="w-8 h-8 mx-auto opacity-30 mb-2" />
                <p className="text-xs font-bold text-[#1E7A45]">All caught up!</p>
                <p className="text-[11px]">All submitted progress logs have been reviewed with directives.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expiring Soon Action Bar (F-018: surfaced with Notify button) */}
      {expiringMembers.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <h3 className="text-sm font-black uppercase tracking-wider">
                Expiring Memberships ({expiringMembers.length} Members Within 7 Days)
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {expiringMembers.map(m => (
              <div key={m.id} className="bg-white p-4 rounded-xl border border-amber-200 flex flex-col justify-between gap-3 shadow-sm">
                <div>
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-bold text-[#1A3C5E]">{m.name}</p>
                    <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
                      Expires {new Date(m.membershipEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 capitalize">{m.planType.replace('_', ' ')}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleNotifyRenewal(m.id, m.name)}
                    className="flex-1 py-1.5 bg-[#E87722] hover:bg-[#D06A1C] text-white text-[11px] font-bold rounded-lg transition-colors"
                  >
                    Send Renewal Prompt
                  </button>
                  <button
                    onClick={() => handleExtendExpiry(m.id, m.membershipEndDate)}
                    className="py-1.5 px-2.5 border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 rounded-lg transition-colors"
                    title="Add 7 Grace Days"
                  >
                    +7d Grace
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
