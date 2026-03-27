import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User, Admin } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      admin: null,
      role: null,

      login: (email: string, _password: string) => {
        // Mock login - will be replaced with API call
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'Arjun Mehta',
            email,
            dob: '1995-06-15',
            gender: 'male',
            height: 175,
            weight: 72,
            fitnessGoal: 'muscle_gain',
            gymName: 'FitZone Gym',
            gymLocation: 'Mumbai',
            healthConditions: '',
            planType: 'personal_training',
            membershipStartDate: '2025-01-15',
            membershipEndDate: '2025-02-15',
            status: 'active',
            createdAt: '2025-01-15',
          } as User,
          role: 'member',
        });
      },

      loginAsUser: (user: User) => {
        set({ isAuthenticated: true, user, role: 'member', admin: null });
      },

      loginAsAdmin: (admin: Admin) => {
        set({ isAuthenticated: true, admin, role: 'admin', user: null });
      },

      logout: () => {
        set({ isAuthenticated: false, user: null, admin: null, role: null });
      },
    }),
    {
      name: 'fitsync-pro-auth',
    }
  )
);
