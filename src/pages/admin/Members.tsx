import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';
import type { User, MembershipPlan } from '../../types';
import { Search, Filter, ShieldCheck, AlertCircle, Edit, Calendar } from 'lucide-react';

export default function Members() {
  const navigate = useNavigate();
  const { members, checkIns, updateMember, addMember } = useDataStore();

  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<'all' | 'personal_training' | 'normal'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'pending_payment'>('all');
  const [sort, setSort] = useState<'recent' | 'name' | 'expiry'>('recent');

  // Edit Modal State
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [editPlan, setEditPlan] = useState<MembershipPlan>('normal');
  const [editStatus, setEditStatus] = useState<User['status']>('active');
  const [editExpiry, setEditExpiry] = useState('');

  // Add Member Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    planType: 'personal_training' as MembershipPlan,
    weight: '70',
    height: '175',
    dob: '1995-01-01',
    gender: 'male' as const,
    fitnessGoal: 'muscle_gain' as const,
    healthConditions: '',
  });

  // Calculate last check-in per member & inactive flag
  const memberActivityMap = useMemo(() => {
    const map = new Map<string, { lastDate: string | null; isInactive7Days: boolean }>();
    const now = new Date();

    members.forEach(m => {
      const memberChecks = checkIns.filter(c => c.memberId === m.id || c.memberName === m.name);
      if (memberChecks.length === 0) {
        map.set(m.id, { lastDate: null, isInactive7Days: true });
      } else {
        const sorted = [...memberChecks].sort((a, b) => new Date(b.checkedInAt).getTime() - new Date(a.checkedInAt).getTime());
        const latestDate = new Date(sorted[0].checkedInAt);
        const diffDays = (now.getTime() - latestDate.getTime()) / (1000 * 60 * 60 * 24);
        map.set(m.id, {
          lastDate: latestDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
          isInactive7Days: diffDays >= 7,
        });
      }
    });

    return map;
  }, [members, checkIns]);

  // Filtering & Sorting
  const filteredMembers = useMemo(() => {
    let list = members.filter(m => {
      const q = search.toLowerCase();
      const inSearch =
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q);

      const inPlan = planFilter === 'all' || m.planType === planFilter;
      const inStatus = statusFilter === 'all' || m.status === statusFilter;

      return inSearch && inPlan && inStatus;
    });

    if (sort === 'recent') {
      list = [...list].sort((a, b) => new Date(b.createdAt || b.membershipStartDate).getTime() - new Date(a.createdAt || a.membershipStartDate).getTime());
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'expiry') {
      list = [...list].sort((a, b) => new Date(a.membershipEndDate).getTime() - new Date(b.membershipEndDate).getTime());
    }

    return list;
  }, [members, search, planFilter, statusFilter, sort]);

  const openEditModal = (e: React.MouseEvent, member: User) => {
    e.stopPropagation();
    setEditingMember(member);
    setEditPlan(member.planType);
    setEditStatus(member.status);
    setEditExpiry(member.membershipEndDate);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    updateMember(editingMember.id, {
      planType: editPlan,
      status: editStatus,
      membershipEndDate: editExpiry,
    });

    setEditingMember(null);
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const startDate = now.toISOString().split('T')[0];
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newUser: User = {
      id: `m-${Date.now()}`,
      name: newMemberForm.name,
      email: newMemberForm.email,
      phone: newMemberForm.phone,
      dob: newMemberForm.dob,
      gender: newMemberForm.gender,
      height: parseFloat(newMemberForm.height) || 175,
      weight: parseFloat(newMemberForm.weight) || 70,
      fitnessGoal: newMemberForm.fitnessGoal,
      gymName: 'FitZone Gym',
      gymLocation: 'Mumbai',
      healthConditions: newMemberForm.healthConditions,
      planType: newMemberForm.planType,
      membershipStartDate: startDate,
      membershipEndDate: endDate,
      status: 'active',
      createdAt: now.toISOString(),
    };

    addMember(newUser);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gym Membership Management</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Members Roster</h1>
          <p className="text-xs text-slate-500 mt-1">
            Displaying <span className="font-bold text-[#1A3C5E]">{filteredMembers.length}</span> of {members.length} registered gym members
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto active:scale-95"
        >
          <span className="material-symbols-outlined text-base">person_add</span>
          Add New Member
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by member name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1A3C5E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="all">All Plan Tiers</option>
            <option value="personal_training">Personal Training</option>
            <option value="normal">Normal Membership</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Members</option>
            <option value="expired">Expired</option>
            <option value="pending_payment">Pending Payment</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="recent">Sort: Recent First</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="expiry">Sort: Expiry Date</option>
          </select>
        </div>
      </div>

      {/* Members Table (PRD F-017, US-025) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A3C5E] text-white uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Member Name & Email</th>
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Gym Check-In</th>
                <th className="py-3.5 px-4">Membership Expiry</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member, idx) => {
                const activity = memberActivityMap.get(member.id);
                const isPT = member.planType === 'personal_training';

                return (
                  <tr
                    key={member.id}
                    onClick={() => navigate(`/admin/members/${member.id}`)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-slate-400">
                      {(idx + 1).toString().padStart(2, '0')}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1A3C5E] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#1A3C5E] text-sm hover:underline">{member.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isPT ? 'bg-orange-100 text-[#E87722]' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isPT ? 'Personal Training' : 'Normal'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        member.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : member.status === 'expired'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>

                    {/* Last Check-In (PRD US-009: flag inactive >= 7 days) */}
                    <td className="py-4 px-4">
                      {activity?.lastDate ? (
                        <div>
                          <span className="font-semibold text-slate-700">{activity.lastDate}</span>
                          {activity.isInactive7Days && (
                            <span className="block text-[9px] font-bold text-red-600 uppercase mt-0.5">
                              ⚠️ &gt;7 Days Inactive
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No check-ins yet</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-700">
                        {new Date(member.membershipEndDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => openEditModal(e, member)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#1A3C5E] hover:bg-slate-100 transition-colors"
                          title="Edit Membership Tier / Expiry"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/members/${member.id}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#1A3C5E] text-white text-[11px] font-bold hover:bg-[#15324E] transition-colors"
                        >
                          Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <p className="text-sm font-bold text-slate-600">No members matched the active filters.</p>
            <p className="text-xs mt-1">Try resetting the search bar or changing status criteria.</p>
          </div>
        )}
      </div>

      {/* Edit Membership Modal (PRD US-026: Manually adjust member plan / expiry) */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-black text-[#1A3C5E]">Adjust Membership</h3>
                <p className="text-xs text-slate-500">{editingMember.name} • {editingMember.email}</p>
              </div>
              <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Membership Plan Tier
                </label>
                <select
                  value={editPlan}
                  onChange={(e) => setEditPlan(e.target.value as MembershipPlan)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1A3C5E]"
                >
                  <option value="personal_training">Personal Training Plan (₹3,500/mo)</option>
                  <option value="normal">Normal Membership Plan (₹1,500/mo)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Membership Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as User['status'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1A3C5E]"
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending_payment">Pending Payment</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  required
                  value={editExpiry}
                  onChange={(e) => setEditExpiry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1A3C5E]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl font-bold transition-all shadow-sm"
                >
                  Save Adjustments
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-black text-[#1A3C5E]">Onboard New Gym Member</h3>
                <p className="text-xs text-slate-500">Add member directly with activated membership status</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newMemberForm.name}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Plan Tier</label>
                  <select
                    value={newMemberForm.planType}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, planType: e.target.value as MembershipPlan })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-[#1A3C5E]"
                  >
                    <option value="personal_training">Personal Training</option>
                    <option value="normal">Normal Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={newMemberForm.weight}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, weight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={newMemberForm.height}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, height: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl font-bold"
                >
                  Create & Activate Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
