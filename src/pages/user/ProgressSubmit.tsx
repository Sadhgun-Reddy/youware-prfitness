import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { ArrowLeft, Camera, AlertCircle, CheckCircle } from 'lucide-react';

export default function ProgressSubmit() {
  const { user } = useAuthStore();
  const { addProgressSubmission } = useDataStore();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    weight: '', chest: '', waist: '', hips: '', arms: '', thighs: '',
  });
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeView, setActiveView] = useState<string | null>(null);

  // Sunday Check (0 is Sunday, 6 is Saturday)
  const isSunday = new Date().getDay() === 0;

  if (!user) return null;

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoClick = (view: string) => {
    setActiveView(view);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeView) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => ({ ...prev, [activeView]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!isSunday) return;

    const submission = {
      id: `ps-${Date.now()}`,
      memberId: user.id,
      memberName: user.name,
      weekStartDate: new Date().toISOString().split('T')[0], // Simplified
      weight: parseFloat(form.weight),
      chest: form.chest ? parseFloat(form.chest) : undefined,
      waist: form.waist ? parseFloat(form.waist) : undefined,
      hips: form.hips ? parseFloat(form.hips) : undefined,
      arms: form.arms ? parseFloat(form.arms) : undefined,
      thighs: form.thighs ? parseFloat(form.thighs) : undefined,
      photoFront: photos['Front'],
      photoSide: photos['Side'],
      photoBack: photos['Back'],
      submittedAt: new Date().toISOString(),
      reviewed: false,
    };

    addProgressSubmission(submission);
    setSubmitted(true);
    setTimeout(() => navigate('/progress'), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-success mx-auto flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-navy-600 mb-2">Progress Submitted!</h2>
          <p className="text-sm text-navy-600/50">Your trainer will review and provide feedback soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/progress')} className="p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-navy-600" />
        </button>
        <h1 className="page-header">Submit Weekly Progress</h1>
      </div>

      {!isSunday && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Submission Closed</p>
            <p className="text-xs text-amber-700/80">Weekly progress can only be submitted on Sundays. Today is {new Date().toLocaleDateString('en-IN', { weekday: 'long' })}.</p>
          </div>
        </div>
      )}

      <div className={`space-y-4 ${!isSunday ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="card !p-5">
          <h3 className="section-title mb-4">Body Measurements</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Weight (kg) *</label>
              <input type="number" className="input-field" placeholder="72" value={form.weight} onChange={e => update('weight', e.target.value)} step="0.1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Chest (in)</label>
              <input type="number" className="input-field" placeholder="40" value={form.chest} onChange={e => update('chest', e.target.value)} step="0.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Waist (in)</label>
              <input type="number" className="input-field" placeholder="32" value={form.waist} onChange={e => update('waist', e.target.value)} step="0.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Hips (in)</label>
              <input type="number" className="input-field" placeholder="36" value={form.hips} onChange={e => update('hips', e.target.value)} step="0.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Arms (in)</label>
              <input type="number" className="input-field" placeholder="14" value={form.arms} onChange={e => update('arms', e.target.value)} step="0.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Thighs (in)</label>
              <input type="number" className="input-field" placeholder="22" value={form.thighs} onChange={e => update('thighs', e.target.value)} step="0.5" />
            </div>
          </div>
        </div>

        <div className="card !p-5">
          <h3 className="section-title mb-4">Progress Photos</h3>
          <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
          <div className="grid grid-cols-3 gap-3">
            {['Front', 'Side', 'Back'].map(view => (
              <div 
                key={view} 
                onClick={() => handlePhotoClick(view)}
                className="aspect-[3/4] rounded-xl border-2 border-dashed border-offwhite-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent-500/50 hover:bg-accent-50/30 transition-all overflow-hidden relative"
              >
                {photos[view] ? (
                  <img src={photos[view]} alt={view} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className="w-6 h-6 text-navy-600/30" />
                    <span className="text-xs text-navy-600/40">{view}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card !p-5">
          <h3 className="section-title mb-3">Notes <span className="text-navy-600/40 font-normal">(optional)</span></h3>
          <textarea className="input-field min-h-[80px] resize-none" placeholder="How did your week go? Any challenges or wins?" value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={!isSunday || !form.weight} 
        className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSunday ? 'Submit Progress' : 'Locked until Sunday'}
      </button>
    </div>
  );
}
