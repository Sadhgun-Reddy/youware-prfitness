import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

export default function Progress() {
  const { user } = useAuthStore();
  const { progressSubmissions } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    weight: 72,
  };

  const submissions = useMemo(() => {
    return progressSubmissions.filter(
      p => p.memberId === currentMember.id || p.memberName === currentMember.name
    ).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [progressSubmissions, currentMember]);

  // Check if current week is submitted
  const today = new Date();
  const isSunday = today.getDay() === 0;
  const latestSubmission = submissions[0];
  const hasSubmittedThisWeek = useMemo(() => {
    if (!latestSubmission) return false;
    const diff = (today.getTime() - new Date(latestSubmission.submittedAt).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }, [latestSubmission, today]);

  // Comparison Selector State (F-008: compare any 2 weeks)
  const [compareWeek1, setCompareWeek1] = useState<string>(submissions[submissions.length - 1]?.id || '');
  const [compareWeek2, setCompareWeek2] = useState<string>(submissions[0]?.id || '');

  const sub1 = submissions.find(s => s.id === compareWeek1) || submissions[submissions.length - 1];
  const sub2 = submissions.find(s => s.id === compareWeek2) || submissions[0];

  // Weight Trend Data
  const weightTrend = useMemo(() => {
    return [...submissions].reverse().map((s, idx) => ({
      weekLabel: `W${idx + 1}`,
      date: new Date(s.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      weight: s.weight,
    }));
  }, [submissions]);

  const startWeight = weightTrend[0]?.weight || currentMember.weight || 72;
  const currentWeight = latestSubmission?.weight || currentMember.weight || 72;
  const totalChange = (currentWeight - startWeight).toFixed(1);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722]">leaderboard</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Physical Evolution</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Progress Tracking Hub</h1>
          <p className="text-xs text-slate-500 mt-1">Structured weekly body weight and photographic records</p>
        </div>

        <Link
          to="/progress/submit"
          className="px-5 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto active:scale-95"
        >
          <span className="material-symbols-outlined text-base">add_a_photo</span>
          {hasSubmittedThisWeek ? 'Log Another Entry' : 'Submit Sunday Progress'}
        </Link>
      </div>

      {/* Status Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            hasSubmittedThisWeek ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-[#E87722]'
          }`}>
            <span className="material-symbols-outlined text-2xl font-bold">
              {hasSubmittedThisWeek ? 'task_alt' : 'schedule'}
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A3C5E]">
              {hasSubmittedThisWeek ? 'This Week’s Progress Submitted ✓' : isSunday ? 'Progress Submission Due Today!' : 'Next Submission Window Opens Sunday'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {hasSubmittedThisWeek
                ? `Logged at ${new Date(latestSubmission.submittedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} • Reviewed by Coach Ravi`
                : 'Upload weight and photos on Sundays between 12:01 AM and 11:59 PM.'}
            </p>
          </div>
        </div>

        <Link
          to="/progress/submit"
          className="px-4 py-2 border border-[#E87722] text-[#E87722] hover:bg-orange-50 rounded-xl text-xs font-bold transition-colors"
        >
          {hasSubmittedThisWeek ? 'Update Record' : 'Open Submission Form'}
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Starting Weight</span>
          <p className="text-2xl font-black text-[#1A3C5E]">{startWeight} kg</p>
          <span className="text-xs text-slate-400 mt-1 block">Baseline check-in</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Current Weight</span>
          <p className="text-2xl font-black text-[#1A3C5E]">{currentWeight} kg</p>
          <span className="text-xs text-slate-400 mt-1 block">Latest recorded scale weight</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Net Change</span>
          <p className={`text-2xl font-black ${Number(totalChange) < 0 ? 'text-[#1E7A45]' : 'text-[#E87722]'}`}>
            {totalChange} kg
          </p>
          <span className="text-xs text-slate-400 mt-1 block">{submissions.length} Total Weeks Logged</span>
        </div>
      </div>

      {/* Visual Weight Trend (PRD F-008: Line / Bar chart of body weight over time) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-black text-[#1A3C5E]">Body Weight Trajectory</h3>
            <p className="text-xs text-slate-500">Scale weight across all submitted weeks</p>
          </div>
          <span className="text-xs font-bold bg-blue-50 text-[#1A3C5E] px-3 py-1 rounded-full">
            Unit: Kilograms (kg)
          </span>
        </div>

        {weightTrend.length > 0 ? (
          <div>
            <div className="h-48 flex items-end gap-3 sm:gap-6 border-b border-slate-200 pb-2 px-2">
              {weightTrend.map((pt, idx) => {
                const minW = Math.min(...weightTrend.map(w => w.weight)) - 2;
                const maxW = Math.max(...weightTrend.map(w => w.weight)) + 2;
                const range = Math.max(1, maxW - minW);
                const heightPct = Math.max(20, Math.min(100, ((pt.weight - minW) / range) * 100));
                const isLatest = idx === weightTrend.length - 1;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <span className="text-[11px] font-bold text-slate-700 opacity-90 group-hover:opacity-100">
                      {pt.weight}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-xl transition-all ${
                        isLatest
                          ? 'bg-[#E87722] shadow-md shadow-orange-500/20'
                          : 'bg-[#1A3C5E] hover:bg-[#15324E]'
                      }`}
                    />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {pt.weekLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-10">No weight records logged yet.</p>
        )}
      </div>

      {/* Side-by-Side Photo Comparison Tool (PRD F-008: Comparison view allows side-by-side display of any two weeks' photos) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold text-[#E87722] uppercase tracking-wider">Visual Verification</span>
            <h3 className="text-lg font-black text-[#1A3C5E]">Side-by-Side Photo Comparison</h3>
            <p className="text-xs text-slate-500">Compare physique transformation across any two weeks</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-slate-500">Before:</span>
              <select
                value={compareWeek1}
                onChange={(e) => setCompareWeek1(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#1A3C5E]"
              >
                {submissions.map((s, i) => (
                  <option key={s.id} value={s.id}>
                    Week {submissions.length - i} ({s.weight} kg)
                  </option>
                ))}
              </select>
            </div>

            <span className="text-slate-300 font-bold">vs</span>

            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-slate-500">After:</span>
              <select
                value={compareWeek2}
                onChange={(e) => setCompareWeek2(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-[#1A3C5E]"
              >
                {submissions.map((s, i) => (
                  <option key={s.id} value={s.id}>
                    Week {submissions.length - i} ({s.weight} kg)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {sub1 && sub2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-0.5 bg-slate-200 text-slate-800 text-xs font-bold rounded-md">
                  Baseline / Before
                </span>
                <span className="text-xs font-bold text-[#1A3C5E]">{sub1.weight} kg</span>
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-200 mb-3 border border-slate-300">
                <img
                  src={sub1.photoFront || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=500'}
                  alt="Before Pose"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center font-medium">
                Logged on {new Date(sub1.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            {/* After Card */}
            <div className="bg-orange-50/40 p-5 rounded-2xl border border-orange-200/80">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-0.5 bg-orange-100 text-[#E87722] text-xs font-bold rounded-md">
                  Current / After
                </span>
                <span className="text-xs font-bold text-[#1A3C5E]">{sub2.weight} kg</span>
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-200 mb-3 border border-orange-200">
                <img
                  src={sub2.photoFront || 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=500'}
                  alt="After Pose"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center font-medium">
                Logged on {new Date(sub2.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-6">Log at least two weekly submissions to compare photos.</p>
        )}
      </div>

      {/* Historical Submissions Link */}
      <div className="text-center pt-2">
        <Link
          to="/progress/history"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#E87722] hover:underline"
        >
          View Full Detailed Progress Logs History
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
