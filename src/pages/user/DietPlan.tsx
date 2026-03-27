import { useState } from 'react';
import { mockDietPlan } from '../../data/mock';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

const mealIcons: Record<string, string> = {
  breakfast: '🌅', mid_morning: '🍎', lunch: '☀️', evening_snack: '🥜', dinner: '🌙',
};
const mealLabels: Record<string, string> = {
  breakfast: 'Breakfast', mid_morning: 'Mid-Morning Snack', lunch: 'Lunch',
  evening_snack: 'Evening Snack', dinner: 'Dinner',
};

export default function DietPlan() {
  const plan = mockDietPlan;
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set(plan.meals.map(m => m.type)));

  const toggleMeal = (type: string) => {
    setExpandedMeals(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const totalCalories = plan.meals.reduce((sum, m) => sum + m.items.reduce((s, item) => s + (item.calories || 0), 0), 0);
  const totalProtein = plan.meals.reduce((sum, m) => sum + m.items.reduce((s, item) => s + (item.protein || 0), 0), 0);

  return (
    <div className="pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">My Diet Plan</h1>
        <span className="text-xs text-navy-600/40">Updated {plan.updatedAt}</span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card !p-4">
          <p className="text-xs text-navy-600/50 mb-1">Daily Calories</p>
          <p className="text-2xl font-bold text-navy-600">{totalCalories}<span className="text-sm font-normal text-navy-600/40"> kcal</span></p>
        </div>
        <div className="card !p-4">
          <p className="text-xs text-navy-600/50 mb-1">Daily Protein</p>
          <p className="text-2xl font-bold text-navy-600">{totalProtein}<span className="text-sm font-normal text-navy-600/40"> g</span></p>
        </div>
      </div>

      {/* Trainer Notes */}
      {plan.trainerNotes && (
        <div className="card !p-4 bg-accent-50 border-accent-500/20 mb-6">
          <p className="text-sm text-accent-700 font-medium">💡 Trainer Notes</p>
          <p className="text-sm text-accent-700/70 mt-1">{plan.trainerNotes}</p>
        </div>
      )}

      {/* Meals Accordion */}
      <div className="space-y-3">
        {plan.meals.map(meal => {
          const isExpanded = expandedMeals.has(meal.type);
          const mealCals = meal.items.reduce((s, item) => s + (item.calories || 0), 0);
          return (
            <div key={meal.type} className="card !p-0 overflow-hidden">
              <button onClick={() => toggleMeal(meal.type)} className="w-full p-4 flex items-center gap-3 hover:bg-offwhite-50 transition-colors">
                <span className="text-2xl">{mealIcons[meal.type]}</span>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-navy-600 text-sm">{mealLabels[meal.type]}</p>
                  <p className="text-xs text-navy-600/40">{meal.name} · {mealCals} kcal</p>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-navy-600/40" /> : <ChevronDown className="w-4 h-4 text-navy-600/40" />}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-offwhite-300/60">
                  <div className="space-y-2 mt-3">
                    {meal.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                          <span className="text-sm text-navy-600">{item.name}</span>
                        </div>
                        <span className="text-sm text-navy-600/50">{item.quantity} {item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
