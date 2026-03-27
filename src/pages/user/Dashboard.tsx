import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { mockCheckIns, mockProgress, mockRemarks, mockWorkoutPlan, mockNotifications } from '../../data/mock';
import { MapPin, BarChart3, Dumbbell, PlayCircle, MessageSquare, Bell, Flame, TrendingDown, CalendarDays, ChevronRight, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();
  if (!user) return null;

  const isPT = user.planType === 'personal_training';
  const todayCheckIn = mockCheckIns.find(c => c.memberId === user.id && c.date === new Date().toISOString().split('T')[0]);
  const hasCheckedIn = !!todayCheckIn;
  const latestProgress = mockProgress.find(p => p.memberId === user.id);
  const latestRemark = mockRemarks.find(r => r.memberId === user.id);
  const unreadNotifs = mockNotifications.filter(n => !n.isRead).length;
  const streakDays = 12;
  const daysUntilExpiry = Math.max(0, Math.ceil((new Date(user.membershipEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const activeWorkoutDays = mockWorkoutPlan.days.filter(d => !d.isRestDay);

  return (
    <div className="pb-24 md:pb-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-navy-600/50">Welcome back</p>
          <h1 className="text-xl sm:text-2xl font-bold text-navy-600">{user.name}</h1>
        </div>
        <Link to="/notifications" className="relative p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
          <Bell className="w-5 h-5 text-navy-600" />
          {unreadNotifs > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadNotifs}</span>
          )}
        </Link>
      </div>

      {/* Membership Card */}
      <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-2xl p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wide font-medium">{isPT ? 'Personal Training' : 'Normal Membership'}</p>
            <p className="text-xl font-bold mt-1">{user.gymName}</p>
          </div>
          <Link to="/dashboard/membership" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">View</Link>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-white/70">
            <CalendarDays className="w-4 h-4" />
            Expires in {daysUntilExpiry} days
          </div>
          <div className="flex items-center gap-1.5 text-sm text-white/70">
            <Flame className="w-4 h-4 text-accent-400" />
            {streakDays}-day streak
          </div>
        </div>
      </div>

      {/* Check-In CTA */}
      <Link to="/checkin" className="block">
        <div className={`rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 ${
          hasCheckedIn ? 'bg-success-light border border-success/20' : 'bg-white border-2 border-accent-500/30 hover:border-accent-500 hover:shadow-md'
        }`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${hasCheckedIn ? 'bg-success' : 'bg-accent-500'}`}>
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-navy-600">
              {hasCheckedIn ? 'Checked In ✓' : 'Check In Now'}
            </p>
            <p className="text-sm text-navy-600/50">
              {hasCheckedIn
                ? `Checked in at ${todayCheckIn.checkedInAt.split('T')[1]?.slice(0,5) || 'today'}`
                : 'Tap to verify your gym location'}
            </p>
          </div>
          {!hasCheckedIn && <ChevronRight className="w-5 h-5 text-accent-500" />}
        </div>
      </Link>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card !p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-accent-500" />
            <span className="text-xs text-navy-600/50">Streak</span>
          </div>
          <p className="text-2xl font-bold text-navy-600">{streakDays}</p>
          <p className="text-xs text-navy-600/40">consecutive days</p>
        </div>
        <div className="card !p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-success" />
            <span className="text-xs text-navy-600/50">Weight</span>
          </div>
          <p className="text-2xl font-bold text-navy-600">{latestProgress?.weight || user.weight}<span className="text-sm font-normal text-navy-600/40"> kg</span></p>
          <p className="text-xs text-navy-600/40">{latestProgress ? 'last week' : 'current'}</p>
        </div>
      </div>

      {/* Progress Card */}
      <Link to="/progress" className="card-hover block group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-600/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <p className="font-semibold text-navy-600 text-sm">Weekly Progress</p>
              <p className="text-xs text-navy-600/50">Track your measurements</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-navy-600/30 group-hover:text-accent-500 transition-colors" />
        </div>
      </Link>

      {/* Video Library Card */}
      <Link to="/videos" className="card-hover block group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-600/10 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-navy-600" />
            </div>
            <div>
              <p className="font-semibold text-navy-600 text-sm">Video Library</p>
              <p className="text-xs text-navy-600/50">Workout tutorials & guides</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-navy-600/30 group-hover:text-accent-500 transition-colors" />
        </div>
      </Link>

      {/* PT-Exclusive Cards */}
      {isPT && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-accent">PT Exclusive</span>
          </div>

          {/* Workout Plan Card */}
          <Link to="/plan/workout" className="block">
            <div className="card border-2 border-accent-500/20 hover:border-accent-500/50 hover:shadow-md transition-all p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-600 text-sm">My Workout Plan</p>
                    <p className="text-xs text-navy-600/50">{activeWorkoutDays.length} active days · Updated {mockWorkoutPlan.updatedAt}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-accent-500" />
              </div>
            </div>
          </Link>

          {/* Diet Plan Card */}
          <Link to="/plan/diet" className="block">
            <div className="card border-2 border-accent-500/20 hover:border-accent-500/50 hover:shadow-md transition-all p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-600 text-sm">My Diet Plan</p>
                    <p className="text-xs text-navy-600/50">5 meals · Personalized nutrition</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-accent-500" />
              </div>
            </div>
          </Link>

          {/* Trainer Remarks Card */}
          {latestRemark && (
            <Link to="/remarks" className="block">
              <div className="card border-2 border-accent-500/20 hover:border-accent-500/50 hover:shadow-md transition-all p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-accent-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-600 text-sm">Trainer Remarks</p>
                      {latestRemark.isNew && <span className="text-xs text-accent-500 font-medium">New feedback!</span>}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-accent-500" />
                </div>
                <p className="text-sm text-navy-600/60 line-clamp-2 pl-[52px]">{latestRemark.content}</p>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
