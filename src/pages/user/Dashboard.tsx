import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function Dashboard() {
  const { user } = useAuthStore();
  
  const memberName = user?.name || 'Alex Rivera';
  // const isPT = user?.planType === 'personal_training';
   const isPT = false; 
  const planType = isPT ? 'Personal Training' : 'Normal Membership';
  const validFrom = 'Oct 12, 2023';
  const validUntil = 'Oct 12, 2024';
  const daysRemaining = isPT ? 25 : 30;
  const streakDays = isPT ? 7 : 5;

  const weeklyData = [
    { day: 'M', active: true },
    { day: 'T', active: true },
    { day: 'W', active: true },
    { day: 'T', active: true },
    { day: 'F', active: true },
    { day: 'S', active: true },
    { day: 'S', active: true, isToday: true },
  ];

  const weekDaysChart = [
    { day: 'MON', height: 16 },
    { day: 'TUE', height: 20 },
    { day: 'WED', height: 12 },
    { day: 'THU', height: 22 },
    { day: 'FRI', height: 24, isActive: true },
    { day: 'SAT', height: 0 },
    { day: 'SUN', height: 0 },
  ];

  const exercises = [
    { num: '01', name: 'Incline Barbell Bench Press', reps: '4 Sets x 8-10 Reps • 90s Rest' },
    { num: '02', name: 'Weighted Chest Dips', reps: '3 Sets x 12 Reps • 60s Rest' },
    { num: '03', name: 'Triceps Rope Pushdowns', reps: '4 Sets x 15 Reps • Burnout Set' },
  ];

  const activityHistory = [
    { type: 'strength', title: 'Full Body Strength', time: 'Yesterday, 5:45 PM', icon: 'history' },
    { type: 'cardio', title: 'HIIT Cardio Session', time: 'Monday, 07:12 AM', icon: 'directions_run' },
    { type: 'weight', title: 'Weight Entry', time: 'Oct 05, 08:00 AM', icon: 'fitness_center' },
  ];

  const videoLibrary = [
    { title: 'Advanced Deadlift Form', category: 'Strength • Pro Series', duration: '12:45', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUmzQhobxyTCefktTKxq-Tg3t7kLggXe16WfNZQR0cV-V3oYmG16uftV1p9qEL2dNGV4aWfzBpn5Z-BaUHeSuwBSHU_eWYv4c8GZtwrJFGg-phN0CjtedeWn88yRH82PMEMPTKLnN1K3CjEMY5zJxGeZlbEkbJt5hb9_TNvjCpcIBUvtIMG5vSzh6K-lOTcHQT00pO_qA_ulHoJd8FjFZ3UjzOlaWDiW380QRAqJd414CFLE5r2F69q_6ROgK5WFf1nqcOidha3aY' },
    { title: 'Restorative Flow Yoga', category: 'Recovery • Daily Vitality', duration: '24:10', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyhoT-mtMSPoi1KSd87niESqJboUIzu0uw8UomxlVbT95lnvA035NmU5vUNjl-aCTR-fmiQi5rTLG4PXjUNRCogCvLkCE9UvbWMjKh0j420YkDAALhir0Kz-w1sCohqBw7YwvBPZrsk-TPZDfDz1wSLn266gGQ_0hAAXhPvXtThtC-MvbZ26FYUZwx2GuYp6xC12BKhwiWSb15mfANC5OTE3--AE87N3BGLzF41SZ9mhGprqs_4anQLzZFkLdn-WWR-tyH-d7v-dQ' },
    { title: 'Upper Body Blast', category: 'HIIT • Power Hour', duration: '08:15', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwJ-dH-h6kz6aBTdqg5C6dxQuhPt2MwFksLEPdO96k8u3qIDzJRYQszPMP0Wh-vNgkOYNZ2sVfPVelKePAauu4zKTwM7aXcrVMteK5aM9ONEPqYFYtvdsX2qWE1DpyurGKjOkjokxMdpwoiIIA6n6kgaBOXijwJlqWVhZYJrE7eHoeC2KHU0FWm1carVyZDNM7csmcX0SGCHMUxCqGUzFLAGtH3dytqkvHzAhBEwARFvGOKO4g88qEsEKL7VN8A3-PXTbXoBFueEI' },
    { title: 'Endurance Foundation', category: 'Cardio • Long Run', duration: '15:50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8rSCByUb9Aj97ROoQHP6Sxe9RjNqmfGrKGPla12QM6S1mdrQi8cKEpD4E1Pi1KD9nFjwloRzmArn3nn0eKTlBeqcBfriWFeWs_9kpqR_8koA1pYuo12X2Gd1jhBjFyIjTWJP-JULCzysWZNefBY_61KCdUEI1xlsi0a4qNsoGua75R_9ut2PpIA-CQ-9mIaHkNQPjqCmVMlJ_NdhLC-TkHQK9ZIUNLK1WGH6oPSUNlILxCvy2WW6X8SMAfPf-M48RS4I-0-i9Ec' },
  ];

  return (
    <div className="bg-[#f8f9fb] text-[#191C1E] font-body antialiased">
      {/* PT MEMBER DESIGN */}
      {isPT ? (
        <>
          {/* Membership Status Card */}
          <section className="mb-8">
            <div className="bg-white p-6 rounded-xl flex items-center justify-between" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#002645] to-[#1A3C5E] rounded-xl flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-black text-[#1A3C5E] tracking-tight">{planType}</h2>
                    <span className="px-3 py-1 bg-[#ffdbc8] text-[#321300] text-[10px] font-bold uppercase tracking-widest rounded-full">Pro Plan</span>
                  </div>
                  <p className="text-[#43474E] text-sm font-medium">Valid from {validFrom} — {validUntil}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-emerald-600 font-bold text-lg">{daysRemaining} days remaining</p>
                </div>
                <p className="text-[#43474E] text-xs">Auto-renews on next billing cycle</p>
              </div>
            </div>
          </section>

          {/* Two Column Grid */}
          <div className="grid grid-cols-12 gap-8 mb-8">
            {/* Left Column: Check-In Hub */}
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-white p-8 rounded-xl h-full flex flex-col justify-between" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-[#1A3C5E]">Check-In Hub</h3>
                    <div className="flex items-center gap-1 text-[#E87722]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      <span className="text-xl font-black">{streakDays}</span>
                    </div>
                  </div>
                  <div className="bg-[#F2F4F6] rounded-xl p-6 mb-8 text-center">
                    <p className="text-sm font-medium text-[#43474E] mb-2">Last Check-in</p>
                    <p className="text-[#1A3C5E] font-bold text-lg">Today, 08:45 AM</p>
                  </div>
                  <div className="flex justify-between mb-8">
                    {weeklyData.map((data, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${data.isToday ? 'bg-[#E87722] text-white' : 'bg-[#002645] text-white'}`}>
                          {data.day}
                        </div>
                        <span className={`text-[10px] font-bold ${data.isToday ? 'text-[#E87722]' : 'text-slate-400'}`}>{data.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-br from-[#E87722] to-[#FF8C37] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                  Check In Now
                </button>
              </div>
            </div>

            {/* Right Column: Weekly Progress */}
            <div className="col-span-12 lg:col-span-7">
              <div className="bg-white p-8 rounded-xl h-full" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A3C5E]">Weekly Progress</h3>
                    <p className="text-sm text-[#43474E] font-medium">Weight Loss Track</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-emerald-100">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                    Submitted
                  </div>
                </div>
                <div className="flex items-end gap-12">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-black text-[#1A3C5E] tracking-tighter">3.2</span>
                      <span className="text-2xl font-bold text-slate-400 tracking-tight">kg lost</span>
                    </div>
                    <p className="text-sm font-medium text-[#43474E]">Since last weigh-in (7 days ago)</p>
                    <div className="mt-8 h-32 flex items-end gap-3">
                      {[60, 65, 55, 50, 45, 35, 25].map((height, i) => (
                        <div key={i} className={`flex-1 rounded-t-lg cursor-pointer group relative ${i === 6 ? 'bg-gradient-to-br from-[#002645] to-[#1A3C5E]' : 'bg-[#F2F4F6] hover:bg-[#1A3C5E] transition-colors'}`} style={{ height: `${height}%` }}>
                          <div className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${i === 6 ? 'bg-[#E87722] text-white' : 'bg-[#002645] text-white'}`}>
                            {i === 6 ? '80.8kg' : `${84 - i * 0.5}kg`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-48 space-y-4">
                    <div className="p-4 bg-[#F2F4F6] rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Body Fat</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#1A3C5E]">14.2%</span>
                        <span className="text-xs text-emerald-500 font-bold">-0.8%</span>
                      </div>
                    </div>
                    <div className="p-4 bg-[#F2F4F6] rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Muscle Mass</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-[#1A3C5E]">38.5kg</span>
                        <span className="text-xs text-[#E87722] font-bold">+0.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Today's Workout (PT Only) */}
          <section>
            <div className="bg-white p-8 rounded-xl" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-6">
                    <img alt="Trainer Marcus" className="w-16 h-16 rounded-2xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi4uTPlgN5xj287b-32obiBdFmL1tUrA-HfaUseM3Zt2UhVzikSXlyO6qb6TZK-W6uo-30GNidPxmQoSwGjRxdslCaIqcfq-F7NrFjW7qEzhnxlYuetHKm8iwa9wBA19QSigF9tB1gEfr3rr41w6uicHVEs6zWnFgUrhiBvBnITSow0oF7-GJHlfBCWKbDxAPYfSoX29Y4h5LC0PgsvYyBgY-5gfEgrVncnKR6vL-NPmA2OnflECN-gHnd9JoN35nAC0rXAaIuyTg" />
                    <div>
                      <h4 className="text-[#1A3C5E] font-bold">Coach Marcus</h4>
                      <p className="text-xs text-[#43474E] font-medium">Head of Elite Training</p>
                    </div>
                  </div>
                  <div className="bg-[#1A3C5E]/10 p-5 rounded-2xl relative">
                    <span className="material-symbols-outlined absolute -top-3 -left-2 text-[#1A3C5E] bg-white rounded-full p-1 text-lg">format_quote</span>
                    <p className="text-sm italic text-[#87a7ce] leading-relaxed">
                      "Today we focus on hypertrophy. Slow controlled eccentrics on the flyes. Keep your rest under 60s for the burnout sets. Let's push."
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-[#1A3C5E] tracking-tight">Today's Workout</h3>
                      <p className="text-[#E87722] font-bold text-sm tracking-wide">Chest & Triceps Focus</p>
                    </div>
                    <button className="bg-[#e6e8ea] hover:bg-[#e0e3e5] px-6 py-3 rounded-xl text-[#1A3C5E] font-bold text-sm transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">play_circle</span>
                      View Demo
                    </button>
                  </div>
                  <div className="space-y-4">
                    {exercises.map((ex) => (
                      <div key={ex.num} className="flex items-center justify-between p-4 hover:bg-[#F2F4F6] rounded-xl transition-colors cursor-pointer group">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#1A3C5E] font-black shadow-sm group-hover:shadow-md transition-shadow">{ex.num}</div>
                          <div>
                            <h5 className="font-bold text-[#1A3C5E]">{ex.name}</h5>
                            <p className="text-xs text-[#43474E] font-medium">{ex.reps}</p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-[#1A3C5E] transition-colors">chevron_right</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* NORMAL MEMBER DESIGN */
        <>
          {/* Greeting */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#1A3C5E] tracking-tight mb-1">Welcome back, {memberName.split(' ')[0]}</h2>
            <p className="text-[#495f7f] font-medium">Your fitness sanctuary is ready for today's push.</p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Membership Card */}
            <div className="col-span-12 lg:col-span-4 bg-[#F2F4F6] rounded-xl p-6 flex flex-col justify-between overflow-hidden relative group" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#eceef0] rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
              <div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className="bg-[#e6e8ea] text-[#43474E] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{planType}</span>
                  <span className="material-symbols-outlined text-[#1A3C5E]">verified_user</span>
                </div>
                <p className="text-[#43474E] text-sm font-medium mb-1">Membership Status</p>
                <h3 className="text-2xl font-black text-[#1A3C5E]">Active</h3>
              </div>
              <div className="mt-10 border-t border-[#eceef0] pt-4">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#495f7f]">Renews on {validUntil}</span>
                  <Link to="/dashboard/membership" className="text-[#E87722] hover:underline">Manage</Link>
                </div>
              </div>
            </div>

            {/* Check-In Hub */}
            <div className="col-span-12 lg:col-span-8 bg-[#1A3C5E] rounded-xl p-8 text-white flex items-center justify-between overflow-hidden relative">
              <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
                  <path d="M0 100 L100 0 L100 100 Z"></path>
                </svg>
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-bold mb-2">Ready to sweat?</h3>
                <p className="text-[#87a7ce] mb-6 max-w-md">Your current streak is {streakDays} days. Check in now to maintain your momentum and unlock weekly rewards.</p>
                <button className="bg-[#E87722] hover:bg-[#fa8530] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95">
                  <span className="material-symbols-outlined">qr_code</span>
                  Generate Access Code
                </button>
              </div>
              <div className="hidden md:flex flex-col items-center bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <span className="text-4xl font-black mb-1">{String(streakDays).padStart(2, '0')}</span>
                <span className="text-[10px] font-bold tracking-tighter uppercase text-[#87a7ce]">Day Streak</span>
              </div>
            </div>

            {/* Weekly Metrics */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-xl p-8" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-xl font-black text-[#1A3C5E] mb-1">Weekly Metrics</h3>
                  <p className="text-[#43474E] text-sm">Consistency is the bridge between goals and accomplishment.</p>
                </div>
                <button className="text-sm font-bold text-[#E87722] flex items-center gap-1 hover:opacity-80">
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  Update Weight
                </button>
              </div>
              <div className="grid grid-cols-7 gap-4 mb-8">
                {weekDaysChart.map((data, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-full bg-[#F2F4F6] rounded-t-lg h-24 relative overflow-hidden">
                      <div className={`absolute bottom-0 w-full ${data.isActive ? 'bg-[#E87722]' : 'bg-[#1A3C5E]'}`} style={{ height: data.isActive ? '100%' : `${data.height * 4}%` }}></div>
                    </div>
                    <span className={`text-[10px] font-bold ${data.isActive ? 'text-[#1A3C5E]' : 'text-[#495f7f]'}`}>{data.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 bg-[#F2F4F6] p-4 rounded-xl">
                <div className="p-3 bg-white rounded-lg">
                  <span className="material-symbols-outlined text-[#1A3C5E]">monitor_weight</span>
                </div>
                <div>
                  <p className="text-xs text-[#495f7f] font-bold">Current Weight</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#1A3C5E]">184.5 lbs</span>
                    <span className="text-xs text-green-600 font-bold flex items-center">-1.2 lb this week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission History */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-xl p-6 flex-1" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
                <h3 className="text-lg font-black text-[#1A3C5E] mb-4">Submission History</h3>
                <div className="space-y-4">
                  {activityHistory.map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8F9FB] transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'strength' ? 'bg-[#ffdbc8] text-[#321300]' : activity.type === 'cardio' ? 'bg-[#c2d9fe] text-[#485e7e]' : 'bg-[#ffdbc8] text-[#321300]'}`}>
                          <span className="material-symbols-outlined text-xl">{activity.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1A3C5E]">{activity.title}</p>
                          <p className="text-[10px] text-[#495f7f]">{activity.time}</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-[#1A3C5E] transition-colors">chevron_right</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Library Preview */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-[#1A3C5E]">Featured Workouts</h3>
              <Link to="/videos" className="text-sm font-bold text-[#E87722] hover:underline">View Library</Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {videoLibrary.map((video, i) => (
                <div key={i} className="min-w-[300px] bg-white rounded-xl overflow-hidden transition-transform hover:-translate-y-1" style={{ boxShadow: '4px 4px 10px rgba(26, 60, 94, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)' }}>
                  <div className="h-40 relative">
                    <img alt={video.title} className="w-full h-full object-cover" src={video.image} />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                        <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">{video.duration}</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[#1A3C5E] mb-1">{video.title}</h4>
                    <p className="text-xs text-[#495f7f] font-medium uppercase tracking-wider">{video.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
