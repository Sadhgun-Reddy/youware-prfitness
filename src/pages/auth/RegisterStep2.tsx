import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormData } from './RegisterStep1';
import type { FitnessGoal } from '../../types';

export default function RegisterStep2() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!form.height || Number(form.height) < 100 || Number(form.height) > 250) e.height = 'Enter height between 100–250 cm';
    if (!form.weight || Number(form.weight) < 30 || Number(form.weight) > 200) e.weight = 'Enter weight between 30–200 kg';
    if (!form.fitnessGoal) e.fitnessGoal = 'Please select a fitness goal';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      sessionStorage.setItem('regForm', JSON.stringify(form));
      navigate('/register/step-3');
    }
  };

  const handleBack = () => {
    sessionStorage.setItem('regForm', JSON.stringify(form));
    navigate('/register/step-1');
  };

  if (!form) return null;

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-600">Physical & Health Details</h1>
          <p className="text-sm text-navy-600/60 mt-1">Step 2 of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= 2 ? 'bg-accent-500' : 'bg-offwhite-300'}`} />
          ))}
        </div>

        <div className="card p-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">Height (cm)</label>
                <input type="number" className="input-field" placeholder="175" value={form.height} onChange={e => update('height', e.target.value)} min={100} max={250} />
                {errors.height && <p className="text-error text-xs mt-1">{errors.height}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">Weight (kg)</label>
                <input type="number" className="input-field" placeholder="72" value={form.weight} onChange={e => update('weight', e.target.value)} min={30} max={200} />
                {errors.weight && <p className="text-error text-xs mt-1">{errors.weight}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-600 mb-2">Fitness Goal</label>
              <div className="grid grid-cols-1 gap-2">
                {([
                  { value: 'weight_loss', label: 'Weight Loss', desc: 'Reduce body fat and get lean' },
                  { value: 'muscle_gain', label: 'Muscle Gain', desc: 'Build muscle mass and strength' },
                  { value: 'general_fitness', label: 'General Fitness', desc: 'Stay fit and maintain health' },
                ] as const).map(g => (
                  <button key={g.value} type="button" onClick={() => update('fitnessGoal', g.value)}
                    className={`p-3 rounded-xl text-left border-2 transition-all ${form.fitnessGoal === g.value ? 'border-accent-500 bg-accent-50' : 'border-offwhite-300 bg-white hover:border-navy-200'}`}>
                    <span className="text-sm font-semibold text-navy-600">{g.label}</span>
                    <span className="block text-xs text-navy-600/50 mt-0.5">{g.desc}</span>
                  </button>
                ))}
              </div>
              {errors.fitnessGoal && <p className="text-error text-xs mt-1">{errors.fitnessGoal}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Health Conditions <span className="text-navy-600/40">(optional)</span></label>
              <textarea className="input-field min-h-[80px] resize-none" placeholder="Any injuries, allergies, or medical conditions..."
                value={form.healthConditions} onChange={e => update('healthConditions', e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={handleBack} className="btn-outline flex-1">Back</button>
            <button onClick={handleContinue} className="btn-primary flex-1">Continue to Step 3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
