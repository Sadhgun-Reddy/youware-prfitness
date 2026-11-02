import { useParams, Link } from 'react-router-dom';

export default function ProgressDetail() {
  const { weekId } = useParams();

  const memberData = {
    name: 'Arjun Mehta',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6hJ01coaqdu6pxn9D-ADU0i6ACAgF_s8J5Z7gf6Bq9agD2V0soAZy6AK4kY2Xvbd9X360wegA54MocLnZWCsX_4elxjaKBr6V0O-NMSSBwCkssTZKS6e-elJQXMRSN_pIo2KO5mvUq4GDILI7ECdWV-OfbnP0Pje4OwCGHBn5tfHgErSPu2_R1h3iWyFegwcolMjVunX4yb7ntmhBZixPMTOfmfZU0yyu4ZwPEuN6MgpA2epIOIiyTm5DmScSOXQX4hEnTr9ZuAQ',
    planType: 'Personal Training',
    date: '15 Jun 2025',
    status: 'reviewed',
    weight: 74.5,
    weightChange: -0.8,
    startingWeight: 80.2,
    totalLost: 5.7,
    measurements: [
      { label: 'Chest', value: 96, change: -1.2 },
      { label: 'Waist', value: 84, change: -0.5 },
      { label: 'Hips', value: 98, change: -0.8 },
    ],
    photos: [
      { view: 'Front View', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbZYq-mm-iroUCDc4VTEYSzICUXRNY9oMqLin_YN3dPsDIMxfDFX5z84nEg4aNIf-bY-_G02h6lI1kpKvfvGF1x-l-guRxjqpw4T1D7gTpDTGiCotI7BVXr4Zxzo2_vO5A3FJu_McTopO41oRPFfvxWHZKBk4nF7NtJhv-nSquEZ5eqEruV-mEz9cTjCAbhTiRNRTz1I8HzqgLOPgDX1-EMX6T9Ue29KaBuX279wKQcCkC2-PhNm0rDP5F0ETs4rGxg3fAc5jkJLo' },
      { view: 'Side View', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1qhLKICo_HBjOWnYCLEZTNZ7o-7BTok7VnP1fPY2e9CaEje6MevmaxTMHA7ZpYn8o7fA6bseKEzzT7bGiA6NNfacF3MpkZ6Cu9g5ZVnuSE8vbafOTCyUvnACRSBUMQ4eHO-q6DdexQH2oaLhferxtWF7TAjsOq3lp-u_yejPyaqS0L82zSkjCbVyXBUjTpHyKS3McI8n8elg1AVZxPasxx0sno7RZWjV9Sp3bSvgsMwTN4nA6tGZ72vMESZs5ZOAT0BUfcnkTbms' },
      { view: 'Back View', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzjONaPTNbj2AVejgUa8TTynHkGimx3W14ZfzTHaWVQfR8X2HxOMg_a1xCyzfraQG8GXQ7HSVdYzb4r9QLiaL1DF2Ba2zP47BiG5xO4MzDLB0OItPuSO-ofF39SVKuxHkxWiozrRCVKcWQPr6hPZFAEqOkLDH42ZiS4TlppLJwq33wEtmtc3hKKHVpQxZK87PtciwyGCEBaEdG4ESqF8R9hvTypwvR2rmum1qjJxPK_R1yhUJm0EWr_dPNtQGyrYo4VosJwyzFXv8' },
    ],
    trainer: {
      name: 'Ravi S.',
      role: 'Senior Strength Coach',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5nrUr3lbudAlGZLdTrWSdyENRFnFZyjJecKhVamy7Yx7_aWkCK6WYy4y5aL5GlXBTfyl0PHNrBTMhQ0ti7W3033kUyLWfw4Bp_RHyvq5L_fBqfdaFSr0IVOCsXwhKrSfIbaanO1Bj3EkqSw-hwR2xHu9HXbZuhQVI4ebdEaHBSd3z-1TsF8pqVIkboWBolwJVkMX8vB2Q8bOCGOYWrSVw-q3ftBTU-R7sxUC8BX7o73oCy7271xxZaJ9Zf6S6ZkOnt21b-jkFNbM',
      feedback: "Great progress this week! Down 0.8kg — keep it up. Focus on increasing your protein intake to preserve muscle mass. See you next Sunday!",
      actionPoints: [
        'Maintain 180g Protein/Day',
        'Increase LISS Cardio to 45m',
      ],
    },
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto mb-8">
        <nav className="flex items-center gap-2 text-xs font-bold tracking-wider text-on-surface-variant/60 uppercase mb-4">
          <Link to="/progress/history" className="hover:text-primary transition-colors">Progress History</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary">Week {weekId?.replace('w', '') || '24'}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img alt={memberData.name} className="w-20 h-20 rounded-2xl shadow-[8px_8px_16px_rgba(26,60,94,0.08),-8px_-8px_16px_rgba(255,255,255,0.8)] border-4 border-white" src={memberData.avatar} />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">{memberData.name}</h2>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[0.65rem] font-black px-3 py-0.5 rounded-full uppercase tracking-widest">Personal Training</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  {memberData.date}
                </span>
                <span className="flex items-center gap-1.5 text-green-600 font-bold">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Reviewed by trainer
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-surface-container-low text-primary-container px-6 py-2.5 rounded-xl font-bold text-sm shadow-[8px_8px_16px_rgba(26,60,94,0.08),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:translate-y-[-2px] transition-all">Download Report</button>
            <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px] transition-all">Edit Entry</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-primary-container text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-9xl">scale</span>
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold tracking-[0.2em] text-on-primary-container uppercase mb-6">Current Body Weight</p>
            <div className="flex items-baseline gap-4 mb-2">
              <h3 className="text-7xl font-black tracking-tighter">{memberData.weight} <span className="text-3xl text-on-primary-container">kg</span></h3>
              <div className="flex items-center gap-1 text-green-400 font-black text-xl">
                <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>south_east</span>
                {Math.abs(memberData.weightChange)} kg
              </div>
            </div>
            <p className="text-on-primary-container font-medium">vs. previous week</p>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex gap-8">
            <div>
              <p className="text-[0.65rem] font-bold text-on-primary-container uppercase tracking-widest mb-1">Starting Weight</p>
              <p className="text-lg font-bold">{memberData.startingWeight} kg</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold text-on-primary-container uppercase tracking-widest mb-1">Total Weight Lost</p>
              <p className="text-lg font-bold">{memberData.totalLost} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-[8px_8px_16px_rgba(26,60,94,0.08),-8px_-8px_16px_rgba(255,255,255,0.8)] flex flex-col">
          <h4 className="text-sm font-bold tracking-[0.15em] text-primary uppercase mb-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">straighten</span>
            Key Measurements
          </h4>
          <div className="space-y-6 flex-grow">
            {memberData.measurements.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl shadow-[inset_4px_4px_8px_rgba(26,60,94,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                <div>
                  <p className="text-[0.6rem] font-bold text-on-surface-variant uppercase tracking-widest">{m.label}</p>
                  <p className="text-2xl font-black text-primary">{m.value} <span className="text-sm font-medium">cm</span></p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
                  <span className="text-[0.65rem] font-bold text-green-600">{m.change}cm</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold tracking-[0.15em] text-primary uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">photo_library</span>
              Visual Progress (Week {weekId?.replace('w', '') || '24'})
            </h4>
            <button className="text-primary text-xs font-bold uppercase tracking-widest hover:text-on-tertiary-container transition-colors">Compare with Day 1</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {memberData.photos.map((photo, i) => (
              <div key={i} className="group relative aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden shadow-[8px_8px_16px_rgba(26,60,94,0.08),-8px_-8px_16px_rgba(255,255,255,0.8)]">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={photo.view} src={photo.url} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs font-black uppercase tracking-widest">{photo.view}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <h4 className="text-sm font-bold tracking-[0.15em] text-primary uppercase mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">chat_bubble</span>
            Trainer Feedback
          </h4>
          <div className="bg-white rounded-[2rem] shadow-[8px_8px_16px_rgba(26,60,94,0.08),-8px_-8px_16px_rgba(255,255,255,0.8)] border-l-[12px] border-tertiary-fixed p-8 flex-grow">
            <div className="flex items-center gap-4 mb-6">
              <img alt={memberData.trainer.name} className="w-12 h-12 rounded-full border-2 border-surface-container-low" src={memberData.trainer.avatar} />
              <div>
                <p className="font-black text-primary">{memberData.trainer.name}</p>
                <p className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest">{memberData.trainer.role}</p>
              </div>
            </div>
            <blockquote className="text-on-surface-variant leading-relaxed text-lg font-medium italic mb-8">
              "{memberData.trainer.feedback}"
            </blockquote>
            <div className="bg-surface-container-low p-4 rounded-2xl shadow-[inset_4px_4px_8px_rgba(26,60,94,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
              <p className="text-[0.6rem] font-black text-primary uppercase tracking-[0.2em] mb-3">Action Points</p>
              <ul className="space-y-3">
                {memberData.trainer.actionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold text-primary">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#002645] transition-colors flex items-center justify-center gap-2">
                Message {memberData.trainer.name.split(' ')[0]}
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
