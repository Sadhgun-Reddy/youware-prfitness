import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { mockAdmin } from '../../data/mock';
import { MapPin, CheckCircle, AlertTriangle, Flame, Navigation } from 'lucide-react';

type CheckInState = 'idle' | 'loading' | 'success' | 'outside_radius' | 'error';

// Haversine formula to calculate distance between two points in meters
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function CheckIn() {
  const { user } = useAuthStore();
  const { addCheckIn, checkIns } = useDataStore();
  const [state, setState] = useState<CheckInState>('idle');
  const [locationStatus, setLocationStatus] = useState<string>('Tap to enable location');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const myCheckIns = checkIns.filter(c => c.memberId === user?.id);
  const hasCheckedInToday = myCheckIns.some(c => new Date(c.checkedInAt).toDateString() === new Date().toDateString());

  useEffect(() => {
    if (hasCheckedInToday) {
      setState('success');
      setLocationStatus(`Verified at ${mockAdmin.gymName}`);
    }
  }, [hasCheckedInToday]);

  const handleCheckIn = () => {
    if (!navigator.geolocation) {
      setState('error');
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setState('loading');
    setLocationStatus('Getting your location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getDistance(
          latitude, 
          longitude, 
          mockAdmin.gymLat, 
          mockAdmin.gymLng
        );

        if (distance <= mockAdmin.geofenceRadius) {
          const newCheckIn = {
            id: `ci-${Date.now()}`,
            memberId: user!.id,
            memberName: user!.name,
            latitude,
            longitude,
            checkedInAt: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0],
          };
          addCheckIn(newCheckIn);
          setState('success');
          setLocationStatus(`Verified at ${mockAdmin.gymName}`);
        } else {
          setState('outside_radius');
          setLocationStatus(`Location detected — ${Math.round(distance)}m away from ${mockAdmin.gymName}`);
        }
      },
      (error) => {
        setState('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg('Location permission denied. Please enable location access.');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setErrorMsg('The request to get user location timed out.');
            break;
          default:
            setErrorMsg('An unknown error occurred while getting location.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (!user) return null;

  const streakDays = 12; // Static for now, could be computed from checkIns

  return (
    <div className="pb-24 md:pb-8">
      <h1 className="page-header mb-6">Gym Check-In</h1>

      <div className="max-w-sm mx-auto text-center">
        {/* Location Status */}
        <div className={`card !p-6 mb-6 ${
          state === 'success' ? 'border-2 border-success/30 bg-success-light/30' :
          state === 'outside_radius' ? 'border-2 border-error/30 bg-error-light/30' :
          state === 'error' ? 'border-2 border-error/30 bg-error-light/10' :
          'border-2 border-offwhite-300'
        }`}>
          {/* Icon */}
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 ${
            state === 'success' ? 'bg-success' :
            state === 'outside_radius' || state === 'error' ? 'bg-error' :
            state === 'loading' ? 'bg-navy-600' :
            'bg-navy-600/10'
          }`}>
            {state === 'loading' ? (
              <Navigation className="w-10 h-10 text-white animate-pulse" />
            ) : state === 'success' ? (
              <CheckCircle className="w-10 h-10 text-white" />
            ) : state === 'outside_radius' || state === 'error' ? (
              <AlertTriangle className="w-10 h-10 text-white" />
            ) : (
              <MapPin className="w-10 h-10 text-navy-600" />
            )}
          </div>

          {/* Status Text */}
          <p className={`text-lg font-semibold ${
            state === 'success' ? 'text-success' :
            state === 'outside_radius' || state === 'error' ? 'text-error' :
            'text-navy-600'
          }`}>
            {state === 'idle' && 'Ready to Check In'}
            {state === 'loading' && 'Verifying Location...'}
            {state === 'success' && 'Checked In Successfully!'}
            {state === 'outside_radius' && 'Outside Gym Radius'}
            {state === 'error' && 'Verification Failed'}
          </p>
          <p className="text-sm text-navy-600/50 mt-1">
            {state === 'error' ? errorMsg : locationStatus}
          </p>

          {/* Timestamp for success */}
          {state === 'success' && (
            <p className="text-xs text-navy-600/40 mt-2">
              {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} · Today
            </p>
          )}
        </div>

        {/* Streak Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Flame className="w-5 h-5 text-accent-500" />
          <span className="font-semibold text-navy-600">{streakDays}-day streak</span>
        </div>

        {/* Action Button */}
        {(state === 'idle' || state === 'outside_radius' || state === 'error') && !hasCheckedInToday && (
          <button onClick={handleCheckIn} className="btn-primary w-full text-lg !py-4 flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" /> {state === 'idle' ? 'Check In Now' : 'Try Again'}
          </button>
        )}
        {state === 'loading' && (
          <button disabled className="w-full text-lg py-4 bg-navy-200 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Verifying Location...
          </button>
        )}
        {hasCheckedInToday && (
          <button disabled className="w-full text-lg py-4 bg-success text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-default">
            <CheckCircle className="w-5 h-5" /> Already Checked In ✓
          </button>
        )}

        {/* Info text */}
        <p className="text-xs text-navy-600/40 mt-6">
          Location is verified using GPS. Make sure you're within {mockAdmin.geofenceRadius}m of the gym premises.
        </p>
      </div>
    </div>
  );
}
