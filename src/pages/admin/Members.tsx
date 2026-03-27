import { useState } from 'react';
import { mockUsers } from '../../data/mock';
import { Search, Filter, ChevronDown } from 'lucide-react';

export default function Members() {
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  const filtered = mockUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === 'all' || u.planType === filterPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div>
      <h1 className="page-header mb-6">Members</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-600/30" />
          <input type="text" className="input-field !pl-10" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field w-auto" value={filterPlan} onChange={e => setFilterPlan(e.target.value)}>
          <option value="all">All Plans</option>
          <option value="normal">Normal</option>
          <option value="personal_training">Personal Training</option>
        </select>
      </div>

      {/* Table */}
      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-offwhite-300/60">
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3">Member</th>
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Plan</th>
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Status</th>
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-offwhite-300/60">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-offwhite-50 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy-600/10 flex items-center justify-center text-sm font-bold text-navy-600 flex-shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy-600 truncate">{u.name}</p>
                        <p className="text-xs text-navy-600/40 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {u.planType === 'personal_training' ? (
                      <span className="badge-accent">PT</span>
                    ) : (
                      <span className="badge-success">Normal</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {u.status === 'active' ? (
                      <span className="badge-success">Active</span>
                    ) : u.status === 'expired' ? (
                      <span className="badge-error">Expired</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-sm text-navy-600/50">{new Date(u.membershipEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-navy-600/40">No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}
