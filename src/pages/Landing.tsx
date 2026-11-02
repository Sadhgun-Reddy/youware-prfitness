import { Link } from 'react-router-dom';
import React from "react";

export default function Landing() {
  return (
    <div className="min-w-[1280px] bg-surface font-body text-on-surface antialiased">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgb(26,60,94,0.12)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
          <div className="text-2xl font-black tracking-tighter text-[#1A3C5E]">FitSync Pro</div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a className="text-[#E87722] font-bold border-b-2 border-[#E87722] pb-1" href="#">Features</a>
            <a className="text-[#1A3C5E]/70 hover:text-[#1A3C5E] transition-colors" href="#">Plans</a>
            <a className="text-[#1A3C5E]/70 hover:text-[#1A3C5E] transition-colors" href="#">Coaching</a>
            <a className="text-[#1A3C5E]/70 hover:text-[#1A3C5E] transition-colors" href="#">Success Stories</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block text-[#1A3C5E]/70 font-medium px-4 py-2 hover:bg-slate-50 transition-all">
              Login
            </Link>
            <Link to="/register/step-1" className="bg-gradient-to-br from-[#002645] to-[#1A3C5E] text-white px-6 py-3 rounded-xl font-bold active:scale-95 transition-all shadow-lg">
              Join Now
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[870px] flex items-center bg-gradient-to-br from-[#002645] via-[#1A3C5E] to-[#002645] text-white overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E87722] rounded-full blur-[120px] -mr-96 -mt-96"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#416084] rounded-full blur-[100px] -ml-48 -mb-48"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold tracking-widest uppercase border border-white/20">
                The Kinetic Sanctuary
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                Your Gym, <br />
                <span className="text-[#E87722]">Fully Connected.</span>
              </h1>
              <p className="text-xl text-white/80 max-w-lg font-light leading-relaxed">
                Experience the evolution of fitness management. A seamless blend of professional discipline and luxury boutique aesthetics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register/step-1" className="bg-[#E87722] text-white px-8 py-4 rounded-xl font-extrabold text-lg shadow-[0_10px_20px_rgba(232,119,34,0.3)] hover:translate-y-[-2px] transition-all text-center">
                  Start Your Journey
                </Link>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                  <span className="material-symbols-outlined">play_circle</span> Watch Film
                </button>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-72 md:w-80 aspect-[9/19] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  alt="fitness dashboard interface on a mobile smartphone showing workout progress charts and active calorie metrics" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMYUmztUrPvhPS8WMCT8b3fXScCiDE_8LT7EpoLQ5VtWiwtgJ8t1zv0NsJ78mb53FBEPWL37XyWe5hOnib5M91yIWRPmEkQIxufb5HEsOvJORXLqwFcJoDMoMhxDpOBGBMq9Qz3Jrb7c_0ysO3NbSgesh_jKxbaY8Z91FnI49S2RBhDF5VP2IYlqwwr_ZZunJccU4F42kIoQuWg9USl17fAgeUI19Z0dLJHubDR7_gGnkPZYibQZ_kZwZwv8Wy1RCzFr_2th4aioY" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full border border-white/10 blur-sm"></div>
            </div>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#E87722] mb-4">Precision Elements</h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#1A3C5E]">Engineered for Excellence</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#ffffff] p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(26,60,94,0.05)] border border-[#c3c6cf]/10 group hover:shadow-[0_20px_40px_rgb(26,60,94,0.08)] transition-all duration-500">
                <div className="w-16 h-16 bg-[#F2F4F6] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#E87722]/10 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-[#1A3C5E] group-hover:text-[#E87722] transition-colors">monitoring</span>
                </div>
                <h4 className="text-2xl font-bold text-[#1A3C5E] mb-4">Biometric Tracking</h4>
                <p className="text-[#43474e] leading-relaxed">Deep integration with wearables to monitor heart rate variability, sleep quality, and performance peaks.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-[#ffffff] p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(26,60,94,0.05)] border border-[#c3c6cf]/10 group hover:shadow-[0_20px_40px_rgb(26,60,94,0.08)] transition-all duration-500">
                <div className="w-16 h-16 bg-[#F2F4F6] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#E87722]/10 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-[#1A3C5E] group-hover:text-[#E87722] transition-colors">calendar_today</span>
                </div>
                <h4 className="text-2xl font-bold text-[#1A3C5E] mb-4">Smart Scheduling</h4>
                <p className="text-[#43474e] leading-relaxed">AI-driven booking system that optimizes trainer availability and class density for a private experience.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-[#ffffff] p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(26,60,94,0.05)] border border-[#c3c6cf]/10 group hover:shadow-[0_20px_40px_rgb(26,60,94,0.08)] transition-all duration-500">
                <div className="w-16 h-16 bg-[#F2F4F6] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#E87722]/10 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-[#1A3C5E] group-hover:text-[#E87722] transition-colors">verified_user</span>
                </div>
                <h4 className="text-2xl font-bold text-[#1A3C5E] mb-4">Exclusive Sanctuary</h4>
                <p className="text-[#43474e] leading-relaxed">Access to premium recovery lounges and curated wellness programs designed for the elite athlete.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Plans Comparison */}
        <section className="py-24 bg-[#f2f4f6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black text-[#1A3C5E]">Select Your Tier</h3>
              <p className="text-[#43474e] mt-4 max-w-xl mx-auto">Choose the level of support that matches your ambition. No hidden fees, only pure performance.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-end">
              {/* Essential */}
              <div className="bg-[#ffffff] p-8 rounded-3xl shadow-sm border border-[#c3c6cf]/20 flex flex-col">
                <div className="mb-8">
                  <h5 className="text-lg font-bold text-[#1A3C5E]">Essential</h5>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-black text-[#1A3C5E]">$79</span>
                    <span className="text-[#43474e]">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75">check_circle</span> Unlimited Gym Access
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75">check_circle</span> Basic Metric Tracking
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75">check_circle</span> Locker Room Access
                  </li>
                </ul>
                <button className="w-full py-3 rounded-xl border-2 border-[#1A3C5E] text-[#1A3C5E] font-bold hover:bg-[#1A3C5E] hover:text-white transition-all">Get Started</button>
              </div>
              
              {/* PT Plan (Most Popular) */}
              <div className="bg-[#1A3C5E] p-8 rounded-[2.5rem] shadow-2xl relative transform md:scale-105 z-10 flex flex-col">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E87722] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
                <div className="mb-8 text-white">
                  <h5 className="text-lg font-bold">Elite Performance</h5>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-5xl font-black">$199</span>
                    <span className="text-white/60">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow text-white/90">
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> 4 Personal Training Sessions
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Custom Nutrition Roadmap
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Recovery Zone Access
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Advanced Analytics Hub
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl bg-[#E87722] text-white font-black text-lg shadow-lg hover:brightness-110 transition-all">Join Elite Now</button>
              </div>
              
              {/* Sanctuary */}
              <div className="bg-[#ffffff] p-8 rounded-3xl shadow-sm border border-[#c3c6cf]/20 flex flex-col">
                <div className="mb-8">
                  <h5 className="text-lg font-bold text-[#1A3C5E]">The Sanctuary</h5>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl font-black text-[#1A3C5E]">$499</span>
                    <span className="text-[#43474e]">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75">check_circle</span> Private Suite Access
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75">check_circle</span> Daily PT & Recovery
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#E87722] scale-75">check_circle</span> Concierge Service
                  </li>
                </ul>
                <button className="w-full py-3 rounded-xl border-2 border-[#1A3C5E] text-[#1A3C5E] font-bold hover:bg-[#1A3C5E] hover:text-white transition-all">Apply Now</button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-r from-[#1A3C5E] to-[#002645] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#E87722,transparent)]"></div>
              </div>
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                  Ready to synchronize <br />
                  your potential?
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                  Join the ranks of those who refuse to settle for average. Your sanctuary awaits.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Link to="/register/step-1" className="bg-[#E87722] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-all text-center">
                    Create Your Account
                  </Link>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all">
                    Tour The Sanctuary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-12 border-t border-[#C3C6CF]/20 bg-[#F8F9FB]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          <div className="space-y-6">
            <div className="text-lg font-bold text-[#1A3C5E]">FitSync Pro</div>
            <p className="text-slate-500 normal-case tracking-normal">
              Elevating the discipline of fitness through luxury design and biometric precision.
            </p>
          </div>
          
          <div>
            <h6 className="text-sm font-medium tracking-wide uppercase font-inter mb-6 text-[#1A3C5E]">Company</h6>
            <ul className="space-y-4">
              <li><a className="text-slate-500 hover:text-[#1A3C5E] hover:underline decoration-[#E87722] decoration-2 underline-offset-4 transition-all duration-200" href="#">About Us</a></li>
              <li><a className="text-slate-500 hover:text-[#1A3C5E] hover:underline decoration-[#E87722] decoration-2 underline-offset-4 transition-all duration-200" href="#">Press Kit</a></li>
              <li><a className="text-slate-500 hover:text-[#1A3C5E] hover:underline decoration-[#E87722] decoration-2 underline-offset-4 transition-all duration-200" href="#">Support Center</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-sm font-medium tracking-wide uppercase font-inter mb-6 text-[#1A3C5E]">Legal</h6>
            <ul className="space-y-4">
              <li><a className="text-slate-500 hover:text-[#1A3C5E] hover:underline decoration-[#E87722] decoration-2 underline-offset-4 transition-all duration-200" href="#">Privacy Policy</a></li>
              <li><a className="text-slate-500 hover:text-[#1A3C5E] hover:underline decoration-[#E87722] decoration-2 underline-offset-4 transition-all duration-200" href="#">Terms of Service</a></li>
              <li><a className="text-slate-500 hover:text-[#1A3C5E] hover:underline decoration-[#E87722] decoration-2 underline-offset-4 transition-all duration-200" href="#">Cookie Settings</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-sm font-medium tracking-wide uppercase font-inter mb-6 text-[#1A3C5E]">Newsletter</h6>
            <div className="relative">
              <input className="w-full bg-[#F2F4F6] border-none rounded-sm px-4 py-3 focus:ring-1 focus:ring-[#1A3C5E]/40" placeholder="Email Address" type="email" />
              <button className="absolute right-2 top-1.5 p-1.5 text-[#1A3C5E]">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#C3C6CF]/10">
          <p className="text-slate-500 text-xs font-medium tracking-wide uppercase font-inter">© 2024 FitSync Pro. The Kinetic Sanctuary.</p>
        </div>
      </footer>
    </div>
  );
}