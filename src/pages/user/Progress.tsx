import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { BarChart3, Lock, CheckCircle, Clock, ChevronRight, CalendarDays, TrendingDown } from 'lucide-react';

function isSunday() {
  return new Date().getDay() === 0;
}

export default function Progress() {
  const { user } = useAuthStore();
  const { progressSubmissions } = useDataStore();
  const [activeTab, setActiveTab] = useState<'status' | 'history'>('status');

  if (!user) return null;

  const myProgress = progressSubmissions.filter(p => p.memberId === user.id);
  const latestSubmission = myProgress[0];
  const windowOpen = isSunday();
  
  // Logic: "this week" submission is any submission with weekStartDate within last 7 days
  const hasSubmittedThisWeek = latestSubmission && (Date.now() - new Date(latestSubmission.submittedAt).getTime()) < 6 * 24 * 60 * 60 * 1000;

  return (
    <div className="pb-24 md:pb-8">
      <h1 className="page-header mb-6">My Progress</h1>

      {/* Status Card */}
      <div className={`card !p-6 mb-6 ${windowOpen && !hasSubmittedThisWeek ? 'border-2 border-accent-500/30' : ''}`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            hasSubmittedThisWeek ? 'bg-success' :
            windowOpen ? 'bg-accent-500' :
            'bg-navy-600/10'
          }`}>
            {hasSubmittedThisWeek ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : windowOpen ? (
              <BarChart3 className="w-6 h-6 text-white" />
            ) : (
              <Lock className="w-6 h-6 text-navy-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-navy-600">
              {hasSubmittedThisWeek ? 'Progress Submitted ✓' :
               windowOpen ? 'Window Open — Submit Now!' :
               'Submission Window Closed'}
            </p>
            <p className="text-sm text-navy-600/50 mt-0.5">
              {windowOpen ? 'Window closes at midnight' : 'Next window opens Sunday'}
            </p>
          </div>
        </div>

        {windowOpen && !hasSubmittedThisWeek && (
          <Link to="/progress/submit" className="btn-primary w-full mt-4 text-center block">
            Submit Weekly Progress
          </Link>
        )}
        
        {latestSubmission && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center bg-offwhite-100 rounded-xl p-3">
              <p className="text-lg font-bold text-navy-600">{latestSubmission.weight}</p>
              <p className="text-xs text-navy-600/40">Weight (kg)</p>
            </div>
            <div className="text-center bg-offwhite-100 rounded-xl p-3">
              <p className="text-lg font-bold text-navy-600">{latestSubmission.waist || '-'}</p>
              <p className="text-xs text-navy-600/40">Waist (in)</p>
            </div>
            <div className="text-center bg-offwhite-100 rounded-xl p-3">
              <p className="text-lg font-bold text-navy-600">{latestSubmission.chest || '-'}</p>
              <p className="text-xs text-navy-600/40">Chest (in)</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-offwhite-200 rounded-xl p-1 mb-6">
        <button onClick={() => setActiveTab('status')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'status' ? 'bg-white text-navy-600 shadow-sm' : 'text-navy-600/50'}`}>
          Overview
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'history' ? 'bg-white text-navy-600 shadow-sm' : 'text-navy-600/50'}`}>
          History
        </button>
      </div>

      {/* Weight Trend */}
      {activeTab === 'status' && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Weight Trend</h3>
          </div>
          <div className="flex items-end gap-3 h-32">
            {myProgress.slice(0, 6).reverse().map((p, i) => {
              const weights = myProgress.map(x => x.weight);
              const maxW = Math.max(...weights);
              const minW = Math.min(...weights);
              const range = maxW - minW || 1;
              const height = ((p.weight - minW) / range) * 80 + 20;
              return (
                <div key={p.id} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-navy-600">{p.weight}</span>
                  <div className="w-full bg-accent-500/20 rounded-t-lg relative" style={{ height: `${height}%` }}>
                    <div className="absolute bottom-0 w-full bg-accent-500 rounded-t-lg" style={{ height: '100%' }} />
                  </div>
                  <span className="text-[10px] text-navy-600/40">{new Date(p.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              );
            })}
            {myProgress.length === 0 && <p className="text-xs text-navy-600/30 text-center w-full pb-4">No data to show</p>}
          </div>
        </div>
      )}

      {/* History List */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {myProgress.map(p => (
            <Link key={p.id} to={`/progress/${p.id}`} className="card-hover block group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-navy-600">Week of {new Date(p.weekStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-navy-600/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(p.submittedAt).toLocaleDateString()}
                    </span>
                    {p.reviewed ? (
                      <span className="badge-success">Reviewed</span>
                    ) : (
                      <span className="badge-error">Pending</span>
                    )}
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-lg font-bold text-navy-600">{p.weight}<span className="text-xs font-normal text-navy-600/40"> kg</span></span>
                  <ChevronRight className="w-4 h-4 text-navy-600/30" />
                </div>
              </div>
            </Link>
          ))}
          {myProgress.length === 0 && (
            <div className="text-center py-12">
              <CalendarDays className="w-12 h-12 text-navy-600/20 mx-auto mb-3" />
              <p className="text-navy-600/40">No entries yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
