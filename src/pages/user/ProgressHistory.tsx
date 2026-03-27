import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, BarChart2, PlusCircle, CheckCircle, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

// Extended local mock data for 6 weeks as requested
const MOCK_HISTORY_DATA = [
  { id: '1', weekId: 'w1', date: '2025-02-03', label: 'Week of 3 Feb', weight: 80.5, status: 'reviewed', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '2', weekId: 'w2', date: '2025-02-10', label: 'Week of 10 Feb', weight: 79.2, status: 'reviewed', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '3', weekId: 'w3', date: '2025-02-17', label: 'Week of 17 Feb', weight: 78.5, status: 'reviewed', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '4', weekId: 'w4', date: '2025-02-24', label: 'Week of 24 Feb', weight: 77.8, status: 'reviewed', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '5', weekId: 'w5', date: '2025-03-03', label: 'Week of 3 Mar', weight: 76.4, status: 'reviewed', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: '6', weekId: 'w6', date: '2025-03-10', label: 'Week of 10 Mar', weight: 75.1, status: 'pending', thumbnail: '' },
];

type FilterType = '4weeks' | '8weeks' | 'all';

export default function ProgressHistory() {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);

  const [state, setState] = useState<'loading' | 'loaded' | 'empty' | 'error'>('loading');
  const [data, setData] = useState<typeof MOCK_HISTORY_DATA>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchData = () => {
    setState('loading');
    setTimeout(() => {
      // Simulate GET /progress/me
      // Simulate random error if user ID ends with 'error' (just for robustness)
      if (user?.id === 'error-user') {
        setState('error');
      } else if (MOCK_HISTORY_DATA.length === 0) {
        setState('empty');
      } else {
        setData(MOCK_HISTORY_DATA);
        setState('loaded');
      }
    }, 1200);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const filteredData = useMemo(() => {
    let limit = data.length;
    if (filter === '4weeks') limit = 4;
    else if (filter === '8weeks') limit = 8;
    return data.slice(-limit); // get the most recent N
  }, [data, filter]);

  // SVG Chart component
  const renderChart = () => {
    if (filteredData.length < 2) return <div className="p-8 text-center text-navy-500/60">Not enough data to plot a chart.</div>;

    const width = 800;
    const height = 280;
    const padding = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    const weights = filteredData.map(d => d.weight);
    const maxWeight = Math.max(...weights) + 2;
    const minWeight = Math.max(0, Math.min(...weights) - 2);
    const range = maxWeight - minWeight;

    const points = filteredData.map((d, i) => {
      const x = padding.left + (i / (filteredData.length - 1)) * innerWidth;
      const y = padding.top + innerHeight - ((d.weight - minWeight) / range) * innerHeight;
      return { ...d, x, y };
    });

    const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

    return (
      <div className="w-full overflow-x-auto custom-scrollbar pb-4 -mx-2 px-2">
        <div className="min-w-[600px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm font-sans">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map(pct => {
              const y = padding.top + innerHeight * pct;
              const weightVal = maxWeight - range * pct;
              return (
                <g key={pct}>
                  <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
                  <text x={padding.left - 10} y={y + 4} textAnchor="end" fill="#64748b" fontSize="12">{weightVal.toFixed(1)}</text>
                </g>
              );
            })}

            {/* Line */}
            <path d={pathD} fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Area under curve (gradient) */}
            <defs>
              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${pathD} L ${points[points.length - 1].x},${height - padding.bottom} L ${padding.left},${height - padding.bottom} Z`} fill="url(#chart-gradient)" />

            {/* Points & Labels */}
            {points.map((p, i) => (
              <g key={p.id} className="cursor-pointer group" onClick={() => navigate(`/progress/history/${p.weekId}`)}>
                {/* Invisible larger circle for easier clicking */}
                <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
                
                <circle cx={p.x} cy={p.y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" className="transition-all duration-300 group-hover:r-8 group-hover:stroke-emerald-200" />
                
                {/* Tooltip on hover */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <rect x={p.x - 30} y={p.y - 40} width="60" height="24" rx="4" fill="#1e293b" />
                  <text x={p.x} y={p.y - 24} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">{p.weight} kg</text>
                </g>
                
                {/* X-axis labels */}
                <text x={p.x} y={height - 10} textAnchor="middle" fill="#64748b" fontSize="12" className="hidden sm:block">
                  {p.label.replace('Week of ', '')}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link to="/progress" className="inline-flex items-center gap-1 text-sm font-medium text-navy-500/70 hover:text-accent-500 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" />
            My Progress
          </Link>
          <h1 className="text-2xl font-bold text-navy-600">Progress History</h1>
        </div>

        {state === 'loaded' && (
          <select 
            className="input-field py-2 bg-white min-w-[160px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
          >
            <option value="4weeks">Last 4 Weeks</option>
            <option value="8weeks">Last 8 Weeks</option>
            <option value="all">All Time</option>
          </select>
        )}
      </div>

      {state === 'loading' && (
        <div className="space-y-6">
          <div className="card p-6 h-[300px] animate-pulse bg-white flex items-center justify-center">
            <div className="w-full h-full bg-navy-50/50 rounded-xl"></div>
          </div>
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-4 flex gap-4 animate-pulse">
                <div className="w-20 h-20 bg-navy-50 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-4 bg-navy-50 rounded w-1/3"></div>
                  <div className="h-6 bg-navy-50 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="card p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
            <RefreshCw className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-navy-600 mb-2">Could not load progress history.</h3>
          <p className="text-navy-500/70 mb-6">There was a problem communicating with the server.</p>
          <button onClick={fetchData} className="btn-primary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}

      {state === 'empty' && (
        <div className="card p-12 text-center flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-accent-50 rounded-full flex items-center justify-center mb-6 text-accent-500">
            <BarChart2 className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-navy-600 mb-3">No Progress Yet</h3>
          <p className="text-navy-500/70 mb-8 max-w-md mx-auto leading-relaxed">
            Your progress chart will appear here after your first Sunday submission. Start tracking your weekly changes to see your journey!
          </p>
          <Link to="/progress/submit" className="btn-primary flex items-center gap-2 px-8 py-3">
            <PlusCircle className="w-5 h-5" /> Submit Progress
          </Link>
        </div>
      )}

      {state === 'loaded' && (
        <div className="space-y-6">
          {/* Chart Card */}
          <div className="card p-6 bg-white overflow-hidden">
            <h3 className="text-lg font-bold text-navy-600 mb-6">Weight Trend (kg)</h3>
            {renderChart()}
          </div>

          {/* List of submissions */}
          <div>
            <h3 className="text-lg font-bold text-navy-600 mb-4 px-1">Submission History</h3>
            <div className="grid gap-4">
              {/* Sort newest first for the list */}
              {[...filteredData].reverse().map((entry) => (
                <Link key={entry.id} to={`/progress/history/${entry.weekId}`} className="card p-4 sm:p-5 flex items-center gap-4 sm:gap-6 hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-accent-100">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-navy-50 rounded-xl shrink-0 overflow-hidden relative shadow-inner">
                    {entry.thumbnail ? (
                      <img src={entry.thumbnail} alt="Progress" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-navy-300">
                          <BarChart2 className="w-8 h-8 opacity-50" />
                       </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-500/70 mb-1">{entry.label}</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-2xl font-bold text-navy-600">{entry.weight}</p>
                       <span className="text-sm font-medium text-navy-400">kg</span>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end gap-2">
                    {entry.status === 'reviewed' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wide">
                        <CheckCircle className="w-3.5 h-3.5" /> Reviewed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold tracking-wide">
                        <Clock className="w-3.5 h-3.5" /> Pending Review
                      </span>
                    )}
                    <span className="text-xs font-medium text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
