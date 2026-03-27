import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ArrowLeft, Camera } from 'lucide-react';

export default function ProgressSubmit() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    weight: '', chest: '', waist: '', hips: '', arms: '', thighs: '',
  });
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/progress'), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-success mx-auto flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-xl font-bold text-navy-600 mb-2">Progress Submitted!</h2>
          <p className="text-sm text-navy-600/50">Your trainer will review and provide feedback.</p>
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

      <div className="space-y-4">
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
          <div className="grid grid-cols-3 gap-3">
            {['Front', 'Side', 'Back'].map(view => (
              <div key={view} className="aspect-[3/4] rounded-xl border-2 border-dashed border-offwhite-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent-500/50 hover:bg-accent-50/30 transition-all">
                <Camera className="w-6 h-6 text-navy-600/30" />
                <span className="text-xs text-navy-600/40">{view}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card !p-5">
          <h3 className="section-title mb-3">Notes <span className="text-navy-600/40 font-normal">(optional)</span></h3>
          <textarea className="input-field min-h-[80px] resize-none" placeholder="How did your week go? Any challenges or wins?" value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
      </div>

      <button onClick={handleSubmit} disabled={!form.weight} className="btn-primary w-full mt-6 disabled:opacity-50">
        Submit Progress
      </button>
    </div>
  );
}
