import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, Clock, Home, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';

// Local mock data fulfilling all requirements (YouTube & MP4, categories, etc.)
const MOCK_VIDEOS = [
  {
    id: 'v1',
    categorySlug: 'legs',
    categoryName: 'Legs',
    title: 'Barbell Squats Masterclass',
    duration: '10:15 min',
    description: 'Master the king of all leg exercises. This comprehensive guide breaks down the barbell back squat into easy-to-follow steps. Learn proper setup, bracing, descent, and ascent to maximize gains and minimize injury risk.',
    type: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Using a generic placeholder video id for demo
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'v2',
    categorySlug: 'legs',
    categoryName: 'Legs',
    title: 'Romanian Deadlifts (RDL)',
    duration: '7:00 min',
    description: 'Target your hamstrings and glutes with perfect RDL form. This video covers the hip hinge mechanic and how to feel the stretch in the right places.',
    type: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'v3',
    categorySlug: 'legs',
    categoryName: 'Legs',
    title: 'Bulgarian Split Squats',
    duration: '8:30 min',
    description: 'The ultimate unilateral leg builder. Learn how to set up your stance, adjust for quad vs glute bias, and proper dumbbell positioning.',
    type: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'v4',
    categorySlug: 'legs',
    categoryName: 'Legs',
    title: 'Leg Press Optimization',
    duration: '6:45 min',
    description: 'Stop making these common leg press mistakes. Learn proper foot placement for different muscle targeting and how deep you should actually go.',
    type: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Common open source test mp4
    thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'v5',
    categorySlug: 'chest',
    categoryName: 'Chest',
    title: 'Bench Press Basics',
    duration: '12:20 min',
    description: 'Everything you need to know about the flat barbell bench press. From scapular retraction to leg drive and bar path.',
    type: 'youtube',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'v6',
    categorySlug: 'chest',
    categoryName: 'Chest',
    title: 'Incline Dumbbell Press',
    duration: '9:15 min',
    description: 'Focus on your upper chest development. We discuss bench angle, dumbbell path, and tempo for maximum hypertrophy.',
    type: 'mp4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export default function VideoPlayer() {
  const { categorySlug, videoId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState<'loading' | 'loaded' | 'error' | 'not_found'>('loading');
  const [video, setVideo] = useState<typeof MOCK_VIDEOS[0] | null>(null);
  const [related, setRelated] = useState<typeof MOCK_VIDEOS>([]);
  const [playerError, setPlayerError] = useState(false);

  const fetchVideo = () => {
    setState('loading');
    setPlayerError(false);
    
    // Simulate GET /videos/:videoId
    setTimeout(() => {
      // Simulate random network error roughly 5% of the time, or explicit test id
      if (videoId === 'error-test') {
        setState('error');
        return;
      }

      const found = MOCK_VIDEOS.find(v => v.id === videoId);
      if (!found) {
        setState('not_found');
      } else {
        setVideo(found);
        // Find 3 related videos in the same category, excluding the current one
        const relatedVideos = MOCK_VIDEOS
          .filter(v => v.categorySlug === found.categorySlug && v.id !== found.id)
          .slice(0, 3);
        setRelated(relatedVideos);
        setState('loaded');
      }
    }, 800);
  };

  useEffect(() => {
    fetchVideo();
    // Scroll to top when video changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [videoId, categorySlug]);

  const handleBack = () => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      navigate(`/videos/${categorySlug}`);
    }
  };

  if (state === 'not_found') {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mb-6">
          <PlayCircle className="w-10 h-10 text-navy-400" />
        </div>
        <h2 className="text-3xl font-bold text-navy-600 mb-3">Video not found.</h2>
        <p className="text-navy-500/70 mb-8">The video you are looking for does not exist or has been removed.</p>
        <Link to="/videos" className="btn-primary">Back to Library</Link>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[50vh] text-center">
         <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-navy-600 mb-3">Failed to load video</h2>
        <p className="text-navy-500/70 mb-8">There was a network error while fetching video details.</p>
        <button onClick={fetchVideo} className="btn-primary flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Breadcrumbs (Desktop) */}
      <nav className="hidden md:flex items-center gap-2 text-sm text-navy-500/60 mb-6 font-medium">
        <Link to="/" className="hover:text-accent-500 flex items-center gap-1 transition-colors"><Home className="w-4 h-4" /> Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/videos" className="hover:text-accent-500 transition-colors">Videos</Link>
        <ChevronRight className="w-4 h-4" />
        {state === 'loading' ? (
           <span className="w-24 h-4 bg-navy-100 rounded animate-pulse"></span>
        ) : (
           <>
             <Link to={`/videos/${video?.categorySlug}`} className="hover:text-accent-500 transition-colors">{video?.categoryName}</Link>
             <ChevronRight className="w-4 h-4" />
             <span className="text-navy-600 truncate max-w-[300px]">{video?.title}</span>
           </>
        )}
      </nav>

      {/* Mobile Back Button */}
      <button 
        onClick={handleBack}
        className="md:hidden flex items-center gap-2 text-sm font-medium text-navy-500/70 hover:text-accent-500 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> 
        Back to {state === 'loaded' ? video?.categoryName : 'Category'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Player Container - 16:9 Aspect Ratio */}
          <div className="w-full bg-black rounded-2xl overflow-hidden relative shadow-xl aspect-video shrink-0 border border-navy-100 group">
            {state === 'loading' ? (
              <div className="absolute inset-0 bg-navy-100 animate-pulse flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-navy-200" />
              </div>
            ) : playerError ? (
              <div className="absolute inset-0 bg-navy-900 flex flex-col items-center justify-center text-white px-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <p className="font-medium mb-4">This video could not be loaded. Please try again later.</p>
                <button 
                  onClick={() => setPlayerError(false)} 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Refresh
                </button>
              </div>
            ) : video?.type === 'youtube' ? (
              <iframe 
                src={`${video.videoUrl}?autoplay=0&rel=0`}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => setPlayerError(true)}
              ></iframe>
            ) : (
              <video 
                src={video?.videoUrl}
                poster={video?.thumbnail}
                controls 
                autoPlay={false}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                onError={() => setPlayerError(true)}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Video Metadata */}
          <div className="bg-white rounded-2xl p-6 md:p-8 card shadow-sm">
            {state === 'loading' ? (
              <div className="animate-pulse space-y-4">
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-navy-100 rounded-full"></div>
                  <div className="w-20 h-6 bg-navy-100 rounded-full"></div>
                </div>
                <div className="w-3/4 h-8 bg-navy-100 rounded-lg"></div>
                <div className="space-y-2 mt-6">
                  <div className="w-full h-4 bg-navy-50 rounded"></div>
                  <div className="w-full h-4 bg-navy-50 rounded"></div>
                  <div className="w-2/3 h-4 bg-navy-50 rounded"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-50 text-accent-600">
                    {video?.categoryName}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-50 text-navy-500">
                    <Clock className="w-3.5 h-3.5" />
                    {video?.duration}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-navy-600 mb-6 leading-tight">
                  {video?.title}
                </h1>
                
                <div className="prose prose-navy max-w-none">
                  <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wide mb-2">Description</h3>
                  <p className="text-navy-600/80 leading-relaxed text-[15px]">
                    {video?.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sidebar: Related Videos */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-navy-600 mb-4 px-1">Related Videos</h3>
          
          <div className="space-y-4">
            {state === 'loading' ? (
              [1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-32 h-20 bg-navy-100 rounded-xl shrink-0"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="w-full h-4 bg-navy-100 rounded"></div>
                    <div className="w-2/3 h-4 bg-navy-100 rounded"></div>
                  </div>
                </div>
              ))
            ) : related.length > 0 ? (
              related.map((rel) => (
                <Link 
                  key={rel.id} 
                  to={`/videos/${rel.categorySlug}/${rel.id}`}
                  className="flex gap-4 group items-start p-2 -mx-2 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-32 h-20 md:w-40 md:h-24 bg-navy-100 rounded-xl shrink-0 overflow-hidden relative shadow-sm">
                    <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">
                      {rel.duration}
                    </div>
                  </div>
                  <div className="flex-1 py-1 pr-2 min-w-0">
                    <h4 className="text-sm font-bold text-navy-600 line-clamp-2 leading-snug group-hover:text-accent-500 transition-colors mb-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-navy-400">{rel.categoryName}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-navy-500/60 p-4 card text-center">No related videos found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
