import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../../data/mock';

export default function MemberProfile() {
  const { memberId } = useParams<{ memberId: string }>();
  const member = mockUsers.find(u => u.id === (memberId || 'm1')) || mockUsers[0];

  return (
    <div className="p-6 space-y-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[#1A3C5E]">Member profile</h2>
        <p className="text-xs text-slate-500">ID: {member.id.toUpperCase()}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{member.name.charAt(0)}</div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#1A3C5E]">{member.name}</h2>
          <p className="text-sm text-slate-500">ID: {member.id.toUpperCase()}</p>
        </div>
        <div className="ml-auto space-x-3">
          <button className="px-4 py-2 rounded-lg border border-slate-300">Edit Membership</button>
          <button className="px-4 py-2 rounded-lg bg-primary text-white">Send Notification</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="text-xl font-semibold text-[#1A3C5E] mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-6 text-sm text-slate-700">
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Full Name</div>
                <div className="font-semibold text-base">{member.name}</div>
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Date of Birth</div>
                <div className="font-semibold">14 Jan 1992</div>
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Email Address</div>
                <div className="font-semibold">{member.email}</div>
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Height & Weight</div>
                <div className="font-semibold">{member.height} cm | {member.weight} kg</div>
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Fitness Goal</div>
                <div className="font-semibold">Hypertrophy</div>
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Health Conditions</div>
                <div className="font-semibold">{member.healthConditions || 'None'}</div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="text-xl font-semibold text-[#1A3C5E] mb-4">Recent Remarks</h3>
            <div className="bg-surface-container rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-700 italic">"Great improvement this week. Keep up the consistency."</p>
            </div>
            <textarea className="w-full bg-white border rounded-lg p-3 text-sm" placeholder="Add a new remark..." rows={3}></textarea>
            <div className="flex justify-end mt-3">
              <button className="px-5 py-2 rounded-lg bg-primary text-white font-semibold">Save Remark</button>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg">
            <h4 className="text-lg font-bold mb-2">Membership Plan</h4>
            <div className="text-sm">Current plan: Elite Performance Plus</div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs font-bold uppercase tracking-wider">
              <div>Start</div><div>Jan 01, 2023</div>
              <div>Expiry</div><div>Dec 31, 2023</div>
            </div>
            <button className="w-full bg-white text-primary mt-4 py-2 rounded-lg">Process Payment</button>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button className="w-full py-2 rounded-lg bg-white">Pause</button>
              <button className="w-full py-2 rounded-lg bg-white">Upgrade</button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-sm">
            <div className="font-semibold mb-1">Activity Glance</div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2 rounded-lg bg-surface-container-lowest">156<br/><span className="text-xs">Total Checks</span></div>
              <div className="p-2 rounded-lg bg-surface-container-lowest">4.2<br/><span className="text-xs">Avg / Week</span></div>
              <div className="p-2 rounded-lg bg-surface-container-lowest">22d<br/><span className="text-xs">Best Streak</span></div>
              <div className="p-2 rounded-lg bg-surface-container-lowest">Low<br/><span className="text-xs">At-Risk Score</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
