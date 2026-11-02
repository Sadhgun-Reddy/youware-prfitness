import React, { useMemo, useState } from 'react';
import { mockUsers } from '../../data/mock';
import type { User } from '../../types';

export default function Members() {
  const [query, setQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sort, setSort] = useState('Recent');

  // Basic filtering on the frontend (no backend)
  const users = useMemo(() => mockUsers, []);
  const filtered = useMemo(() => {
    let list = users.filter(u => {
      const q = query.toLowerCase();
      const inName = u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
      const planOk = planFilter === 'All Plans' || (planFilter === 'Personal Training' && u.planType === 'personal_training') || (planFilter === 'Normal' && u.planType === 'normal');
      const statusOk = statusFilter === 'All Status' || (statusFilter === 'Active' && u.status === 'active') || (statusFilter === 'Expired' && u.status === 'expired');
      return inName && planOk && statusOk;
    });
    if (sort === 'Recent') {
      list = list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }
    return list;
  }, [users, query, planFilter, statusFilter, sort]);

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1A3C5E]">Members</h1>
          <p className="text-sm text-slate-500 mt-1"><span className="bg-[#FFDBC8] text-[#E87722] px-3 py-1 rounded-full text-xs font-bold">{filtered.length}</span> TOTAL MEMBERS  — Administrative Overview</p>
        </div>
        <button className="bg-primary-container text-white px-4 py-2 rounded-lg font-semibold">+ Add Member</button>
      </header>

      <section className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[260px]">
          <input className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm" placeholder="Quick find by name or ID..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
        <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">PT Members</span>
        <select className="bg-surface-container-low rounded-lg px-4 py-2 text-sm" value={planFilter} onChange={(e)=>setPlanFilter(e.target.value)}>
          <option>All Plans</option>
          <option>Personal Training</option>
          <option>Normal</option>
        </select>
        <select className="bg-surface-container-low rounded-lg px-4 py-2 text-sm" value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option>Active</option>
          <option>Expired</option>
        </select>
        <select className="bg-surface-container-low rounded-lg px-4 py-2 text-sm" value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option>Sort By</option>
          <option>Recent</option>
          <option>Join Date</option>
        </select>
      </section>

      <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
        <table className="w-full border-collapse">
          <thead className="bg-[#1A3C5E] text-white text-[11px] font-black uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Member</th>
              <th className="px-6 py-4 text-left">Plan</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Last Check-In</th>
              <th className="px-6 py-4 text-left">Expiry Date</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {filtered.map((u: User, idx: number) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">{(idx+1).toString().padStart(2, '0')}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <img src={u.avatarUrl || 'https://via.placeholder.com/40'} alt={u.name} className="w-8 h-8 rounded-full border" />
                  <div>
                    <div className="font-semibold text-[#1A3C5E]">{u.name}</div>
                    <div className="text-xs text-slate-500">ID: {`FSP-${u.id.split('').reduce((a,c)=>a+c.charCodeAt(0),0).toString().slice(0,4)}`}</div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded-lg text-[10px] font-black ${u.planType==='personal_training'?'bg-primary-container text-on-primary':'bg-surface-container-high text-slate-700'}`}>{u.planType==='personal_training'?'PT':'NORMAL'}</span></td>
                <td className="px-6 py-4">
                  {u.status === 'active' ? (
                    <span className="text-green-600 text-xs font-bold">Active</span>
                  ) : u.status === 'expired' ? (
                    <span className="text-red-600 text-xs font-bold">Expired</span>
                  ) : (
                    <span className="text-yellow-600 text-xs font-bold">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4">Today 7:23 AM</td>
                <td className="px-6 py-4">{new Date().toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric' })}</td>
                <td className="px-6 py-4 text-right"><span className="cursor-pointer">⋮</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
