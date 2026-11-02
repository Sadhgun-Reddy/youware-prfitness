import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

export default function Remarks() {
  const { user } = useAuthStore();
  const { remarks } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    planType: 'personal_training' as const,
  };

  const isPT = currentMember.planType === 'personal_training';
  const [filter, setFilter] = useState<'all' | 'new'>('all');

  // Filter remarks for current member and sort reverse chronological
  const memberRemarks = useMemo(() => {
    const list = remarks
      .filter(r => r.memberId === currentMember.id || r.memberName === currentMember.name)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filter === 'new') {
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      return list.filter(r => new Date(r.createdAt).getTime() > oneDayAgo || r.isNew);
    }
    return list;
  }, [remarks, currentMember, filter]);

  if (!isPT) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-orange-100 text-[#E87722] rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <span className="material-symbols-outlined text-4xl">chat</span>
        </div>
        <div>
          <span className="px-3 py-1 bg-orange-100 text-[#E87722] text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
            Personal Training Feature
          </span>
          <h1 className="text-3xl font-black text-[#1A3C5E]">Trainer Remarks & Directives</h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
            Direct personal remarks, form critiques, and weekly feedback from Coach Ravi Sharma are exclusively delivered to <span className="font-bold text-slate-800">Personal Training members</span>.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/register/plan-select"
            className="px-8 py-3.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 active:scale-95"
          >
            <span>Upgrade to Personal Training (₹3,500/mo)</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#E87722]">
              <span className="material-symbols-outlined text-xs">verified</span>
              Personal Coaching Channel
            </span>
            <span className="text-xs text-slate-400">From Coach Ravi Sharma</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Trainer Remarks</h1>
          <p className="text-xs text-slate-500 mt-1">Coaching observations, technique cues, and motivational notes</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#1A3C5E] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Notes ({remarks.filter(r => r.memberId === currentMember.id).length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'new'
                ? 'bg-[#E87722] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            New (&lt; 24h)
          </button>
        </div>
      </div>

      {/* Trainer Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-[#1A3C5E] text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-md">
          RS
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-[#1A3C5E]">Coach Ravi Sharma</h2>
            <span className="px-2 py-0.5 bg-orange-100 text-[#E87722] text-[10px] font-bold rounded-full uppercase">Head Trainer</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            "I review your check-ins, weekly photos, and lifts every Sunday and Wednesday. Check this feed regularly for training adjustments."
          </p>
        </div>
      </div>

      {/* Remarks Feed */}
      <div className="space-y-4">
        {memberRemarks.map(remark => {
          const isUnder24Hours = (Date.now() - new Date(remark.createdAt).getTime()) < 24 * 60 * 60 * 1000 || remark.isNew;

          return (
            <div
              key={remark.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border transition-all ${
                isUnder24Hours
                  ? 'border-2 border-[#E87722] shadow-orange-500/5 bg-orange-50/10'
                  : 'border-slate-200/80'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E87722] text-xl">chat_bubble</span>
                  <span className="font-bold text-[#1A3C5E] text-sm">Direct Coaching Note</span>
                  {isUnder24Hours && (
                    <span className="px-2.5 py-0.5 bg-[#E87722] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
                      New
                    </span>
                  )}
                </div>

                <span className="text-xs text-slate-400 font-medium">
                  {new Date(remark.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <p className="text-sm text-slate-800 leading-relaxed font-medium pl-7">
                "{remark.content}"
              </p>
            </div>
          );
        })}

        {memberRemarks.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">chat</span>
            <p className="text-sm font-bold text-slate-600">No trainer remarks found.</p>
            <p className="text-xs text-slate-400 mt-1">
              {filter === 'new'
                ? 'No remarks left in the last 24 hours.'
                : 'Coach Ravi Sharma will post observations here following your weekly progress submission.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
