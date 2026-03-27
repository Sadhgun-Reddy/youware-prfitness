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
import PaymentSuccess from './pages/auth/PaymentSuccess';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Utility Pages
import NotFound from './pages/utility/NotFound';
import ServerError from './pages/utility/ServerError';
import Unauthorised from './pages/utility/Unauthorised';
import SessionExpired from './pages/utility/SessionExpired';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import CheckIn from './pages/user/CheckIn';
import Attendance from './pages/user/Attendance';
import Progress from './pages/user/Progress';
import ProgressHistory from './pages/user/ProgressHistory';
import ProgressSubmit from './pages/user/ProgressSubmit';
import Videos from './pages/user/Videos';
import VideoPlayer from './pages/user/VideoPlayer';
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
      <Route path="/register/payment-success" element={<PaymentSuccess />} />
      <Route path="/register/payment-failure" element={<PlanSelection />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Member Routes */}
      <Route path="/dashboard" element={isAuthenticated && role === 'member' ? <UserLayout /> : <Navigate to="/login" />}>
        <Route index element={<UserDashboard />} />
        <Route path="membership" element={<MembershipPage />} />
      </Route>

      <Route element={isAuthenticated && role === 'member' ? <UserLayout /> : <Navigate to="/login" />}>
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/progress/history" element={<ProgressHistory />} />
        <Route path="/progress/submit" element={<ProgressSubmit />} />
        <Route path="/progress/history/:weekId" element={<Progress />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:categorySlug" element={<Videos />} />
        <Route path="/videos/:categorySlug/:videoId" element={<VideoPlayer />} />
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

      {/* Utility Pages */}
      <Route path="/404" element={<NotFound />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="/unauthorised" element={<Unauthorised />} />
      <Route path="/session-expired" element={<SessionExpired />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/404" />} />
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
