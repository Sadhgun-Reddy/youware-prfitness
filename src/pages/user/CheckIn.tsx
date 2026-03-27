import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { MapPin, CheckCircle, AlertTriangle, Flame, Navigation } from 'lucide-react';

type CheckInState = 'idle' | 'loading' | 'success' | 'outside_radius';

export default function CheckIn() {
  const { user } = useAuthStore();
  const [state, setState] = useState<CheckInState>('idle');
  const [locationStatus, setLocationStatus] = useState<string>('Tap to enable location');

  const handleCheckIn = () => {
    setState('loading');
    setLocationStatus('Getting your location...');

    // Simulate geolocation + API call
    setTimeout(() => {
      // Demo: randomly show success or outside radius
      const isSuccess = Math.random() > 0.3;
      if (isSuccess) {
        setState('success');
        setLocationStatus('Verified at FitZone Gym, Mumbai');
      } else {
        setState('outside_radius');
        setLocationStatus('Location detected — Outside gym radius');
      }
    }, 2000);
  };

  if (!user) return null;

  const streakDays = 12;

  return (
    <div className="pb-24 md:pb-8">
      <h1 className="page-header mb-6">Gym Check-In</h1>

      <div className="max-w-sm mx-auto text-center">
        {/* Location Status */}
        <div className={`card !p-6 mb-6 ${
          state === 'success' ? 'border-2 border-success/30 bg-success-light/30' :
          state === 'outside_radius' ? 'border-2 border-error/30 bg-error-light/30' :
          'border-2 border-offwhite-300'
        }`}>
          {/* Icon */}
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 ${
            state === 'success' ? 'bg-success' :
            state === 'outside_radius' ? 'bg-error' :
            state === 'loading' ? 'bg-navy-600' :
            'bg-navy-600/10'
          }`}>
            {state === 'loading' ? (
              <Navigation className="w-10 h-10 text-white animate-pulse" />
            ) : state === 'success' ? (
              <CheckCircle className="w-10 h-10 text-white" />
            ) : state === 'outside_radius' ? (
              <AlertTriangle className="w-10 h-10 text-white" />
            ) : (
              <MapPin className="w-10 h-10 text-navy-600" />
            )}
          </div>

          {/* Status Text */}
          <p className={`text-lg font-semibold ${
            state === 'success' ? 'text-success' :
            state === 'outside_radius' ? 'text-error' :
            'text-navy-600'
          }`}>
            {state === 'idle' && 'Ready to Check In'}
            {state === 'loading' && 'Verifying Location...'}
            {state === 'success' && 'Checked In Successfully!'}
            {state === 'outside_radius' && 'Outside Gym Radius'}
          </p>
          <p className="text-sm text-navy-600/50 mt-1">{locationStatus}</p>

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
        {state === 'idle' && (
          <button onClick={handleCheckIn} className="btn-primary w-full text-lg !py-4 flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" /> Check In Now
          </button>
        )}
        {state === 'loading' && (
          <button disabled className="w-full text-lg py-4 bg-navy-200 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Verifying Location...
          </button>
        )}
        {state === 'success' && (
          <button disabled className="w-full text-lg py-4 bg-success text-white font-semibold rounded-xl flex items-center justify-center gap-2 cursor-default">
            <CheckCircle className="w-5 h-5" /> Checked In ✓
          </button>
        )}
        {state === 'outside_radius' && (
          <button onClick={() => setState('idle')} className="btn-outline w-full text-lg !py-4 border-error text-error hover:!bg-error hover:!text-white flex items-center justify-center gap-2">
            Try Again
          </button>
        )}

        {/* Info text */}
        <p className="text-xs text-navy-600/40 mt-6">
          Location is verified using GPS. Make sure you're within the gym premises.
        </p>
      </div>
    </div>
  );
}
