import { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Search, Filter, ChevronDown, Edit3, X, CheckCircle } from 'lucide-react';
import type { User, MembershipPlan } from '../../types';

export default function Members() {
  const { members, updateMember } = useDataStore();
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [editingMember, setEditingMember] = useState<User | null>(null);

  const filtered = members.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === 'all' || u.planType === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMember(editingMember.id, editingMember);
      setEditingMember(null);
    }
  };

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
                <th className="text-right text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-offwhite-300/60">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-offwhite-50 transition-colors">
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
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => setEditingMember(u)}
                      className="p-2 rounded-lg hover:bg-offwhite-200 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-navy-600/50" />
                    </button>
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

      {/* Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-offwhite-300">
              <h2 className="font-bold text-navy-600">Edit Member</h2>
              <button onClick={() => setEditingMember(null)} className="p-1 hover:bg-offwhite-200 rounded-lg"><X className="w-5 h-5 text-navy-600/50" /></button>
            </div>
            <form onSubmit={handleUpdate} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-600/40 uppercase tracking-widest mb-1">Full Name</label>
                <input type="text" className="input-field" value={editingMember.name} onChange={e => setEditingMember({...editingMember, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-600/40 uppercase tracking-widest mb-1">Membership Plan</label>
                <select 
                  className="input-field" 
                  value={editingMember.planType} 
                  onChange={e => setEditingMember({...editingMember, planType: e.target.value as MembershipPlan})}
                >
                  <option value="normal">Normal Membership (Standard)</option>
                  <option value="personal_training">Personal Training (Professional)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-600/40 uppercase tracking-widest mb-1">Status</label>
                <select 
                  className="input-field" 
                  value={editingMember.status} 
                  onChange={e => setEditingMember({...editingMember, status: e.target.value as any})}
                >
                  <option value="active">Active</option>
                  <option value="pending_payment">Pending Payment</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div className="pt-2">
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
