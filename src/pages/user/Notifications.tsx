import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface NotificationItem {
  id: string;
  type: 'progress' | 'workout' | 'attendance' | 'payment';
  title: string;
  content: string;
  time: string;
  isUnread: boolean;
  link?: string;
  actionText?: string;
}

export default function Notifications() {
  const { user } = useAuthStore();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'progress',
      title: 'Sunday Progress Window Open',
      content: 'Today is Sunday! Submit your body weight and progress photos before 11:59 PM for Coach Ravi Sharma to review.',
      time: '2h ago',
      isUnread: true,
      link: '/progress/submit',
      actionText: 'Submit Progress',
    },
    {
      id: '2',
      type: 'workout',
      title: 'Workout Plan Updated',
      content: 'Coach Ravi Sharma updated your Thursday Chest & Triceps routine with new burnout sets.',
      time: 'Yesterday',
      isUnread: true,
      link: '/plan/workout',
      actionText: 'View Workout',
    },
    {
      id: '3',
      type: 'attendance',
      title: '7-Day Attendance Streak Achieved! 🔥',
      content: 'Congratulations on 7 consecutive days of gym check-ins at FitZone Gym! Keep the momentum going.',
      time: '2 days ago',
      isUnread: false,
      link: '/attendance',
      actionText: 'View History',
    },
    {
      id: '4',
      type: 'payment',
      title: 'Subscription Payment Confirmed',
      content: 'Your membership payment has been confirmed via Razorpay. Your membership is active for 30 days.',
      time: '3 days ago',
      isUnread: false,
      link: '/dashboard/membership',
      actionText: 'View Details',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter(n => (filter === 'unread' ? n.isUnread : true));
  const unreadCount = notifications.filter(n => n.isUnread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const markItemRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isUnread: false } : n)));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722]">notifications</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Activity & Alerts</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Notifications</h1>
          <p className="text-xs text-slate-500 mt-1">Gym announcements, progress reminders, and coach updates</p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#1A3C5E] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">done_all</span>
              Mark All as Read
            </button>
          )}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'all' ? 'bg-white text-[#1A3C5E] shadow-sm' : 'text-slate-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'unread' ? 'bg-[#E87722] text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map(notif => (
          <div
            key={notif.id}
            className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              notif.isUnread
                ? 'border-l-4 border-l-[#E87722] border-slate-200/80 bg-orange-50/10'
                : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                notif.type === 'progress'
                  ? 'bg-orange-100 text-[#E87722]'
                  : notif.type === 'workout'
                  ? 'bg-blue-100 text-[#1A3C5E]'
                  : notif.type === 'attendance'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                <span className="material-symbols-outlined text-xl">
                  {notif.type === 'progress'
                    ? 'leaderboard'
                    : notif.type === 'workout'
                    ? 'fitness_center'
                    : notif.type === 'attendance'
                    ? 'local_fire_department'
                    : 'payments'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-[#1A3C5E]">{notif.title}</h3>
                  {notif.isUnread && (
                    <span className="w-2 h-2 rounded-full bg-[#E87722] flex-shrink-0" />
                  )}
                  <span className="text-[11px] text-slate-400 ml-auto flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.content}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              {notif.link && (
                <Link
                  to={notif.link}
                  onClick={() => markItemRead(notif.id)}
                  className="px-4 py-2 bg-[#1A3C5E] hover:bg-[#15324E] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  {notif.actionText || 'View'}
                </Link>
              )}
              {notif.isUnread && (
                <button
                  onClick={() => markItemRead(notif.id)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Mark as read"
                >
                  <span className="material-symbols-outlined text-base">done</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-2">
            <span className="material-symbols-outlined text-4xl text-slate-300">notifications_off</span>
            <p className="text-sm font-bold text-slate-700">No notifications found</p>
            <p className="text-xs text-slate-400">All alerts and reminders have been caught up.</p>
          </div>
        )}
      </div>
    </div>
  );
}
