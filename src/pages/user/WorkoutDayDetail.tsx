import { useParams } from 'react-router-dom';

export default function WorkoutDayDetail() {
  const { day, exerciseId } = useParams<{ day?: string; exerciseId?: string }>();

  const currentDay = day ? day.charAt(0).toUpperCase() + day.slice(1) : 'Monday';

  return (
    <div>
      <div className="mb-12">
        <span className="label-md text-on-tertiary-container font-bold tracking-widest uppercase text-xs mb-2 block">
          Phase 2: Hypertrophy
        </span>
        <h2 className="text-5xl font-black text-primary tracking-tight mb-2">
          {currentDay} — Chest & Triceps
        </h2>
        <div className="flex items-center gap-4 text-on-surface-variant font-medium">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">fitness_center</span>
            4 exercises
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            Est. 45 min
          </span>
        </div>
      </div>

      <div className="mb-12 neo-card-yellow bg-[#FFF9E6] border-l-8 border-on-tertiary-container p-6 rounded-2xl flex items-center gap-6">
        <div className="bg-on-tertiary-container/10 p-3 rounded-full">
          <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
        </div>
        <div>
          <h4 className="font-bold text-on-tertiary-container">Warm-Up Reminder</h4>
          <p className="text-sm text-tertiary/70 font-medium leading-relaxed">
            Prioritize dynamic chest stretches and 2 light sets of pushups. Do not skip joint mobilization for shoulders.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section className="neo-card bg-surface-container-lowest rounded-[2rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 relative group cursor-pointer">
              <img
                className="w-full h-full object-cover"
                alt="Flat Bench Press"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy2-Z2-ZSk5HK7EKCeLiBR1GbiicMKaoKYsnYhisMaQvFO5tTTeBlIMyhQjR6zR9Gf5pW2gfsCrxt-GUrj-BYlrFJSyAhwPAhcLHBOM9hkNR-4isJvTEof7CxCFWNdTgpy30tqOInv6O7xfVrKuSP7OR42Wxax5eviQsezKBAx7r-ylEgX5-teD1hkiI8POEzj6xO7TiA73z_Kr8Wv7qi1fVokUubisHt1kb5xoWvX09jeRLuK5Z59jtOgbL_5WK2LmxH9lfYVyJc"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">Exercise 01</span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">Compound</span>
              </div>
            </div>

            <div className="lg:col-span-3 p-10 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black text-primary tracking-tighter mb-2">Flat Bench Press</h3>
                  <p className="text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span className="font-bold text-on-tertiary-container">60 seconds rest</span> between sets
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-surface-container-low text-primary hover:bg-primary-fixed transition-colors">
                    <span className="material-symbols-outlined">history</span>
                  </button>
                  <button className="p-2 rounded-lg bg-surface-container-low text-primary hover:bg-primary-fixed transition-colors">
                    <span className="material-symbols-outlined">info</span>
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-2xl overflow-hidden mb-8">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container text-[10px] font-black uppercase tracking-widest text-outline">
                    <tr>
                      <th className="px-6 py-4">Set</th>
                      <th className="px-6 py-4">Weight</th>
                      <th className="px-6 py-4">Reps</th>
                      <th className="px-6 py-4 text-right">Target RPE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    <tr className="hover:bg-surface-container-high transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">01</td>
                      <td className="px-6 py-4 font-medium">60kg</td>
                      <td className="px-6 py-4 font-medium">10</td>
                      <td className="px-6 py-4 text-right text-on-tertiary-container font-bold">7</td>
                    </tr>
                    <tr className="hover:bg-surface-container-high transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">02</td>
                      <td className="px-6 py-4 font-medium">65kg</td>
                      <td className="px-6 py-4 font-medium">8</td>
                      <td className="px-6 py-4 text-right text-on-tertiary-container font-bold">8</td>
                    </tr>
                    <tr className="hover:bg-surface-container-high transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">03</td>
                      <td className="px-6 py-4 font-medium">65kg</td>
                      <td className="px-6 py-4 font-medium">8</td>
                      <td className="px-6 py-4 text-right text-on-tertiary-container font-bold">8.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-auto pt-6 border-t border-outline-variant/30 flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-fixed rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-fixed-variant text-sm">smart_toy</span>
                </div>
                <p className="text-on-surface-variant text-sm italic leading-relaxed">
                  "Keep your shoulder blades retracted and focus on a controlled 2-second eccentric phase. Drive with your legs to maintain stability throughout the press."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="neo-card bg-surface-container-lowest rounded-[2rem] p-10 opacity-70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale"
                  alt="Incline Dumbbell Flies"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwjGYKB0v8wyrIjpiOMRxpXC_a4t9BAyhGPGQnUO0W6xP66JuWNhEAsf2oGzIZVp9hyJP1xZZqku1uw5cCbP764XGoGEhQJlu2I3txSXGLSDCKMO_8nyCeh3oRx10GblzKtPDsIE-YcuaRKSLQgGuwcotX4kLBmOnSMxzdzXBq2Mj06SznGA0dMBpVarIMsKrSLMUZrm7hBtaFkRp2Q2_CwKLB6pVI3D062Tp1cgfi48GAlEazBuOOO8qNX7tjfPdj_nqhKcwL9BU"
                />
              </div>
              <div>
                <span className="text-[10px] font-black text-outline uppercase tracking-widest mb-1 block">Exercise 02</span>
                <h3 className="text-2xl font-black text-primary tracking-tighter">Incline Dumbbell Flies</h3>
                <p className="text-sm text-on-surface-variant">3 Sets · 12 Reps · 45s Rest</p>
              </div>
            </div>
            <button className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        </section>
      </div>

      <div className="mt-20 flex flex-col items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent mb-12"></div>
        <button
          className="px-12 py-5 rounded-2xl bg-surface-container-high text-outline font-black uppercase tracking-[0.2em] text-sm cursor-not-allowed flex items-center gap-4"
          disabled
        >
          Log This Session (Coming Soon)
          <span className="material-symbols-outlined text-[18px]">lock</span>
        </button>
        <p className="mt-4 text-on-surface-variant/50 text-[10px] font-bold uppercase tracking-wider">
          Sync with Apple Health & Google Fit is currently in beta
        </p>
      </div>
    </div>
  );
}
