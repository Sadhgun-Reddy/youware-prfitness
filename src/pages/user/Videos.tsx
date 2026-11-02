import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Videos() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    { name: 'Strength', icon: 'fitness_center' },
    { name: 'HIIT', icon: 'electric_bolt' },
    { name: 'Yoga', icon: 'self_improvement' },
    { name: 'Cardio', icon: 'directions_run' },
    { name: 'Combat', icon: 'sports_martial_arts' },
    { name: 'Mobility', icon: 'rebase_edit' },
  ];

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Compound', 'Isolation'];

  const featuredVideo = {
    title: 'Romanian Deadlift Masterclass',
    subtitle: 'New Masterclass',
    duration: '45 Minutes',
    level: 'Advanced',
    description: 'Master the hinge and build a powerful posterior chain with coach Sarah Sterling. Perfect your form with this 4K deep-dive.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkHvl6X501eUeItwjZ78fA8A0yA-ppbeZ6mZa7x4x0GeMXegCEFemzY-HKmwp8sB0tDqUL-iZGPWdbsaKc4XVBerySKRZ0_hR0QXwhN7itdApc2Uwy-Pda9fybgzFQSitm4bM_uQh6cvRVH381GYXqLBffKh75NEpOLtvtMz4hKKLUGc0w_PL-MAe1l5iND4yexIq1JvxsijDgxkjK_-TFrbELO8E_Z4jeYwy9mRR02OSM4Ha7rVkwzTXjbN49v3S3ccud88WM6eg',
  };

  const newVideos = [
    { title: 'Power Morning Mobility', coach: 'Coach Mark', category: 'Mobility', duration: '12:45', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH28_WIdMsfPxhDq5xRyVwa0KzIYWho8s-WqMEVSqUXXp_7mAuOyeSDV45hn8OhI0YBbF1EhJPMMlz3Q5cVKTvKuemaPusFeGsAuNCEL5uW-OvrGrlxwgI5tff86FJiZiyZygGP89stOkCb9OX8-DKgt9cx1VVOjsg-Jd9Lex1PUa12ccMfpZoBKKdxrVmhlJBZyqLShLH_sHFZJaff_p9Lz4ztwEMzfDR30PEgcWFMjw3LLczBsUtOgilGL7Q34_dnUhde0BMGnk' },
    { title: 'Olympic Lift Foundation', coach: 'Coach Sarah', category: 'Strength', duration: '28:10', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD88VPigiW-1-bgZWsTaAgXNbCjUqOumOsXqyZ3lNOt0oXI_zUDOm-ygWoFqVVYMeaZQGFXVKXNrgIdEbNWtmqBH8E8awupq7Neqj9-ardZBmxvAfU_jhxU-NWA0c_GZ69yWofVb1f3clSLsowD5PsJTcalY9vk75hWe2-N-PfiPUp_xftZLEjON94AZ4_PTJmbexwcp5-sIHTfbSCPD8rJo0wsB-rVmQdsYegXv7zgtyXwpYp7Y6NewmRRh980k83rv0s_4EU1uLk' },
    { title: 'Abs of Steel Express', coach: 'Coach Elena', category: 'Core', duration: '15:00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL88grVbyBFYJqEO0IaS85923uE2Gg3uqWyXkkPps7x4qts5mtY0mA-j0nYsQXRLHTBbSzo-fmnYEA_g_Nn8l0p27q2Y0Ny-JCY9wXCGn0Axe1vHa1jl8aSH08R_dN4W0VFNpfcet-HvO_srrcvXBe1YZhTVdg5OMYqYo_VkE8EQEu2eMP7DRX1Yuossl5Sg9fc6ubfnzkj2yqHSu41YXq3WCGDovO9GNdV7PK2G2KbDl-JHTRIgnRArZv2_AvYs6WFoSU4UXaGvI' },
    { title: 'Pre-Run Activation', coach: 'Coach James', category: 'Cardio', duration: '10:30', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyqtY3uDEHh7d9F3RD6Z6meqcdXHOW6dZhlNng887owm36HKN9aC4PTBOkMbQJ-GY7YaNGhJ2Lql5qxYTMnSwvHFXRU83gsTWt6uv9T7GN41XGFH0r6SjMcgncunS-VXEMcHK3IFofhENZwY8Tx_cKUlDdREZn8pWq1ul32opBedjMu348JUKoGRT6hkPPNLTlrq-5kcE0bYlkUZXwhiSp1NRja2PNOaFexDOabxIkVDT0dsczrALiVnqMR7j7OwCNc48AhfqEiKs' },
  ];

  const legVideos = [
    { title: 'Romanian Deadlift — Form & Technique', duration: '7:05', level: 'Intermediate', equipment: 'Barbell', isNew: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmfQ_iNsfta5wW64hegWaJ80av8BkuEugj2tGrJFWldr4LdYqbQ_IEIt8lSqbWjOmjYzkZ_HkQDebVQHxuLqybeFYVh5HW0IYCA-CrjmeWrDFjtV5vzzX_WcJHmIDUEiIfbqP3nr3MiDzbS3i4cbN9Q6cg2brGNUyPxqIdnQAreUAMBCIzgKcMFr91g9CH8W3ver35UqCKAfxeUxWzHQqkelagj9Fnpy8rWAck50tjI6QrDE66qFuCURWWs33EKiNChQ8_SLRTDOc' },
    { title: 'The Ultimate Squat Checklist: Depth & Drive', duration: '12:40', level: 'Advanced', equipment: 'Barbell', isNew: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdQwpp_ZC4EXUCIhiitjA3It96KDib750yeqlWG_pQbMCV1vwk2nVDg7uuE0eEuwqlXmwRKisHXFxfYx8zq8Tj7taNovhb8WaZtNr7cpKCKUKbWtLfNZwBfoidWkif4zPMqzPgrkdcLB2Q1r2Tn6_CcdB6RhBfZB3DamFg0798iNqF0VuXqd858rY0RGscDOdPrAWMG1mYiziM3o7oTqtpjGbgdhUluvY-Lj8E1WaoNIlVhRZsUHHOWyb-isV9gX3mTjtfHAeiYx8' },
    { title: 'Bulgarian Split Squats: Targeted Glute Activation', duration: '8:15', level: 'Beginner', equipment: 'Dumbbells', isNew: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7iMUgYFbHUh3ofrCA8GqpJb8nKTfsrarGLsVDKGf5AoVcq5VjU_mShXSGAe5qgr5H5ZA9PqVHm30Gh44aQztb9cAnhtHFZQ0xMmeghaLwqktwNx11QxMyULLSVauzZAZ3X38BquUlWt4e5be6ytfEKUiM6ImrcHN7Rf_4QJhr0pHMF6fd60SxHKfUCnRxudLzM3tKjdiAUdXW_3_pNkj_3CWiBqAEzC0peo5Uet0BPUe63QB5hMgaSn4BBHIVL1o0FvhMaiumqeI' },
    { title: 'Leg Press Secrets: Foot Positioning Guide', duration: '10:52', level: 'Intermediate', equipment: 'Machine', isNew: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1CsSk_AvEHxl6Ef0QwCdVGT0yK2BplLtxXgz86ovWH-sfjBVA73IiGDorFtfyWIucK1uCFBHT6LcLRXufPFLBz7fdTQHiGJkRWHwV3BBYgdrel24pfnvZPevfGClwzuEZYBM3I3vi9qPp5OkS9yVyIcQN-CGhEl1ADUTdk2s7GDpdhSXLW8W2eTvl5W4WioZqoEua56Ni-trLc1kuMrB2UaYq4E-S4WtbYt0HNLT23xOfTXVmsE6t7ryeegybFC29a_HT2TnKPRI' },
    { title: 'Calf Development: Intensity Techniques', duration: '5:20', level: 'Advanced', equipment: 'Machine', isNew: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfsjCJV5F8mCEWxbAdRsnnHEGpDe7eKyjizD8GsPwcmgF3j66XGMDuIB65Nq--zma0Go1x3sYdz7ucebjZgQSKwKlxhCaY48pwsifPgc36tF5t5KxtuHSoA9tlH_rDoYfULvdfx4g90anBPjYytthHigahaAmQrKEG052v9Em7_cZPrkHsjQaT3KnnKVqE31lMVI5cmA-He8xhatqSyHHp2ROjSMC3BFnf_tfXyjNB8CJucJN5w3-oslgx-cA5Qb9axqX4KTfULoE' },
    { title: 'Kettlebell Swings for Explosive Glutes', duration: '9:12', level: 'Beginner', equipment: 'Kettlebell', isNew: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA9kbnThrFb8RvoCz6fIxUatnjEkbNzKG_Le7WCGAAvKGikQHK6np8KymgDYQm4n4br4PFlAhrPFzgl3zfp-k5ZnEV2LWsatyXLzTbajXlMIHDttNIiJ2xn3dwkZRDskE_n31Ni97xtTe6wK2UT1Meu3CrTHMXYaolrUekkInaJhiYVufTdwT13fbpE-aQokrlNh0rgMrqwfOCnhYhvnb7XOci3SXKvzVujswXIwsKuLwBcGb1TwI6vg0fgarX0HcL4Da4OfqMbBY' },
    { title: 'Quad Isolation: Leg Extensions for Definition', duration: '6:45', level: 'Intermediate', equipment: 'Machine', isNew: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhB1l-2zdWNA4wfo53AJCwVVNFPevgN1sAjHLhGpfy3-0J_fIIMGHMICVuRKvuDwIGSDsMlL5LcoPQs9o-x9C12ryjhd5abf48N8XBALA4fCKSWLAfOdvC7YN6a-MojPfS2TK_r-mYRBmipaRxei-Zu3bYg6RrsmbcBpN65airHNJIwBEhRb59gmpEInWLNpeyQnfLKX-SAvjILwC0LJt3vKCrGbcPXIH9nSbnaizTwi_JPZytGWHFZrhmXR9a7LWKfv1-j47hsbI' },
    { title: 'Functional Movement: Weighted Lunges for Stability', duration: '11:02', level: 'Intermediate', equipment: 'Dumbbells', isNew: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ9AiQgC2QyMZcH-4OmP-pAv65S8b_3qUSPnEsr2sCwn2-h-u8wLy0KDC6O34nnUsAktpa_JnDw0mS8Wpz-LGcU7E3ahZWO_bxNZ8sE50seVf_1qyujEAvbc5y72ndPhVL_hutb0T8mmwCEbcwQ-4aIggUuqcGnlJ49EPe0aCJ4mQjir31lXF62Ggxlk6bTQF1-WJPblzz62yZ5ToAlOaxflorf7e8sZqqkcRKIoRlDt45jM9tunM9mBNDXwzZTlzjSl08c3ZmfjU' },
  ];

  const isCategoryPage = !!categorySlug;

  return (
    <div className="space-y-12">
      {!isCategoryPage ? (
        <>
          <section className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl group">
            <div className="absolute inset-0">
              <img alt={featuredVideo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={featuredVideo.image} />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-16 max-w-2xl space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{featuredVideo.subtitle}</span>
                <span className="text-white/60 text-xs font-medium uppercase tracking-widest">{featuredVideo.duration} • {featuredVideo.level}</span>
              </div>
              <h2 className="text-5xl font-black text-white leading-tight">{featuredVideo.title}</h2>
              <p className="text-white/80 text-lg leading-relaxed">{featuredVideo.description}</p>
              <div className="flex items-center gap-4 pt-4">
                <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-lg">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Watch Now
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                  Add to Schedule
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary tracking-tight">Browse by Category</h3>
              <button className="text-tertiary-fixed text-on-tertiary-fixed-variant font-semibold text-sm hover:underline">Explore All</button>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <Link key={i} to={`/videos/${cat.name.toLowerCase()}`} className="bg-white p-6 rounded-2xl flex flex-col items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] transition-all cursor-pointer group">
                  <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                  </div>
                  <span className="font-bold text-sm text-primary uppercase tracking-tighter">{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary tracking-tight">New This Week</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-low"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                <button className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-low"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {newVideos.map((video, i) => (
                <div key={i} className="flex-none w-72 space-y-3 snap-start group cursor-pointer">
                  <div className="relative h-44 rounded-2xl overflow-hidden shadow-md">
                    <img alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={video.image} />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">{video.duration}</div>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center"><span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-base line-clamp-1">{video.title}</h4>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-tight">{video.coach} • {video.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 tracking-wide">
            <Link to="/videos" className="hover:text-primary transition-colors">Videos</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold capitalize">{categorySlug}</span>
          </nav>

          <div className="flex items-end gap-4 mb-8">
            <h1 className="text-4xl font-extrabold text-primary tracking-tight capitalize">{categorySlug}</h1>
            <span className="text-slate-400 font-medium mb-1.5 text-lg">{legVideos.length} videos</span>
          </div>

          <section className="relative h-64 rounded-3xl overflow-hidden mb-12 bg-surface-container-high/50 flex items-center justify-center text-center px-6">
            <div className="absolute inset-0 z-0 opacity-10">
              <img className="w-full h-full object-cover" alt="pattern" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0IFLop9_PaNa3CqUOP7jn1bpU1KAxrE7EaYRYxyeO9V5NQfYa8LyDowM5gtNCRxogzOeRKDsT6rzRbnG6PP1zWsFZIpGGyPE6YJ_rujsgtSwk3b2xk74eeaIeUgo0S4dee5RZE7zTXIy9fMg81qdOnfl1w1z9msrB5IuAl7lNJT1Q-kwtHp2HQzlw8if2aV7aSfkDa05-Co61NyAwATzsYPvT7jNcfJaWO-D4IYWRZUELbYAhD8LUgMEsdKewi9uLazecvnAkUP8" />
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2 capitalize">{categorySlug} Mastery</h2>
              <p className="text-on-surface-variant max-w-md mx-auto">Strengthen your {categorySlug} with trainer-curated exercises designed for maximum power and stability.</p>
            </div>
          </section>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              {filters.map((filter, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter 
                      ? 'bg-primary text-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]' 
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/10 cursor-pointer hover:bg-white transition-all">
                <span className="text-on-surface-variant font-medium">Sort:</span>
                <span className="text-primary font-bold">Most Popular</span>
                <span className="material-symbols-outlined text-primary text-lg">arrow_drop_down</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {legVideos.map((video, i) => (
              <div key={i} className="group bg-surface-container-lowest rounded-xl p-3 shadow-sm hover:shadow-lg transition-all border border-outline-variant/5">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={video.title} src={video.image} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </div>
                  {video.isNew && (
                    <div className="absolute top-3 left-3 bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">New</div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-md text-white px-2 py-1 rounded-md text-[10px] font-bold">{video.duration}</div>
                </div>
                <div className="px-1">
                  <h3 className="text-primary font-semibold leading-snug mb-3 line-clamp-2">{video.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-secondary-fixed/30 text-on-secondary-fixed-variant px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">{video.level}</span>
                    <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">{video.equipment}</span>
                  </div>
                  <Link to={`/videos/${categorySlug}/${i}`} className="text-tertiary-container font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                    Watch Now
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:bg-surface-container-low transition-all border border-outline-variant/20">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm">1</button>
            <button className="w-10 h-10 rounded-full bg-white text-slate-600 font-bold text-sm hover:bg-surface-container-low transition-all">2</button>
            <button className="w-10 h-10 rounded-full bg-white text-slate-600 font-bold text-sm hover:bg-surface-container-low transition-all">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:bg-surface-container-low transition-all border border-outline-variant/20">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
