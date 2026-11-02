import React from 'react';

// Simple admin dashboard view reflecting the provided HTML design.
export default function AdminDashboard() {
  // Simple static data for demonstration
  const kpis = [
    { label: 'Total Members', value: '47', delta: '+3 this week' },
    { label: 'PT Members', value: '18', delta: '38% of members' },
    { label: "Today's Check-Ins", value: '12', delta: 'Last: Arjun, 7:23 AM' },
    { label: 'Pending Reviews', value: '4', delta: 'Immediate action needed' },
    { label: 'Expiring This Week', value: '3', delta: 'Retention risk high' },
  ];

  const checkins = [
    { id: 1, name: 'Arjun Mehta', plan: 'PT', time: '7:23 AM' },
    { id: 2, name: 'Priya Nair', plan: 'Normal', time: '6:58 AM' },
    { id: 3, name: 'Kiran Patel', plan: 'PT', time: '6:45 AM' },
  ];

  const reviews = [
    { name: 'Amit Singh', week: 'Week 4', ago: '2h' },
    { name: 'Rahul V.', week: 'Week 12', ago: '4h' },
    { name: 'Ananya K.', week: 'Week 2', ago: '6h' },
    { name: 'Sameer D.', week: 'Week 8', ago: '9h' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">{k.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-primary">{k.value}</span>
              <span className="text-xs text-slate-500">{k.delta}</span>
            </div>
            <div className="mt-3 h-1 bg-surface-container-high rounded-full">
              <div className="h-full w-2/3 bg-primary rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Live Check-Ins */}
        <section className="lg:col-span-5 bg-white rounded-xl p-4 shadow-sm md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#1A3C5E]">Live Check-Ins Today</h3>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">LIVE</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container-low/60 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Member</th>
                  <th className="px-4 py-2">Plan</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Distance</th>
                </tr>
              </thead>
              <tbody>
                {checkins.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{c.id.toString().padStart(2, '0')}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-200 inline-block" />
                      <span>{c.name}</span>
                    </td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-lg bg-surface-container-high text-slate-700 text-[10px]">{c.plan}</span></td>
                    <td className="px-4 py-3">{c.time}</td>
                    <td className="px-4 py-3">--</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Pending Progress / Recent Activity side panel */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-bold text-[#1A3C5E] mb-3">Pending Progress</h4>
            {reviews.map((r, idx) => (
              <div key={idx} className="flex items-center justify-between mb-3">
                <span className="text-sm">{r.name}</span>
                <button className="text-xs font-bold uppercase tracking-wider text-primary border border-slate-200 rounded-lg px-3 py-1">Review</button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-bold text-[#1A3C5E] mb-3">Recent Activity</h4>
            <p className="text-xs text-slate-500">New member and payments feed snippets (mock data).</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
