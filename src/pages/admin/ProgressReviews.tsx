import { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { BarChart3, CheckCircle, Clock, MessageSquare, ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ProgressReviews() {
  const { submissionId } = useParams<{ submissionId?: string }>();
  const { progressSubmissions } = useDataStore();

  const unreviewed = progressSubmissions.filter(p => !p.reviewed);
  const reviewed = progressSubmissions.filter(p => p.reviewed);
  const [tab, setTab] = useState<'pending' | 'reviewed'>('pending');
  const list = tab === 'pending' ? unreviewed : reviewed;

  return (
    <div>
      {submissionId ? (
        <SubmissionDetail id={submissionId} />
      ) : (
        <>
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
                    <p className="text-xs text-navy-600/40">Week of {new Date(p.weekStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
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
        </>
      )}
    </div>
  );
}

function SubmissionDetail({ id }: { id: string }) {
  const navigate = useNavigate();
  const { progressSubmissions, updateProgressSubmission } = useDataStore();
  const submission = progressSubmissions.find(p => p.id === id);
  const [remarks, setRemarks] = useState(submission?.trainerRemarks || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!submission) {
    return (
      <div className="text-center py-16">
        <p className="text-navy-600/40">Submission not found</p>
        <button onClick={() => navigate('/admin/progress')} className="text-accent-500 font-bold mt-4">Go Back</button>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaving(true);
    updateProgressSubmission(submission.id, {
      trainerRemarks: remarks,
      reviewed: true,
      reviewedAt: new Date().toISOString()
    });
    
    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin/progress');
    }, 800);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/admin/progress')} className="p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-navy-600" />
        </button>
        <div className="flex-1">
          <h1 className="page-header">{submission.memberName}</h1>
          <p className="text-sm text-navy-600/50">Week of {new Date(submission.weekStartDate).toLocaleDateString()}</p>
        </div>
        {submission.reviewed ? (
          <div className="flex items-center gap-2">
            <span className="badge-success">Reviewed</span>
            <button 
              onClick={() => {
                updateProgressSubmission(submission.id, { reviewed: false });
                navigate('/admin/progress');
              }}
              className="text-[10px] text-navy-600/30 hover:text-navy-600 underline"
            >
              Undo
            </button>
          </div>
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

      {/* Photos */}
      <div className="card !p-5 mb-4">
        <h3 className="section-title mb-3">Progress Photos</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Front', img: submission.photoFront },
            { label: 'Side', img: submission.photoSide },
            { label: 'Back', img: submission.photoBack }
          ].map(photo => (
            <div key={photo.label} className="space-y-2">
              <p className="text-[10px] font-bold text-navy-600/40 uppercase tracking-widest text-center">{photo.label}</p>
              <div className="aspect-[3/4] bg-offwhite-100 rounded-xl overflow-hidden border border-offwhite-300">
                {photo.img ? (
                  <img src={photo.img} alt={photo.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-navy-600/20 italic">No Photo</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Remarks */}
      <div className="card !p-5">
        <h3 className="section-title mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> 
          {submission.reviewed ? "Trainer Remarks" : "Add Trainer Remarks"}
        </h3>
        <textarea 
          className="input-field min-h-[120px] resize-none text-sm" 
          placeholder="Provide feedback on this member's progress..." 
          value={remarks} 
          onChange={e => setRemarks(e.target.value)} 
        />
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <><svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing...</>
          ) : (
            <><Save className="w-4 h-4" /> {submission.reviewed ? 'Update Remarks' : 'Save & Mark Reviewed'}</>
          )}
        </button>
      </div>

      {/* Submitted info */}
      <div className="flex items-center gap-1 mt-6 text-xs text-navy-600/30 px-2 justify-center italic">
        <Clock className="w-3 h-3" />
        Submitted on {new Date(submission.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
