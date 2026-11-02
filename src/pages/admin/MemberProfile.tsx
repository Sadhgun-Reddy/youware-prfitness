import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';
import {
  User,
  Calendar,
  BarChart3,
  Dumbbell,
  Apple,
  MessageSquare,
  ArrowLeft,
  Edit2,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Send,
  X
} from 'lucide-react';
import type { WorkoutPlan, WorkoutDay, Exercise, DietPlan, DietMeal, FoodItem } from '../../types';

type TabType = 'overview' | 'attendance' | 'progress' | 'workout' | 'diet' | 'remarks';

const dayOrder: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

const dayLabels: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const mealLabels: Record<string, string> = {
  breakfast: 'Breakfast',
  mid_morning: 'Mid-Morning',
  lunch: 'Lunch',
  evening_snack: 'Evening Snack',
  dinner: 'Dinner',
};

export default function MemberProfile() {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const {
    members,
    updateMember,
    checkIns,
    progressSubmissions,
    workoutPlans,
    updateWorkoutPlan,
    dietPlans,
    updateDietPlan,
    remarks,
    addRemark,
    adminSettings,
  } = useDataStore();

  const member = members.find(m => m.id === memberId) || members[0];
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Edit Membership Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPlanType, setEditPlanType] = useState<'normal' | 'personal_training'>('normal');
  const [editStatus, setEditStatus] = useState<'active' | 'inactive'>('active');
  const [editExpiry, setEditExpiry] = useState('');

  // Open edit modal with member data
  const handleOpenEditModal = () => {
    if (!member) return;
    setEditPlanType(member.planType);
    setEditStatus(member.membershipStatus);
    const exp = member.membershipExpiry ? member.membershipExpiry.split('T')[0] : '';
    setEditExpiry(exp);
    setIsEditModalOpen(true);
  };

  const handleSaveMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    updateMember(member.id, {
      planType: editPlanType,
      membershipStatus: editStatus,
      membershipExpiry: editExpiry ? new Date(editExpiry).toISOString() : member.membershipExpiry,
    });
    setIsEditModalOpen(false);
  };

  // Check inactivity >= 7 days (US-009)
  const memberCheckIns = useMemo(() => {
    if (!member) return [];
    return checkIns
      .filter(c => c.memberId === member.id || c.memberName.toLowerCase() === member.name.toLowerCase())
      .sort((a, b) => new Date(b.checkedInAt).getTime() - new Date(a.checkedInAt).getTime());
  }, [checkIns, member]);

  const lastCheckIn = memberCheckIns[0];
  const isInactiveOver7Days = useMemo(() => {
    if (!lastCheckIn) return true;
    const diffDays = (Date.now() - new Date(lastCheckIn.checkedInAt).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= 7;
  }, [lastCheckIn]);

  // If member not found
  if (!member) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
        <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-700">Member Not Found</h2>
        <button
          onClick={() => navigate('/admin/members')}
          className="mt-4 px-4 py-2 bg-[#1A3C5E] text-white text-xs font-bold rounded-lg"
        >
          Return to Members Directory
        </button>
      </div>
    );
  }

  const isPT = member.planType === 'personal_training';

  return (
    <div className="max-w-6xl space-y-6 pb-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/admin/members')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3C5E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Members
        </button>
      </div>

      {/* Inactivity Alert banner if >= 7 days */}
      {isInactiveOver7Days && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Attendance Alert: Inactive Member
            </h4>
            <p className="text-xs text-amber-700 mt-0.5">
              {member.name} has not checked in for {lastCheckIn ? 'over 7 days' : 'any sessions yet'}.
              Last recorded visit: {lastCheckIn ? new Date(lastCheckIn.checkedInAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}. Consider sending a motivational remark or check-in reminder.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('remarks')}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shrink-0 transition-colors"
          >
            Send Remark
          </button>
        </div>
      )}

      {/* Member Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shrink-0 ${
                isPT ? 'bg-orange-100 text-[#E87722]' : 'bg-blue-100 text-[#1A3C5E]'
              }`}
            >
              {member.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-black text-[#1A3C5E]">{member.name}</h1>
                {isPT ? (
                  <span className="text-xs font-black uppercase tracking-wider bg-orange-100 text-[#E87722] px-2.5 py-0.5 rounded-full border border-orange-200">
                    Personal Training
                  </span>
                ) : (
                  <span className="text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Normal Membership
                  </span>
                )}
                {member.membershipStatus === 'active' ? (
                  <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {member.email} • {member.phone || '+91 98765 43210'} • ID: {member.id.toUpperCase()}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Joined: {new Date(member.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} • Expires: {member.membershipExpiry ? new Date(member.membershipExpiry).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenEditModal}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-[#1A3C5E] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" /> Adjust Membership
            </button>
            <button
              onClick={() => setActiveTab('remarks')}
              className="px-4 py-2 bg-[#1A3C5E] hover:bg-[#15324f] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Direct Remark
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-t border-slate-100 mt-6 pt-4 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'attendance', label: `Attendance (${memberCheckIns.length})`, icon: Calendar },
            { id: 'progress', label: 'Progress History', icon: BarChart3 },
            { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
            { id: 'diet', label: 'Diet Plan', icon: Apple },
            { id: 'remarks', label: 'Trainer Remarks', icon: MessageSquare },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  active
                    ? 'bg-[#1A3C5E] text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#1A3C5E] uppercase tracking-wider">
                Registration Profile Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Full Name</span>
                  <span className="text-sm font-bold text-[#1A3C5E]">{member.name}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Date of Birth</span>
                  <span className="text-sm font-bold text-[#1A3C5E]">14 Jan 1995 (29 yrs)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Height & Weight</span>
                  <span className="text-sm font-bold text-[#1A3C5E]">{member.height || 178} cm | {member.weight || 78} kg</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fitness Goal</span>
                  <span className="text-sm font-bold text-[#1A3C5E]">{member.fitnessGoal || 'Hypertrophy & Fat Loss'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Home Gym Branch</span>
                  <span className="text-sm font-bold text-[#1A3C5E]">{adminSettings?.gymName || 'FitZone Gym'} ({adminSettings?.gymLocation || 'Andheri West'})</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Health Conditions</span>
                  <span className="text-sm font-bold text-slate-700">{member.healthConditions || 'None declared'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#1A3C5E] uppercase tracking-wider">
                Assigned Head Coach
              </h3>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#1A3C5E] text-white flex items-center justify-center font-bold text-sm">
                  RS
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A3C5E]">Coach Ravi Sharma</p>
                  <p className="text-xs text-slate-400">Chief Strength & Conditioning Coach • FitZone Gym</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#1A3C5E] uppercase tracking-wider">
                Membership Snapshot
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Tier:</span>
                  <span className="font-bold text-[#1A3C5E]">{isPT ? 'Personal Training' : 'Normal Gym'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Monthly Rate:</span>
                  <span className="font-bold text-[#1A3C5E]">₹{isPT ? '3,500' : '1,500'}/mo</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Total Check-Ins:</span>
                  <span className="font-bold text-[#E87722]">{memberCheckIns.length} sessions</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Last Active:</span>
                  <span className="font-bold text-slate-700">
                    {lastCheckIn ? new Date(lastCheckIn.checkedInAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Never'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleOpenEditModal}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#1A3C5E] font-bold text-xs rounded-xl transition-colors"
              >
                Modify Plan / Expiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance */}
      {activeTab === 'attendance' && (
        <MemberAttendanceTab member={member} checkIns={memberCheckIns} />
      )}

      {/* Tab 3: Progress History */}
      {activeTab === 'progress' && (
        <MemberProgressTab member={member} />
      )}

      {/* Tab 4: Workout Plan */}
      {activeTab === 'workout' && (
        <MemberWorkoutTab member={member} onUpgrade={() => { setEditPlanType('personal_training'); setIsEditModalOpen(true); }} />
      )}

      {/* Tab 5: Diet Plan */}
      {activeTab === 'diet' && (
        <MemberDietTab member={member} onUpgrade={() => { setEditPlanType('personal_training'); setIsEditModalOpen(true); }} />
      )}

      {/* Tab 6: Remarks */}
      {activeTab === 'remarks' && (
        <MemberRemarksTab member={member} />
      )}

      {/* Membership Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-[#1A3C5E] mb-1">Adjust Member Plan</h3>
            <p className="text-xs text-slate-500 mb-5">
              Modify subscription tier, membership duration, and status for {member.name}.
            </p>

            <form onSubmit={handleSaveMembership} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Membership Tier
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditPlanType('normal')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      editPlanType === 'normal'
                        ? 'border-[#1A3C5E] bg-[#1A3C5E] text-white shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Normal (₹1,500/mo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPlanType('personal_training')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      editPlanType === 'personal_training'
                        ? 'border-[#E87722] bg-[#E87722] text-white shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    PT Plan (₹3,500/mo)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Membership Status
                </label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={editExpiry}
                  onChange={e => setEditExpiry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E]"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#1A3C5E] hover:bg-[#15324f] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent: Attendance Tab
function MemberAttendanceTab({ member, checkIns }: { member: any; checkIns: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  // Map check-in dates for quick lookup
  const checkInDateSet = useMemo(() => {
    const set = new Set<string>();
    checkIns.forEach(ci => {
      const d = new Date(ci.checkedInAt);
      if (!isNaN(d.getTime())) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        set.add(key);
      }
    });
    return set;
  }, [checkIns]);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-[#1A3C5E]">{monthName}</h3>
            <p className="text-xs text-slate-400">Monthly check-in calendar</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12 bg-slate-50/50 rounded-lg" />
          ))}
          {daysArray.map(day => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isAttended = checkInDateSet.has(dateStr);
            const isToday =
              new Date().toDateString() === new Date(year, month, day).toDateString();

            return (
              <div
                key={day}
                className={`h-12 rounded-lg flex flex-col items-center justify-center p-1 text-xs transition-colors ${
                  isAttended
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold'
                    : isToday
                    ? 'border-2 border-[#1A3C5E] text-[#1A3C5E] font-bold bg-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{day}</span>
                {isAttended && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Log List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h4 className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider">
            Detailed Visit History ({checkIns.length})
          </h4>
        </div>
        {checkIns.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {checkIns.map((ci, idx) => (
              <div key={ci.id || idx} className="p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">#{idx + 1}</span>
                  <div>
                    <p className="font-bold text-[#1A3C5E]">
                      {new Date(ci.checkedInAt).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {new Date(ci.checkedInAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> GPS Verified
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            No check-in visits recorded for this member.
          </div>
        )}
      </div>
    </div>
  );
}

// Subcomponent: Progress Tab
function MemberProgressTab({ member }: { member: any }) {
  const { progressSubmissions } = useDataStore();
  const submissions = progressSubmissions
    .filter(p => p.memberId === member.id || p.memberName.toLowerCase() === member.name.toLowerCase())
    .sort((a, b) => new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime());

  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-[#1A3C5E]">Sunday Progress Check-Ins</h3>
          <p className="text-xs text-slate-400">
            Weekly weight submissions, measurements, and comparison progress photos.
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-[#1A3C5E] rounded-full border border-blue-200">
          {submissions.length} Total Submissions
        </span>
      </div>

      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((sub, idx) => (
            <div key={sub.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-[#1A3C5E]">
                    Week #{submissions.length - idx} • {new Date(sub.weekStartDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </h4>
                  <span className="text-xs text-slate-400">
                    Logged on {new Date(sub.submittedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-[#1A3C5E]">
                    {sub.weight} <span className="text-xs font-normal text-slate-400">kg</span>
                  </span>
                  {sub.reviewed ? (
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Reviewed
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Pending Review
                    </span>
                  )}
                </div>
              </div>

              {/* Measurements */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Chest</span>
                  <span className="font-bold text-[#1A3C5E]">{sub.chest ? `${sub.chest}"` : '—'}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Waist</span>
                  <span className="font-bold text-[#1A3C5E]">{sub.waist ? `${sub.waist}"` : '—'}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Hips</span>
                  <span className="font-bold text-[#1A3C5E]">{sub.hips ? `${sub.hips}"` : '—'}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Arms</span>
                  <span className="font-bold text-[#1A3C5E]">{sub.arms ? `${sub.arms}"` : '—'}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Thighs</span>
                  <span className="font-bold text-[#1A3C5E]">{sub.thighs ? `${sub.thighs}"` : '—'}</span>
                </div>
              </div>

              {/* Photos */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { label: 'Front', img: sub.photoFront },
                  { label: 'Side', img: sub.photoSide },
                  { label: 'Back', img: sub.photoBack },
                ].map(p => (
                  <div key={p.label} className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block text-center">
                      {p.label}
                    </span>
                    <div
                      onClick={() => p.img && setActivePhoto(p.img)}
                      className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 cursor-pointer relative group"
                    >
                      {p.img ? (
                        <>
                          <img src={p.img} alt={p.label} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                            View
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 italic">
                          No Photo
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trainer Remarks on this sub */}
              {sub.trainerRemarks && (
                <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-xs">
                  <p className="font-bold text-[#E87722] mb-0.5">Trainer Feedback:</p>
                  <p className="text-slate-700">{sub.trainerRemarks}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700">No Progress Submissions Recorded</p>
          <p className="text-xs text-slate-400 mt-1">
            Sunday progress records submitted by {member.name} will appear here.
          </p>
        </div>
      )}

      {/* Modal Photo Zoom */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="max-w-md max-h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            <img src={activePhoto} alt="Progress detail" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent: Workout Tab
function MemberWorkoutTab({ member, onUpgrade }: { member: any; onUpgrade: () => void }) {
  const { workoutPlans, updateWorkoutPlan } = useDataStore();
  const isPT = member.planType === 'personal_training';

  const [selectedDay, setSelectedDay] = useState<typeof dayOrder[number]>('monday');
  const [localPlan, setLocalPlan] = useState<WorkoutPlan | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  // Initialize or fetch plan
  useMemo(() => {
    const existing = workoutPlans.find(p => p.memberId === member.id);
    if (existing) {
      setLocalPlan(JSON.parse(JSON.stringify(existing)));
    } else {
      setLocalPlan({
        id: `wp-${member.id}`,
        memberId: member.id,
        assignedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        days: dayOrder.map(d => ({ dayOfWeek: d, exercises: [], isRestDay: true })),
      });
    }
  }, [workoutPlans, member.id]);

  if (!isPT) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4">
        <Dumbbell className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-black text-[#1A3C5E]">Workout Plan Assignment is Exclusive to PT</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          {member.name} is currently subscribed to the Normal Membership tier (₹1,500/mo).
          Custom day-by-day workout assignments and exercise splits are only available for Personal Training members.
        </p>
        <button
          onClick={onUpgrade}
          className="px-5 py-2.5 bg-[#E87722] hover:bg-[#d66c1d] text-white text-xs font-bold rounded-xl transition-colors shadow"
        >
          Upgrade Member to Personal Training
        </button>
      </div>
    );
  }

  const currentDay = localPlan?.days.find(d => d.dayOfWeek === selectedDay);

  const toggleRest = () => {
    if (!localPlan) return;
    const newDays = localPlan.days.map(d =>
      d.dayOfWeek === selectedDay ? { ...d, isRestDay: !d.isRestDay } : d
    );
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const addExercise = () => {
    if (!localPlan) return;
    const newEx: Exercise = { name: 'New Exercise', sets: 3, reps: 10, restSeconds: 60 };
    const newDays = localPlan.days.map(d =>
      d.dayOfWeek === selectedDay ? { ...d, exercises: [...d.exercises, newEx], isRestDay: false } : d
    );
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const updateEx = (index: number, updates: Partial<Exercise>) => {
    if (!localPlan) return;
    const newDays = localPlan.days.map(d => {
      if (d.dayOfWeek === selectedDay) {
        const copy = [...d.exercises];
        copy[index] = { ...copy[index], ...updates };
        return { ...d, exercises: copy };
      }
      return d;
    });
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const removeEx = (index: number) => {
    if (!localPlan) return;
    const newDays = localPlan.days.map(d => {
      if (d.dayOfWeek === selectedDay) {
        const copy = d.exercises.filter((_, i) => i !== index);
        return { ...d, exercises: copy, isRestDay: copy.length === 0 };
      }
      return d;
    });
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const handleSavePlan = () => {
    if (!localPlan) return;
    updateWorkoutPlan(member.id, {
      ...localPlan,
      updatedAt: new Date().toISOString(),
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-[#1A3C5E]">Custom Workout Plan</h3>
          <p className="text-xs text-slate-400">
            Tailor daily resistance routines, volume, and recovery days for {member.name}.
          </p>
        </div>
        {savedMsg && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      {/* Day Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {dayOrder.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedDay === d
                ? 'bg-[#1A3C5E] text-white shadow'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {dayLabels[d].slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Exercises Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h4 className="text-sm font-bold text-[#1A3C5E]">{dayLabels[selectedDay]} Routine</h4>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleRest}
              className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all ${
                currentDay?.isRestDay
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {currentDay?.isRestDay ? 'Rest Day' : 'Mark as Rest Day'}
            </button>
            <button
              onClick={addExercise}
              className="text-xs font-bold text-[#E87722] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Exercise
            </button>
          </div>
        </div>

        {currentDay?.isRestDay ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl">
            <Dumbbell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">Rest & Recovery Day</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              No resistance training scheduled. Hydration and light walking recommended.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentDay?.exercises.map((ex, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-6 h-6 rounded bg-[#1A3C5E] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={ex.name}
                    onChange={e => updateEx(i, { name: e.target.value })}
                    className="w-full bg-transparent text-sm font-bold text-[#1A3C5E] border-b border-transparent focus:border-[#1A3C5E] outline-none"
                    placeholder="Exercise name"
                  />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Sets</span>
                    <input
                      type="number"
                      value={ex.sets}
                      onChange={e => updateEx(i, { sets: parseInt(e.target.value) || 0 })}
                      className="w-12 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-center text-xs font-bold"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Reps</span>
                    <input
                      type="number"
                      value={ex.reps}
                      onChange={e => updateEx(i, { reps: parseInt(e.target.value) || 0 })}
                      className="w-12 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-center text-xs font-bold"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Rest (s)</span>
                    <input
                      type="number"
                      value={ex.restSeconds}
                      onChange={e => updateEx(i, { restSeconds: parseInt(e.target.value) || 0 })}
                      className="w-14 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-center text-xs font-bold"
                    />
                  </div>
                  <button
                    onClick={() => removeEx(i)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSavePlan}
            className="px-5 py-2 bg-[#1A3C5E] hover:bg-[#15324f] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Workout Routine
          </button>
        </div>
      </div>
    </div>
  );
}

// Subcomponent: Diet Tab
function MemberDietTab({ member, onUpgrade }: { member: any; onUpgrade: () => void }) {
  const { dietPlans, updateDietPlan } = useDataStore();
  const isPT = member.planType === 'personal_training';

  const [localPlan, setLocalPlan] = useState<DietPlan | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  useMemo(() => {
    const existing = dietPlans.find(p => p.memberId === member.id);
    if (existing) {
      setLocalPlan(JSON.parse(JSON.stringify(existing)));
    } else {
      setLocalPlan({
        id: `dp-${member.id}`,
        memberId: member.id,
        assignedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        meals: [
          { type: 'breakfast', name: 'Breakfast', items: [] },
          { type: 'mid_morning', name: 'Mid-Morning', items: [] },
          { type: 'lunch', name: 'Lunch', items: [] },
          { type: 'evening_snack', name: 'Evening Snack', items: [] },
          { type: 'dinner', name: 'Dinner', items: [] },
        ],
      });
    }
  }, [dietPlans, member.id]);

  if (!isPT) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4">
        <Apple className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-black text-[#1A3C5E]">Diet & Nutrition Planning Exclusive to PT</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Structured macronutrient targets and meal plans are reserved for Personal Training members.
        </p>
        <button
          onClick={onUpgrade}
          className="px-5 py-2.5 bg-[#E87722] hover:bg-[#d66c1d] text-white text-xs font-bold rounded-xl transition-colors shadow"
        >
          Upgrade Member to Personal Training
        </button>
      </div>
    );
  }

  const addItem = (mealType: string) => {
    if (!localPlan) return;
    const newItem: FoodItem = { name: 'Food Item', quantity: 100, unit: 'grams' };
    const newMeals = localPlan.meals.map(m =>
      m.type === mealType ? { ...m, items: [...m.items, newItem] } : m
    );
    setLocalPlan({ ...localPlan, meals: newMeals as DietMeal[] });
  };

  const updateItem = (mealType: string, idx: number, updates: Partial<FoodItem>) => {
    if (!localPlan) return;
    const newMeals = localPlan.meals.map(m => {
      if (m.type === mealType) {
        const copy = [...m.items];
        copy[idx] = { ...copy[idx], ...updates };
        return { ...m, items: copy };
      }
      return m;
    });
    setLocalPlan({ ...localPlan, meals: newMeals as DietMeal[] });
  };

  const removeItem = (mealType: string, idx: number) => {
    if (!localPlan) return;
    const newMeals = localPlan.meals.map(m => {
      if (m.type === mealType) {
        return { ...m, items: m.items.filter((_, i) => i !== idx) };
      }
      return m;
    });
    setLocalPlan({ ...localPlan, meals: newMeals as DietMeal[] });
  };

  const handleSaveDiet = () => {
    if (!localPlan) return;
    updateDietPlan(member.id, {
      ...localPlan,
      updatedAt: new Date().toISOString(),
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-[#1A3C5E]">Nutrition & Meal Plan</h3>
          <p className="text-xs text-slate-400">
            Define daily meals, food portions, and dietary instructions for {member.name}.
          </p>
        </div>
        {savedMsg && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      <div className="space-y-4">
        {localPlan?.meals.map(meal => (
          <div key={meal.type} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-black text-[#1A3C5E] uppercase tracking-wider">
                {mealLabels[meal.type] || meal.name}
              </h4>
              <button
                onClick={() => addItem(meal.type)}
                className="text-xs font-bold text-[#E87722] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Food
              </button>
            </div>

            <div className="space-y-2">
              {meal.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => updateItem(meal.type, i, { name: e.target.value })}
                    className="flex-1 bg-transparent text-xs font-bold text-[#1A3C5E] outline-none"
                    placeholder="Food name"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => updateItem(meal.type, i, { quantity: parseFloat(e.target.value) || 0 })}
                    className="w-16 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs text-center font-bold"
                  />
                  <input
                    type="text"
                    value={item.unit}
                    onChange={e => updateItem(meal.type, i, { unit: e.target.value })}
                    className="w-16 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs text-center"
                  />
                  <button
                    onClick={() => removeItem(meal.type, i)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {meal.items.length === 0 && (
                <p className="text-[11px] text-slate-400 italic py-1">No items listed for this meal.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Trainer Dietary Instructions
        </label>
        <textarea
          rows={3}
          value={localPlan?.trainerNotes || ''}
          onChange={e => setLocalPlan(prev => prev ? { ...prev, trainerNotes: e.target.value } : null)}
          placeholder="e.g. Ensure minimum 3.5 liters water daily. Maintain 300 kcal deficit..."
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E]"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveDiet}
          className="px-5 py-2 bg-[#1A3C5E] hover:bg-[#15324f] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" /> Save Diet Plan
        </button>
      </div>
    </div>
  );
}

// Subcomponent: Remarks Tab
function MemberRemarksTab({ member }: { member: any }) {
  const { remarks, addRemark } = useDataStore();
  const [remarkText, setRemarkText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const memberRemarks = remarks
    .filter(r => r.memberId === member.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarkText.trim()) return;
    setIsSending(true);

    addRemark({
      memberId: member.id,
      trainerId: 'admin-1',
      trainerName: 'Coach Ravi Sharma',
      text: remarkText.trim(),
    });

    setRemarkText('');
    setTimeout(() => setIsSending(false), 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-black text-[#1A3C5E]">Trainer Remarks & Notes</h3>
        <p className="text-xs text-slate-400">
          Messages posted here are immediately visible to {member.name} in their mobile Remarks feed with a "New" badge for 24h.
        </p>
      </div>

      {/* Composer */}
      <form onSubmit={handleSend} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <textarea
          rows={3}
          value={remarkText}
          onChange={e => setRemarkText(e.target.value)}
          placeholder={`Leave a note or coaching directive for ${member.name}...`}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white transition-all resize-none"
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSending}
            className="px-5 py-2 bg-[#E87722] hover:bg-[#d66c1d] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" /> Post Remark
          </button>
        </div>
      </form>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h4 className="text-xs font-bold text-[#1A3C5E] uppercase tracking-wider">
            Remarks History ({memberRemarks.length})
          </h4>
        </div>
        {memberRemarks.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {memberRemarks.map(r => {
              const ageHours = (Date.now() - new Date(r.createdAt).getTime()) / (1000 * 60 * 60);
              const isNew = ageHours < 24;

              return (
                <div key={r.id} className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A3C5E]">{r.trainerName}</span>
                      {isNew && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.2 bg-orange-100 text-[#E87722] rounded-full border border-orange-200">
                          New (&lt;24h)
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      {new Date(r.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{r.text}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            No remarks logged for this member yet.
          </div>
        )}
      </div>
    </div>
  );
}
