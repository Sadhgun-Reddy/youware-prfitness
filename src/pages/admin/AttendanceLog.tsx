import { useState, useMemo } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { MapPin, Clock, Search, Calendar, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AttendanceLog() {
  const { checkIns, members, adminSettings } = useDataStore();
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Map member details for fast lookup
  const memberMap = useMemo(() => {
    const map = new Map<string, (typeof members)[0]>();
    members.forEach(m => {
      map.set(m.id, m);
      map.set(m.name.toLowerCase(), m);
    });
    return map;
  }, [members]);

  // Filter checkins by date
  const filteredCheckIns = useMemo(() => {
    return checkIns
      .filter(ci => {
        const matchesDate = ci.date === selectedDate || ci.checkedInAt.startsWith(selectedDate);
        if (!matchesDate) return false;
        if (!searchQuery.trim()) return true;
        return ci.memberName.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => new Date(b.checkedInAt).getTime() - new Date(a.checkedInAt).getTime());
  }, [checkIns, selectedDate, searchQuery]);

  const stats = useMemo(() => {
    const forDate = checkIns.filter(ci => ci.date === selectedDate || ci.checkedInAt.startsWith(selectedDate));
    let ptCount = 0;
    let normalCount = 0;
    forDate.forEach(ci => {
      const m = memberMap.get(ci.memberId) || memberMap.get(ci.memberName.toLowerCase());
      if (m?.planType === 'personal_training') {
        ptCount++;
      } else {
        normalCount++;
      }
    });
    return { total: forDate.length, ptCount, normalCount };
  }, [checkIns, selectedDate, memberMap]);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1A3C5E] tracking-tight">Gym Attendance Log</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time geofence-verified check-in records at {adminSettings?.gymName || 'FitZone Gym'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#1A3C5E]" />
            Date:
          </label>
          <input
            type="date"
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-[#1A3C5E] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1A3C5E]"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-400">Total Check-Ins</p>
            <p className="text-2xl font-black text-[#1A3C5E] mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A3C5E] flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-400">Personal Training</p>
            <p className="text-2xl font-black text-[#E87722] mt-1">{stats.ptCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E87722] flex items-center justify-center">
            <span className="text-xs font-black">PT</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-400">Normal Membership</p>
            <p className="text-2xl font-black text-slate-700 mt-1">{stats.normalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <span className="text-xs font-black">GEN</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search attendee by name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white transition-all"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Check-ins List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-sm font-bold text-[#1A3C5E]">
            Attendance Records ({filteredCheckIns.length})
          </h2>
          <span className="text-xs text-slate-400">
            {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {filteredCheckIns.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredCheckIns.map((ci, index) => {
              const member = memberMap.get(ci.memberId) || memberMap.get(ci.memberName.toLowerCase());
              const isPT = member?.planType === 'personal_training';
              const timeString = new Date(ci.checkedInAt).toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              });

              return (
                <div
                  key={ci.id}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-400 w-6 text-center">
                      #{index + 1}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        isPT ? 'bg-orange-100 text-[#E87722]' : 'bg-slate-100 text-[#1A3C5E]'
                      }`}
                    >
                      {ci.memberName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/members/${ci.memberId || member?.id || 'm1'}`}
                          className="font-bold text-sm text-[#1A3C5E] hover:underline truncate"
                        >
                          {ci.memberName}
                        </Link>
                        {isPT ? (
                          <span className="text-[10px] uppercase font-bold bg-orange-100 text-[#E87722] px-2 py-0.5 rounded-full border border-orange-200">
                            PT
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                            Normal
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{timeString}</span>
                        <span>•</span>
                        <span>{ci.distanceMeters !== undefined ? `${ci.distanceMeters}m from gym center` : 'GPS Verified'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Within Geofence</span>
                    </div>

                    <Link
                      to={`/admin/members/${ci.memberId || member?.id || 'm1'}`}
                      className="p-1.5 text-slate-400 hover:text-[#1A3C5E] hover:bg-slate-100 rounded-lg transition-colors"
                      title="View Member Profile"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No Check-Ins Found</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are no attendance records for {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
