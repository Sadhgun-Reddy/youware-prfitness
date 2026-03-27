import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { MessageSquare, Clock } from 'lucide-react';
import type { TrainerRemark } from '../../types';

export default function Remarks() {
  const { user } = useAuthStore();
  const { remarks } = useDataStore();
  
  if (!user) return null;
  const myRemarks = remarks.filter((r: TrainerRemark) => r.memberId === user.id);

  return (
    <div className="pb-24 md:pb-8">
      <h1 className="page-header mb-6">Trainer Remarks</h1>

      <div className="space-y-3">
        {myRemarks.map(remark => (
          <div key={remark.id} className={`card !p-5 ${remark.isNew ? 'border-2 border-accent-500/20' : ''}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-50 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-accent-500" />
                </div>
                <span className="text-sm font-semibold text-navy-600">Your Trainer</span>
              </div>
              {remark.isNew && <span className="badge-accent">New</span>}
            </div>
            <p className="text-sm text-navy-600/70 leading-relaxed">{remark.content}</p>
            <div className="flex items-center gap-1 mt-3">
              <Clock className="w-3 h-3 text-navy-600/30" />
              <span className="text-xs text-navy-600/30">{new Date(remark.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        ))}
        {myRemarks.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-navy-600/20 mx-auto mb-3" />
            <p className="text-navy-600/40">No remarks yet</p>
            <p className="text-sm text-navy-600/30">Your trainer will share feedback here</p>
          </div>
        )}
      </div>
    </div>
  );
}
