import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { checkIns, progressSubmissions, workoutPlans, dietPlans, remarks, videos, addCheckIn, adminSettings } = useDataStore();

  const [checkingIn, setCheckingIn] = useState(false);
  const [checkInMsg, setCheckInMsg] = useState('');

  // Fallback member if none
  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    planType: 'personal_training' as const,
    membershipStartDate: '2025-01-15',
    membershipEndDate: '2025-02-15',
    status: 'active' as const,
  };

  const isPT = currentMember.planType === 'personal_training';
  const planLabel = isPT ? 'Personal Training' : 'Normal Membership';

  // Membership expiry calculation
  const today = new Date();
  const endDate = new Date(currentMember.membershipEndDate);
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const isExpiringSoon = daysRemaining <= 7;

  // Member check-ins
  const memberCheckIns = useMemo(() => {
    return checkIns.filter(c => c.memberId === currentMember.id || c.memberName === currentMember.name);
  }, [checkIns, currentMember]);

  const todayStr = today.toDateString();
  const isCheckedInToday = memberCheckIns.some(c => {
    const d = new Date(c.checkedInAt);
    return !isNaN(d.getTime()) && d.toDateString() === todayStr;
  });

  // Calculate Streak
  const streakDays = useMemo(() => {
    if (memberCheckIns.length === 0) return 0;
    // Count consecutive past days
    let streak = isCheckedInToday ? 1 : 0;
    let checkDate = new Date();
    if (!isCheckedInToday) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
    }
    while (true) {
      const targetStr = checkDate.toDateString();
      const hasRecord = memberCheckIns.some(c => new Date(c.checkedInAt).toDateString() === targetStr);
      if (hasRecord) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return Math.max(streak, isCheckedInToday ? 1 : 0);
  }, [memberCheckIns, isCheckedInToday]);

  // Weekly Attendance Heatmap (Last 7 days Mon-Sun)
  const weekDays = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDayIdx = today.getDay() === 0 ? 6 : today.getDay() - 1; // 0 for Mon, 6 for Sun
    return days.map((label, idx) => {
      // Calculate date for this day of current week
      const diff = idx - currentDayIdx;
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + diff);
      const isPastOrToday = idx <= currentDayIdx;
      const targetDateStr = targetDate.toDateString();
      const checked = memberCheckIns.some(c => new Date(c.checkedInAt).toDateString() === targetDateStr);
      return {
        label,
        isToday: idx === currentDayIdx,
        isPast: idx < currentDayIdx,
        checked,
      };
    });
  }, [memberCheckIns, today]);

  // Weekly Progress Status
  const isSunday = today.getDay() === 0;
  const memberProgress = useMemo(() => {
    return progressSubmissions.filter(p => p.memberId === currentMember.id || p.memberName === currentMember.name);
  }, [progressSubmissions, currentMember]);

  // Check if submitted this week
  const hasSubmittedThisWeek = useMemo(() => {
    if (memberProgress.length === 0) return false;
    const latest = memberProgress[0];
    const subDate = new Date(latest.submittedAt);
    const diffDays = (today.getTime() - subDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }, [memberProgress, today]);

  // PT Elements
  const memberWorkoutPlan = workoutPlans.find(p => p.memberId === currentMember.id) || workoutPlans[0];
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const currentDayOfWeek = dayNames[today.getDay()];
  const todaysWorkout = memberWorkoutPlan?.days.find(d => d.dayOfWeek === currentDayOfWeek);

  const memberDietPlan = dietPlans.find(p => p.memberId === currentMember.id) || dietPlans[0];
  const latestRemark = remarks.find(r => r.memberId === currentMember.id) || remarks[0];

  // Quick 1-click Check In Handler right from dashboard
  const handleQuickCheckIn = () => {
    if (isCheckedInToday) return;
    setCheckingIn(true);
    setCheckInMsg('');

    setTimeout(() => {
      const newRecord = {
        id: `ci-${Date.now()}`,
        memberId: currentMember.id,
        memberName: currentMember.name,
        latitude: adminSettings?.gymLat || 17.405433,
        longitude: adminSettings?.gymLng || 78.569921,
        checkedInAt: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
      };
      addCheckIn(newRecord);
      setCheckingIn(false);
      setCheckInMsg('Successfully checked in at FitZone Gym! Streak updated 🔥');
      setTimeout(() => setCheckInMsg(''), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Greeting Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#E87722]">
              <span className="material-symbols-outlined text-sm">stars</span>
              {planLabel}
            </span>
            <span className="text-xs text-slate-400 font-medium">• FitZone Gym Member</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A3C5E] tracking-tight">
            Welcome back, {currentMember.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Consistency builds results. Here is your training status for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/checkin"
            className="px-5 py-2.5 bg-[#1A3C5E] hover:bg-[#15324E] text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-base">location_on</span>
            Geo Check-In
          </Link>
          <Link
            to="/progress/submit"
            className="px-5 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-base">leaderboard</span>
            Weekly Progress
          </Link>
        </div>
      </div>

      {/* Check In Success Toast */}
      {checkInMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <span className="material-symbols-outlined text-emerald-600">check_circle</span>
          <span>{checkInMsg}</span>
        </div>
      )}

      {/* 2. Primary KPI Row: Membership Card + Check-In Hub + Streak */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Membership Status Card */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Membership Status</span>
              <span className="material-symbols-outlined text-[#1A3C5E]">verified_user</span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-[#1A3C5E]">{planLabel}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Valid until {new Date(currentMember.membershipEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-medium">Days Remaining:</span>
                <span className={`font-bold ${isExpiringSoon ? 'text-amber-600' : 'text-[#1E7A45]'}`}>
                  {daysRemaining} Days
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${isExpiringSoon ? 'bg-amber-500' : 'bg-[#1E7A45]'}`}
                  style={{ width: `${Math.min(100, (daysRemaining / 30) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            {isExpiringSoon ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-amber-700">Expires in {daysRemaining} days!</span>
                <Link
                  to="/dashboard/membership"
                  className="px-3.5 py-1.5 bg-[#E87722] text-white text-xs font-bold rounded-lg hover:bg-[#D06A1C] transition-all"
                >
                  Renew Now
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-[#1E7A45] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1E7A45]"></span>
                  Active Account
                </span>
                <Link to="/dashboard/membership" className="text-xs font-bold text-[#E87722] hover:underline">
                  Manage Plan
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Check-In Card with Daily Attendance Heatmap */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Attendance</span>
                <h3 className="text-xl font-black text-[#1A3C5E]">Geo-Verified Gym Check-In</h3>
              </div>

              {/* Streak Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 border border-orange-200 rounded-xl text-[#E87722]">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span className="text-sm font-black">{streakDays} Day Streak</span>
              </div>
            </div>

            {/* Weekly Days Bar */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {weekDays.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-full aspect-square max-w-[48px] rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                      day.checked
                        ? 'bg-[#E87722] text-white shadow-sm'
                        : day.isToday
                        ? 'border-2 border-[#1A3C5E] text-[#1A3C5E] bg-blue-50/40'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {day.checked ? (
                      <span className="material-symbols-outlined text-base">check</span>
                    ) : (
                      day.label.slice(0, 1)
                    )}
                  </div>
                  <span className={`text-[11px] font-semibold ${day.isToday ? 'text-[#1A3C5E] font-bold' : 'text-slate-400'}`}>
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              {isCheckedInToday
                ? 'You have already checked in at FitZone Gym today!'
                : 'Within 100m of the gym? Click to log your attendance.'}
            </p>

            <div className="w-full sm:w-auto flex items-center gap-2">
              {isCheckedInToday ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-default"
                >
                  <span className="material-symbols-outlined text-base">task_alt</span>
                  Checked In Today
                </button>
              ) : (
                <button
                  onClick={handleQuickCheckIn}
                  disabled={checkingIn}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {checkingIn ? (
                    <span>Verifying GPS...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      Check In Now
                    </>
                  )}
                </button>
              )}
              <Link
                to="/attendance"
                className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors"
              >
                History
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Weekly Progress Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">fitness_center</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-[#1A3C5E]">Weekly Progress Check-In</h3>
                {hasSubmittedThisWeek ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">done</span> Submitted
                  </span>
                ) : isSunday ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-[#E87722] animate-pulse">
                    Submission Due Today
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                    Next Window Sunday
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                {hasSubmittedThisWeek
                  ? `Your latest progress log was received on ${new Date(memberProgress[0]?.submittedAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}.`
                  : 'Submit your weight and progress photos on Sundays for trainer review.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/progress/history"
              className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors"
            >
              View Progress
            </Link>
            <Link
              to="/progress/submit"
              className="px-5 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <span>{hasSubmittedThisWeek ? 'Update Log' : 'Submit Progress'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. PT EXCLUSIVE SECTION (PRD Screen 3: 3 Orange-Bordered Cards) */}
      {isPT ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E87722]"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A3C5E]">Personal Training Workflows</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: My Workout Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#E87722]/50 hover:border-[#E87722] transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87722] bg-orange-50 px-2.5 py-0.5 rounded-full">
                    Workout Plan
                  </span>
                  <span className="material-symbols-outlined text-[#E87722]">fitness_center</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A3C5E] mb-1">Today's Routine</h3>
                <p className="text-xs text-slate-500 mb-4">
                  {todaysWorkout?.isRestDay
                    ? 'Rest & Active Recovery'
                    : `${todaysWorkout?.exercises.length || 4} Exercises scheduled for today`}
                </p>

                <div className="space-y-2 mb-6">
                  {(todaysWorkout?.exercises.slice(0, 3) || [
                    { name: 'Barbell Bench Press', sets: 4, reps: 10 },
                    { name: 'Incline Dumbbell Press', sets: 3, reps: 12 },
                    { name: 'Triceps Rope Pushdowns', sets: 4, reps: 15 },
                  ]).map((ex, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50">
                      <span className="font-semibold text-slate-800 truncate pr-2">{ex.name}</span>
                      <span className="text-slate-400 font-medium flex-shrink-0">{ex.sets} × {ex.reps}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/plan/workout"
                className="w-full py-2.5 bg-[#1A3C5E] hover:bg-[#15324E] text-white rounded-xl text-xs font-bold text-center block transition-colors"
              >
                View Full Workout Plan
              </Link>
            </div>

            {/* Card 2: My Diet Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#E87722]/50 hover:border-[#E87722] transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87722] bg-orange-50 px-2.5 py-0.5 rounded-full">
                    Nutrition Plan
                  </span>
                  <span className="material-symbols-outlined text-[#E87722]">restaurant</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A3C5E] mb-1">Target Nutrition</h3>
                <p className="text-xs text-slate-500 mb-4">
                  {memberDietPlan?.meals.length || 5} Meals tailored to your metabolic goal
                </p>

                <div className="grid grid-cols-3 gap-2 text-center mb-6">
                  <div className="p-2.5 bg-blue-50/60 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Protein</p>
                    <p className="text-sm font-black text-[#1A3C5E]">160g</p>
                  </div>
                  <div className="p-2.5 bg-orange-50/60 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Carbs</p>
                    <p className="text-sm font-black text-[#E87722]">210g</p>
                  </div>
                  <div className="p-2.5 bg-amber-50/60 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Fats</p>
                    <p className="text-sm font-black text-amber-700">60g</p>
                  </div>
                </div>
              </div>

              <Link
                to="/plan/diet"
                className="w-full py-2.5 bg-[#1A3C5E] hover:bg-[#15324E] text-white rounded-xl text-xs font-bold text-center block transition-colors"
              >
                View Nutrition & Meals
              </Link>
            </div>

            {/* Card 3: Trainer Remarks */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#E87722]/50 hover:border-[#E87722] transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87722] bg-orange-50 px-2.5 py-0.5 rounded-full">
                    Coach Directives
                  </span>
                  <span className="material-symbols-outlined text-[#E87722]">chat</span>
                </div>
                <h3 className="text-xl font-bold text-[#1A3C5E] mb-1">Trainer Feedback</h3>
                <p className="text-xs text-slate-500 mb-3">
                  From Coach Ravi Sharma • Head Trainer
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs italic text-slate-700 leading-relaxed mb-6">
                  "{latestRemark?.content || 'Focus on controlled eccentrics on all compounds this week. Keep that protein intake consistent.'}"
                </div>
              </div>

              <Link
                to="/remarks"
                className="w-full py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold text-center block transition-colors"
              >
                View All Trainer Remarks
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Normal Plan Upgrade Banner */
        <div className="bg-gradient-to-r from-[#1A3C5E] to-[#15324E] rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-white/10 text-orange-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Upgrade Available
            </span>
            <h3 className="text-xl font-black mt-2">Unlock Personal Training</h3>
            <p className="text-white/70 text-xs sm:text-sm max-w-lg mt-1">
              Get custom day-by-day workout plans, calculated nutrition targets, and direct feedback notes from Coach Ravi Sharma.
            </p>
          </div>
          <Link
            to="/register/plan-select"
            className="px-6 py-3 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex-shrink-0 transition-all shadow-md active:scale-95"
          >
            Upgrade for ₹3,500/mo
          </Link>
        </div>
      )}

      {/* 5. Featured Video Library Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-[#1A3C5E]">Workout Video Library</h3>
            <p className="text-xs text-slate-500">Master proper form and exercise mechanics</p>
          </div>
          <Link to="/videos" className="text-xs font-bold text-[#E87722] hover:underline flex items-center gap-1">
            View All Videos
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(videos.slice(0, 4) || []).map((video) => (
            <Link
              key={video.id}
              to={`/videos/${video.categorySlug || 'general'}/${video.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md transition-all group flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#1A3C5E] shadow-md">
                    <span className="material-symbols-outlined text-2xl font-bold">play_arrow</span>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {video.duration}
                </span>
                <span className="absolute top-2 left-2 bg-[#E87722] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {video.category}
                </span>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-[#1A3C5E] line-clamp-2 mb-1 group-hover:text-[#E87722] transition-colors">
                  {video.title}
                </h4>
                <p className="text-[11px] text-slate-400 capitalize">{video.difficulty} level</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
