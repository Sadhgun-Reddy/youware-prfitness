import { useState } from 'react';

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');

  const notifications = [
    {
      id: '1',
      group: 'today',
      type: 'achievement',
      icon: 'stars',
      title: 'Personal Best Achievement',
      content: "You just crushed your previous record for Deadlifts. 180kg is now your new benchmark. Share this milestone with your trainer?",
      time: '2m ago',
      isUnread: true,
      actions: ['Share with Trainer', 'Dismiss'],
    },
    {
      id: '2',
      group: 'today',
      type: 'workout',
      icon: 'fitness_center',
      title: 'Workout Plan Updated',
      content: "Coach Marcus added 'Advanced Plyometrics' to your Thursday routine. View the new exercises and demonstration videos.",
      time: '5h ago',
      isUnread: false,
    },
    {
      id: '3',
      group: 'thisWeek',
      type: 'community',
      icon: 'groups',
      title: 'New Community Event',
      content: "Join the 'Sunday Sunrise Yoga' session at the Kinetic Roof Garden. Limited spots available for Elite Members.",
      time: 'Tuesday',
      isUnread: true,
      actions: ['Book Spot'],
    },
    {
      id: '4',
      group: 'thisWeek',
      type: 'payment',
      icon: 'payments',
      title: 'Invoice Paid',
      content: "Your monthly subscription for 'Platinum Sanctuary' has been processed successfully. Transaction ID: #882910.",
      time: 'Monday',
      isUnread: false,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'progress', label: 'Progress' },
    { id: 'membership', label: 'Membership' },
    { id: 'trainer', label: 'Trainer' },
  ];

  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div>
      <header className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-primary-container tracking-tight font-headline">Notifications</h1>
            <span className="bg-accent text-white text-[11px] font-black px-2.5 py-0.5 rounded-full accent-shadow">
              {unreadCount} UNREAD
            </span>
          </div>
          <p className="text-on-surface-variant font-medium">Stay updated with your sanctuary's pulse.</p>
        </div>
        <button className="text-accent font-bold text-sm hover:underline underline-offset-4 decoration-accent/30 transition-all flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[18px]">done_all</span>
          Mark all as read
        </button>
      </header>

      <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              activeFilter === filter.id
                ? 'bg-primary-container text-white'
                : 'bg-white text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-low'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">Today</span>
              <div className="h-[1px] flex-1 bg-surface-container-high"></div>
            </div>
            <div className="space-y-4">
              {notifications.filter(n => n.group === 'today').map(notif => (
                <div
                  key={notif.id}
                  className={`bg-white p-6 rounded-xl flex gap-5 kinetic-shadow hover:translate-x-1 transition-all ${
                    notif.isUnread ? 'bg-primary-fixed/20 border-l-4 border-accent' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.isUnread ? 'bg-white text-accent' : 'bg-surface-container-low text-primary'
                  }`}>
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={notif.isUnread ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {notif.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-primary-container">{notif.title}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{notif.time}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{notif.content}</p>
                    {notif.actions && (
                      <div className="flex gap-3">
                        {notif.actions.map((action, i) => (
                          <button
                            key={i}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              i === 0
                                ? notif.type === 'achievement'
                                  ? 'bg-primary-container text-white'
                                  : 'bg-accent text-white'
                                : 'text-primary-container bg-white hover:bg-surface-container-low'
                            }`}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">This Week</span>
              <div className="h-[1px] flex-1 bg-surface-container-high"></div>
            </div>
            <div className="space-y-4">
              {notifications.filter(n => n.group === 'thisWeek').map(notif => (
                <div
                  key={notif.id}
                  className={`bg-white p-6 rounded-xl flex gap-5 kinetic-shadow hover:translate-x-1 transition-all ${
                    notif.isUnread ? 'bg-primary-fixed/20 border-l-4 border-accent' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.isUnread ? 'bg-white text-accent' : 'bg-surface-container-low text-primary'
                  }`}>
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={notif.isUnread ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {notif.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-primary-container">{notif.title}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{notif.time}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{notif.content}</p>
                    {notif.actions && (
                      <div className="flex gap-3">
                        {notif.actions.map((action, i) => (
                          <button
                            key={i}
                            className="bg-accent text-white px-4 py-2 rounded-lg text-xs font-bold accent-shadow hover:opacity-90 transition-opacity"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="relative bg-primary-container rounded-3xl p-8 overflow-hidden kinetic-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-tertiary/40 rounded-full -ml-12 -mb-12 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-accent text-[32px]">warning</span>
                <span className="text-white font-black text-xl tracking-tight">Status Alert</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-2 leading-tight">Membership Expiring</h2>
              <p className="text-primary-fixed/70 text-sm mb-8 font-medium">
                Your 'Platinum Sanctuary' access will expire in <span className="text-accent font-bold">4 days</span>. Renew now to maintain your peak performance streak.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-accent text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest accent-shadow hover:translate-y-[-2px] transition-all">
                  Renew Access
                </button>
                <button className="w-full bg-white/10 text-white py-4 rounded-xl font-bold text-sm border border-white/10 hover:bg-white/20 transition-all">
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 kinetic-shadow">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Notification Health</h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-primary-container">Unread rate</span>
              <span className="text-sm font-black text-accent">12%</span>
            </div>
            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
              <div className="bg-accent h-full w-[12%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-on-surface-variant mt-4 leading-relaxed italic">"A clear inbox is a focused mind." — Coach Marcus</p>
          </div>

          <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary mb-4 shadow-sm">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <h4 className="font-bold text-primary-container mb-2">Need assistance?</h4>
            <p className="text-xs text-on-surface-variant mb-4">Our concierge is available 24/7 for sanctuary members.</p>
            <a className="text-xs font-black text-primary-container underline underline-offset-4 decoration-accent/30 uppercase tracking-wider" href="#">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
