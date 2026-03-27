import { useState, useEffect } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Plus, Save, Trash2, CheckCircle } from 'lucide-react';
import type { DietPlan, DietMeal, FoodItem } from '../../types';

const mealLabels: Record<string, string> = { 
  breakfast: 'Breakfast', 
  mid_morning: 'Mid-Morning', 
  lunch: 'Lunch', 
  evening_snack: 'Evening Snack', 
  dinner: 'Dinner' 
};
const unitOptions = ['grams', 'cups', 'pieces', 'ml', 'tbsp', 'tsp', 'slices'];

export default function DietPlans() {
  const { members, dietPlans, updateDietPlan } = useDataStore();
  const ptMembers = members.filter(u => u.planType === 'personal_training');
  
  const [selectedMemberId, setSelectedMemberId] = useState(ptMembers[0]?.id || '');
  const [localPlan, setLocalPlan] = useState<DietPlan | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // Load plan when member changes
  useEffect(() => {
    if (!selectedMemberId) return;
    const existingPlan = dietPlans.find(p => p.memberId === selectedMemberId);
    if (existingPlan) {
      setLocalPlan(JSON.parse(JSON.stringify(existingPlan)));
    } else {
      const newPlan: DietPlan = {
        id: `dp-${Date.now()}`,
        memberId: selectedMemberId,
        assignedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        meals: [
          { type: 'breakfast', name: 'Breakfast', items: [] },
          { type: 'mid_morning', name: 'Mid-Morning', items: [] },
          { type: 'lunch', name: 'Lunch', items: [] },
          { type: 'evening_snack', name: 'Evening Snack', items: [] },
          { type: 'dinner', name: 'Dinner', items: [] },
        ]
      };
      setLocalPlan(newPlan);
    }
  }, [selectedMemberId, dietPlans]);

  const addFoodItem = (mealType: string) => {
    if (!localPlan) return;
    const newItem: FoodItem = { name: 'New Item', quantity: 100, unit: 'grams' };
    const newMeals = localPlan.meals.map(m => 
      m.type === mealType ? { ...m, items: [...m.items, newItem] } : m
    );
    setLocalPlan({ ...localPlan, meals: newMeals as DietMeal[] });
  };

  const updateItem = (mealType: string, index: number, updates: Partial<FoodItem>) => {
    if (!localPlan) return;
    const newMeals = localPlan.meals.map(m => {
      if (m.type === mealType) {
        const newItems = [...m.items];
        newItems[index] = { ...newItems[index], ...updates };
        return { ...m, items: newItems };
      }
      return m;
    });
    setLocalPlan({ ...localPlan, meals: newMeals as DietMeal[] });
  };

  const removeItem = (mealType: string, index: number) => {
    if (!localPlan) return;
    const newMeals = localPlan.meals.map(m => {
      if (m.type === mealType) {
        return { ...m, items: m.items.filter((_, i) => i !== index) };
      }
      return m;
    });
    setLocalPlan({ ...localPlan, meals: newMeals as DietMeal[] });
  };

  const handleSave = () => {
    if (!localPlan || !selectedMemberId) return;
    setIsSaving(true);
    const updatedPlan = { ...localPlan, updatedAt: new Date().toISOString() };
    updateDietPlan(selectedMemberId, updatedPlan);
    
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
        <h1 className="page-header">Diet Plan Builder</h1>
        {showSavedMsg && (
          <div className="flex items-center gap-1.5 text-success font-medium text-sm animate-in fade-in slide-in-from-right-4">
            <CheckCircle className="w-4 h-4" /> Changes saved to local storage
          </div>
        )}
      </div>

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

      <div className="space-y-4 mb-6">
        {localPlan?.meals.map(meal => (
          <div key={meal.type} className="card !p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">{mealLabels[meal.type]}</h3>
              <button 
                onClick={() => addFoodItem(meal.type)}
                className="text-sm text-accent-500 font-medium flex items-center gap-1 hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-2">
              {meal.items.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-offwhite-100 rounded-lg p-2">
                  <input 
                    type="text" 
                    className="flex-1 bg-transparent text-sm text-navy-600 border-b border-transparent focus:border-navy-600/20 outline-none"
                    value={item.name}
                    onChange={e => updateItem(meal.type, i, { name: e.target.value })}
                  />
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      className="w-16 bg-white border border-offwhite-300 rounded px-1 py-0.5 text-xs outline-none"
                      value={item.quantity}
                      onChange={e => updateItem(meal.type, i, { quantity: parseFloat(e.target.value) || 0 })}
                    />
                    <select 
                      className="bg-white border border-offwhite-300 rounded px-1 py-0.5 text-xs outline-none"
                      value={item.unit}
                      onChange={e => updateItem(meal.type, i, { unit: e.target.value as any })}
                    >
                      {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                    <button 
                      onClick={() => removeItem(meal.type, i)}
                      className="p-1 rounded hover:bg-error-light transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-error/50" />
                    </button>
                  </div>
                </div>
              ))}
              {meal.items.length === 0 && (
                <p className="text-[10px] text-navy-600/30 italic">No items added to this meal</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Notes */}
      <div className="card !p-5 mb-6">
        <label className="block text-sm font-medium text-navy-600 mb-1">Trainer Notes</label>
        <textarea 
          className="input-field min-h-[80px] resize-none" 
          value={localPlan?.trainerNotes || ''} 
          onChange={e => setLocalPlan(prev => prev ? { ...prev, trainerNotes: e.target.value } : null)}
        />
      </div>

      <button 
        onClick={handleSave} 
        disabled={isSaving}
        className="btn-primary flex items-center gap-2 w-full sm:w-auto"
      >
        {isSaving ? (
          <><svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Saving...</>
        ) : (
          <><Save className="w-4 h-4" /> Save Diet Plan</>
        )}
      </button>
    </div>
  );
}
