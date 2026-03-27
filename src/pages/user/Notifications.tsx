import { useAuthStore } from '../../store/useAuthStore';
import { mockNotifications } from '../../data/mock';
import { Bell, CheckCircle, AlertTriangle, Info, CreditCard, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const typeIcons: Record<string, typeof Bell> = {
  info: Info, warning: AlertTriangle, success: CheckCircle, payment: CreditCard, progress: BarChart3,
};

export default function Notifications() {
  const { user } = useAuthStore();
  if (!user) return null;

  const notifs = mockNotifications;
  const unread = notifs.filter(n => !n.isRead).length;

  return (
    <div className="pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">Notifications</h1>
        {unread > 0 && <span className="badge-accent">{unread} unread</span>}
      </div>

      <div className="space-y-2">
        {notifs.map(n => {
          const Icon = typeIcons[n.type] || Info;
          return (
            <Link key={n.id} to={n.actionUrl || '#'} className={`block card !p-4 transition-all ${!n.isRead ? 'border-l-4 border-l-accent-500 bg-accent-50/30' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  n.type === 'payment' ? 'bg-accent-50' :
                  n.type === 'success' ? 'bg-success-light' :
                  n.type === 'warning' ? 'bg-error-light' :
                  'bg-offwhite-200'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    n.type === 'payment' ? 'text-accent-500' :
                    n.type === 'success' ? 'text-success' :
                    n.type === 'warning' ? 'text-error' :
                    'text-navy-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-600">{n.title}</p>
                  <p className="text-xs text-navy-600/50 mt-0.5">{n.message}</p>
                  <p className="text-xs text-navy-600/30 mt-1">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
        {notifs.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-navy-600/20 mx-auto mb-3" />
            <p className="text-navy-600/40">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
