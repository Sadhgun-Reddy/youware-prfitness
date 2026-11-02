import { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Settings, MapPin, Save, CheckCircle2, Shield, Info } from 'lucide-react';

export default function AdminSettings() {
  const { adminSettings, updateAdminSettings } = useDataStore();

  const [form, setForm] = useState({
    gymName: adminSettings?.gymName || 'FitZone Gym',
    gymLocation: adminSettings?.gymLocation || 'Andheri West, Mumbai',
    gymLat: String(adminSettings?.gymLat || 17.405433),
    gymLng: String(adminSettings?.gymLng || 78.569921),
    geofenceRadius: String(adminSettings?.geofenceRadius || 100),
    email: 'admin@fitsync.com',
    adminName: 'Coach Ravi Sharma',
  });
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings({
      gymName: form.gymName,
      gymLocation: form.gymLocation,
      gymLat: parseFloat(form.gymLat) || 17.405433,
      gymLng: parseFloat(form.gymLng) || 78.569921,
      geofenceRadius: parseInt(form.geofenceRadius, 10) || 100,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A3C5E] tracking-tight">Gym & Geofence Settings</h1>
          <p className="text-xs text-slate-500">
            Configure gym operational location, geofence radius for automated check-ins, and admin credentials.
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Geofence & Location */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-5 h-5 text-[#E87722]" />
            <h2 className="text-base font-bold text-[#1A3C5E]">Location & Geofencing Parameters</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Gym Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white"
                value={form.gymName}
                onChange={e => update('gymName', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Facility Address
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white"
                value={form.gymLocation}
                onChange={e => update('gymLocation', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Latitude Coordinates
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white"
                value={form.gymLat}
                onChange={e => update('gymLat', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Longitude Coordinates
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white"
                value={form.gymLng}
                onChange={e => update('gymLng', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Geofence Radius (meters)
              </label>
              <span className="text-sm font-black text-[#E87722] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                {form.geofenceRadius} meters
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={form.geofenceRadius}
              onChange={e => update('geofenceRadius', e.target.value)}
              className="w-full accent-[#E87722] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>50m (Strict on-site perimeter)</span>
              <span>250m</span>
              <span>500m (Extended perimeter)</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-[#1A3C5E]">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              When members arrive within this radius of the coordinates, the mobile check-in interface
              automatically enables the instant check-in button using GPS validation.
            </p>
          </div>
        </div>

        {/* Admin Account Settings */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="w-5 h-5 text-[#1A3C5E]" />
            <h2 className="text-base font-bold text-[#1A3C5E]">Head Trainer Profile & Credentials</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Trainer / Admin Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white"
                value={form.adminName}
                onChange={e => update('adminName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#1A3C5E] focus:outline-none focus:ring-2 focus:ring-[#1A3C5E] focus:bg-white"
                value={form.email}
                onChange={e => update('email', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1A3C5E] hover:bg-[#15324f] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
