import { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { BarChart3, CheckCircle, Clock, MessageSquare, ArrowLeft, Save, Eye, ChevronRight, User, AlertCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ProgressReviews() {
  const { submissionId } = useParams<{ submissionId?: string }>();
  const { progressSubmissions } = useDataStore();

  const unreviewed = progressSubmissions.filter(p => !p.reviewed);
  const reviewed = progressSubmissions.filter(p => p.reviewed);
  const [tab, setTab] = useState<'pending' | 'reviewed'>('pending');
  const list = tab === 'pending' ? unreviewed : reviewed;

  return (
    <div className="max-w-4xl space-y-6">
      {submissionId ? (
        <SubmissionDetail id={submissionId} />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-black text-[#1A3C5E] tracking-tight">Weekly Progress Reviews</h1>
              <p className="text-xs text-slate-500">
                Review Sunday progress check-ins, measurements, and photos submitted by PT members.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                {unreviewed.length} Pending Review
              </span>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setTab('pending')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'pending' ? 'bg-white text-[#1A3C5E] shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Pending ({unreviewed.length})
            </button>
            <button
              onClick={() => setTab('reviewed')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'reviewed' ? 'bg-white text-[#1A3C5E] shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Reviewed ({reviewed.length})
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {list.map(p => (
              <Link
                key={p.id}
                to={`/admin/progress/${p.id}`}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1A3C5E] flex items-center justify-center font-bold text-sm">
                    {p.memberName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1A3C5E] group-hover:text-[#E87722] transition-colors">
                      {p.memberName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Week of {new Date(p.weekStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-black text-[#1A3C5E]">
                      {p.weight} <span className="text-xs font-normal text-slate-400">kg</span>
                    </p>
                    {p.reviewed ? (
                      <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Reviewed
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Needs Feedback
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1A3C5E] transition-colors" />
                </div>
              </Link>
            ))}

            {list.length === 0 && (
              <div className="text-center py-16 px-4">
                <CheckCircle className="w-12 h-12 text-emerald-400/50 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-700">
                  {tab === 'pending' ? 'All caught up!' : 'No reviewed submissions yet'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {tab === 'pending'
                    ? 'No pending Sunday submissions waiting for trainer evaluation.'
                    : 'Completed reviews will appear in this history tab.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function SubmissionDetail({ id }: { id: string }) {
  const navigate = useNavigate();
  const { progressSubmissions, updateProgressSubmission, addRemark } = useDataStore();
  const submission = progressSubmissions.find(p => p.id === id);
  const [remarks, setRemarks] = useState(submission?.trainerRemarks || '');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!submission) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <p className="text-sm font-bold text-slate-700">Submission not found</p>
        <button
          onClick={() => navigate('/admin/progress')}
          className="mt-4 px-4 py-2 bg-[#1A3C5E] text-white text-xs font-bold rounded-lg hover:bg-[#15324f]"
        >
          Return to Progress List
        </button>
      </div>
    );
  }

  const handleSave = () => {
    if (!remarks.trim()) {
      alert('Please enter your remarks for this member before saving.');
      return;
    }
    setIsSaving(true);

    // 1. Update the progress submission
    updateProgressSubmission(submission.id, {
      trainerRemarks: remarks,
      reviewed: true,
      reviewedAt: new Date().toISOString(),
    });

    // 2. Also push to member's remarks timeline so they get notified
    addRemark({
      memberId: submission.memberId,
      trainerId: 'admin-1',
      trainerName: 'Coach Ravi Sharma',
      text: `Progress Review (${new Date(submission.weekStartDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}): ${remarks}`,
    });

    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin/progress');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/progress')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#1A3C5E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to submissions
        </button>
        {submission.reviewed && (
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Reviewed
          </span>
        )}
      </div>

      {/* Member Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1A3C5E] flex items-center justify-center font-bold text-base">
            {submission.memberName.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-black text-[#1A3C5E]">{submission.memberName}</h1>
            <p className="text-xs text-slate-500">
              Week of {new Date(submission.weekStartDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs uppercase font-bold text-slate-400">Current Weight</p>
          <p className="text-3xl font-black text-[#1A3C5E]">
            {submission.weight} <span className="text-sm font-normal text-slate-400">kg</span>
          </p>
        </div>
      </div>

      {/* Measurements Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#1A3C5E] flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#E87722]" /> Body Measurements
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-slate-400">Chest</p>
            <p className="text-base font-bold text-[#1A3C5E] mt-0.5">
              {submission.chest ? `${submission.chest} in` : '—'}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-slate-400">Waist</p>
            <p className="text-base font-bold text-[#1A3C5E] mt-0.5">
              {submission.waist ? `${submission.waist} in` : '—'}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-slate-400">Hips</p>
            <p className="text-base font-bold text-[#1A3C5E] mt-0.5">
              {submission.hips ? `${submission.hips} in` : '—'}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-slate-400">Arms</p>
            <p className="text-base font-bold text-[#1A3C5E] mt-0.5">
              {submission.arms ? `${submission.arms} in` : '—'}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
            <p className="text-[10px] uppercase font-bold text-slate-400">Thighs</p>
            <p className="text-base font-bold text-[#1A3C5E] mt-0.5">
              {submission.thighs ? `${submission.thighs} in` : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Photos Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#1A3C5E]">Progress Photos (Front, Side, Back)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Front Pose', img: submission.photoFront },
            { label: 'Side Pose', img: submission.photoSide },
            { label: 'Back Pose', img: submission.photoBack },
          ].map(p => (
            <div key={p.label} className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
                {p.label}
              </span>
              <div
                onClick={() => p.img && setSelectedPhoto(p.img)}
                className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group cursor-pointer"
              >
                {p.img ? (
                  <>
                    <img src={p.img} alt={p.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                      <Eye className="w-4 h-4" /> Click to enlarge
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">
                    Not Provided
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Remarks Composer */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#1A3C5E] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#E87722]" /> Trainer Feedback & Directives
        </h3>
        <p className="text-xs text-slate-500">
          Your feedback will be delivered directly to {submission.memberName}'s Remarks feed and saved on this submission.
        </p>

        <textarea
          rows={4}
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
          placeholder="e.g. Excellent waist reduction this week! Let's maintain caloric deficit and increase incline walking to 20 minutes post workout..."
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white transition-all resize-none"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#E87722] hover:bg-[#d66c1d] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <span>Saving feedback...</span>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Feedback & Mark Reviewed
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            <img src={selectedPhoto} alt="Full view" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
