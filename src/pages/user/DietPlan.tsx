import { useState } from 'react';

export default function DietPlan() {
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set(['breakfast']));

  const toggleMeal = (type: string) => {
    setExpandedMeals(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const meals = [
    {
      type: 'breakfast',
      emoji: '🌅',
      name: 'Breakfast',
      time: '7:00 – 8:00 AM',
      calories: 450,
      items: [
        { name: 'Rolled Oats', portion: '80g', category: 'Cereal Base' },
        { name: 'Banana', portion: '1 medium', category: 'Fruit Portion' },
        { name: 'Peanut butter', portion: '1 tbsp', category: 'Healthy Fats' },
      ],
    },
    {
      type: 'mid_morning',
      emoji: '🥜',
      name: 'Mid-Morning Snack',
      time: '10:30 – 11:00 AM',
      calories: 210,
    },
    {
      type: 'lunch',
      emoji: '🥗',
      name: 'Lunch',
      time: '1:00 – 2:00 PM',
      calories: 580,
    },
    {
      type: 'afternoon_snack',
      emoji: '🍎',
      name: 'Afternoon Snack',
      time: '4:30 – 5:00 PM',
      calories: 150,
    },
    {
      type: 'dinner',
      emoji: '🍽️',
      name: 'Dinner',
      time: '7:30 – 8:30 PM',
      calories: 490,
    },
  ];

  const macros = [
    { name: 'Protein', current: 160, target: 180, color: 'bg-[#1A3C5E]', width: '88%' },
    { name: 'Carbohydrates', current: 210, target: 250, color: 'bg-[#E87722]', width: '84%' },
    { name: 'Fats', current: 55, target: 70, color: 'bg-tertiary-fixed-dim', width: '78%' },
  ];

  return (
    <div>
      <div className="mt-6 flex items-center bg-[#E87722] text-white px-6 py-3 rounded-lg shadow-md">
        <span className="text-sm font-bold flex items-center">
          <span className="material-symbols-outlined text-base mr-2">stars</span>
          Your personalised meal plan from your trainer
        </span>
      </div>

      <div className="mt-8 mb-8">
        <h2 className="text-4xl font-black text-primary tracking-tight leading-tight">My Diet Plan</h2>
        <p className="text-on-surface-variant mt-1 font-medium flex items-center">
          Assigned by Ravi S. <span className="mx-2 opacity-30 text-xl">•</span> Last updated 10 Jun 2025
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="neo-card bg-surface-container-lowest rounded-xl p-8 border-l-[6px] border-[#E87722] relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4 text-[#1A3C5E]">
                  <span className="material-symbols-outlined mr-2 bg-tertiary-fixed p-1.5 rounded-lg text-lg">description</span>
                  <h3 className="font-bold text-lg uppercase tracking-wider">Trainer's Directives</h3>
                </div>
                <ul className="space-y-4 text-on-surface text-lg leading-relaxed font-medium">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-[#E87722] mt-2.5 mr-3 flex-shrink-0"></span>
                    Avoid processed carbohydrates after 6 PM.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-[#E87722] mt-2.5 mr-3 flex-shrink-0"></span>
                    Drink at least 3 litres of water daily.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-[#E87722] mt-2.5 mr-3 flex-shrink-0"></span>
                    Eat within 30 minutes of waking up.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-[#E87722] mt-2.5 mr-3 flex-shrink-0"></span>
                    Focus on whole foods and lean protein sources.
                  </li>
                </ul>
              </div>
              <div className="hidden sm:flex flex-col items-center ml-8 p-4 bg-surface-container rounded-2xl">
                <img
                  alt="Ravi S."
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md mb-3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqo_w4fZo8W8VBgbyg2df6IF61JsO40O5o2DwhGAjpW01-oqicclyRbDOzSRrdtaeaPciiW76LQlYXCMjmXwDJJKsF8_SanlzrrCDjZQm42R0tWjL8aMoHc-agOD7p7fcrMgllk3olw416rcC4jbSqN3ilp73HEHLoonOnUip9nZsMUjNZ3byPXFSX_S9deM1Fud4sCsWs7yaXX8dReG6EZOAKrDwuQkpFWYKKNjzNu2pW9Wihb0EQo98HMEGXGqfpNVaxWYxqkEA"
                />
                <p className="text-xs font-black text-primary uppercase text-center tracking-tighter leading-tight">
                  Ravi S.<br /><span className="text-[10px] font-medium opacity-60">TRAINER</span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
              Your Daily Meal Plan
              <span className="ml-4 h-[2px] flex-1 bg-surface-container-high rounded-full"></span>
            </h3>

            {meals.map(meal => {
              const isExpanded = expandedMeals.has(meal.type);
              const hasDetails = 'items' in meal && meal.items;

              return (
                <div key={meal.type}>
                  {meal.type === 'breakfast' ? (
                    <div className="neo-card bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10">
                      <div className="bg-primary px-8 py-5 flex items-center justify-between">
                        <div className="flex items-center text-white">
                          <span className="text-2xl mr-3">{meal.emoji}</span>
                          <div>
                            <h4 className="font-bold text-lg">{meal.name}</h4>
                            <p className="text-xs text-on-primary-container font-medium opacity-80 uppercase tracking-widest">{meal.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-white/90 text-sm font-bold bg-white/10 px-3 py-1 rounded-full">{meal.calories} CAL</span>
                        </div>
                      </div>
                      {hasDetails && (
                        <div className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {meal.items?.map((item, i) => (
                              <div key={i} className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/5">
                                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{item.category}</p>
                                <p className="font-black text-primary text-xl tracking-tight">{item.name}</p>
                                <p className="text-sm text-secondary font-bold">{item.portion}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => toggleMeal(meal.type)}
                      className="group bg-surface-container-low/50 hover:bg-white rounded-2xl p-6 transition-all duration-300 flex items-center justify-between border border-transparent hover:border-outline-variant/20 hover:shadow-lg cursor-pointer"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">{meal.emoji}</span>
                        <div>
                          <h4 className="font-bold text-[#1A3C5E]">{meal.name}</h4>
                          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{meal.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-secondary text-xs font-bold px-3 py-1 bg-surface-container rounded-full group-hover:bg-tertiary-fixed group-hover:text-on-tertiary-fixed transition-colors">{meal.calories} CAL</span>
                        <span className="material-symbols-outlined text-outline">add_circle</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-[#1A3C5E] rounded-2xl p-8 relative overflow-hidden group shadow-xl">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[200px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
            </div>
            <div className="relative z-10 flex items-center">
              <div className="bg-white/10 p-4 rounded-full mr-6">
                <span className="material-symbols-outlined text-4xl text-[#E87722]" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
              </div>
              <div>
                <h4 className="text-white text-2xl font-black tracking-tight mb-2">Daily Water Target: 3 litres</h4>
                <p className="text-white/70 font-medium">Track your hydration alongside your meals to maintain peak metabolic function.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="neo-card bg-surface-container-lowest rounded-2xl p-8">
            <h4 className="font-black text-primary text-xl mb-6 flex items-center">
              Daily Macros
              <span className="material-symbols-outlined ml-2 text-[#E87722]">pie_chart</span>
            </h4>
            <div className="space-y-6">
              {macros.map(macro => (
                <div key={macro.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#1A3C5E]">{macro.name}</span>
                    <span className="text-xs font-bold text-secondary">{macro.current}g / {macro.target}g</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                    <div className={`${macro.color} h-full ${macro.width} rounded-full`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container rounded-2xl p-8 border border-white">
            <h4 className="font-bold text-primary mb-4 flex items-center uppercase tracking-widest text-xs">
              <span className="material-symbols-outlined text-lg mr-2 text-[#E87722]">lightbulb</span>
              Pro Tip
            </h4>
            <p className="text-on-surface-variant font-medium leading-relaxed italic">
              "The timing of your breakfast is crucial for resetting your circadian rhythm. Pairing protein with fiber-rich oats ensures sustained energy until your snack."
            </p>
            <div className="mt-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold mr-3">RS</div>
              <span className="text-xs font-bold text-primary">From Coach Ravi</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl relative h-64 group">
            <img
              alt="Healthy supplements"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdDfk_gJVy9tvlaTn5sd4q8wofoKaqEtCiSxrKKRpZtNhBahKipOrBkTl9MIVGa0eJ7VSxtK1asQOKqCm8aIqQmWW3aM-8I8ziGhnEoXropVcxG_bY8GwD7kENqBOjCwtL7Z1rQD2zgfJiN1qzpxhQeu-bfP9zU1FLSvCtD8QwXSihuTBYogUJG38TgDaN4hu9Mwc2FOWD1GYiWTs4qugG10XnousRQS7vERf9XXcVFzCRyUR6FEtmPM3AF7YGo-zgUHQiictNRs8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C5E] to-transparent flex flex-col justify-end p-6">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Resource</p>
              <h4 className="text-white font-black text-lg">Supplement Guide 2025</h4>
              <button className="mt-4 text-[#E87722] text-xs font-bold uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
                Download PDF <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
