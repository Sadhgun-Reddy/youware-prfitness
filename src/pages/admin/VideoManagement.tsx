import { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Plus, Search, Play, Trash2, Edit3, X, CheckCircle, Video as VideoIcon } from 'lucide-react';
import type { WorkoutVideo } from '../../types';

export default function VideoManagement() {
  const { videos, addVideo, deleteVideo, updateVideo } = useDataStore();
  const [search, setSearch] = useState('');
  const [editingVideo, setEditingVideo] = useState<Partial<WorkoutVideo> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = videos.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase()) || 
    v.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo?.title || !editingVideo?.videoUrl || !editingVideo?.category) return;

    const categorySlug = editingVideo.category.toLowerCase();

    if (editingVideo.id) {
      updateVideo(editingVideo.id, { ...editingVideo, categorySlug } as WorkoutVideo);
    } else {
      const videoId = `vid-${Date.now()}`;
      // Basic youtube thumbnail extraction
      let thumbnailUrl = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000';
      if (editingVideo.videoUrl.includes('youtube.com') || editingVideo.videoUrl.includes('youtu.be')) {
        const vidIdMatch = editingVideo.videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        if (vidIdMatch) thumbnailUrl = `https://img.youtube.com/vi/${vidIdMatch[1]}/maxresdefault.jpg`;
      }

      addVideo({
        ...editingVideo,
        id: videoId,
        thumbnailUrl,
        categorySlug,
        duration: '10:00',
        difficulty: 'beginner',
        isActive: true,
        views: 0,
        createdAt: new Date().toISOString()
      } as WorkoutVideo);
    }
    setEditingVideo(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header">Video Management</h1>
        <button 
          onClick={() => { setEditingVideo({ title: '', videoUrl: '', category: 'Workout', description: '' }); setIsModalOpen(true); }}
          className="btn-primary text-sm !py-2 !px-4 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Video
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-600/30" />
        <input type="text" className="input-field !pl-10" placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(video => (
          <div key={video.id} className="card !p-0 overflow-hidden group">
            <div className="aspect-video relative overflow-hidden bg-navy-900 border-b border-offwhite-200">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-12 h-12 text-white fill-current" />
              </div>
              <span className="absolute top-2 right-2 bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{video.category}</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-navy-600 text-sm mb-1 line-clamp-1">{video.title}</h3>
              <p className="text-xs text-navy-600/40 line-clamp-1 mb-3">{video.description || 'No description'}</p>
              <div className="flex items-center justify-between border-t border-offwhite-200 pt-3">
                <span className="text-[10px] font-bold text-navy-600/30 uppercase tracking-widest">{video.duration} • {video.views} views</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => { setEditingVideo(video); setIsModalOpen(true); }}
                    className="p-1.5 rounded-lg hover:bg-offwhite-200 transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-navy-600/50" />
                  </button>
                  <button 
                    onClick={() => deleteVideo(video.id)}
                    className="p-1.5 rounded-lg hover:bg-error-light transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-error/50" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-offwhite-300">
              <h2 className="font-bold text-navy-600">{editingVideo?.id ? 'Edit Video' : 'Add New Video'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-offwhite-200 rounded-lg"><X className="w-5 h-5 text-navy-600/50" /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-600/40 uppercase tracking-widest mb-1">Title</label>
                <input type="text" required className="input-field" value={editingVideo?.title || ''} onChange={e => setEditingVideo({...editingVideo, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-600/40 uppercase tracking-widest mb-1">Description</label>
                <textarea className="input-field" rows={2} value={editingVideo?.description || ''} onChange={e => setEditingVideo({...editingVideo, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-600/40 uppercase tracking-widest mb-1">YouTube URL</label>
                <input type="url" required className="input-field" value={editingVideo?.videoUrl || ''} onChange={e => setEditingVideo({...editingVideo, videoUrl: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy-600/40 uppercase tracking-widest mb-1">Category</label>
                <select className="input-field" value={editingVideo?.category || 'Workout'} onChange={e => setEditingVideo({...editingVideo, category: e.target.value})}>
                  <option value="Workout">Workout</option>
                  <option value="Diet">Diet</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Instructional">Instructional</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> {editingVideo?.id ? 'Update Video' : 'Save Video'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
