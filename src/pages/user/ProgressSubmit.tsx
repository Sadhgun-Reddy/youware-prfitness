import { useState } from 'react';

export default function ProgressSubmit() {
  const [weight] = useState('74.5');
  const [lastWeekWeight] = useState('75.3');
  const weightDiff = (parseFloat(weight) - parseFloat(lastWeekWeight)).toFixed(1);
  
  const [chest, setChest] = useState('96');
  const [waist, setWaist] = useState('84');
  const [hips, setHips] = useState('98');

  const [uploadedPhotos] = useState([
    { name: 'front.jpg', size: '2.1 MB', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Pm6EfKn_9TC4_MjUCVv6P67w0rfq0ruojLTMOm2CF1SCMO0OU28o9WZD-K4BwhdA2XC8UZAH0y6XqY3xsusnklHnYJGqEDOvmeQJMPKkP8rBlgZh0CCLlcE_-t3v2-LWvR4Aynw2M1nFLo6fzextID49xVcZFJXcNJSVu4FImPpc8KctvEFR3jMYNQLZgv1SPjnAtjYaKEic2ZF2cmQSxKSiXbKjJWA3tR54TkhRJJM7gR3jFFcBWRyk1sK1Ws-qrDeav7IH6YQ' }
  ]);

  return (
    <div className="max-w-[800px] mx-auto mb-8">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">Submit This Week's Progress</h1>
        <p className="text-on-surface-variant text-lg">Week 24, 2025 · Sunday, 15 Jun 2025</p>
      </div>

      <div className="bg-[#E87722] rounded-xl px-6 py-4 flex items-center gap-3 shadow-[0_4px_20px_rgba(232,119,34,0.15)] mb-8">
        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>alarm</span>
        <span className="text-white font-medium tracking-wide">Submission closes at midnight tonight</span>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_40px_rgba(26,60,94,0.08)] p-12 space-y-16">
        <section className="text-center">
          <h2 className="label-md uppercase tracking-[0.15em] text-on-surface-variant font-bold mb-8">Section 1 — Body Weight</h2>
          <div className="flex flex-col items-center">
            <div className="relative inline-flex items-baseline gap-2">
              <span className="text-[80px] font-black tracking-tighter text-primary leading-none">{weight}</span>
              <span className="text-2xl font-bold text-on-surface-variant uppercase tracking-widest">kg</span>
            </div>
            <div className="mt-4 flex items-center gap-2 bg-[#E8F5E9] text-[#2E7D32] px-4 py-1.5 rounded-full text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
              {weightDiff} kg from last week
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="label-md uppercase tracking-[0.15em] text-on-surface-variant font-bold">Section 2 — Body Measurements</h2>
            <p className="text-on-surface-variant/70 text-sm mt-1">Optional but recommended for tracking body composition</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 rounded-lg group transition-all duration-300 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary/20">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Chest (cm)</label>
              <input 
                className="w-full bg-transparent border-none p-0 text-2xl font-bold text-primary focus:ring-0" 
                type="text" 
                value={chest}
                onChange={(e) => setChest(e.target.value)}
              />
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg group transition-all duration-300 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary/20">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Waist (cm)</label>
              <input 
                className="w-full bg-transparent border-none p-0 text-2xl font-bold text-primary focus:ring-0" 
                type="text" 
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
              />
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg group transition-all duration-300 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary/20">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Hips (cm)</label>
              <input 
                className="w-full bg-transparent border-none p-0 text-2xl font-bold text-primary focus:ring-0" 
                type="text" 
                value={hips}
                onChange={(e) => setHips(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="label-md uppercase tracking-[0.15em] text-on-surface-variant font-bold">Section 3 — Progress Photos</h2>
            <p className="text-on-surface-variant/70 text-sm mt-1">Add up to 3 photos (Front, Side, Back)</p>
          </div>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center hover:bg-surface-container-low transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-on-tertiary-container transition-colors mb-4">cloud_upload</span>
              <p className="text-on-surface font-medium">Drag and drop or click to upload</p>
              <p className="text-on-surface-variant/60 text-xs mt-1">Supports JPG, PNG (Max 10MB each)</p>
            </div>

            {uploadedPhotos.map((photo, index) => (
              <div key={index} className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white">
                    <img alt={photo.name} className="w-full h-full object-cover" src={photo.url} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{photo.name}</p>
                    <p className="text-xs text-on-surface-variant">{photo.size}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-1 max-w-[200px]">
                  <div className="flex items-center gap-2 text-[#2E7D32]">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-on-tertiary-container w-full"></div>
                  </div>
                </div>
                <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-8 space-y-8">
          <div className="flex items-center justify-center gap-2 text-on-surface-variant/60">
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span className="text-xs font-medium italic">Your entries are automatically saved</span>
          </div>
          <button className="w-full py-6 rounded-xl bg-gradient-to-br from-[#E87722] to-[#c2621a] text-white font-bold text-lg tracking-wider shadow-[0_12px_24px_rgba(232,119,34,0.25)] hover:translate-y-[-2px] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            Submit My Progress
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
