import { useState } from 'react';

export default function Progress() {
  const [submissionState] = useState<'sunday' | 'closed' | 'submitted'>('sunday');

  const stats = {
    weightLost: '3.2 kg',
    consistency: '6 wks',
    waistDown: '8 cm',
  };

  const progressHistory = [
    { week: 'Week 24 Submission', date: '15 Jun 2025', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrphMLEnv0VFWQIfdEv0t67np4MxXpGxFq81Y1EBE-P4V6H0812SZryrEQNT7ZEjngQRfsdXzVJ4K0S-H7VxUswyiI0jE4rPgpjb60S3GQMt53yit7e0SiC98_gKRx24eGGlMB-njwmjX7L-WpxEXSUTNXJF2HE9Ie5k7wIF1ZAd9auWkQnai0fxbAFJ1C2Vl3-q01RHo9x9VWPyPf2ByOYewz5oFDC_mMpRkHc661nKjvTvokqz-TfSvLerJCw4Hf0ULTQgcMTQo' },
    { week: 'Week 23 Submission', date: '08 Jun 2025', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBBcQBjUPjDKHrABRpTSpZHX5cgVdzBJUGohVx0VHn1wCiP11_aXhFmE6JCBglYhwqH9u5EagNuSDhhqDC1UpZm5a9kI-SuWoTPr2EmWALdf3C0r2-mN9wQdrbIAm0gxtQJoLzgoiDKsdpxbdZTsI5OSn6jT5RWwNcAZr-XaPdGGXqvqPwUNeofFfwQ2ZSdyW6xynOIyEs6zNqbWgfOnrcr_NVcXZn0v9Ff-5qoixRoFJpty-xEJDH5mTA5rE_oZN_l5qu94RdfA8' },
    { week: 'Week 22 Submission', date: '01 Jun 2025', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ119Ajkrql4f8WxfFIb2ACdAnUaR3AIm6v7SuM3lPCN_z2sG4VlqRs9lxnEz2IqM4N1MORRvBG85oTLYx3UH6u4xKUwYm5LaZhBeG8sZ_ukWH_uC2imzfgtlFrfwUKcy5UzKwWW0ecYuDmzxNJd4HVBP32XL-hullZ77J9LGcd690uzDvAB0Xn8zK3KRF9QeUhvJ_qfaKAuM_b05BxX2TiuaVjheKgI4gqD_MdDpBztwNTn2YtHPyk1ygtTudnBdlkP67IoSSU9Y' },
  ];

  const weightTrend = [60, 55, 58, 50, 48, 42, 45, 35, 38, 30, 25, 20];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-1">My Progress</h1>
        <p className="text-on-surface-variant font-medium tracking-wide flex items-center gap-2">
          Weekly Hub 
          <span className="w-1.5 h-1.5 bg-on-tertiary-container rounded-full"></span>
          <span className="text-sm text-slate-400">June 2025</span>
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {submissionState === 'sunday' && (
          <div className="lg:col-span-12">
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(26,60,94,0.08)] overflow-hidden flex flex-col md:flex-row">
              <div className="p-10 flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                  Open until midnight tonight
                </div>
                <h2 className="text-3xl font-black text-primary tracking-tighter">Submit This Week's Progress</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                  Track your weight, measurements, and upload a progress photo to stay on target. Consistent reporting is the key to your success.
                </p>
                <div className="pt-4">
                  <button className="bg-gradient-to-br from-on-tertiary-container to-[#E87722] text-blue px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-transform flex items-center gap-3">
                    Submit Progress Now
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="hidden md:block w-1/3 bg-slate-100 relative">
                <img className="absolute inset-0 w-full h-full object-cover grayscale opacity-20" alt="abstract" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuoPvUDHfULkTNlJT7zyXE2gAeZ-D7P6skUBpnZYUOBm0hV47Q0qUQXvQRktmU8y4ivoQbGnfUhH8Vj1bosoj-aCJfLNVivTGspN4Q3H2oW5zv9KeWB0DhTDtfytboWeA5JuQ6khkElEL64BnbMfUlyfVTvTLcmeOK12FU0tRR2P-Dq7Fy7PNEzjKZZu4-c5tbiFNPj2WLfEqvqwW3P-oTeJ1-4IfjBaC1z34H_Sh6YR_8utj2Z_kholbh-4jmhth79UAyI7ixkX4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-on-tertiary-container flex items-center justify-center text-on-tertiary-container">
                    <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {submissionState === 'closed' && (
          <div className="lg:col-span-6">
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/20 shadow-sm space-y-6 opacity-80">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Opens every Sunday</p>
                  <div className="flex items-center gap-1 text-primary-container font-semibold text-sm">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    Sunday, 22 Jun 2025
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Progress Submission Closed</h3>
                <p className="text-sm text-slate-500">Your next reporting window will be available in:</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-surface-container-low p-4 rounded-lg text-center">
                  <span className="block text-2xl font-black text-primary">4d</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Days</span>
                </div>
                <div className="flex-1 bg-surface-container-low p-4 rounded-lg text-center">
                  <span className="block text-2xl font-black text-primary">12h</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Hours</span>
                </div>
                <div className="flex-1 bg-surface-container-low p-4 rounded-lg text-center">
                  <span className="block text-2xl font-black text-primary">30m</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Mins</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {submissionState === 'submitted' && (
          <div className="lg:col-span-6">
            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-emerald-500 shadow-sm space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">This Week's Progress Submitted</h3>
                  <p className="text-sm text-slate-500">Submitted Sunday, 15 Jun 2025 at 9:23 AM</p>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm">Excellent work keeping up with your tracking. Your coach will review your stats within 24 hours.</p>
              <button className="w-full py-3 rounded-lg border border-primary-container text-primary-container font-bold text-sm hover:bg-primary-container hover:text-white transition-all flex items-center justify-center gap-2">
                View Submission <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-outline-variant/10 flex items-center gap-5 group hover:border-emerald-500/30 transition-colors">
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Weight Lost</p>
            <p className="text-2xl font-black text-emerald-600">{stats.weightLost}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-outline-variant/10 flex items-center gap-5 group hover:border-on-tertiary-container/30 transition-colors">
          <div className="w-14 h-14 bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant rounded-xl group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>photo_library</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Consistency</p>
            <p className="text-2xl font-black text-primary">{stats.consistency}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-outline-variant/10 flex items-center gap-5 group hover:border-blue-500/30 transition-colors">
          <div className="w-14 h-14 bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant rounded-xl group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">straighten</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Waist Down</p>
            <p className="text-2xl font-black text-primary">{stats.waistDown}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-outline-variant/10 flex flex-col h-[280px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-primary">Weight Trend</h3>
              <p className="text-xs text-slate-500">Past 12 weeks progress</p>
            </div>
            <button className="text-primary-container text-xs font-bold uppercase tracking-wider hover:underline">Full Chart</button>
          </div>
          <div className="flex-1 flex items-end gap-2 pb-2">
            {weightTrend.map((height, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-t ${i === weightTrend.length - 1 ? 'bg-on-tertiary-container' : 'bg-primary'}`}
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-outline-variant/10 flex flex-col h-[280px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container">history</span>
              <h3 className="text-lg font-bold text-primary">Progress History</h3>
            </div>
            <button className="text-primary-container text-xs font-bold uppercase tracking-wider hover:underline">View All</button>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2">
            {progressHistory.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-surface-container overflow-hidden">
                    <img className="w-full h-full object-cover" alt={item.week} src={item.image} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{item.week}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">{item.date}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
