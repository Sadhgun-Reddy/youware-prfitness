import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';

export default function VideoPlayer() {
  const { videoId } = useParams<{ videoId?: string; categorySlug?: string }>();
  const { videos } = useDataStore();

  const currentVideo = useMemo(() => {
    return videos.find(v => v.id === videoId) || videos[0];
  }, [videos, videoId]);

  const relatedVideos = useMemo(() => {
    if (!currentVideo) return [];
    return videos
      .filter(v => v.id !== currentVideo.id && v.isActive !== false)
      .slice(0, 4);
  }, [videos, currentVideo]);

  if (!currentVideo) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-[#1A3C5E]">Video Not Found</h2>
        <p className="text-slate-500 text-sm">The requested exercise tutorial could not be located.</p>
        <Link to="/videos" className="px-5 py-2.5 bg-[#1A3C5E] text-white rounded-xl text-xs font-bold inline-block">
          Return to Video Library
        </Link>
      </div>
    );
  }

  // Detect YouTube vs direct MP4
  const isYouTube =
    currentVideo.videoUrl.includes('youtube.com') ||
    currentVideo.videoUrl.includes('youtu.be');

  let embedUrl = currentVideo.videoUrl;
  if (isYouTube) {
    const match = currentVideo.videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    if (match) {
      embedUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/videos" className="hover:text-[#1A3C5E] flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Video Library
        </Link>
        <span>/</span>
        <span className="text-[#E87722] capitalize">{currentVideo.category}</span>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-xs">{currentVideo.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Video Player & Info (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Player Container */}
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            {isYouTube ? (
              <iframe
                src={embedUrl}
                title={currentVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={currentVideo.videoUrl}
                poster={currentVideo.thumbnailUrl}
                controls
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Video Metadata Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="px-3 py-1 bg-orange-100 text-[#E87722] text-xs font-bold uppercase tracking-wider rounded-full">
                {currentVideo.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                <span>Duration: {currentVideo.duration}</span>
                <span>•</span>
                <span className="capitalize">{currentVideo.difficulty} Difficulty</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1A3C5E] tracking-tight mb-3">
              {currentVideo.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {currentVideo.description ||
                'Pay close attention to breathing tempo, joint positioning, and scapular control demonstrated in this video.'}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A3C5E] text-white flex items-center justify-center font-black text-sm">
                  RS
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A3C5E]">Coach Ravi Sharma</p>
                  <p className="text-[11px] text-slate-400">Head Trainer • FitZone Gym</p>
                </div>
              </div>

              <Link
                to="/plan/workout"
                className="px-4 py-2 bg-[#E87722] hover:bg-[#D06A1C] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Add to My Workout
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar: Related Videos (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <h3 className="text-base font-black text-[#1A3C5E] mb-4">Related Exercise Tutorials</h3>

            <div className="space-y-4">
              {relatedVideos.map(rel => (
                <Link
                  key={rel.id}
                  to={`/videos/${rel.categorySlug || 'general'}/${rel.id}`}
                  className="flex gap-3 group"
                >
                  <div className="w-28 aspect-video rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 relative">
                    <img
                      src={rel.thumbnailUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded font-bold">
                      {rel.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#1A3C5E] line-clamp-2 group-hover:text-[#E87722] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold mt-1 block">
                      {rel.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <Link to="/videos" className="text-xs font-bold text-[#1A3C5E] hover:underline">
                View Full Library →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
