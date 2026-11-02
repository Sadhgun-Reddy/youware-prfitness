import { useState } from 'react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Attendance() {
  const [currentMonth] = useState(5);
  const [currentYear] = useState(2025);
  const currentStreak = 7;
  const bestStreak = 15;

  const calendarDays = [
    { day: 26, isCurrentMonth: false },
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true, checkedIn: true },
    { day: 2, isCurrentMonth: true, checkedIn: true },
    { day: 3, isCurrentMonth: true, checkedIn: true },
    { day: 4, isCurrentMonth: true, checkedIn: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true, checkedIn: true },
    { day: 7, isCurrentMonth: true, checkedIn: true },
    { day: 8, isCurrentMonth: true, checkedIn: true },
    { day: 9, isCurrentMonth: true, checkedIn: true },
    { day: 10, isCurrentMonth: true, checkedIn: true },
    { day: 11, isCurrentMonth: true, checkedIn: true, isToday: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
  ];

  const weeklyData = [
    { day: 'Mon', done: true },
    { day: 'Tue', done: true },
    { day: 'Wed', done: true },
    { day: 'Thu', done: false },
    { day: 'Fri', done: true },
    { day: 'Sat', done: true },
    { day: 'Sun', done: true },
  ];

  const recentActivity = [
    { title: 'Morning Flow', date: 'Jun 11, 2025', time: '06:45 AM', status: 'verified' },
    { title: 'Strength Training', date: 'Jun 10, 2025', time: '05:30 PM', status: 'verified' },
  ];

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_30px_rgb(26,60,94,0.04)] group transition-all hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="label-md font-bold text-on-surface-variant tracking-widest uppercase text-[10px]">Current Streak</span>
            <div className="bg-tertiary-fixed text-tertiary p-2 rounded-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-extrabold text-[#E87722]">{currentStreak} Days</h3>
          </div>
          <p className="text-sm text-on-surface-variant/70 mt-2">Personal record is {bestStreak} days</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_30px_rgb(26,60,94,0.04)] transition-all hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="label-md font-bold text-on-surface-variant tracking-widest uppercase text-[10px]">Monthly Progress</span>
            <div className="bg-primary-fixed text-primary p-2 rounded-lg">
              <span className="material-symbols-outlined">analytics</span>
            </div>
          </div>
          <h3 className="text-4xl font-extrabold text-[#1A3C5E]">14 / 20</h3>
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#1A3C5E] h-full w-[70%] rounded-full"></div>
          </div>
          <p className="text-sm text-on-surface-variant/70 mt-3">6 sessions left for gold badge</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_30px_rgb(26,60,94,0.04)] transition-all hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
            <span className="label-md font-bold text-on-surface-variant tracking-widest uppercase text-[10px]">Best Streak</span>
            <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
          </div>
          <h3 className="text-4xl font-extrabold text-emerald-600">{bestStreak} Days</h3>
          <p className="text-sm text-on-surface-variant/70 mt-2">Achieved June 2024</p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0_8px_40px_rgba(26,60,94,0.05)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1A3C5E]">{months[currentMonth]} {currentYear}</h2>
              <p className="text-sm text-on-surface-variant">Overall consistency: 88%</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-6 mb-8">
            <div className="text-center text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Mon</div>
            <div className="text-center text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Tue</div>
            <div className="text-center text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Wed</div>
            <div className="text-center text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Thu</div>
            <div className="text-center text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Fri</div>
            <div className="text-center text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Sat</div>
            <div className="text-center text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">Sun</div>

            {calendarDays.map((dayData, index) => (
              <div key={index} className="flex justify-center items-center py-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  dayData.isToday 
                    ? 'ring-4 ring-[#E87722] bg-[#E87722] text-white shadow-lg shadow-orange-500/30'
                    : dayData.checkedIn 
                      ? 'bg-primary-container text-white'
                      : dayData.isCurrentMonth
                        ? 'border border-outline-variant'
                        : 'text-on-surface-variant/30'
                }`}>
                  {dayData.day}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant/20 pt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-container"></span>
              <span className="text-xs font-semibold text-on-surface-variant">Checked In</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E87722]"></span>
              <span className="text-xs font-semibold text-on-surface-variant">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border border-outline-variant bg-white"></span>
              <span className="text-xs font-semibold text-on-surface-variant">No Check-in</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_30px_rgb(26,60,94,0.04)]">
            <h3 className="font-bold text-[#1A3C5E] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">view_week</span>
              Weekly Snapshot
            </h3>
            <div className="flex justify-between gap-1">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant/60">{data.day}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    data.done 
                      ? 'bg-primary-container text-white' 
                      : 'border-2 border-outline-variant/30 text-on-surface-variant/30'
                  }`}>
                    {data.done ? (
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                    ) : (
                      <span className="text-[10px] font-bold">{index + 1}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_30px_rgb(26,60,94,0.04)]">
            <h3 className="font-bold text-[#1A3C5E] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">history</span>
              Recent Activity
            </h3>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">verified</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-on-surface">{activity.title}</h4>
                    <p className="text-[11px] text-on-surface-variant/60">{activity.date} • {activity.time}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/5 text-primary border border-primary/10 uppercase tracking-tighter">Verified</span>
                  </div>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
                <span className="material-symbols-outlined text-amber-600">warning</span>
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Inactivity Warning</h4>
                  <p className="text-[11px] text-amber-800 leading-tight">No session in 8 days! Your streak is currently protected by a vacation pass.</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 text-xs font-bold text-primary-container border-t border-outline-variant/10 hover:bg-surface-container-low transition-colors rounded-b-xl">
              View All Records
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-primary/5 border border-primary/10 p-4 rounded-xl flex items-center justify-center gap-3">
        <span className="material-symbols-outlined text-primary text-sm">info</span>
        <p className="text-xs font-medium text-on-surface-variant">Consistent attendance is key to reaching your goals. Your primary trainer can view this record.</p>
      </footer>
    </div>
  );
}
