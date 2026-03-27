// User types
export type MembershipPlan = 'normal' | 'personal_training';
export type Gender = 'male' | 'female' | 'other';
export type FitnessGoal = 'weight_loss' | 'muscle_gain' | 'general_fitness';
export type UserStatus = 'active' | 'pending_payment' | 'expired';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dob: string;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  fitnessGoal: FitnessGoal;
  gymName: string;
  gymLocation: string;
  healthConditions?: string;
  planType: MembershipPlan;
  membershipStartDate: string;
  membershipEndDate: string;
  status: UserStatus;
  avatarUrl?: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  gymName: string;
  gymLocation: string;
  gymLat: number;
  gymLng: number;
  geofenceRadius: number; // meters
  avatarUrl?: string;
}

// Attendance / Check-In
export interface CheckInRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar?: string;
  latitude: number;
  longitude: number;
  checkedInAt: string;
  date: string;
}

// Progress
export interface WeeklyProgress {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar?: string;
  weekStartDate: string;
  weight: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
  photoFront?: string;
  photoSide?: string;
  photoBack?: string;
  submittedAt: string;
  reviewed: boolean;
  trainerRemarks?: string;
  reviewedAt?: string;
}

// Workout Plan
export interface WorkoutPlan {
  id: string;
  memberId: string;
  days: WorkoutDay[];
  assignedAt: string;
  updatedAt: string;
}

export interface WorkoutDay {
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  exercises: Exercise[];
  isRestDay?: boolean;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restSeconds: number;
  notes?: string;
  videoUrl?: string;
}

// Diet Plan
export interface DietPlan {
  id: string;
  memberId: string;
  meals: DietMeal[];
  trainerNotes?: string;
  assignedAt: string;
  updatedAt: string;
}

export interface DietMeal {
  type: 'breakfast' | 'mid_morning' | 'lunch' | 'evening_snack' | 'dinner';
  name: string;
  items: FoodItem[];
  trainerNotes?: string;
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: 'grams' | 'cups' | 'pieces' | 'ml' | 'tbsp' | 'tsp' | 'slices';
  calories?: number;
  protein?: number;
}

// Video
export interface WorkoutVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  categorySlug: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isActive: boolean;
}

// Trainer Remark
export interface TrainerRemark {
  id: string;
  memberId: string;
  memberName: string;
  content: string;
  createdAt: string;
  isNew: boolean;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'payment' | 'progress';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Dashboard stats
export interface AdminStats {
  totalMembers: number;
  activeMembers: number;
  todayCheckIns: number;
  pendingReviews: number;
  normalPlanMembers: number;
  ptPlanMembers: number;
  expiringSoon: number;
}

// Membership plans config
export interface MembershipPlanConfig {
  id: MembershipPlan;
  name: string;
  price: number;
  duration: number; // days
  features: string[];
  highlighted?: boolean;
}

// Auth state
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  admin: Admin | null;
  role: 'member' | 'admin' | null;
  login: (email: string, password: string) => void;
  loginAsUser: (user: User) => void;
  loginAsAdmin: (admin: Admin) => void;
  logout: () => void;
}
