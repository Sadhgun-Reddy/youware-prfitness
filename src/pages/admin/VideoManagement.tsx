import { useState } from 'react';
import { mockVideos } from '../../data/mock';
import { PlayCircle, Plus, Search, Edit3, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function VideoManagement() {
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState(mockVideos);

  const filtered = videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()) || v.category.toLowerCase().includes(search.toLowerCase()));

  const toggleActive = (id: string) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, isActive: !v.isActive } : v));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">Video Management</h1>
        <button className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Video
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-600/30" />
        <input type="text" className="input-field !pl-10" placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Video Table */}
      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-offwhite-300/60">
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3">Video</th>
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Duration</th>
                <th className="text-left text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-navy-600/50 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-offwhite-300/60">
              {filtered.map(video => (
                <tr key={video.id} className="hover:bg-offwhite-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy-600/10 flex items-center justify-center flex-shrink-0">
                        <PlayCircle className="w-5 h-5 text-navy-600/40" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy-600 truncate">{video.title}</p>
                        <p className="text-xs text-navy-600/40 truncate">{video.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-sm text-navy-600/60">{video.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-sm text-navy-600/60">{video.duration}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(video.id)} className="flex items-center gap-1.5">
                      {video.isActive ? (
                        <ToggleRight className="w-6 h-6 text-success" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-navy-600/30" />
                      )}
                      <span className={`text-xs ${video.isActive ? 'text-success' : 'text-navy-600/30'}`}>
                        {video.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-offwhite-200 transition-colors">
                        <Edit3 className="w-4 h-4 text-navy-600/50" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-error-light transition-colors">
                        <Trash2 className="w-4 h-4 text-error/50" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8">
            <PlayCircle className="w-12 h-12 text-navy-600/20 mx-auto mb-3" />
            <p className="text-sm text-navy-600/40">No videos found</p>
          </div>
        )}
      </div>
    </div>
  );
}
