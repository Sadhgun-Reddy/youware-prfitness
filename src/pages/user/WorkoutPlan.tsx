import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function WorkoutPlan() {
  const { day: dayParam } = useParams<{ day?: string }>();
  const [selectedDay, setSelectedDay] = useState(dayParam || 'monday');
  const [activeTab, setActiveTab] = useState(0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  const exercises = [
    {
      name: 'Flat Bench Press',
      sets: '4 SETS',
      reps: '8-10 REPS',
      rest: '90s REST',
      tip: 'Focus on the eccentric phase; 3 seconds down. Keep scapula retracted.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYx8k8xw0_VKFBvEOz0ZvLosjiTWAjjFM-_fFThoH0fzIB7Zxpoi6AGUrthwZItCM_8r0QHK87lH-UF45e6j4rFsAdH2ikH83CwhaJnLeD_iHssB1E8MbiC5T2QkEzsQGkdYPs7o0STakiYgZuqOVImPzcqS__RTam12VGsZ4NsqzTsgHcZYKGQWQfzbEFzuUv7_bwfWvGsxNgVCxfo7LxsN5Q6oYloJnS8xPNRwByEpBaYiR7zef0zDfM2uLFtdrNDedO-bTVweg',
    },
    {
      name: 'Incline Dumbbell Press',
      sets: '3 SETS',
      reps: '12 REPS',
      rest: '60s REST',
      tip: '30 degree incline. Stretch at the bottom, don\'t clink weights at top.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADbPuDS4gut6Pib6lhY7iVBgC-bgJ5K_HwQV09e2lid14TtB1G99VQJ4GJa3MBtDC3g2J1d7miZcxvN1RfaQ-r3u133mD7-LU5sRybID-TE_9ti2bc1TEmiOBaZk6F5zTIvf7_RjQfDsbCBIMSxIjQ2fxBbx01soSuGeqUJ98VmhSoBylWvQqZsTeuuMRAgaPamWL5yxujdNZkT1ITJ0k1pG90_NyvlNUiOxaVMYxm48r-gv5vY46Xq3TMcmq9emcIAp0AmiMO3b4',
    },
    {
      name: 'Tricep Pushdown',
      sets: '4 SETS',
      reps: '15 REPS',
      rest: '45s REST',
      tip: 'Straight bar attachment. Elbows glued to ribs. Squeeze at the bottom.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr8799F9JjXbpAmHndprzf63m2pHI-MExEEdGwyVrNBxK8tQ8nsaHMkp5RojUYeUPAqgzauGAa17B5tupqNWzxkbTOU3ff29RkJtwkXefKx2hiI_Wd_Px3ULibjvwRcCEln2_WSGfGZNQN8CQBvtb3HShmWAtD0bTbUy5Xgk86BleFG9seNBYbIPXmGsaqMSEAilnHOiyCbCKC4E6nre48BWt7OBQ3zDigT7nNowgEMNdrwmU1n3yfQcxWcn5FZ8z-W9HreT5Z7O8',
    },
    {
      name: 'Skull Crushers',
      sets: '3 SETS',
      reps: '10 REPS',
      rest: '60s REST',
      tip: 'Use EZ bar. Lower to forehead, full extension without locking out.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1CW0oRonFDE445qBB4MtIy3Ss4NzfFnZMDO2k6CV5XGUPZ1P0WVS0HJjTl_2dv3u0ca-PCI5pXVzFMRcF3awL1-0htcRsD1FYJDYOk0a83Xco4Xoj3X5ZxBijYCgXjzfJiLu1Zta8QUsYmXItaR1vNWsB0g2FR4xCxMqFmugC5jIBHua5eao7dGJJZ5I5VpI_XOmU6rp3jjFTJdoLghyQ5xvp97FUestJF4nL4C_Tg5p_CNYgR3mw9bSkhYC2_j6MOT2X7Dn8c0g',
    },
  ];

  const trainer = {
    name: 'Ravi Sharma',
    role: 'Lead Strength Coach',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkgvh2kSSgjR3qtN7kzXaH5YloAR2qXFIeYMAtDlI8jQXqkn3oKWt0tqutMHLwd1jgZ7ynOGai3KkfNuzlse9jjUvjRquqFf31aNghVwqcv83Fk20c9XtqedPy4t2_oVRxZAx9rF1QdRxKpU57wHwZ6ClXWUNZX_PihtcXP2BVmMrOP4CULtU2gx3LK9XD_xmh4VGp403_0JCZ-7fDsy3Vo6YrUseZkkmmgZ1tFs0mvAjYVT2rd9P8wDFq_-T_HDc-rHbD_vlCjR4',
    message: 'This block focuses on mechanical tension. Don\'t skip the rest periods; they are essential for ATP recovery.',
  };

  return (
    <div>
      <div className="bg-tertiary-fixed text-on-tertiary-fixed-variant py-2 px-6 text-center text-xs font-bold tracking-widest uppercase mb-6">
        ⭐ Personal Training — Your trainer-assigned workout plan
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-1">My Workout Plan</h1>
        <p className="text-on-surface-variant text-sm font-medium">Assigned by Ravi S. · Last updated 10 Jun 2025</p>
      </header>

      <section className="mb-10 overflow-x-auto no-scrollbar flex gap-3 pb-2">
        {days.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day.toLowerCase())}
            className={`px-6 py-3 rounded-full text-sm flex-shrink-0 transition-all duration-300 active:scale-95 ${
              selectedDay === day.toLowerCase()
                ? 'bg-orange-100 text-orange-600 font-bold'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {day}
          </button>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-container">Monday — Chest & Triceps</h2>
            <div className="flex items-center gap-2 text-tertiary-fixed-dim bg-tertiary-container px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">schedule</span> 65 MINS
            </div>
          </div>

          <div className="space-y-4">
            {exercises.map((exercise, i) => (
              <div
                key={i}
                className="group bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(26,60,94,0.06)] hover:shadow-[0_8px_30px_rgba(26,60,94,0.12)] transition-all duration-300 border-l-4 border-primary"
              >
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                    <img className="w-full h-full object-cover" alt={exercise.name} src={exercise.image} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-primary uppercase tracking-tight">{exercise.name}</h3>
                      <button className="text-primary hover:text-orange-600 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-surface-container-low text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">{exercise.sets}</span>
                      <span className="bg-surface-container-low text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">{exercise.reps}</span>
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">{exercise.rest}</span>
                    </div>
                    <p className="text-on-surface-variant text-sm italic">"{exercise.tip}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <img className="w-14 h-14 rounded-full border-2 border-orange-500 object-cover" alt={trainer.name} src={trainer.avatar} />
                <div>
                  <h4 className="font-bold">{trainer.name}</h4>
                  <p className="text-primary-fixed-dim text-xs">{trainer.role}</p>
                </div>
              </div>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed">"{trainer.message}"</p>
              <button className="w-full bg-white text-primary font-bold py-3 rounded-lg text-sm transition-transform active:scale-95">Message Trainer</button>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border-2 border-dashed border-outline-variant">
            <div className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-3">calendar_month</span>
              <h4 className="text-primary font-bold mb-1">Rest Day: Sunday</h4>
              <p className="text-on-surface-variant text-sm mb-4">No specific exercises assigned. Focus on active recovery and hydration.</p>
              <button className="text-primary font-bold text-xs uppercase tracking-widest hover:text-orange-600 transition-colors">Log Mobility Session</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-primary font-bold mb-4 uppercase text-xs tracking-widest">Plan Highlights</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Focus Area</span>
                <span className="text-sm font-bold text-primary">Hypertrophy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Weekly Volume</span>
                <span className="text-sm font-bold text-primary">24 Sets</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Current Streak</span>
                <span className="text-sm font-bold text-orange-600">12 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
