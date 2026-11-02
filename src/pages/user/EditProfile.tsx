import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'Alexander Sterling',
    email: 'alex.sterling@fitsyncpro.com',
    phone: '+1 (555) 012-3456',
    dob: '1992-05-15',
    gender: 'male',
    height: 0,
    weight: 82,
    goal: 'build_muscle',
    healthConditions: '',
  });

  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate('/profile'), 1000);
  };

  const goals = [
    { id: 'lose_weight', label: 'LOSE WEIGHT' },
    { id: 'build_muscle', label: 'BUILD MUSCLE' },
    { id: 'endurance', label: 'ENDURANCE' },
    { id: 'flexibility', label: 'FLEXIBILITY' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 flex justify-center">
      <div className="w-full max-w-[480px]">
        <div className="neomorphic-card rounded-[2rem] p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-[#1A3C5E] p-0.5 overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIGybMUYQrdE8II8kc1GVMUVyDJBdSUcSTw1gUTjRFC0RPeDdUF0qR3G7Jda89s06kyB7IQyR5MrDrcO74uR09pNu5KP5Vs81AxszK5_bWv42OLfvjvvYc8hXKYz586eXw-vBx8MDV4kPMTxBNo-uG1O9lM3VOxIWCekmouxO8c1trdUVdwVyDVL3GqUn1FFGzWOKt1dmSy999Fgvr6rMl8FuHlymy1KFVo6Jv_dKXcZN4I2sFttAzXoteQLb7a2Tqlt8_apa5yEo"
                  alt="Profile"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-[#E87722] text-white rounded-full p-1.5 shadow-lg border-2 border-white hover:scale-110 transition-transform active:scale-95">
                <span className="material-symbols-outlined text-xs" style={{ fontSize: '14px' }}>photo_camera</span>
              </button>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#1A3C5E]">Edit Profile</h1>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Personal Information</h3>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A3C5E] px-1">Full Name</label>
                <input
                  className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all outline-none"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 px-1">Email (Disabled)</label>
                <input
                  className="w-full bg-slate-50 text-slate-400 cursor-not-allowed border-none rounded-lg px-4 py-3 text-sm"
                  disabled
                  type="email"
                  value={form.email}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A3C5E] px-1">Phone</label>
                  <input
                    className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all outline-none"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A3C5E] px-1">DOB</label>
                  <input
                    className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all outline-none"
                    type="date"
                    value={form.dob}
                    onChange={(e) => update('dob', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A3C5E] px-1">Gender</label>
                <div className="flex gap-2">
                  {['MALE', 'FEMALE', 'OTHER'].map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => update('gender', gender.toLowerCase())}
                      className={`flex-1 py-2 text-xs font-bold rounded-full transition-colors ${
                        form.gender === gender.toLowerCase()
                          ? 'bg-[#1A3C5E] text-white shadow-md'
                          : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Health Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A3C5E] px-1">Height (cm)</label>
                  <input
                    className="w-full bg-red-50 border border-error rounded-lg px-4 py-3 text-sm focus:ring-0 outline-none text-error font-medium"
                    type="number"
                    value={form.height}
                    onChange={(e) => update('height', e.target.value)}
                  />
                  <p className="text-[10px] text-error font-medium px-1">Height must be between 100 and 250 cm</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A3C5E] px-1">Weight (kg)</label>
                  <input
                    className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all outline-none"
                    type="number"
                    value={form.weight}
                    onChange={(e) => update('weight', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A3C5E] px-1">Primary Goal</label>
                <div className="flex flex-wrap gap-2">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => update('goal', goal.id)}
                      className={`px-4 py-2 text-[10px] font-bold rounded-full transition-colors ${
                        form.goal === goal.id
                          ? 'bg-[#FFDBC8] text-[#E87722] shadow-sm'
                          : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A3C5E] px-1">Health Conditions</label>
                <textarea
                  className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all outline-none resize-none"
                  placeholder="Enter any medical considerations..."
                  rows={3}
                  value={form.healthConditions}
                  onChange={(e) => update('healthConditions', e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                className="w-full bg-gradient-to-br from-[#E87722] to-[#FF8C3E] text-white py-4 rounded-xl font-bold text-base shadow-[0_10px_25px_rgba(232,119,34,0.3)] hover:scale-[1.02] transition-transform active:scale-95 uppercase tracking-wider"
                type="submit"
              >
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
