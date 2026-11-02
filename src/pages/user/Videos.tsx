import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';

const CATEGORIES = [
  { slug: 'all', name: 'All Categories', icon: 'grid_view' },
  { slug: 'chest', name: 'Chest', icon: 'fitness_center' },
  { slug: 'back', name: 'Back', icon: 'sports_gymnastics' },
  { slug: 'shoulders', name: 'Shoulders', icon: 'accessibility_new' },
  { slug: 'legs', name: 'Legs', icon: 'directions_walk' },
  { slug: 'arms', name: 'Arms', icon: 'exercise' },
  { slug: 'core', name: 'Core', icon: 'self_improvement' },
  { slug: 'cardio', name: 'Cardio', icon: 'directions_run' },
];

export default function Videos() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { videos } = useDataStore();

  const [activeCategory, setActiveCategory] = useState<string>(categorySlug || 'all');
  const [search, setSearch] = useState('');

  // Filter videos from store
  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      // Must be active
      if (v.isActive === false) return false;

      // Category filter
      const matchesCategory =
        activeCategory === 'all' ||
        v.category.toLowerCase() === activeCategory.toLowerCase() ||
        (v.categorySlug && v.categorySlug.toLowerCase() === activeCategory.toLowerCase());

      // Search filter
      const matchesSearch =
        !search.trim() ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.description?.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [videos, activeCategory, search]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#E87722]">play_circle</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Video Library</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A3C5E] tracking-tight">Workout Video Library</h1>
          <p className="text-xs text-slate-500 mt-1">
            Form breakdowns, exercise demonstrations, and execution tutorials
          </p>
        </div>

        {/* Search Bar (PRD US-016) */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search exercises by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#1A3C5E] bg-white shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Strip (PRD F-010) */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory.toLowerCase() === cat.slug.toLowerCase();
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1A3C5E] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <Link
              key={video.id}
              to={`/videos/${video.categorySlug || 'general'}/${video.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md transition-all group flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center text-[#1A3C5E] shadow-lg">
                    <span className="material-symbols-outlined text-3xl font-bold">play_arrow</span>
                  </div>
                </div>
                <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {video.duration}
                </span>
                <span className="absolute top-2.5 left-2.5 bg-[#E87722] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                  {video.category}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#1A3C5E] line-clamp-2 mb-1.5 group-hover:text-[#E87722] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {video.description || 'Watch proper form and cues from our expert coaching staff.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span className="capitalize">{video.difficulty} level</span>
                  <span className="text-[#E87722] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Watch <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State (PRD US-016) */
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-3">
          <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
          <h3 className="text-base font-bold text-slate-700">No workout videos found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {search
              ? `No videos matched your query "${search}". Try checking your spelling or clearing the search filter.`
              : `No instructional videos are currently available in the ${activeCategory} category.`}
          </p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('all'); }}
            className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl transition-colors inline-block mt-2"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </div>
  );
}
