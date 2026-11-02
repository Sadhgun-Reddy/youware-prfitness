import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function Profile() {
  const { user } = useAuthStore();

  const profile = {
    name: 'Alex Sterling',
    email: 'a.sterling@fitsyncpro.com',
    phone: '+1 (555) 234-8901',
    homeStudio: 'Kinetic Sanctuary - Downtown',
    address: '782 Sapphire Heights, Apt 4C, San Francisco, CA',
    memberSince: 'Jan 2023',
    streak: '14 Day Streak',
    level: 'Pro Level',
    height: 184,
    weight: 82.5,
    restingHR: 54,
    bodyFat: 11.4,
    membership: 'ULTIMATE ELITE',
    billingCycle: 'Annual (Renews Oct 2024)',
    memberId: '#FSP-8829-X',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDALsMXT4pXj6wHOgLNRsoG5Zrz1saLCRZIOr3s24sNwmxPvjMD1G25eZrW5TlxqdvZUA_xUEbnB4Ja3Kk-zzTAxOuZFpz-w1Wy5DPKJgt4fC1fa2xwgZFk7r3qhrXq6eXO77kSqG_pJ3Vx3ul1gy_YDYjTuKWnlLsQ2k5EYrELFZVv0Cm05wjCBHCi0mKhl_tafMuhEKAyYpbRTTz1EaxsaKm54GiN-Wc7u3k5c4jgcFdaY6vstlC36Ex1ME9RPunDVfp8IwUx9Ig',
  };

  return (
    <div>
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#1A3C5E]">My Profile</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-[#E87722] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-[0_4px_12px_rgba(232,119,34,0.3)] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Profile
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <section className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(26,60,94,0.05)] border border-white/40">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FFDBC8] p-1">
                  <img alt="User Avatar" className="w-full h-full object-cover rounded-full" src={profile.avatar} />
                </div>
                <div className="absolute bottom-1 right-1 bg-[#E87722] text-white p-1.5 rounded-full shadow-lg">
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-black text-[#1A3C5E] mb-1">{profile.name}</h3>
                <p className="text-on-surface-variant font-medium mb-4 uppercase tracking-widest text-xs">Elite Member since {profile.memberSince}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#E87722]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    <span className="font-bold text-[#1A3C5E]">{profile.streak}</span>
                  </div>
                  <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">military_tech</span>
                    <span className="font-bold text-[#1A3C5E]">{profile.level}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(26,60,94,0.05)]">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-lg font-bold text-[#1A3C5E] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E87722]">person_outline</span>
                Personal Information
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Full Name</p>
                <p className="text-primary font-semibold">{profile.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Email Address</p>
                <p className="text-primary font-semibold">{profile.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Phone Number</p>
                <p className="text-primary font-semibold">{profile.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Home Studio</p>
                <p className="text-primary font-semibold">{profile.homeStudio}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Residential Address</p>
                <p className="text-primary font-semibold">{profile.address}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <section className="bg-primary-container text-white rounded-[2rem] p-8 relative overflow-hidden shadow-xl">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#E87722] opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-[#87A7CE] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Current Membership</p>
                  <h4 className="text-2xl font-black">{profile.membership}</h4>
                </div>
                <span className="material-symbols-outlined text-4xl text-[#E87722]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                  <span className="text-[#87A7CE]">Billing Cycle</span>
                  <span className="font-bold">{profile.billingCycle}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#87A7CE]">Member ID</span>
                  <span className="font-mono tracking-wider">{profile.memberId}</span>
                </div>
              </div>
              <button className="mt-8 w-full py-3 bg-white text-primary font-bold rounded-xl text-sm hover:bg-slate-100 transition-colors">
                Manage Subscription
              </button>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(26,60,94,0.05)]">
            <h4 className="text-lg font-bold text-[#1A3C5E] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E87722]">monitor_heart</span>
              Health Overview
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-1">Height</p>
                <p className="text-xl font-black text-primary">{profile.height}<span className="text-xs font-normal ml-1">cm</span></p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-1">Weight</p>
                <p className="text-xl font-black text-primary">{profile.weight}<span className="text-xs font-normal ml-1">kg</span></p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-1">Resting HR</p>
                <p className="text-xl font-black text-primary">{profile.restingHR}<span className="text-xs font-normal ml-1">bpm</span></p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-1">Body Fat</p>
                <p className="text-xl font-black text-[#E87722]">{profile.bodyFat}<span className="text-xs font-normal ml-1">%</span></p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-surface-container flex items-center justify-between">
              <p className="text-xs text-on-surface-variant italic">Last updated: Today, 08:30 AM</p>
              <button className="text-primary text-xs font-bold hover:underline">Full Analytics</button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-12 mt-4">
          <section className="bg-surface-container-low/50 rounded-[2rem] p-8 border border-white">
            <h4 className="text-lg font-bold text-[#1A3C5E] mb-6">Account Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-[#1A3C5E]">Privacy & Security</p>
                  <p className="text-[10px] text-slate-500">MFA, Password & Data</p>
                </div>
              </button>
              <button className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-[#E87722] group-hover:bg-[#E87722] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-[#1A3C5E]">Notifications</p>
                  <p className="text-[10px] text-slate-500">Alerts & Reminders</p>
                </div>
              </button>
              <button className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">sync</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-[#1A3C5E]">App Integrations</p>
                  <p className="text-[10px] text-slate-500">Apple Health, Strava</p>
                </div>
              </button>
            </div>
          </section>

          <div className="mt-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <a className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
              <a className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors" href="#">Cookie Policy</a>
            </div>
            <p className="text-[10px] text-slate-400">© 2024 FitSync Pro. All Rights Reserved. Member Version 4.2.1-Gold</p>
          </div>
        </div>
      </div>
    </div>
  );
}
