import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

const SAMPLE_PHOTOS = [
  { label: 'Front Pose', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=500' },
  { label: 'Side Profile', url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=500' },
  { label: 'Back Pose', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500' },
];

export default function ProgressSubmit() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addProgressSubmission, progressSubmissions } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    weight: 72,
  };

  const [weight, setWeight] = useState(String(currentMember.weight || 72));
  const [chest, setChest] = useState('96');
  const [waist, setWaist] = useState('84');
  const [hips, setHips] = useState('98');
  const [photoUrl, setPhotoUrl] = useState(SAMPLE_PHOTOS[0].url);
  const [photoFront, setPhotoFront] = useState(SAMPLE_PHOTOS[0].url);
  const [photoSide, setPhotoSide] = useState(SAMPLE_PHOTOS[1].url);
  const [photoBack, setPhotoBack] = useState(SAMPLE_PHOTOS[2].url);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Check Sunday window
  const isSunday = new Date().getDay() === 0;
  const [bypassWindow, setBypassWindow] = useState(true); // Enabled for evaluation

  // Previous week weight for delta comparison
  const previousSubmission = progressSubmissions.find(p => p.memberId === currentMember.id);
  const previousWeight = previousSubmission ? previousSubmission.weight : currentMember.weight || 72;
  const weightDiff = (Number(weight) - Number(previousWeight)).toFixed(1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, pose: 'front' | 'side' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Photo must be less than 5 MB (PRD F-007).');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (pose === 'front') setPhotoFront(result);
        if (pose === 'side') setPhotoSide(result);
        if (pose === 'back') setPhotoBack(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight) || parsedWeight < 30 || parsedWeight > 250) {
      setError('Please enter a valid body weight between 30 kg and 250 kg.');
      return;
    }

    if (!isSunday && !bypassWindow) {
      setError('Submissions are strictly accepted on Sundays (12:01 AM - 11:59 PM).');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const now = new Date();
      const newSubmission = {
        id: `prog-${Date.now()}`,
        memberId: currentMember.id,
        memberName: currentMember.name,
        weekStartDate: now.toISOString().split('T')[0],
        weight: parsedWeight,
        chest: parseFloat(chest) || undefined,
        waist: parseFloat(waist) || undefined,
        hips: parseFloat(hips) || undefined,
        photoFront: photoFront || undefined,
        photoSide: photoSide || undefined,
        photoBack: photoBack || undefined,
        submittedAt: now.toISOString(),
        reviewed: false,
      };

      addProgressSubmission(newSubmission);
      setSubmitting(false);
      navigate('/progress/history');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722]">leaderboard</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Progress</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Sunday Progress Submission</h1>
          <p className="text-xs text-slate-500 mt-1">Week of {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        <Link
          to="/progress/history"
          className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold self-start sm:self-auto transition-colors"
        >
          View History
        </Link>
      </div>

      {/* Sunday Window Status Banner */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
        isSunday ? 'bg-orange-50 border-orange-200 text-orange-950' : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#E87722] text-2xl">alarm</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">
              {isSunday ? 'Sunday Submission Window Open' : 'Weekly Window Notice'}
            </p>
            <p className="text-xs text-slate-500">
              {isSunday ? 'Active until midnight tonight (11:59 PM).' : 'Regular reporting takes place on Sundays.'}
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={bypassWindow}
            onChange={(e) => setBypassWindow(e.target.checked)}
            className="rounded text-[#E87722] focus:ring-[#E87722]"
          />
          <span className="text-slate-600">Dev Window Override</span>
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-base">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-10">
        {/* Section 1: Body Weight */}
        <div>
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section 1</span>
            <h2 className="text-xl font-black text-[#1A3C5E]">Current Body Weight (Required)</h2>
            <p className="text-xs text-slate-500 mt-1">Weigh in first thing in the morning for maximum accuracy</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2 bg-slate-50 px-8 py-5 rounded-3xl border border-slate-200 shadow-inner">
              <input
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-36 text-center text-5xl font-black text-[#1A3C5E] bg-transparent border-none outline-none focus:ring-0 p-0"
              />
              <span className="text-xl font-black text-slate-400 uppercase">kg</span>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold">
              <span className="material-symbols-outlined text-base">trending_flat</span>
              {Number(weightDiff) < 0 ? `${weightDiff} kg from last weigh-in` : Number(weightDiff) > 0 ? `+${weightDiff} kg from last weigh-in` : 'Unchanged from last weigh-in'}
            </div>
          </div>
        </div>

        {/* Section 2: Body Measurements */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section 2</span>
            <h2 className="text-xl font-black text-[#1A3C5E]">Body Tape Measurements (Optional)</h2>
            <p className="text-xs text-slate-500 mt-1">Track body composition changes beyond scale weight</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chest (cm)</label>
              <input
                type="number"
                step="0.5"
                placeholder="e.g. 96"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                className="w-full text-xl font-bold text-[#1A3C5E] bg-transparent border-none outline-none focus:ring-0 p-0"
              />
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Waist (cm)</label>
              <input
                type="number"
                step="0.5"
                placeholder="e.g. 84"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full text-xl font-bold text-[#1A3C5E] bg-transparent border-none outline-none focus:ring-0 p-0"
              />
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hips (cm)</label>
              <input
                type="number"
                step="0.5"
                placeholder="e.g. 98"
                value={hips}
                onChange={(e) => setHips(e.target.value)}
                className="w-full text-xl font-bold text-[#1A3C5E] bg-transparent border-none outline-none focus:ring-0 p-0"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Progress Photos */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Section 3</span>
            <h2 className="text-xl font-black text-[#1A3C5E]">Progress Photos (Up to 3 Poses)</h2>
            <p className="text-xs text-slate-500 mt-1">Private and confidential. Accessible only to you and Coach Ravi Sharma.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Front Pose */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
              <p className="text-xs font-bold text-slate-700 mb-3">Front Pose</p>
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-200 mb-3 border border-slate-300 relative group">
                <img src={photoFront} alt="Front Pose" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold gap-1">
                  <span className="material-symbols-outlined text-base">upload</span> Replace
                  <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFileUpload(e, 'front')} />
                </label>
              </div>
              <label className="text-xs font-bold text-[#E87722] hover:underline cursor-pointer">
                Upload New Photo
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFileUpload(e, 'front')} />
              </label>
            </div>

            {/* Side Pose */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
              <p className="text-xs font-bold text-slate-700 mb-3">Side Profile</p>
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-200 mb-3 border border-slate-300 relative group">
                <img src={photoSide} alt="Side Profile" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold gap-1">
                  <span className="material-symbols-outlined text-base">upload</span> Replace
                  <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFileUpload(e, 'side')} />
                </label>
              </div>
              <label className="text-xs font-bold text-[#E87722] hover:underline cursor-pointer">
                Upload New Photo
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFileUpload(e, 'side')} />
              </label>
            </div>

            {/* Back Pose */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
              <p className="text-xs font-bold text-slate-700 mb-3">Back Pose</p>
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-200 mb-3 border border-slate-300 relative group">
                <img src={photoBack} alt="Back Pose" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold gap-1">
                  <span className="material-symbols-outlined text-base">upload</span> Replace
                  <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFileUpload(e, 'back')} />
                </label>
              </div>
              <label className="text-xs font-bold text-[#E87722] hover:underline cursor-pointer">
                Upload New Photo
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleFileUpload(e, 'back')} />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-slate-100">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#E87722] hover:bg-[#D06A1C] text-white font-bold text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving Progress Log...
              </span>
            ) : (
              <>
                <span>Submit Weekly Progress</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
