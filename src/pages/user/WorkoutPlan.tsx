import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockWorkoutPlan } from '../../data/mock';
import { Dumbbell, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const dayLabels: Record<string, string> = {
  monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday',
  friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
};
const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const today = dayOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

export default function WorkoutPlan() {
  const { day: dayParam } = useParams<{ day?: string }>();
  const [selectedDay, setSelectedDay] = useState(dayParam || today);
  const plan = mockWorkoutPlan;
  const currentDayData = plan.days.find(d => d.dayOfWeek === selectedDay);

  return (
    <div className="pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">My Workout Plan</h1>
        <span className="text-xs text-navy-600/40">Updated {plan.updatedAt}</span>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
        {dayOrder.map(day => {
          const dayData = plan.days.find(d => d.dayOfWeek === day);
          const isActive = day === selectedDay;
          const isCurrentDay = day === today;
          return (
            <button key={day} onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-navy-600 text-white' :
                dayData?.isRestDay ? 'bg-offwhite-200 text-navy-600/30' :
                isCurrentDay ? 'bg-accent-50 text-accent-700 border border-accent-500/30' :
                'bg-white text-navy-600 hover:bg-offwhite-200 border border-offwhite-300'
              }`}>
              <span className="block text-xs">{dayLabels[day].slice(0, 3)}</span>
              {!dayData?.isRestDay && <span className="block w-1.5 h-1.5 rounded-full bg-accent-500 mx-auto mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {currentDayData?.isRestDay ? (
        <div className="card text-center py-16">
          <div className="w-16 h-16 rounded-full bg-offwhite-200 flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-navy-600/30" />
          </div>
          <p className="text-lg font-semibold text-navy-600/50">Rest Day</p>
          <p className="text-sm text-navy-600/30 mt-1">Recovery is key to progress</p>
        </div>
      ) : (
        <div className="space-y-3">
          {currentDayData?.exercises.map((ex, i) => (
            <div key={i} className="card !p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-navy-600">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-navy-600 text-sm">{ex.name}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-navy-600/50 flex items-center gap-1">
                      <Dumbbell className="w-3 h-3" /> {ex.sets} × {ex.reps}
                    </span>
                    <span className="text-xs text-navy-600/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {ex.restSeconds}s rest
                    </span>
                  </div>
                  {ex.notes && <p className="text-xs text-navy-600/40 mt-1.5 italic">{ex.notes}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
