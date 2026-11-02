import { useState } from 'react';

export default function ProgressHistory() {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const submissions = [
    {
      week: 'Week 24',
      date: 'Sun, 15 Jun 2025',
      weight: 74.5,
      chest: '96cm',
      waist: '84cm',
      hips: '98cm',
      status: 'reviewed',
      photos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDyQKg5_wBkTMR_D9ivtrPHP2h9mVA3J0tOIgB__Dx8Pf7_Dol8vHDeoI6naC7zMrFcd-vsFEb5MHNCWZ0EGhwlDiIhg-w0YXDy7SyYyQ60BrXPDEPoScqEB5Pa-WfC80PzUjvpziaJV5e9bBw6LMbft3aQxqzsVkF52rPV5MUyTpt3WMkntZ91n7BDVZCvW5riP8RRqdgtGFY_-17toE3Cd1sDyjBXz4ZtHNn6PkOHOpHxvXtDviRHSdIqvRz6i89EMvn5dmJwkQQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBPsmjOIbTD-BvhAhjLuUm5dao1QGc0EWTjZ9xdl0Qlf9McN9_zvq8_TylScHMp5cOb71fu_RSyvMNWPpzLK1B_5NAmVvlNrlGGENLwid0nYOd7qDLuLlqwo2WKPVC5OJtuy4NOmPMY4b0mq2s9QvHW3jPGSXZpkuEi6bOo5OItHRREjcfc1gEqmf5zmEMaRp1e0eIH1r0d-_9HyTWiwiNi2k0fmPv0L7mOGPjdmFXRxln1NUCoSDS94lNx9C3hVqjGS2RPOnghijQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCx7EfezTdHZhMpmNKvtWKQm7RlK_pxytb5mUz8kscV6OIxXVcpKUMCC8aRu1ID_wViO4qbvEU5RXbLESDU-B2ljCge-MdgYFt50TvtFWpuAl-Qqc_ZpfV0GaHNB7lIEEylic4gsECo9YzJWlpRwxlo0jqEYik9FtCR39zc2fHES5SqeIybLiAwbmp6mX72FyAp93f2b7a8Iy350DLx5Z7kXTOzaw4ivpmhHSIt9ZJ3mpWX_32V_LekxA_CnHogA_05UxXjISMi7pk'
      ],
      trainerRemark: {
        text: "Great progress! Down 0.8kg this week. Focus on keeping that protein intake high as we enter the next phase of your cut. The waist measurement drop is significant.",
        trainer: "Ravi (Trainer)",
        date: "16 JUN · 10:45 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxDMoBWbbg-odxC5JVL9T-R0ti9c_3es-aUNVJD2QYzkTnPPu8kiZHbxJHFqN3SYQfFskqhjaU3vEEdZhD9uhLh4-OKZ3NdlfwUwYAmnVfB6hMcc3OFZYtocLj6ulaKF2ONti-E1eXyrkZFYBqTglnxOC5-Han3L0HxXhALXhh-xnOC81FmaeWxy2AxhsNWbXKZfwXftQm_3TgiuK5u6hS70r2mGXvVOG5Iq5l4wXbZVz3uYIjT4z70hfeKnQ0KYH8fShsgNhXTBY"
      }
    },
    {
      week: 'Week 23',
      date: 'Sun, 08 Jun 2025',
      weight: 75.3,
      chest: '96.5cm',
      waist: '85.2cm',
      hips: '99cm',
      status: 'reviewed',
      photos: [],
      trainerRemark: null
    },
    {
      week: 'Week 22',
      date: 'Sun, 01 Jun 2025',
      weight: 75.8,
      chest: '97cm',
      waist: '86cm',
      hips: '99cm',
      status: 'pending',
      photos: [],
      trainerRemark: null
    }
  ];

  const chartData = [
    { week: 'W21', height: 120 },
    { week: 'W22', height: 84 },
    { week: 'W23', height: 96 },
    { week: 'W24', height: 120, active: true },
    { week: 'W25', height: 108 },
    { week: 'W26', height: 130 },
  ];

  return (
    <div>
      <section className="mb-10">
        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_8px_30px_rgba(26,60,94,0.06)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-lg font-bold text-primary-container">Weight Over Time</h2>
              <p className="text-sm text-on-surface-variant">Tracking your body mass composition</p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
              <span className="text-xs font-bold text-on-surface-variant">Last 3 months</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </div>
          </div>

          <div className="relative h-[200px] flex items-end justify-between gap-2 px-2 border-b border-outline-variant/30 pb-6 mb-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center group relative flex-1">
                {data.active && (
                  <div className="absolute -top-16 -left-12 w-36 bg-white shadow-xl rounded-lg p-3 z-20 border border-outline-variant/20">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Week 24 · 15 Jun</p>
                    <p className="text-sm font-black text-primary flex items-center justify-between">
                      74.5 kg <span className="text-[10px] text-error font-medium">↘ 0.8kg</span>
                    </p>
                  </div>
                )}
                <div 
                  className={`w-full rounded-t bg-primary ${data.active ? 'bg-on-tertiary-container ring-4 ring-tertiary-fixed/40' : ''}`}
                  style={{ height: `${data.height}%`, maxHeight: '160px' }}
                ></div>
                <span className={`text-[10px] font-bold mt-2 ${data.active ? 'text-primary' : 'text-on-surface-variant'}`}>{data.week}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
            </div>
            <p className="text-sm font-medium text-emerald-700">Overall: <span className="font-bold">↘ 3.2 kg</span> lost in last 6 weeks</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-primary-container">All Submissions</h2>
          <button className="text-xs font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-1">
            Sort by Newest <span className="material-symbols-outlined text-sm">sort</span>
          </button>
        </div>

        <div className="space-y-4">
          {submissions.map((sub, index) => (
            <div 
              key={index} 
              className={`bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(26,60,94,0.04)] overflow-hidden ${expandedCard === index ? '' : 'hover:shadow-[0_8px_30px_rgba(26,60,94,0.08)] transition-all'}`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">{sub.week}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="text-sm text-on-surface-variant">{sub.date}</span>
                    </div>
                    <div className="text-3xl font-black text-primary">{sub.weight} <span className="text-sm font-medium text-on-surface-variant uppercase">kg</span></div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      sub.status === 'reviewed' ? 'bg-emerald-50 text-emerald-700' : 'bg-tertiary-fixed text-tertiary-container'
                    }`}>
                      {sub.status === 'reviewed' ? 'Reviewed' : 'Pending'} 
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {sub.status === 'reviewed' ? 'check_circle' : 'schedule'}
                      </span>
                    </div>
                    <button className="w-8 h-8 rounded-full hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined">
                        {expandedCard === index ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase tracking-widest">Chest {sub.chest}</span>
                  <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase tracking-widest">Waist {sub.waist}</span>
                  <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase tracking-widest">Hips {sub.hips}</span>
                </div>
              </div>

              {expandedCard === index && sub.photos.length > 0 && (
                <div className="p-6 space-y-6 border-t border-surface-container">
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-3">Progress Photos</p>
                    <div className="grid grid-cols-3 gap-4">
                      {sub.photos.map((photo, photoIndex) => (
                        <div key={photoIndex} className="aspect-[3/4] rounded-lg overflow-hidden bg-surface-container relative group cursor-zoom-in">
                          <img className="w-full h-full object-cover" alt="progress" src={photo} />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">zoom_in</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {sub.trainerRemark && (
                    <div className="bg-surface-container-low p-5 rounded-xl border-l-4 border-primary">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <img className="w-full h-full object-cover" alt="trainer" src={sub.trainerRemark.avatar} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-primary leading-relaxed italic">"{sub.trainerRemark.text}"</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">— {sub.trainerRemark.trainer}</span>
                            <span className="text-[10px] text-outline">{sub.trainerRemark.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="pt-6 flex justify-center">
            <button className="px-8 py-3 rounded-xl border border-outline-variant text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:bg-surface-container-low transition-all active:scale-95">
              Load 3 More Submissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
