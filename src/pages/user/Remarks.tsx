import { useState } from 'react';

export default function Remarks() {
  const remarks = [
    {
      id: '1',
      type: 'dynamic_form',
      typeLabel: 'Dynamic Form Correction',
      title: 'Shoulder Stability Focus',
      content: "During yesterday's overhead press, I noticed a slight internal rotation in the left shoulder. We're adding face pulls to your warmup to engage the rear delts better. Stick to the 15-rep tempo we discussed.",
      time: '2h ago',
      isNew: true,
      hasAttachment: true,
    },
    {
      id: '2',
      type: 'progress',
      typeLabel: 'Monthly Progress Update',
      title: 'Hitting Macro Targets',
      content: "Great work on hitting the 160g protein goal consistently this week. Your recovery metrics are already showing improvement. Let's push the morning carb intake by 20g on heavy leg days.",
      time: 'Yesterday',
      proteinConsistency: 94,
    },
    {
      id: '3',
      type: 'schedule',
      typeLabel: 'Schedule Change',
      title: 'Travel Adaptation',
      content: "Since you'll be traveling for work next week, I've updated the 'Videos' section with a 20-minute bodyweight routine you can do in a hotel room. Focus on the core stability sequence.",
      time: '3 days ago',
    },
    {
      id: '4',
      type: 'milestone',
      typeLabel: 'Performance Milestone',
      title: 'New PR: 225lb Deadlift',
      content: 'Monumental session! Your bracing was textbook. We\'re staying at this weight for two more sessions to build volume before moving up. Keep that head neutral.',
      time: '1 week ago',
    },
  ];

  const trainer = {
    name: 'Ravi S.',
    role: 'Personal Trainer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0mtoPedfXUYnQn7xdX88_ywCe9U-rKl5RIumHSJgf8ofo4tKA45Em6qyacLNE40I9VcBBa_Z5VyU3l6z3u7gRZ1SFgr_aheB1t0ZY1Cxyi0BSNUXmZu4Pzt7ANOJtst_BRHAvzTxdu3Lhl1usjV7dtNcuvfolk0o-5ZfvECe2DLUywOu7DX9OhE3k43XiVr-nCqJ1Dyt9vB_aHvCnPhmT8qJuIq80jni4yT7pFR6UEI_EOWj1hqGULIB6vcocdqza2GhQh5rkqr4',
    bio: '10+ years experience in performance coaching and functional mobility. Focused on sustainable growth and injury prevention.',
  };

  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Notes' },
    { id: 'progress', label: 'Progress Feedback' },
    { id: 'plan', label: 'Plan Updates' },
  ];

  return (
    <div>
      <div className="bg-on-tertiary-container text-white py-3 px-8 flex items-center justify-center lg:justify-start gap-2 shadow-sm mb-6">
        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        <span className="text-xs font-bold tracking-widest uppercase">Personal Training — Trainer Notes</span>
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-black text-primary tracking-tight font-headline">Trainer Notes</h1>
        <p className="text-on-tertiary-container font-semibold mt-1">from Ravi S.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(26,60,94,0.06)] border-l-4 border-on-tertiary-container">
            <div className="flex items-center gap-4 mb-4">
              <img
                alt="Ravi S. Avatar"
                className="w-14 h-14 rounded-full border-2 border-surface-container object-cover"
                src={trainer.avatar}
              />
              <div>
                <h3 className="font-bold text-primary text-lg leading-tight">{trainer.name}</h3>
                <p className="text-xs text-on-surface-variant font-medium">{trainer.role}</p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">{trainer.bio}</p>
          </div>

          <div className="space-y-4">
            <span className="label-md font-bold text-[10px] uppercase tracking-[0.1em] text-on-surface-variant px-1">Filter Categories</span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl shadow-md transition-transform active:scale-95 ${
                  activeFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="text-sm font-bold">All Notes</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
              <button
                onClick={() => setActiveFilter('progress')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  activeFilter === 'progress'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="text-sm font-semibold">Progress Feedback</span>
                <span className="material-symbols-outlined text-sm">insights</span>
              </button>
              <button
                onClick={() => setActiveFilter('plan')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  activeFilter === 'plan'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="text-sm font-semibold">Plan Updates</span>
                <span className="material-symbols-outlined text-sm">edit_calendar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {remarks.map((remark, index) => (
            <div
              key={remark.id}
              className={`bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_20px_rgba(26,60,94,0.06)] group transition-all hover:shadow-[0_12px_40px_rgba(26,60,94,0.12)] ${
                remark.isNew ? 'shadow-[0_8px_30px_rgba(26,60,94,0.08)]' : ''
              } ${index === 3 ? 'border-l-4 border-primary' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 items-center">
                  <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {remark.type === 'dynamic_form' ? 'bolt' : remark.type === 'progress' ? 'trending_up' : remark.type === 'schedule' ? 'calendar_month' : 'star'}
                  </span>
                  <span className="label-md font-bold text-[10px] uppercase tracking-widest text-on-tertiary-container">{remark.typeLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  {remark.isNew && (
                    <span className="bg-on-tertiary-container text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">NEW</span>
                  )}
                  <span className="text-xs font-medium text-on-surface-variant">{remark.time}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-primary mb-3 font-headline">{remark.title}</h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">{remark.content}</p>

              {remark.hasAttachment && (
                <div className="flex items-center justify-between pt-6 border-t border-surface-container">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">attachment</span>
                      <span className="text-[11px] font-bold uppercase tracking-tighter">Video Ref Attached</span>
                    </div>
                  </div>
                  <button className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                    Acknowledge <span className="material-symbols-outlined text-sm">check_circle</span>
                  </button>
                </div>
              )}

              {remark.proteinConsistency && (
                <div>
                  <div className="p-4 bg-surface-container-low rounded-lg mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Protein Consistency</span>
                      <span className="text-[10px] font-bold text-primary">{remark.proteinConsistency}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-on-tertiary-container rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-surface-container-low text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-colors">
                    View Plan Details
                  </button>
                </div>
              )}

              {!remark.hasAttachment && !remark.proteinConsistency && (
                <div className="pt-4 border-t border-surface-container"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
