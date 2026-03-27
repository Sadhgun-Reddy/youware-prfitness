import { useAuthStore } from '../../store/useAuthStore';
import { mockCheckIns } from '../../data/mock';
import { CalendarDays, CheckCircle, Flame } from 'lucide-react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Attendance() {
  const { user } = useAuthStore();
  if (!user) return null;

  const myCheckIns = mockCheckIns.filter(c => c.memberId === user.id);
  // Generate calendar data for current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const checkedInDates = new Set(myCheckIns.map(c => new Date(c.checkedInAt).getDate()));
  const totalDays = myCheckIns.length;
  const streak = 12;

  return (
    <div className="pb-24 md:pb-8">
      <h1 className="page-header mb-6">Attendance</h1>

      {/* Streak */}
      <div className="card !p-4 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center">
          <Flame className="w-6 h-6 text-accent-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-navy-600">{streak}</p>
          <p className="text-xs text-navy-600/50">consecutive check-in days</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-navy-600">{totalDays}</p>
          <p className="text-xs text-navy-600/50">this month</p>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="card !p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> {months[month]} {year}
          </h3>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-navy-600/40 py-1">{d}</div>
          ))}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isChecked = checkedInDates.has(day);
            const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
            return (
              <div key={day} className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                isChecked ? 'bg-success text-white font-semibold' :
                isToday ? 'bg-accent-500/20 text-accent-700 font-semibold ring-2 ring-accent-500/30' :
                'text-navy-600/60'
              }`}>
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-offwhite-300">
          <div className="flex items-center gap-1.5 text-xs text-navy-600/50">
            <div className="w-3 h-3 rounded bg-success" /> Present
          </div>
          <div className="flex items-center gap-1.5 text-xs text-navy-600/50">
            <div className="w-3 h-3 rounded bg-accent-500/20 ring-1 ring-accent-500/30" /> Today
          </div>
        </div>
      </div>

      {/* Recent Check-ins */}
      <h3 className="section-title mb-3">Recent Check-ins</h3>
      <div className="space-y-2">
        {myCheckIns.slice(0, 10).map(ci => (
          <div key={ci.id} className="card !p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-navy-600">
                {new Date(ci.checkedInAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
              </p>
              <p className="text-xs text-navy-600/40">
                {new Date(ci.checkedInAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
