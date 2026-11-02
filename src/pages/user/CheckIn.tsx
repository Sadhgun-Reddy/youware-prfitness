import { useState, useMemo } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { Link } from 'react-router-dom';

function calculateDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export default function CheckIn() {
  const { user } = useAuthStore();
  const { checkIns, addCheckIn, adminSettings } = useDataStore();

  const currentMember = user || {
    id: 'm1',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
  };

  const gymLat = adminSettings?.gymLat || 17.405433;
  const gymLng = adminSettings?.gymLng || 78.569921;
  const geofenceRadius = adminSettings?.geofenceRadius || 100;
  const gymName = adminSettings?.gymName || 'FitZone Gym';
  const gymLocation = adminSettings?.gymLocation || 'Andheri West, Mumbai';

  const todayStr = new Date().toDateString();
  const memberCheckIns = useMemo(() => {
    return checkIns.filter(c => c.memberId === currentMember.id || c.memberName === currentMember.name);
  }, [checkIns, currentMember]);

  const existingToday = memberCheckIns.find(c => {
    const d = new Date(c.checkedInAt);
    return !isNaN(d.getTime()) && d.toDateString() === todayStr;
  });

  const [state, setState] = useState<'ready' | 'loading' | 'success' | 'outside_radius' | 'error'>(
    existingToday ? 'success' : 'ready'
  );
  const [distanceCalculated, setDistanceCalculated] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [simMode, setSimMode] = useState<'real' | 'at_gym' | 'outside'>('at_gym');

  // Calculate streak
  const streakDays = useMemo(() => {
    if (memberCheckIns.length === 0) return 0;
    let streak = existingToday || state === 'success' ? 1 : 0;
    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);
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
    return Math.max(streak, (existingToday || state === 'success') ? 1 : 0);
  }, [memberCheckIns, existingToday, state]);

  const performCheckInAtCoords = (userLat: number, userLng: number) => {
    const distance = calculateDistanceInMeters(userLat, userLng, gymLat, gymLng);
    setDistanceCalculated(distance);

    if (distance <= geofenceRadius) {
      const record = {
        id: `ci-${Date.now()}`,
        memberId: currentMember.id,
        memberName: currentMember.name,
        latitude: userLat,
        longitude: userLng,
        checkedInAt: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
      };
      addCheckIn(record);
      setState('success');
    } else {
      setState('outside_radius');
      setErrorMessage(`You are ${distance}m away. You must be within ${geofenceRadius}m of ${gymName} to check in.`);
    }
  };

  const handleCheckIn = () => {
    setState('loading');
    setErrorMessage('');

    if (simMode === 'at_gym') {
      setTimeout(() => {
        // ~25 meters from gym
        performCheckInAtCoords(gymLat + 0.0001, gymLng + 0.0001);
      }, 1000);
      return;
    }

    if (simMode === 'outside') {
      setTimeout(() => {
        // ~850 meters away
        performCheckInAtCoords(gymLat + 0.0075, gymLng + 0.0075);
      }, 1000);
      return;
    }

    // Real device GPS
    if (!navigator.geolocation) {
      setState('error');
      setErrorMessage('Geolocation is not supported by your browser. Please try simulation mode.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        performCheckInAtCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setState('error');
        setErrorMessage(err.message || 'Location permission denied. Please grant permission or use demo simulation.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722] text-xl">location_on</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A3C5E]">{gymName} • Main Facility</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Geo-Verified Gym Check-In</h1>
          <p className="text-xs text-slate-500 mt-1">{gymLocation} (Within {geofenceRadius}m geofence)</p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 text-xs font-bold self-start">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Geofence Active ({geofenceRadius}m)
        </div>
      </div>

      {/* Streak Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#E87722] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-[#1A3C5E]">{streakDays}-Day Attendance Streak! 🔥</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {existingToday || state === 'success'
                ? "You've successfully recorded your attendance for today."
                : 'Check in today to maintain your momentum and build training consistency.'}
            </p>
          </div>
        </div>

        <Link
          to="/attendance"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#1A3C5E] rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
        >
          View Calendar History
        </Link>
      </div>

      {/* Simulation / GPS Test Selector */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Location Source Mode:</span>
            <p className="text-[11px] text-slate-400">Select simulated location or your actual GPS for testing</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { setSimMode('at_gym'); if (!existingToday) setState('ready'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                simMode === 'at_gym'
                  ? 'bg-[#1A3C5E] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Simulate At Gym (Pass)
            </button>
            <button
              type="button"
              onClick={() => { setSimMode('outside'); if (!existingToday) setState('ready'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                simMode === 'outside'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Simulate &gt;100m (Fail)
            </button>
            <button
              type="button"
              onClick={() => { setSimMode('real'); if (!existingToday) setState('ready'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                simMode === 'real'
                  ? 'bg-[#E87722] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Real Device GPS
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Check-In Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 text-center flex flex-col items-center justify-center">
        {/* STATE 1: ALREADY CHECKED IN OR JUST SUCCEEDED */}
        {(existingToday || state === 'success') && (
          <div className="space-y-6 max-w-md">
            <div className="w-24 h-24 bg-emerald-100 text-[#1E7A45] rounded-full flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-5xl font-bold">task_alt</span>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Verified Check-In
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A3C5E]">You Are Checked In Today!</h2>
              <p className="text-slate-500 text-sm mt-2">
                Logged at{' '}
                <span className="font-bold text-slate-800">
                  {new Date(existingToday?.checkedInAt || Date.now()).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>{' '}
                at {gymName}.
              </p>
              {distanceCalculated !== null && (
                <p className="text-xs text-emerald-600 font-semibold mt-1">Verified within {distanceCalculated}m of gym.</p>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-[#1A3C5E] hover:bg-[#15324E] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Back to Dashboard
              </Link>
              <Link
                to="/attendance"
                className="px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
              >
                View Attendance Record
              </Link>
            </div>
          </div>
        )}

        {/* STATE 2: LOADING */}
        {!existingToday && state === 'loading' && (
          <div className="space-y-6 max-w-md py-6">
            <div className="w-20 h-20 border-4 border-slate-200 border-t-[#E87722] rounded-full animate-spin mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-[#1A3C5E]">Verifying Location Coordinates...</h2>
              <p className="text-slate-500 text-sm mt-1">
                Comparing coordinates against {gymName} geofence ({geofenceRadius}m radius)...
              </p>
            </div>
          </div>
        )}

        {/* STATE 3: OUTSIDE RADIUS */}
        {!existingToday && state === 'outside_radius' && (
          <div className="space-y-6 max-w-md">
            <div className="w-24 h-24 bg-red-100 text-[#C0392B] rounded-full flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-5xl">location_off</span>
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Outside Geofence Radius
              </span>
              <h2 className="text-2xl font-black text-[#1A3C5E]">Check-In Rejected</h2>
              <p className="text-slate-600 text-sm mt-2">{errorMessage}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => { setSimMode('at_gym'); setState('ready'); }}
                className="px-6 py-3 bg-[#E87722] hover:bg-[#D06A1C] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Switch to At-Gym Simulation & Retry
              </button>
              <button
                type="button"
                onClick={handleCheckIn}
                className="px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl transition-all"
              >
                Retry Check-In
              </button>
            </div>
          </div>
        )}

        {/* STATE 4: ERROR / PERMISSION DENIED */}
        {!existingToday && state === 'error' && (
          <div className="space-y-6 max-w-md">
            <div className="w-24 h-24 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-5xl">warning</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1A3C5E]">Location Error</h2>
              <p className="text-slate-600 text-sm mt-2">{errorMessage}</p>
            </div>

            <div className="pt-2 flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => { setSimMode('at_gym'); setState('ready'); }}
                className="px-6 py-3 bg-[#1A3C5E] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#15324E] transition-all"
              >
                Try At-Gym Simulation
              </button>
            </div>
          </div>
        )}

        {/* STATE 5: READY TO CHECK IN */}
        {!existingToday && state === 'ready' && (
          <div className="space-y-6 max-w-md">
            <div className="relative">
              <div className="w-28 h-28 bg-[#E87722] text-white rounded-full flex items-center justify-center mx-auto shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-5xl">touch_app</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A3C5E]">Ready to Check In</h2>
              <p className="text-slate-500 text-sm mt-1">
                Click below to verify your proximity and log your daily gym attendance.
              </p>
            </div>

            <button
              onClick={handleCheckIn}
              className="w-full py-4 bg-[#E87722] hover:bg-[#D06A1C] text-white font-bold text-base rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">location_on</span>
              Check In at {gymName}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
