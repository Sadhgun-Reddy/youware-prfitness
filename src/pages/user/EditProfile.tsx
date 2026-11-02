import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import type { FitnessGoal, Gender } from '../../types';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const { updateMember } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    dob: '1995-06-15',
    gender: 'male' as Gender,
    height: 175,
    weight: 72,
    fitnessGoal: 'muscle_gain' as FitnessGoal,
    healthConditions: '',
  };

  const [form, setForm] = useState({
    name: currentMember.name,
    email: currentMember.email,
    phone: currentMember.phone || '+91 98765 43210',
    dob: currentMember.dob,
    gender: currentMember.gender as Gender,
    height: String(currentMember.height),
    weight: String(currentMember.weight),
    fitnessGoal: currentMember.fitnessGoal as FitnessGoal,
    healthConditions: currentMember.healthConditions || '',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updates = {
      name: form.name,
      phone: form.phone,
      dob: form.dob,
      gender: form.gender,
      height: parseFloat(form.height) || 175,
      weight: parseFloat(form.weight) || 72,
      fitnessGoal: form.fitnessGoal,
      healthConditions: form.healthConditions,
    };

    updateUser(updates);
    if (currentMember.id) {
      updateMember(currentMember.id, updates);
    }

    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 1000);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Link to="/profile" className="text-xs font-bold text-slate-400 hover:text-[#1A3C5E] flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Profile
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#1A3C5E]">Edit Profile Information</h1>
          <p className="text-xs text-slate-500 mt-1">
            Keep your physical and health details updated so Coach Ravi Sharma can tailor your training programs.
          </p>
        </div>

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-base">check_circle</span>
            Profile updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A3C5E] focus:outline-none"
            />
          </div>

          {/* Email (Readonly per PRD) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Address (Locked)</label>
            <input
              type="email"
              disabled
              value={form.email}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm cursor-not-allowed"
            />
          </div>

          {/* Phone & DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A3C5E] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block">Date of Birth</label>
              <input
                type="date"
                required
                value={form.dob}
                onChange={(e) => update('dob', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A3C5E] focus:outline-none"
              />
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block">Height (cm)</label>
              <input
                type="number"
                required
                value={form.height}
                onChange={(e) => update('height', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A3C5E] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={form.weight}
                onChange={(e) => update('weight', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A3C5E] focus:outline-none"
              />
            </div>
          </div>

          {/* Fitness Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block">Fitness Goal</label>
            <select
              value={form.fitnessGoal}
              onChange={(e) => update('fitnessGoal', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A3C5E] focus:outline-none bg-white"
            >
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain & Hypertrophy</option>
              <option value="general_fitness">General Fitness & Endurance</option>
              <option value="flexibility">Flexibility & Mobility</option>
            </select>
          </div>

          {/* Health Conditions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider block">
              Health Conditions / Injuries (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Lower back stiffness, recovering shoulder impingement..."
              value={form.healthConditions}
              onChange={(e) => update('healthConditions', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A3C5E] focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Link
              to="/profile"
              className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
