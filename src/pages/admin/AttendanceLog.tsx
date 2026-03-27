import { mockCheckIns } from '../../data/mock';
import { MapPin, CheckCircle, Clock } from 'lucide-react';

export default function AttendanceLog() {
  const today = new Date().toISOString().split('T')[0];
  const todayCheckIns = mockCheckIns.filter(c => c.date === today);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">Today's Check-Ins</h1>
        <span className="badge-accent">{todayCheckIns.length} today</span>
      </div>

      {todayCheckIns.length > 0 ? (
        <div className="space-y-2">
          {todayCheckIns.sort((a, b) => new Date(b.checkedInAt).getTime() - new Date(a.checkedInAt).getTime()).map((ci, i) => (
            <div key={ci.id} className="card !p-4 flex items-center gap-4">
              <div className="text-lg font-bold text-navy-600/30 w-8 text-center">#{i + 1}</div>
              <div className="w-10 h-10 rounded-full bg-navy-600/10 flex items-center justify-center text-sm font-bold text-navy-600">
                {ci.memberName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-600 text-sm">{ci.memberName}</p>
                <div className="flex items-center gap-1 text-xs text-navy-600/40 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {new Date(ci.checkedInAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs text-success font-medium">Verified</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <MapPin className="w-12 h-12 text-navy-600/20 mx-auto mb-3" />
          <p className="text-navy-600/40">No check-ins yet today</p>
          <p className="text-xs text-navy-600/30 mt-1">Check-ins will appear here as members arrive</p>
        </div>
      )}
    </div>
  );
}
