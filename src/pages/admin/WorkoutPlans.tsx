import { useState, useEffect } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Dumbbell, Clock, Plus, Save, Trash2, CheckCircle } from 'lucide-react';
import type { WorkoutPlan, WorkoutDay, Exercise } from '../../types';

const dayOrder: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[] = 
  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels: Record<string, string> = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' };

export default function WorkoutPlans() {
  const { members, workoutPlans, updateWorkoutPlan } = useDataStore();
  const ptMembers = members.filter(u => u.planType === 'personal_training');
  
  const [selectedMemberId, setSelectedMemberId] = useState(ptMembers[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState<typeof dayOrder[number]>('monday');
  const [localPlan, setLocalPlan] = useState<WorkoutPlan | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // Load plan when member changes
  useEffect(() => {
    if (!selectedMemberId) return;
    const existingPlan = workoutPlans.find(p => p.memberId === selectedMemberId);
    if (existingPlan) {
      setLocalPlan(JSON.parse(JSON.stringify(existingPlan))); // Deep clone
    } else {
      // Create empty plan
      const newPlan: WorkoutPlan = {
        id: `wp-${Date.now()}`,
        memberId: selectedMemberId,
        assignedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        days: dayOrder.map(day => ({ dayOfWeek: day, exercises: [], isRestDay: true }))
      };
      setLocalPlan(newPlan);
    }
  }, [selectedMemberId, workoutPlans]);

  const currentDay = localPlan?.days.find(d => d.dayOfWeek === selectedDay);

  const toggleRestDay = () => {
    if (!localPlan) return;
    const newDays = localPlan.days.map(d => 
      d.dayOfWeek === selectedDay ? { ...d, isRestDay: !d.isRestDay } : d
    );
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const addExercise = () => {
    if (!localPlan) return;
    const newEx: Exercise = { name: 'New Exercise', sets: 3, reps: 10, restSeconds: 60 };
    const newDays = localPlan.days.map(d => 
      d.dayOfWeek === selectedDay ? { ...d, exercises: [...d.exercises, newEx], isRestDay: false } : d
    );
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const updateExercise = (index: number, updates: Partial<Exercise>) => {
    if (!localPlan) return;
    const newDays = localPlan.days.map(d => {
      if (d.dayOfWeek === selectedDay) {
        const newExs = [...d.exercises];
        newExs[index] = { ...newExs[index], ...updates };
        return { ...d, exercises: newExs };
      }
      return d;
    });
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const removeExercise = (index: number) => {
    if (!localPlan) return;
    const newDays = localPlan.days.map(d => {
      if (d.dayOfWeek === selectedDay) {
        const newExs = d.exercises.filter((_, i) => i !== index);
        return { ...d, exercises: newExs, isRestDay: newExs.length === 0 };
      }
      return d;
    });
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const handleSave = () => {
    if (!localPlan || !selectedMemberId) return;
    setIsSaving(true);
    const updatedPlan = { ...localPlan, updatedAt: new Date().toISOString() };
    updateWorkoutPlan(selectedMemberId, updatedPlan);
    
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 2000);
    }, 800);
  };

  if (ptMembers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-navy-600/40">No Personal Training members found.</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">Workout Plan Builder</h1>
        {showSavedMsg && (
          <div className="flex items-center gap-1.5 text-success font-medium text-sm animate-in fade-in slide-in-from-right-4">
            <CheckCircle className="w-4 h-4" /> Changes saved to local storage
          </div>
        )}
      </div>

      {/* Member Select */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-navy-600 mb-1">Assign to Member</label>
        <select 
          className="input-field" 
          value={selectedMemberId} 
          onChange={e => setSelectedMemberId(e.target.value)}
        >
          {ptMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4">
        {dayOrder.map(day => (
          <button key={day} onClick={() => setSelectedDay(day)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              day === selectedDay ? 'bg-navy-600 text-white' : 'bg-white border border-offwhite-300 text-navy-600 hover:bg-offwhite-200'
            }`}>
            {dayLabels[day].slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Exercises List */}
      <div className="card !p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">{dayLabels[selectedDay]} Exercises</h3>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleRestDay}
              className={`text-xs font-medium px-3 py-1 rounded-lg border transition-all ${
                currentDay?.isRestDay 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-white border-offwhite-300 text-navy-600/40'
              }`}
            >
              {currentDay?.isRestDay ? 'Rest Day Active' : 'Set as Rest Day'}
            </button>
            <button 
              onClick={addExercise}
              className="text-sm text-accent-500 font-medium flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Exercise
            </button>
          </div>
        </div>

        {currentDay?.isRestDay ? (
          <div className="text-center py-8">
            <Dumbbell className="w-8 h-8 text-navy-600/20 mx-auto mb-2" />
            <p className="text-sm text-navy-600/40">Rest Day</p>
            <button onClick={addExercise} className="text-xs text-accent-500 mt-2 hover:underline">Add exercises to this day</button>
          </div>
        ) : (
          <div className="space-y-4">
            {currentDay?.exercises.map((ex, i) => (
              <div key={i} className="bg-offwhite-100 rounded-xl p-4 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-6 h-6 rounded bg-navy-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <input 
                      type="text" 
                      className="bg-transparent font-semibold text-navy-600 text-sm border-b border-transparent focus:border-navy-600/20 outline-none w-full"
                      value={ex.name}
                      onChange={e => updateExercise(i, { name: e.target.value })}
                    />
                  </div>
                  <button onClick={() => removeExercise(i)} className="p-1 rounded hover:bg-error-light transition-colors">
                    <Trash2 className="w-4 h-4 text-error/50" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-8">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-navy-600/40 font-bold mb-0.5">Sets</label>
                    <input 
                      type="number" 
                      className="w-full bg-white border border-offwhite-300 rounded px-2 py-1 text-xs outline-none" 
                      value={ex.sets}
                      onChange={e => updateExercise(i, { sets: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-navy-600/40 font-bold mb-0.5">Reps</label>
                    <input 
                      type="number" 
                      className="w-full bg-white border border-offwhite-300 rounded px-2 py-1 text-xs outline-none" 
                      value={ex.reps}
                      onChange={e => updateExercise(i, { reps: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-navy-600/40 font-bold mb-0.5">Rest (s)</label>
                    <input 
                      type="number" 
                      className="w-full bg-white border border-offwhite-300 rounded px-2 py-1 text-xs outline-none" 
                      value={ex.restSeconds}
                      onChange={e => updateExercise(i, { restSeconds: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={handleSave} 
        disabled={isSaving}
        className="btn-primary flex items-center gap-2 w-full sm:w-auto"
      >
        {isSaving ? (
          <><svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Saving...</>
        ) : (
          <><Save className="w-4 h-4" /> Save Workout Plan</>
        )}
      </button>
    </div>
  );
}
