import { useState } from 'react';
import { mockUsers, mockWorkoutPlan } from '../../data/mock';
import { Dumbbell, Clock, Plus, Save, Trash2 } from 'lucide-react';

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels: Record<string, string> = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' };

export default function WorkoutPlans() {
  const ptMembers = mockUsers.filter(u => u.planType === 'personal_training');
  const [selectedMember, setSelectedMember] = useState(ptMembers[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState('monday');
  const plan = mockWorkoutPlan;
  const currentDay = plan.days.find(d => d.dayOfWeek === selectedDay);

  return (
    <div>
      <h1 className="page-header mb-6">Workout Plan Builder</h1>

      {/* Member Select */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-navy-600 mb-1">Assign to Member</label>
        <select className="input-field" value={selectedMember} onChange={e => setSelectedMember(e.target.value)}>
          {ptMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4">
        {dayOrder.map(day => {
          const dayData = plan.days.find(d => d.dayOfWeek === day);
          return (
            <button key={day} onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                day === selectedDay ? 'bg-navy-600 text-white' : 'bg-white border border-offwhite-300 text-navy-600 hover:bg-offwhite-200'
              }`}>
              {dayLabels[day].slice(0, 3)}
            </button>
          );
        })}
      </div>

      {/* Exercises List */}
      <div className="card !p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">{dayLabels[selectedDay]} Exercises</h3>
          <button className="text-sm text-accent-500 font-medium flex items-center gap-1 hover:underline">
            <Plus className="w-4 h-4" /> Add Exercise
          </button>
        </div>
        {currentDay?.isRestDay ? (
          <div className="text-center py-8">
            <Dumbbell className="w-8 h-8 text-navy-600/20 mx-auto mb-2" />
            <p className="text-sm text-navy-600/40">Rest Day</p>
            <button className="text-xs text-accent-500 mt-2 hover:underline">Add exercises to this day</button>
          </div>
        ) : (
          <div className="space-y-3">
            {currentDay?.exercises.map((ex, i) => (
              <div key={i} className="bg-offwhite-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-navy-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="font-semibold text-navy-600 text-sm">{ex.name}</span>
                  </div>
                  <button className="p-1 rounded hover:bg-error-light"><Trash2 className="w-4 h-4 text-error/50" /></button>
                </div>
                <div className="flex items-center gap-4 pl-8">
                  <span className="text-xs text-navy-600/50">{ex.sets} sets</span>
                  <span className="text-xs text-navy-600/50">{ex.reps} reps</span>
                  <span className="text-xs text-navy-600/50 flex items-center gap-1"><Clock className="w-3 h-3" />{ex.restSeconds}s rest</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="btn-primary flex items-center gap-2">
        <Save className="w-4 h-4" /> Save Plan
      </button>
    </div>
  );
}
