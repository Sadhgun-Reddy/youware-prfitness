import { useState } from 'react';
import { mockUsers, mockDietPlan } from '../../data/mock';
import { Clock, Plus, Save, Trash2 } from 'lucide-react';

const mealLabels: Record<string, string> = { breakfast: 'Breakfast', mid_morning: 'Mid-Morning', lunch: 'Lunch', evening_snack: 'Evening Snack', dinner: 'Dinner' };
const unitOptions = ['grams', 'cups', 'pieces', 'ml', 'tbsp', 'tsp', 'slices'];

export default function DietPlans() {
  const ptMembers = mockUsers.filter(u => u.planType === 'personal_training');
  const [selectedMember, setSelectedMember] = useState(ptMembers[0]?.id || '');
  const plan = mockDietPlan;

  return (
    <div>
      <h1 className="page-header mb-6">Diet Plan Builder</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-navy-600 mb-1">Assign to Member</label>
        <select className="input-field" value={selectedMember} onChange={e => setSelectedMember(e.target.value)}>
          {ptMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <div className="space-y-4 mb-6">
        {plan.meals.map(meal => (
          <div key={meal.type} className="card !p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">{mealLabels[meal.type]}</h3>
              <button className="text-sm text-accent-500 font-medium flex items-center gap-1 hover:underline">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {meal.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-offwhite-100 rounded-lg px-3 py-2">
                  <span className="flex-1 text-sm text-navy-600">{item.name}</span>
                  <span className="text-sm text-navy-600/50">{item.quantity} {item.unit}</span>
                  <button className="p-1 rounded hover:bg-error-light"><Trash2 className="w-3.5 h-3.5 text-error/50" /></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Notes */}
      <div className="card !p-5 mb-6">
        <label className="block text-sm font-medium text-navy-600 mb-1">Trainer Notes</label>
        <textarea className="input-field min-h-[80px] resize-none" defaultValue={plan.trainerNotes} />
      </div>

      <button className="btn-primary flex items-center gap-2">
        <Save className="w-4 h-4" /> Save Diet Plan
      </button>
    </div>
  );
}
