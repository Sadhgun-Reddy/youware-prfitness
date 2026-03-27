import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { User, Mail, CalendarDays, Ruler, Weight, Target, MapPin, LogOut, Edit3, ChevronRight } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuthStore();
  if (!user) return null;

  const goalLabels: Record<string, string> = {
    weight_loss: 'Weight Loss', muscle_gain: 'Muscle Gain', general_fitness: 'General Fitness',
  };

  return (
    <div className="pb-24 md:pb-8">
      {/* Profile Header */}
      <div className="card !p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-600 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-navy-600">{user.name}</h1>
            <p className="text-sm text-navy-600/50">{user.planType === 'personal_training' ? 'Personal Training' : 'Normal'} Member</p>
          </div>
          <Link to="/profile/edit" className="p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
            <Edit3 className="w-5 h-5 text-navy-600" />
          </Link>
        </div>
      </div>

      {/* Personal Info */}
      <h3 className="section-title mb-3">Personal Information</h3>
      <div className="card divide-y divide-offwhite-300/60 mb-6">
        {[
          { icon: Mail, label: 'Email', value: user.email },
          { icon: CalendarDays, label: 'Date of Birth', value: user.dob },
          { icon: User, label: 'Gender', value: user.gender.charAt(0).toUpperCase() + user.gender.slice(1) },
          { icon: Target, label: 'Fitness Goal', value: goalLabels[user.fitnessGoal] || user.fitnessGoal },
          { icon: MapPin, label: 'Gym', value: `${user.gymName}, ${user.gymLocation}` },
          { icon: Ruler, label: 'Height', value: `${user.height} cm` },
          { icon: Weight, label: 'Weight', value: `${user.weight} kg` },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <item.icon className="w-4 h-4 text-navy-600/40 flex-shrink-0" />
            <span className="text-sm text-navy-600/50 w-24 flex-shrink-0">{item.label}</span>
            <span className="text-sm font-medium text-navy-600">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Link to="/dashboard/membership" className="card-hover flex items-center justify-between group">
          <span className="text-sm font-medium text-navy-600">Membership Details</span>
          <ChevronRight className="w-4 h-4 text-navy-600/30 group-hover:text-accent-500" />
        </Link>
        <button onClick={logout} className="card-hover flex items-center justify-between w-full text-left group">
          <span className="text-sm font-medium text-error flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</span>
        </button>
      </div>
    </div>
  );
}
