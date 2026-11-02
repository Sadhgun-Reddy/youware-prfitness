import { useState, useMemo } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { Link } from 'react-router-dom';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Attendance() {
  const { user } = useAuthStore();
  const { checkIns } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
  };

  const [date, setDate] = useState(() => new Date());
  const [selectedRecord, setSelectedRecord] = useState<{ dateStr: string; timestamp?: string } | null>(null);

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed

  // Filter checkins for current member
  const memberCheckIns = useMemo(() => {
    return checkIns.filter(c => c.memberId === currentMember.id || c.memberName === currentMember.name);
  }, [checkIns, currentMember]);

  // Calendar math
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Mon = 0, Sun = 6

  // Generate calendar cells
  const calendarDays = useMemo(() => {
    const cells = [];
    // Previous month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        dateKey: `${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`,
        checkIn: null,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const record = memberCheckIns.find(c => {
        const cDate = new Date(c.checkedInAt);
        return (
          cDate.getFullYear() === year &&
          cDate.getMonth() === month &&
          cDate.getDate() === d
        );
      });

      const isToday =
        new Date().getFullYear() === year &&
        new Date().getMonth() === month &&
        new Date().getDate() === d;

      cells.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateKey,
        isToday,
        checkIn: record || null,
      });
    }

    // Next month padding to fill grid
    const remaining = (7 - (cells.length % 7)) % 7;
    for (let n = 1; n <= remaining; n++) {
      cells.push({
        dayNumber: n,
        isCurrentMonth: false,
        dateKey: `${year}-${String(month + 2).padStart(2, '0')}-${String(n).padStart(2, '0')}`,
        checkIn: null,
      });
    }

    return cells;
  }, [year, month, daysInMonth, startOffset, memberCheckIns]);

  // Weekly breakdown
  const weeklyBreakdown = useMemo(() => {
    const weeks: { weekNum: number; count: number; days: typeof calendarDays }[] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      const slice = calendarDays.slice(i, i + 7);
      const count = slice.filter(c => c.isCurrentMonth && c.checkIn).length;
      weeks.push({
        weekNum: Math.floor(i / 7) + 1,
        count,
        days: slice,
      });
    }
    return weeks;
  }, [calendarDays]);

  // Monthly stats
  const monthlyCheckInCount = useMemo(() => {
    return memberCheckIns.filter(c => {
      const d = new Date(c.checkedInAt);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length;
  }, [memberCheckIns, year, month]);

  const handlePrevMonth = () => {
    setDate(new Date(year, month - 1, 1));
    setSelectedRecord(null);
  };

  const handleNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
    setSelectedRecord(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722] text-xl">calendar_month</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Attendance Log</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Attendance History</h1>
          <p className="text-xs text-slate-500 mt-1">Every geo-verified visit timestamped and logged</p>
        </div>

        <Link
          to="/checkin"
          className="px-5 py-2.5 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto active:scale-95"
        >
          <span className="material-symbols-outlined text-base">location_on</span>
          Check In Today
        </Link>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#E87722] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Active Streak</p>
            <p className="text-2xl font-black text-[#1A3C5E]">{memberCheckIns.length > 0 ? '7 Days' : '0 Days'}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">event_available</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Sessions in {MONTH_NAMES[month]}</p>
            <p className="text-2xl font-black text-[#1A3C5E]">{monthlyCheckInCount} Visits</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">verified</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Lifetime Total</p>
            <p className="text-2xl font-black text-[#1A3C5E]">{memberCheckIns.length} Sessions</p>
          </div>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#1A3C5E]">
              {MONTH_NAMES[month]} {year}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Click any highlighted date to inspect exact check-in time</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-slate-700"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={() => setDate(new Date())}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-slate-700"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((cell, idx) => {
            const hasCheckIn = !!cell.checkIn;
            const isSelected = selectedRecord?.dateStr === cell.dateKey;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (cell.isCurrentMonth) {
                    setSelectedRecord({
                      dateStr: cell.dateKey,
                      timestamp: cell.checkIn ? cell.checkIn.checkedInAt : undefined,
                    });
                  }
                }}
                disabled={!cell.isCurrentMonth}
                className={`aspect-square rounded-2xl p-2 flex flex-col justify-between items-center transition-all text-xs font-bold relative ${
                  !cell.isCurrentMonth
                    ? 'opacity-20 cursor-default bg-transparent text-slate-400'
                    : hasCheckIn
                    ? 'bg-[#E87722] text-white shadow-sm hover:scale-105 ring-2 ring-orange-200'
                    : cell.isToday
                    ? 'border-2 border-[#1A3C5E] text-[#1A3C5E] bg-blue-50/50 hover:bg-blue-100/50'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                } ${isSelected ? 'ring-4 ring-[#1A3C5E]' : ''}`}
              >
                <span className="text-xs">{cell.dayNumber}</span>
                {hasCheckIn ? (
                  <span className="material-symbols-outlined text-base">check</span>
                ) : cell.isToday ? (
                  <span className="text-[9px] uppercase font-bold tracking-tighter">Today</span>
                ) : (
                  <span className="h-4"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Detail Drawer */}
        {selectedRecord && (
          <div className="mt-8 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${selectedRecord.timestamp ? 'bg-[#1E7A45]' : 'bg-slate-400'}`}>
                <span className="material-symbols-outlined text-xl">
                  {selectedRecord.timestamp ? 'verified' : 'cancel'}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {new Date(selectedRecord.dateStr).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {selectedRecord.timestamp ? (
                  <p className="text-sm font-bold text-[#1A3C5E]">
                    Geo-Verified Gym Check-In at{' '}
                    <span className="text-[#E87722]">
                      {new Date(selectedRecord.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm font-medium text-slate-600">No attendance recorded on this day.</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 p-1"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Weekly Breakdown Table (PRD US-007: Zero check-in weeks distinguished) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
        <h3 className="text-lg font-black text-[#1A3C5E] mb-4">Weekly Attendance Breakdown</h3>

        <div className="space-y-3">
          {weeklyBreakdown.map((week, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl flex items-center justify-between text-xs sm:text-sm border transition-all ${
                week.count === 0
                  ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 shadow-sm text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#1A3C5E]">Week {week.weekNum}</span>
                {week.count === 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700">
                    0 Sessions • Inactive Week
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800">
                    {week.count} Sessions Logged
                  </span>
                )}
              </div>

              <div className="flex gap-1.5">
                {week.days.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className={`w-4 h-4 rounded-full ${
                      d.checkIn ? 'bg-[#E87722]' : 'bg-slate-200'
                    }`}
                    title={d.checkIn ? `Checked in on ${d.dateKey}` : d.dateKey}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
