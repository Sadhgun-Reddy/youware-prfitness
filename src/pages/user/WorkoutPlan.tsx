import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

const DAYS = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
] as const;

export default function WorkoutPlan() {
  const { day: dayParam } = useParams<{ day?: string }>();
  const { user } = useAuthStore();
  const { workoutPlans, videos } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    planType: 'personal_training' as const,
  };

  const isPT = currentMember.planType === 'personal_training';

  // Determine current day of week
  const todayDayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].id;
  const [selectedDay, setSelectedDay] = useState<string>(dayParam || todayDayName);

  // Get member workout plan
  const plan = useMemo(() => {
    return workoutPlans.find(p => p.memberId === currentMember.id) || workoutPlans[0];
  }, [workoutPlans, currentMember]);

  const activeDayPlan = useMemo(() => {
    if (!plan) return null;
    return plan.days.find(d => d.dayOfWeek === selectedDay) || {
      dayOfWeek: selectedDay as any,
      exercises: [],
      isRestDay: true,
    };
  }, [plan, selectedDay]);

  if (!isPT) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-orange-100 text-[#E87722] rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <span className="material-symbols-outlined text-4xl">lock</span>
        </div>
        <div>
          <span className="px-3 py-1 bg-orange-100 text-[#E87722] text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
            Personal Training Feature
          </span>
          <h1 className="text-3xl font-black text-[#1A3C5E]">Personalised Workout Plan</h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
            You are currently on the <span className="font-bold text-slate-800">Normal Membership Plan</span>. Upgrade to Personal Training to unlock custom training routines created and adapted specifically for you by Coach Ravi Sharma.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/register/plan-select"
            className="px-8 py-3.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 active:scale-95"
          >
            <span>Upgrade to Personal Training (₹3,500/mo)</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#E87722]">
              <span className="material-symbols-outlined text-xs">verified</span>
              Personal Training Plan
            </span>
            <span className="text-xs text-slate-400">Assigned by Coach Ravi Sharma</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">My Workout Routine</h1>
          <p className="text-xs text-slate-500 mt-1">
            Last updated: {plan ? new Date(plan.updatedAt || plan.assignedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
          </p>
        </div>

        <Link
          to="/videos"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#1A3C5E] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">play_circle</span>
          Exercise Video Library
        </Link>
      </div>

      {/* Day Selector Tab Strip (PRD Screen 4: Mon-Sun strip, active highlighted in primary navy) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm flex overflow-x-auto gap-1.5">
        {DAYS.map(day => {
          const isSelected = selectedDay === day.id;
          const isToday = todayDayName === day.id;
          const dayData = plan?.days.find(d => d.dayOfWeek === day.id);
          const isRest = dayData?.isRestDay || (dayData?.exercises.length === 0);

          return (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`flex-1 min-w-[100px] py-3 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                isSelected
                  ? 'bg-[#1A3C5E] text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="capitalize">{day.label}</span>
              <span className={`text-[10px] font-medium ${
                isSelected ? 'text-white/70' : isRest ? 'text-slate-400' : 'text-[#E87722]'
              }`}>
                {isRest ? 'Rest' : `${dayData?.exercises.length || 0} Ex.`}
              </span>
              {isToday && (
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#E87722]' : 'bg-[#1A3C5E]'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Exercises Section for Active Day */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#1A3C5E] capitalize flex items-center gap-2">
            <span>{selectedDay} Routine</span>
            {activeDayPlan?.isRestDay ? (
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase">Rest Day</span>
            ) : (
              <span className="text-xs font-bold text-[#E87722] bg-orange-50 px-2.5 py-0.5 rounded-full uppercase">
                {activeDayPlan?.exercises.length} Exercises Scheduled
              </span>
            )}
          </h2>
          <span className="text-xs text-slate-400 font-medium">Rest Periods: 60s–90s</span>
        </div>

        {activeDayPlan && !activeDayPlan.isRestDay && activeDayPlan.exercises.length > 0 ? (
          <div className="space-y-3">
            {activeDayPlan.exercises.map((ex, idx) => {
              // Find matching video if any
              const matchingVideo = videos.find(v => v.title.toLowerCase().includes(ex.name.toLowerCase()));

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E87722] flex items-center justify-center font-black text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-[#1A3C5E]">{ex.name}</h3>
                        {matchingVideo && (
                          <Link
                            to={`/videos/${matchingVideo.categorySlug || 'general'}/${matchingVideo.id}`}
                            className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#E87722] hover:underline"
                          >
                            <span className="material-symbols-outlined text-sm">play_circle</span>
                            Watch Form
                          </Link>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md">{ex.sets} Sets</span>
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md">{ex.reps} Reps</span>
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md">{ex.restSeconds || 60}s Rest</span>
                      </div>
                      {ex.notes && (
                        <p className="text-xs text-slate-500 italic mt-2 bg-amber-50/70 p-2 rounded-lg border border-amber-100">
                          Coach Note: "{ex.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <Link
                    to="/videos"
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-[#1A3C5E] hover:bg-slate-50 transition-colors flex items-center gap-1 text-xs font-bold self-end sm:self-center"
                  >
                    <span className="material-symbols-outlined text-lg">videocam</span>
                    Video Demo
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          /* Rest Day Card */
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-3">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1A3C5E] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">bedtime</span>
            </div>
            <h3 className="text-xl font-black text-[#1A3C5E]">Rest & Muscle Recovery Day</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No strenuous lifting scheduled for {selectedDay}. Focus on adequate hydration, mobility, and hitting your 160g protein target.
            </p>
            <div className="pt-2">
              <Link
                to="/videos/mobility"
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold inline-block"
              >
                Browse Recovery & Mobility Routines
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
