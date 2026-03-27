import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormData } from './RegisterStep1';

export default function RegisterStep3() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('regForm');
    if (saved) {
      setForm(JSON.parse(saved));
    } else {
      navigate('/register/step-1');
    }
  }, [navigate]);

  const update = (field: keyof FormData, value: string) => {
    if (!form) return;
    setForm(prev => prev ? ({ ...prev, [field]: value }) : null);
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    if (!form) return false;
    const e: Record<string, string> = {};
    if (!form.gymName.trim()) e.gymName = 'Gym name is required';
    if (!form.gymLocation.trim()) e.gymLocation = 'Gym location is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      sessionStorage.setItem('regForm', JSON.stringify(form));
      navigate('/register/plan-select');
    }, 1500);
  };

  const handleBack = () => {
    sessionStorage.setItem('regForm', JSON.stringify(form));
    navigate('/register/step-2');
  };

  if (!form) return null;

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-600">Gym Selection</h1>
          <p className="text-sm text-navy-600/60 mt-1">Step 3 of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full bg-accent-500`} />
          ))}
        </div>

        <div className="card p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Gym Name</label>
              <input type="text" className="input-field" placeholder="e.g. FitZone Gym" value={form.gymName} onChange={e => update('gymName', e.target.value)} />
              {errors.gymName && <p className="text-error text-xs mt-1">{errors.gymName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Gym Location</label>
              <input type="text" className="input-field" placeholder="e.g. Andheri West, Mumbai" value={form.gymLocation} onChange={e => update('gymLocation', e.target.value)} />
              {errors.gymLocation && <p className="text-error text-xs mt-1">{errors.gymLocation}</p>}
              <p className="text-xs text-navy-600/40 mt-1">Enter your gym's city or full address</p>
            </div>

            {/* Summary */}
            <div className="bg-offwhite-100 rounded-xl p-4 mt-6">
              <p className="text-sm font-semibold text-navy-600 mb-3">Registration Summary</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy-600/50">Name</span>
                  <span className="text-navy-600 font-medium">{form.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-600/50">Email</span>
                  <span className="text-navy-600 font-medium">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-600/50">Height / Weight</span>
                  <span className="text-navy-600 font-medium">{form.height} cm / {form.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-600/50">Fitness Goal</span>
                  <span className="text-navy-600 font-medium">{form.fitnessGoal.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={handleBack} className="btn-outline flex-1">Back</button>
            <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
