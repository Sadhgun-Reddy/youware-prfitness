import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditProfile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    dob: user?.dob || '',
    height: String(user?.height || ''),
    weight: String(user?.weight || ''),
    fitnessGoal: user?.fitnessGoal || '',
    healthConditions: user?.healthConditions || '',
    gymLocation: user?.gymLocation || '',
  });
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate('/profile'), 1000);
  };

  return (
    <div className="pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/profile')} className="p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-navy-600" />
        </button>
        <h1 className="page-header">Edit Profile</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy-600 mb-1">Full Name</label>
          <input type="text" className="input-field" value={form.name} onChange={e => update('name', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-600 mb-1">Date of Birth</label>
          <input type="date" className="input-field" value={form.dob} onChange={e => update('dob', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-600 mb-1">Height (cm)</label>
            <input type="number" className="input-field" value={form.height} onChange={e => update('height', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-600 mb-1">Weight (kg)</label>
            <input type="number" className="input-field" value={form.weight} onChange={e => update('weight', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-600 mb-2">Fitness Goal</label>
          <select className="input-field" value={form.fitnessGoal} onChange={e => update('fitnessGoal', e.target.value)}>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="general_fitness">General Fitness</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-600 mb-1">Gym Location</label>
          <input type="text" className="input-field" value={form.gymLocation} onChange={e => update('gymLocation', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-600 mb-1">Health Conditions</label>
          <textarea className="input-field min-h-[80px] resize-none" value={form.healthConditions} onChange={e => update('healthConditions', e.target.value)} placeholder="Any injuries, allergies, or medical conditions..." />
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary w-full mt-8 flex items-center justify-center gap-2">
        <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
