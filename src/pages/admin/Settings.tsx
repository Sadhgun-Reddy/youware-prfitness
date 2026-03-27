import { useState } from 'react';
import { mockAdmin } from '../../data/mock';
import { Settings, MapPin, Save, Dumbbell } from 'lucide-react';

export default function AdminSettings() {
  const [form, setForm] = useState({
    gymName: mockAdmin.gymName,
    gymLocation: mockAdmin.gymLocation,
    gymLat: String(mockAdmin.gymLat),
    gymLng: String(mockAdmin.gymLng),
    geofenceRadius: String(mockAdmin.geofenceRadius),
    email: mockAdmin.email,
  });
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-navy-600" />
        <h1 className="page-header">Settings</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Gym Info */}
        <div className="card !p-6">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Gym Location & Geofence
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Gym Name</label>
              <input type="text" className="input-field" value={form.gymName} onChange={e => update('gymName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Gym Address</label>
              <input type="text" className="input-field" value={form.gymLocation} onChange={e => update('gymLocation', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">Latitude</label>
                <input type="text" className="input-field" value={form.gymLat} onChange={e => update('gymLat', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">Longitude</label>
                <input type="text" className="input-field" value={form.gymLng} onChange={e => update('gymLng', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">
                Geofence Radius: <span className="text-accent-500 font-bold">{form.geofenceRadius}m</span>
              </label>
              <input type="range" min="50" max="500" step="10" value={form.geofenceRadius} onChange={e => update('geofenceRadius', e.target.value)} className="w-full accent-accent-500" />
              <div className="flex justify-between text-xs text-navy-600/30 mt-1">
                <span>50m</span>
                <span>500m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Account */}
        <div className="card !p-6">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <Dumbbell className="w-4 h-4" /> Admin Account
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Admin Email</label>
              <input type="email" className="input-field" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">New Password</label>
              <input type="password" className="input-field" placeholder="Leave blank to keep current" />
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> {saved ? 'Settings Saved ✓' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
