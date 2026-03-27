import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';
import { Play, ArrowLeft, Clock, Eye, Search, Filter } from 'lucide-react';

export default function Videos() {
  const { videos } = useDataStore();
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const categories = ['All', ...Array.from(new Set(videos.map(v => v.category)))];
  const activeCategory = categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : 'All';

  const filtered = videos.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">Video Library</h1>
        {categorySlug && (
          <button onClick={() => navigate('/videos')} className="flex items-center gap-1 text-xs font-bold text-navy-600/40 uppercase tracking-widest hover:text-navy-600 transition-colors">
            <ArrowLeft className="w-3 h-3" /> All Videos
          </button>
        )}
      </div>

      {/* Search & Tabs */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-600/30" />
          <input 
            type="text" className="input-field !pl-10" placeholder="Search workout videos, tutorials..." 
            value={search} onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => navigate(cat === 'All' ? '/videos' : `/videos/${cat.toLowerCase()}`)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat ? 'bg-navy-600 text-white shadow-lg' : 'bg-white border border-offwhite-300 text-navy-600/50 hover:bg-offwhite-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(video => (
          <div key={video.id} className="group cursor-pointer">
            <div className="aspect-video rounded-2xl overflow-hidden relative mb-3 bg-navy-900 border border-offwhite-300">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-5 h-5 text-white fill-current" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" /> {video.duration}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-accent-500 uppercase tracking-widest">{video.category}</span>
                <span className="text-[10px] text-navy-600/20">•</span>
                <span className="text-[10px] font-medium text-navy-600/40 flex items-center gap-1"><Eye className="w-2.5 h-2.5" /> {video.views}</span>
              </div>
              <h3 className="font-bold text-navy-600 group-hover:text-accent-500 transition-colors line-clamp-1">{video.title}</h3>
              <p className="text-xs text-navy-600/40 line-clamp-2 mt-1">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Filter className="w-12 h-12 text-navy-600/10 mx-auto mb-4" />
          <p className="text-navy-600/40">No videos found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
