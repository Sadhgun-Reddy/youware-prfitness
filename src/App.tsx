import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { mockUsers } from './data/mock';
import React from "react";

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import RegisterStep1 from './pages/auth/RegisterStep1';
import RegisterStep2 from './pages/auth/RegisterStep2';
import RegisterStep3 from './pages/auth/RegisterStep3';
import PlanSelection from './pages/auth/PlanSelection';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import CheckIn from './pages/user/CheckIn';
import Attendance from './pages/user/Attendance';
import Progress from './pages/user/Progress';
import ProgressSubmit from './pages/user/ProgressSubmit';
import Videos from './pages/user/Videos';
import WorkoutPlan from './pages/user/WorkoutPlan';
import DietPlan from './pages/user/DietPlan';
import Remarks from './pages/user/Remarks';
import Profile from './pages/user/Profile';
import EditProfile from './pages/user/EditProfile';
import MembershipPage from './pages/user/MembershipPage';
import Notifications from './pages/user/Notifications';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Members from './pages/admin/Members';
import AttendanceLog from './pages/admin/AttendanceLog';
import ProgressReviews from './pages/admin/ProgressReviews';
import WorkoutPlans from './pages/admin/WorkoutPlans';
import DietPlans from './pages/admin/DietPlans';
import VideoManagement from './pages/admin/VideoManagement';
import AdminSettings from './pages/admin/Settings';

// Initialize auth with mock data for demo
const { loginAsUser } = useAuthStore.getState();
loginAsUser(mockUsers[0]);

function AppRoutes() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={isAuthenticated && role === 'member' ? <Navigate to="/dashboard" /> : isAuthenticated && role === 'admin' ? <Navigate to="/admin" /> : <Login />} />
      <Route path="/register/step-1" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterStep1 />} />
      <Route path="/register/step-2" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterStep2 />} />
      <Route path="/register/step-3" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterStep3 />} />
      <Route path="/register/plan-select" element={<PlanSelection />} />
      <Route path="/register/payment" element={<PlanSelection />} />
      <Route path="/register/payment-success" element={<Navigate to="/dashboard" />} />
      <Route path="/register/payment-failure" element={<PlanSelection />} />
      <Route path="/forgot-password" element={<div className="min-h-screen flex items-center justify-center"><div className="card !p-8 text-center max-w-md"><h1 className="text-xl font-bold text-navy-600 mb-2">Forgot Password</h1><p className="text-sm text-navy-600/50 mb-4">Enter your email to receive a reset link.</p><input type="email" className="input-field mb-4" placeholder="you@example.com" /><button className="btn-primary w-full">Send Reset Link</button></div></div>} />

      {/* Member Routes */}
      <Route path="/dashboard" element={isAuthenticated && role === 'member' ? <UserLayout /> : <Navigate to="/login" />}>
        <Route index element={<UserDashboard />} />
        <Route path="membership" element={<MembershipPage />} />
      </Route>

      <Route element={isAuthenticated && role === 'member' ? <UserLayout /> : <Navigate to="/login" />}>
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/progress/submit" element={<ProgressSubmit />} />
        <Route path="/progress/history/:weekId" element={<Progress />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:categorySlug" element={<Videos />} />
        <Route path="/plan/workout" element={<WorkoutPlan />} />
        <Route path="/plan/workout/:day" element={<WorkoutPlan />} />
        <Route path="/plan/diet" element={<DietPlan />} />
        <Route path="/remarks" element={<Remarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={isAuthenticated && role === 'admin' ? <Navigate to="/admin" /> : <Login />} />
      <Route path="/admin" element={isAuthenticated && role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:memberId" element={<Members />} />
        <Route path="checkins" element={<AttendanceLog />} />
        <Route path="progress" element={<ProgressReviews />} />
        <Route path="progress/:submissionId" element={<ProgressReviews />} />
        <Route path="videos" element={<VideoManagement />} />
        <Route path="videos/new" element={<VideoManagement />} />
        <Route path="videos/:videoId/edit" element={<VideoManagement />} />
        <Route path="workout-plans" element={<WorkoutPlans />} />
        <Route path="diet-plans" element={<DietPlans />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
