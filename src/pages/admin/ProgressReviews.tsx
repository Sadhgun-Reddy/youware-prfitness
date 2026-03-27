import { useState } from 'react';
import { mockProgress } from '../../data/mock';
import { BarChart3, CheckCircle, Clock, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function ProgressReviews() {
  const { submissionId } = useParams<{ submissionId?: string }>();

  if (submissionId) {
    return <SubmissionDetail id={submissionId} />;
  }

  const unreviewed = mockProgress.filter(p => !p.reviewed);
  const reviewed = mockProgress.filter(p => p.reviewed);
  const [tab, setTab] = useState<'pending' | 'reviewed'>('pending');
  const list = tab === 'pending' ? unreviewed : reviewed;

  return (
    <div>
      <h1 className="page-header mb-6">Progress Submissions</h1>

      <div className="flex gap-1 bg-offwhite-200 rounded-xl p-1 mb-6">
        <button onClick={() => setTab('pending')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'pending' ? 'bg-white text-navy-600 shadow-sm' : 'text-navy-600/50'}`}>
          Pending ({unreviewed.length})
        </button>
        <button onClick={() => setTab('reviewed')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'reviewed' ? 'bg-white text-navy-600 shadow-sm' : 'text-navy-600/50'}`}>
          Reviewed ({reviewed.length})
        </button>
      </div>

      <div className="space-y-2">
        {list.map(p => (
          <Link key={p.id} to={`/admin/progress/${p.id}`} className="card-hover block group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-600/10 flex items-center justify-center text-sm font-bold text-navy-600">
                {p.memberName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy-600">{p.memberName}</p>
                <p className="text-xs text-navy-600/40">Week of {p.weekStartDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-navy-600">{p.weight}<span className="text-xs font-normal text-navy-600/40"> kg</span></p>
                {p.reviewed ? (
                  <span className="badge-success">Reviewed</span>
                ) : (
                  <span className="badge-error">New</span>
                )}
              </div>
            </div>
          </Link>
        ))}
        {list.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-success/30 mx-auto mb-3" />
            <p className="text-navy-600/40">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SubmissionDetail({ id }: { id: string }) {
  const submission = mockProgress.find(p => p.id === id);
  const [remarks, setRemarks] = useState('');
  const [saved, setSaved] = useState(false);

  if (!submission) {
    return (
      <div className="text-center py-16">
        <p className="text-navy-600/40">Submission not found</p>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/progress" className="p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-navy-600" />
        </Link>
        <div className="flex-1">
          <h1 className="page-header">{submission.memberName}</h1>
          <p className="text-sm text-navy-600/50">Week of {submission.weekStartDate}</p>
        </div>
        {submission.reviewed ? (
          <span className="badge-success">Reviewed</span>
        ) : (
          <span className="badge-error">Pending Review</span>
        )}
      </div>

      {/* Measurements */}
      <div className="card !p-5 mb-4">
        <h3 className="section-title mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Measurements</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Weight', value: `${submission.weight} kg` },
            { label: 'Chest', value: submission.chest ? `${submission.chest} in` : '—' },
            { label: 'Waist', value: submission.waist ? `${submission.waist} in` : '—' },
            { label: 'Hips', value: submission.hips ? `${submission.hips} in` : '—' },
            { label: 'Arms', value: submission.arms ? `${submission.arms} in` : '—' },
            { label: 'Thighs', value: submission.thighs ? `${submission.thighs} in` : '—' },
          ].map(m => (
            <div key={m.label} className="bg-offwhite-100 rounded-xl p-3 text-center">
              <p className="text-xs text-navy-600/40">{m.label}</p>
              <p className="text-lg font-bold text-navy-600">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Placeholder */}
      <div className="card !p-5 mb-4">
        <h3 className="section-title mb-3">Progress Photos</h3>
        <div className="grid grid-cols-3 gap-3">
          {['Front', 'Side', 'Back'].map(view => (
            <div key={view} className="aspect-[3/4] rounded-xl bg-offwhite-200 flex items-center justify-center">
              <span className="text-xs text-navy-600/30">{view}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Remarks */}
      {submission.trainerRemarks && (
        <div className="card !p-5 bg-success-light/30 mb-4">
          <p className="text-sm font-medium text-success flex items-center gap-2 mb-1"><MessageSquare className="w-4 h-4" /> Previous Remarks</p>
          <p className="text-sm text-navy-600/60">{submission.trainerRemarks}</p>
        </div>
      )}

      {/* Add Remarks */}
      {!submission.reviewed && (
        <div className="card !p-5">
          <h3 className="section-title mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Add Trainer Remarks</h3>
          <textarea className="input-field min-h-[100px] resize-none" placeholder="Provide feedback on this member's progress..." value={remarks} onChange={e => setRemarks(e.target.value)} />
          <button onClick={handleSave} className="btn-primary w-full mt-3">
            {saved ? 'Saved ✓' : 'Save Remarks'}
          </button>
        </div>
      )}

      {/* Submitted info */}
      <div className="flex items-center gap-1 mt-4 text-xs text-navy-600/30">
        <Clock className="w-3 h-3" />
        Submitted {new Date(submission.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
