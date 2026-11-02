import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Admin,
  CheckInRecord, 
  WeeklyProgress, 
  WorkoutPlan, 
  DietPlan, 
  WorkoutVideo, 
  TrainerRemark, 
  Notification,
  AdminStats
} from '../types';
import { 
  mockAdmin,
  mockUsers, 
  mockCheckIns, 
  mockProgress, 
  mockWorkoutPlan, 
  mockDietPlan, 
  mockVideos, 
  mockRemarks, 
  mockNotifications 
} from '../data/mock';

interface DataState {
  adminSettings: Admin;
  members: User[];
  checkIns: CheckInRecord[];
  progressSubmissions: WeeklyProgress[];
  workoutPlans: WorkoutPlan[];
  dietPlans: DietPlan[];
  videos: WorkoutVideo[];
  remarks: TrainerRemark[];
  notifications: Notification[];

  // Actions
  updateAdminSettings: (updates: Partial<Admin>) => void;
  addMember: (member: User) => void;
  updateMember: (id: string, updates: Partial<User>) => void;
  deleteMember: (id: string) => void;
  addCheckIn: (checkIn: CheckInRecord) => void;
  addProgressSubmission: (submission: WeeklyProgress) => void;
  updateProgressSubmission: (id: string, updates: Partial<WeeklyProgress>) => void;
  addVideo: (video: WorkoutVideo) => void;
  updateVideo: (id: string, updates: Partial<WorkoutVideo>) => void;
  deleteVideo: (id: string) => void;
  updateWorkoutPlan: (memberId: string, plan: WorkoutPlan) => void;
  updateDietPlan: (memberId: string, plan: DietPlan) => void;
  addRemark: (remark: TrainerRemark) => void;
  deleteRemark: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  
  // Computed (helper for stats)
  getAdminStats: () => AdminStats;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      adminSettings: mockAdmin,
      members: mockUsers,
      checkIns: mockCheckIns,
      progressSubmissions: mockProgress,
      workoutPlans: [mockWorkoutPlan],
      dietPlans: [mockDietPlan],
      videos: mockVideos,
      remarks: mockRemarks,
      notifications: mockNotifications,

      updateAdminSettings: (updates) => set((state) => ({
        adminSettings: { ...state.adminSettings, ...updates }
      })),

      addMember: (member) => set((state) => ({
        members: [member, ...state.members.filter(m => m.id !== member.id)]
      })),

      updateMember: (id, updates) => set((state) => ({
        members: state.members.map(m => m.id === id ? { ...m, ...updates } : m)
      })),

      deleteMember: (id) => set((state) => ({
        members: state.members.filter(m => m.id !== id)
      })),

      addCheckIn: (checkIn) => set((state) => ({
        checkIns: [checkIn, ...state.checkIns]
      })),

      addProgressSubmission: (submission) => set((state) => ({
        progressSubmissions: [submission, ...state.progressSubmissions.filter(p => p.id !== submission.id)]
      })),

      updateProgressSubmission: (id, updates) => set((state) => ({
        progressSubmissions: state.progressSubmissions.map(p => p.id === id ? { ...p, ...updates } : p)
      })),

      addVideo: (video) => set((state) => ({
        videos: [video, ...state.videos]
      })),

      updateVideo: (id, updates) => set((state) => ({
        videos: state.videos.map(v => v.id === id ? { ...v, ...updates } : v)
      })),

      deleteVideo: (id) => set((state) => ({
        videos: state.videos.filter(v => v.id !== id)
      })),

      updateWorkoutPlan: (memberId, plan) => set((state) => {
        const index = state.workoutPlans.findIndex(p => p.memberId === memberId);
        if (index > -1) {
          const newPlans = [...state.workoutPlans];
          newPlans[index] = plan;
          return { workoutPlans: newPlans };
        }
        return { workoutPlans: [...state.workoutPlans, plan] };
      }),

      updateDietPlan: (memberId, plan) => set((state) => {
        const index = state.dietPlans.findIndex(p => p.memberId === memberId);
        if (index > -1) {
          const newPlans = [...state.dietPlans];
          newPlans[index] = plan;
          return { dietPlans: newPlans };
        }
        return { dietPlans: [...state.dietPlans, plan] };
      }),

      addRemark: (remark) => set((state) => ({
        remarks: [remark, ...state.remarks]
      })),

      deleteRemark: (id) => set((state) => ({
        remarks: state.remarks.filter(r => r.id !== id)
      })),

      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications]
      })),

      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
      })),

      getAdminStats: () => {
        const state = get();
        const todayStr = new Date().toDateString();
        const now = new Date();
        return {
          totalMembers: state.members.length,
          activeMembers: state.members.filter(m => m.status === 'active').length,
          todayCheckIns: state.checkIns.filter(c => {
            const d = new Date(c.checkedInAt);
            return !isNaN(d.getTime()) && d.toDateString() === todayStr;
          }).length,
          pendingReviews: state.progressSubmissions.filter(p => !p.reviewed).length,
          normalPlanMembers: state.members.filter(m => m.planType === 'normal').length,
          ptPlanMembers: state.members.filter(m => m.planType === 'personal_training').length,
          expiringSoon: state.members.filter(m => {
            const exp = new Date(m.membershipEndDate);
            const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
            return diff <= 7 && diff >= 0 && m.status === 'active';
          }).length,
        };
      }
    }),
    {
      name: 'fitsync-pro-data',
    }
  )
);
