import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

export default function DietPlan() {
  const { user } = useAuthStore();
  const { dietPlans } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    planType: 'personal_training' as const,
  };

  const isPT = currentMember.planType === 'personal_training';

  // Read member diet plan
  const plan = useMemo(() => {
    return dietPlans.find(p => p.memberId === currentMember.id) || dietPlans[0];
  }, [dietPlans, currentMember]);

  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  // Compute total calories & macros across all meals
  const summary = useMemo(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    if (!plan) return { totalCalories: 2200, totalProtein: 160 };

    plan.meals.forEach(m => {
      m.items.forEach(it => {
        totalCalories += it.calories || 150;
        totalProtein += it.protein || 15;
      });
    });

    return {
      totalCalories: totalCalories || 2250,
      totalProtein: totalProtein || 165,
    };
  }, [plan]);

  if (!isPT) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-orange-100 text-[#E87722] rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <span className="material-symbols-outlined text-4xl">restaurant</span>
        </div>
        <div>
          <span className="px-3 py-1 bg-orange-100 text-[#E87722] text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
            Personal Training Feature
          </span>
          <h1 className="text-3xl font-black text-[#1A3C5E]">Customised Diet & Nutrition Plan</h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
            Nutritional plans calculated to match your body composition goals are exclusively provided under the <span className="font-bold text-slate-800">Personal Training Plan</span>.
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
              Personalised Nutrition Plan
            </span>
            <span className="text-xs text-slate-400">Assigned by Coach Ravi Sharma</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">My Diet & Meal Plan</h1>
          <p className="text-xs text-slate-500 mt-1">
            Tailored for lean muscle hypertrophy and fat loss • Last updated {plan ? new Date(plan.updatedAt || plan.assignedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 text-xs font-bold self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          Target: {summary.totalCalories} kcal / day
        </div>
      </div>

      {/* Daily Macro Targets Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Daily Macronutrient Targets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider">Protein Target</span>
              <span className="text-xs font-bold text-[#1A3C5E]">~30%</span>
            </div>
            <p className="text-3xl font-black text-[#1A3C5E]">160g</p>
            <p className="text-[11px] text-slate-500 mt-1">Lean meat, eggs, whey, paneer, sprouts</p>
          </div>

          <div className="p-4 bg-orange-50/70 rounded-xl border border-orange-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#E87722] uppercase tracking-wider">Carbohydrates</span>
              <span className="text-xs font-bold text-[#E87722]">~45%</span>
            </div>
            <p className="text-3xl font-black text-[#E87722]">210g</p>
            <p className="text-[11px] text-slate-500 mt-1">Oats, brown rice, sweet potatoes, rotis</p>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Healthy Fats</span>
              <span className="text-xs font-bold text-amber-800">~25%</span>
            </div>
            <p className="text-3xl font-black text-amber-900">60g</p>
            <p className="text-[11px] text-slate-500 mt-1">Almonds, peanut butter, olive oil, seeds</p>
          </div>
        </div>
      </div>

      {/* Trainer Directives (PRD F-013, Screen 3) */}
      <div className="bg-orange-50/70 rounded-2xl p-6 border-l-4 border-[#E87722] shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#E87722]">format_quote</span>
          <h3 className="text-sm font-black uppercase tracking-wider text-[#1A3C5E]">Coach Ravi Sharma's Directives</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic mb-3">
          "{plan?.trainerNotes || 'Maintain 3.5 litres of water daily. Ensure post-workout shake is taken within 45 minutes of training. Limit sodium intake after 8:00 PM.'}"
        </p>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#1E7A45]">check</span> Hydration: 3.5L/day</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-[#1E7A45]">check</span> No refined sugar</span>
        </div>
      </div>

      {/* Structured Meals Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-[#1A3C5E]">Structured Daily Meals</h3>

        <div className="space-y-3">
          {(plan?.meals || []).map((meal, idx) => {
            const isExpanded = expandedMeal === meal.type || expandedMeal === null;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <div
                  onClick={() => setExpandedMeal(prev => prev === meal.type ? '' : meal.type)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E87722] flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A3C5E] text-base">{meal.name}</h4>
                      <p className="text-xs text-slate-400">{meal.items.length} items prescribed</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-400 capitalize">
                    {meal.type.replace('_', ' ')}
                  </span>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2">
                    {meal.items.map((it, itIdx) => (
                      <div
                        key={itIdx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]" />
                          <span className="font-bold text-[#1A3C5E]">{it.name}</span>
                        </div>
                        <span className="font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
                          {it.quantity} {it.unit}
                        </span>
                      </div>
                    ))}
                    {meal.trainerNotes && (
                      <p className="text-xs text-slate-500 italic pt-1 pl-1">
                        Note: {meal.trainerNotes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
