import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

export default function ProgressHistory() {
  const { user } = useAuthStore();
  const { progressSubmissions } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
  };

  const submissions = useMemo(() => {
    return progressSubmissions
      .filter(p => p.memberId === currentMember.id || p.memberName === currentMember.name)
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [progressSubmissions, currentMember]);

  const [expandedId, setExpandedId] = useState<string | null>(submissions[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/progress" className="text-xs font-bold text-slate-400 hover:text-[#1A3C5E] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Progress Hub
            </Link>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Progress Submission History</h1>
          <p className="text-xs text-slate-500 mt-1">Archived weekly body weight, measurements, and coach feedback</p>
        </div>

        <Link
          to="/progress/submit"
          className="px-5 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto active:scale-95"
        >
          <span className="material-symbols-outlined text-base">add_a_photo</span>
          Submit This Week
        </Link>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((sub, index) => {
          const isExpanded = expandedId === sub.id;
          const weekNumber = submissions.length - index;

          return (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
            >
              {/* Card Header Row */}
              <div
                onClick={() => toggleExpand(sub.id)}
                className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center flex-shrink-0 font-black text-sm">
                    W{weekNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-base text-[#1A3C5E]">Week {weekNumber} Submission</h3>
                      {sub.reviewed ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Reviewed ✓
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Pending Review
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      Submitted on {new Date(sub.submittedAt).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-black text-[#1A3C5E]">{sub.weight} kg</p>
                    <p className="text-[11px] text-slate-400">Scale Weight</p>
                  </div>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </div>

              {/* Expandable Content Area */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
                  {/* Measurements Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Scale Weight</span>
                      <span className="text-base font-bold text-[#1A3C5E]">{sub.weight} kg</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Chest</span>
                      <span className="text-base font-bold text-[#1A3C5E]">{sub.chest ? `${sub.chest} cm` : 'Not recorded'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Waist</span>
                      <span className="text-base font-bold text-[#1A3C5E]">{sub.waist ? `${sub.waist} cm` : 'Not recorded'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Hips</span>
                      <span className="text-base font-bold text-[#1A3C5E]">{sub.hips ? `${sub.hips} cm` : 'Not recorded'}</span>
                    </div>
                  </div>

                  {/* Photos Gallery */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Progress Photos</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {sub.photoFront && (
                        <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={sub.photoFront} alt="Front Pose" className="w-full aspect-[3/4] object-cover" />
                          <div className="p-2 text-center text-[11px] font-semibold text-slate-600 bg-white">Front Pose</div>
                        </div>
                      )}
                      {sub.photoSide && (
                        <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={sub.photoSide} alt="Side Pose" className="w-full aspect-[3/4] object-cover" />
                          <div className="p-2 text-center text-[11px] font-semibold text-slate-600 bg-white">Side Profile</div>
                        </div>
                      )}
                      {sub.photoBack && (
                        <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={sub.photoBack} alt="Back Pose" className="w-full aspect-[3/4] object-cover" />
                          <div className="p-2 text-center text-[11px] font-semibold text-slate-600 bg-white">Back Pose</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trainer Feedback Remark */}
                  <div className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#E87722] text-lg">chat</span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3C5E]">Coach Feedback & Directives</h4>
                    </div>
                    {sub.trainerRemarks ? (
                      <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                        "{sub.trainerRemarks}"
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        No coach remarks added yet. Coach Ravi will review this submission within 24 hours.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {submissions.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">leaderboard</span>
            <p className="text-sm font-bold text-slate-600">No progress submissions logged yet.</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">Start recording on Sundays to build your physique timeline.</p>
            <Link
              to="/progress/submit"
              className="px-5 py-2.5 bg-[#E87722] text-white rounded-xl text-xs font-bold inline-block"
            >
              Submit First Entry
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
