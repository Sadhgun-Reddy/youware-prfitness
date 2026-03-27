import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockVideos } from '../../data/mock';
import { PlayCircle, ArrowLeft, Clock, Star } from 'lucide-react';

export default function Videos() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const categories = [...new Set(mockVideos.map(v => v.category))];

  if (categorySlug) {
    const cat = mockVideos.find(v => v.categorySlug === categorySlug)?.category || categorySlug;
    const videos = mockVideos.filter(v => v.categorySlug === categorySlug);

    return (
      <div className="pb-24 md:pb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/videos" className="p-2 rounded-xl hover:bg-offwhite-200 transition-colors">
            <ArrowLeft className="w-5 h-5 text-navy-600" />
          </Link>
          <h1 className="page-header">{cat}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(video => (
            <div key={video.id} className="card-hover group cursor-pointer overflow-hidden !p-0">
              <div className="aspect-video bg-navy-600/10 relative flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-accent-500 transition-colors" />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">{video.duration}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-navy-600 text-sm mb-1">{video.title}</h3>
                <p className="text-xs text-navy-600/50 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    video.difficulty === 'beginner' ? 'bg-success-light text-success' :
                    video.difficulty === 'intermediate' ? 'bg-accent-50 text-accent-700' :
                    'bg-error-light text-error'
                  }`}>{video.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8">
      <h1 className="page-header mb-6">Video Library</h1>

      {/* Featured */}
      <div className="card !p-0 overflow-hidden mb-8 cursor-pointer group">
        <div className="aspect-video bg-gradient-to-br from-navy-600 to-navy-800 relative flex items-center justify-center">
          <div className="text-center text-white">
            <PlayCircle className="w-16 h-16 mx-auto mb-3 group-hover:text-accent-400 transition-colors" />
            <h2 className="text-xl font-bold">HIIT Cardio Blast</h2>
            <p className="text-sm text-white/60 mt-1">High-intensity interval training for fat loss</p>
          </div>
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1">
            <Clock className="w-3 h-3" /> 20:00
          </span>
        </div>
      </div>

      {/* Categories Grid */}
      <h3 className="section-title mb-4">Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map(cat => {
          const catSlug = mockVideos.find(v => v.category === cat)?.categorySlug || cat.toLowerCase();
          const count = mockVideos.filter(v => v.category === cat).length;
          return (
            <Link key={cat} to={`/videos/${catSlug}`} className="card-hover group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-navy-600/10 flex items-center justify-center group-hover:bg-accent-50 transition-colors">
                  <Star className="w-5 h-5 text-navy-600 group-hover:text-accent-500 transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-navy-600 text-sm">{cat}</p>
                  <p className="text-xs text-navy-600/40">{count} video{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
