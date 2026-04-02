import type { User, Admin, CheckInRecord, WeeklyProgress, WorkoutPlan, DietPlan, WorkoutVideo, TrainerRemark, Notification, MembershipPlanConfig, AdminStats } from '../types';

// Membership Plans
export const membershipPlans: MembershipPlanConfig[] = [
  {
    id: 'normal',
    name: 'Normal Membership',
    price: 1500,
    duration: 30,
    features: [
      'Gym access (all days)',
      'Basic equipment usage',
      'Attendance tracking',
      'Weekly progress submission',
      'Video library access',
      'In-app notifications',
    ],
  },
  {
    id: 'personal_training',
    name: 'Personal Training',
    price: 3500,
    duration: 30,
    features: [
      'Everything in Normal Plan',
      'Personal trainer assigned',
      'Custom workout plan',
      'Custom diet plan',
      'Trainer remarks & feedback',
      'Priority support',
    ],
    highlighted: true,
  },
];

// Admin
export const mockAdmin: Admin = {
  id: 'admin-1',
  name: 'Rajesh Kumar',
  email: 'admin@fitsyncp.in',
  gymName: 'FitZone Gym',
  gymLocation: 'Andheri West, Mumbai 400058',
  gymLat: 17.40543319658704,
  gymLng: 78.56992063050812,
  geofenceRadius: 100,
};

// Users
export const mockUsers: User[] = [
  {
    id: 'm1',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
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
  },
  {
    id: 'm2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    dob: '1998-03-22',
    gender: 'female',
    height: 162,
    weight: 58,
    fitnessGoal: 'weight_loss',
    gymName: 'FitZone Gym',
    gymLocation: 'Mumbai',
    healthConditions: 'Knee injury (recovered)',
    planType: 'personal_training',
    membershipStartDate: '2025-01-20',
    membershipEndDate: '2025-02-20',
    status: 'active',
    createdAt: '2025-01-20',
  },
  {
    id: 'm3',
    name: 'Vikram Patel',
    email: 'vikram@example.com',
    dob: '1992-11-08',
    gender: 'male',
    height: 180,
    weight: 85,
    fitnessGoal: 'general_fitness',
    gymName: 'FitZone Gym',
    gymLocation: 'Mumbai',
    healthConditions: '',
    planType: 'normal',
    membershipStartDate: '2025-02-01',
    membershipEndDate: '2025-03-03',
    status: 'active',
    createdAt: '2025-02-01',
  },
  {
    id: 'm4',
    name: 'Sneha Kulkarni',
    email: 'sneha@example.com',
    dob: '1996-07-30',
    gender: 'female',
    height: 165,
    weight: 63,
    fitnessGoal: 'weight_loss',
    gymName: 'FitZone Gym',
    gymLocation: 'Mumbai',
    healthConditions: '',
    planType: 'normal',
    membershipStartDate: '2025-01-10',
    membershipEndDate: '2025-02-10',
    status: 'expired',
    createdAt: '2025-01-10',
  },
  {
    id: 'm5',
    name: 'Rahul Desai',
    email: 'rahul@example.com',
    dob: '1990-01-14',
    gender: 'male',
    height: 178,
    weight: 78,
    fitnessGoal: 'muscle_gain',
    gymName: 'FitZone Gym',
    gymLocation: 'Mumbai',
    healthConditions: 'Lower back strain',
    planType: 'personal_training',
    membershipStartDate: '2025-02-05',
    membershipEndDate: '2025-03-07',
    status: 'active',
    createdAt: '2025-02-05',
  },
];

// Check-ins (today)
export const mockCheckIns: CheckInRecord[] = [
  { id: 'ci1', memberId: 'm1', memberName: 'Arjun Mehta', latitude: 19.1198, longitude: 72.8463, checkedInAt: '2025-02-10T06:30:00', date: '2025-02-10' },
  { id: 'ci2', memberId: 'm2', memberName: 'Priya Sharma', latitude: 19.1196, longitude: 72.8465, checkedInAt: '2025-02-10T07:15:00', date: '2025-02-10' },
  { id: 'ci3', memberId: 'm3', memberName: 'Vikram Patel', latitude: 19.1200, longitude: 72.8460, checkedInAt: '2025-02-10T08:00:00', date: '2025-02-10' },
  { id: 'ci4', memberId: 'm5', memberName: 'Rahul Desai', latitude: 19.1195, longitude: 72.8466, checkedInAt: '2025-02-10T09:30:00', date: '2025-02-10' },
];

// Weekly progress submissions
export const mockProgress: WeeklyProgress[] = [
  {
    id: 'p1', memberId: 'm1', memberName: 'Arjun Mehta', weekStartDate: '2025-02-03',
    weight: 71.5, chest: 40, waist: 32, hips: 36, arms: 14, thighs: 22,
    submittedAt: '2025-02-09T10:00:00', reviewed: true, trainerRemarks: 'Great progress! Keep increasing the weight on squats.',
    reviewedAt: '2025-02-09T18:00:00',
  },
  {
    id: 'p2', memberId: 'm2', memberName: 'Priya Sharma', weekStartDate: '2025-02-03',
    weight: 57.2, chest: 34, waist: 28, hips: 36, arms: 11, thighs: 20,
    submittedAt: '2025-02-09T11:30:00', reviewed: false,
  },
  {
    id: 'p3', memberId: 'm1', memberName: 'Arjun Mehta', weekStartDate: '2025-01-27',
    weight: 72.0, chest: 40, waist: 32.5, hips: 36, arms: 13.5, thighs: 22,
    submittedAt: '2025-02-02T09:00:00', reviewed: true, trainerRemarks: 'Good consistency. Focus on protein intake this week.',
    reviewedAt: '2025-02-02T16:00:00',
  },
  {
    id: 'p4', memberId: 'm5', memberName: 'Rahul Desai', weekStartDate: '2025-02-03',
    weight: 77.8, chest: 42, waist: 34, hips: 38, arms: 15, thighs: 24,
    submittedAt: '2025-02-09T14:00:00', reviewed: false,
  },
];

// Workout plan for PT member
export const mockWorkoutPlan: WorkoutPlan = {
  id: 'wp1',
  memberId: 'm1',
  assignedAt: '2025-01-15',
  updatedAt: '2025-02-05',
  days: [
    {
      dayOfWeek: 'monday',
      exercises: [
        { name: 'Barbell Bench Press', sets: 4, reps: 8, restSeconds: 90, notes: 'Warm up with 2 sets of 50%' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 10, restSeconds: 75, videoUrl: '#' },
        { name: 'Cable Flyes', sets: 3, reps: 12, restSeconds: 60 },
        { name: 'Tricep Pushdowns', sets: 3, reps: 12, restSeconds: 60 },
      ],
    },
    {
      dayOfWeek: 'tuesday',
      exercises: [
        { name: 'Barbell Back Squats', sets: 4, reps: 8, restSeconds: 120, notes: 'Go deep, controlled movement' },
        { name: 'Romanian Deadlifts', sets: 3, reps: 10, restSeconds: 90 },
        { name: 'Leg Press', sets: 3, reps: 12, restSeconds: 90 },
        { name: 'Calf Raises', sets: 4, reps: 15, restSeconds: 45 },
      ],
    },
    {
      dayOfWeek: 'wednesday',
      isRestDay: true,
      exercises: [],
    },
    {
      dayOfWeek: 'thursday',
      exercises: [
        { name: 'Pull-ups', sets: 4, reps: 8, restSeconds: 90 },
        { name: 'Barbell Rows', sets: 4, reps: 8, restSeconds: 90 },
        { name: 'Seated Cable Rows', sets: 3, reps: 10, restSeconds: 75 },
        { name: 'Face Pulls', sets: 3, reps: 15, restSeconds: 60 },
      ],
    },
    {
      dayOfWeek: 'friday',
      exercises: [
        { name: 'Overhead Press', sets: 4, reps: 8, restSeconds: 90 },
        { name: 'Lateral Raises', sets: 3, reps: 12, restSeconds: 60 },
        { name: 'Dumbbell Curls', sets: 3, reps: 10, restSeconds: 60 },
        { name: 'Hammer Curls', sets: 3, reps: 10, restSeconds: 60 },
      ],
    },
    {
      dayOfWeek: 'saturday',
      exercises: [
        { name: 'Plank Hold', sets: 3, reps: 1, restSeconds: 60, notes: 'Hold for 60 seconds each' },
        { name: 'Russian Twists', sets: 3, reps: 20, restSeconds: 45 },
        { name: 'Hanging Leg Raises', sets: 3, reps: 12, restSeconds: 60 },
        { name: 'Cardio - Treadmill', sets: 1, reps: 1, restSeconds: 0, notes: '20 minutes moderate pace' },
      ],
    },
    {
      dayOfWeek: 'sunday',
      isRestDay: true,
      exercises: [],
    },
  ],
};

// Diet plan for PT member
export const mockDietPlan: DietPlan = {
  id: 'dp1',
  memberId: 'm1',
  assignedAt: '2025-01-15',
  updatedAt: '2025-02-05',
  trainerNotes: 'Increase protein to 1.6g per kg body weight. Drink 3-4 litres of water daily.',
  meals: [
    {
      type: 'breakfast',
      name: 'High Protein Breakfast',
      items: [
        { name: 'Oatmeal', quantity: 60, unit: 'grams', calories: 230, protein: 8 },
        { name: 'Whole Eggs', quantity: 3, unit: 'pieces', calories: 210, protein: 18 },
        { name: 'Banana', quantity: 1, unit: 'pieces', calories: 105, protein: 1 },
        { name: 'Almonds', quantity: 15, unit: 'grams', calories: 87, protein: 3 },
      ],
    },
    {
      type: 'mid_morning',
      name: 'Mid-Morning Snack',
      items: [
        { name: 'Whey Protein Shake', quantity: 1, unit: 'slices', calories: 120, protein: 24 },
        { name: 'Apple', quantity: 1, unit: 'pieces', calories: 95, protein: 0 },
      ],
    },
    {
      type: 'lunch',
      name: 'Balanced Lunch',
      items: [
        { name: 'Brown Rice', quantity: 150, unit: 'grams', calories: 170, protein: 4 },
        { name: 'Chicken Breast (grilled)', quantity: 200, unit: 'grams', calories: 330, protein: 62 },
        { name: 'Mixed Salad', quantity: 150, unit: 'grams', calories: 25, protein: 2 },
        { name: 'Olive Oil Dressing', quantity: 1, unit: 'tbsp', calories: 120, protein: 0 },
      ],
    },
    {
      type: 'evening_snack',
      name: 'Pre-Workout Snack',
      items: [
        { name: 'Peanut Butter Sandwich', quantity: 2, unit: 'slices', calories: 200, protein: 8 },
        { name: 'Milk', quantity: 300, unit: 'ml', calories: 150, protein: 10 },
      ],
    },
    {
      type: 'dinner',
      name: 'Recovery Dinner',
      items: [
        { name: 'Whole Wheat Roti', quantity: 2, unit: 'pieces', calories: 240, protein: 8 },
        { name: 'Paneer Tikka', quantity: 150, unit: 'grams', calories: 260, protein: 15 },
        { name: 'Dal Tadka', quantity: 1, unit: 'cups', calories: 150, protein: 9 },
        { name: 'Cucumber Raita', quantity: 100, unit: 'grams', calories: 50, protein: 3 },
      ],
    },
  ],
};

// Video library
export const mockVideos: WorkoutVideo[] = [
  {
    id: 'v1', title: 'Bench Press Basics', description: 'Learn proper bench press form and technique.', thumbnailUrl: '', videoUrl: '', category: 'Chest', categorySlug: 'chest', duration: '8:30', difficulty: 'beginner', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v2', title: 'Incline Dumbbell Press', description: 'Target upper chest with incline presses.', thumbnailUrl: '', videoUrl: '', category: 'Chest', categorySlug: 'chest', duration: '6:45', difficulty: 'intermediate', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v3', title: 'Cable Crossovers', description: 'Isolate chest muscles with cable flyes.', thumbnailUrl: '', videoUrl: '', category: 'Chest', categorySlug: 'chest', duration: '5:20', difficulty: 'intermediate', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v4', title: 'Barbell Squats', description: 'Master the king of leg exercises.', thumbnailUrl: '', videoUrl: '', category: 'Legs', categorySlug: 'legs', duration: '10:15', difficulty: 'beginner', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v5', title: 'Romanian Deadlifts', description: 'Build hamstrings and glutes with RDLs.', thumbnailUrl: '', videoUrl: '', category: 'Legs', categorySlug: 'legs', duration: '7:00', difficulty: 'intermediate', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v6', title: 'Pull-Up Mastery', description: 'Progressions from zero to 15+ pull-ups.', thumbnailUrl: '', videoUrl: '', category: 'Back', categorySlug: 'back', duration: '12:00', difficulty: 'beginner', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v7', title: 'Barbell Rows', description: 'Build a thick back with barbell rows.', thumbnailUrl: '', videoUrl: '', category: 'Back', categorySlug: 'back', duration: '8:00', difficulty: 'intermediate', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v8', title: 'Overhead Press', description: 'Build strong shoulders with OHP.', thumbnailUrl: '', videoUrl: '', category: 'Shoulders', categorySlug: 'shoulders', duration: '7:30', difficulty: 'beginner', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v9', title: 'Core Circuit', description: '15-minute ab circuit for all levels.', thumbnailUrl: '', videoUrl: '', category: 'Core', categorySlug: 'core', duration: '15:00', difficulty: 'beginner', isActive: true,
    views: 0,
    createdAt: ''
  },
  {
    id: 'v10', title: 'HIIT Cardio Blast', description: 'High-intensity interval training for fat loss.', thumbnailUrl: '', videoUrl: '', category: 'Cardio', categorySlug: 'cardio', duration: '20:00', difficulty: 'advanced', isActive: true,
    views: 0,
    createdAt: ''
  },
];

// Trainer remarks
export const mockRemarks: TrainerRemark[] = [
  { id: 'r1', memberId: 'm1', memberName: 'Arjun Mehta', content: 'Great improvement on squats this week! Your form is much better. Let\'s add 5kg next session.', createdAt: '2025-02-09T18:00:00', isNew: true },
  { id: 'r2', memberId: 'm1', memberName: 'Arjun Mehta', content: 'Your diet compliance has been excellent. Keep it up and we\'ll see visible changes by month-end.', createdAt: '2025-02-07T12:00:00', isNew: false },
  { id: 'r3', memberId: 'm1', memberName: 'Arjun Mehta', content: 'Focus on increasing your protein intake. Target 130g per day. I\'ve updated your diet plan accordingly.', createdAt: '2025-02-04T16:30:00', isNew: false },
  { id: 'r4', memberId: 'm1', memberName: 'Arjun Mehta', content: 'Don\'t skip leg day! I noticed you missed Thursday\'s session. Let\'s make up for it tomorrow.', createdAt: '2025-02-01T10:00:00', isNew: false },
];

// Notifications
export const mockNotifications: Notification[] = [
  { id: 'n1', userId: 'm1', title: 'Membership Renewal', message: 'Your membership expires in 7 days. Renew now to avoid interruption.', type: 'payment', isRead: false, createdAt: '2025-02-08T09:00:00', actionUrl: '/dashboard/membership' },
  { id: 'n2', userId: 'm1', title: 'Progress Reminder', message: 'Don\'t forget to submit your weekly progress today (Sunday)!', type: 'progress', isRead: false, createdAt: '2025-02-09T08:00:00', actionUrl: '/progress/submit' },
  { id: 'n3', userId: 'm1', title: 'New Trainer Remark', message: 'Your trainer has reviewed your progress and left a remark.', type: 'info', isRead: true, createdAt: '2025-02-09T18:00:00', actionUrl: '/remarks' },
  { id: 'n4', userId: 'm1', title: 'Workout Plan Updated', message: 'Your workout plan has been updated for this week. Check it out!', type: 'success', isRead: true, createdAt: '2025-02-05T10:00:00', actionUrl: '/plan/workout' },
];

// Admin stats
export const mockAdminStats: AdminStats = {
  totalMembers: mockUsers.length,
  activeMembers: mockUsers.filter(u => u.status === 'active').length,
  todayCheckIns: mockCheckIns.length,
  pendingReviews: mockProgress.filter(p => !p.reviewed).length,
  normalPlanMembers: mockUsers.filter(u => u.planType === 'normal').length,
  ptPlanMembers: mockUsers.filter(u => u.planType === 'personal_training').length,
  expiringSoon: mockUsers.filter(u => {
    const exp = new Date(u.membershipEndDate);
    const now = new Date();
    const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7 && diff >= 0 && u.status === 'active';
  }).length,
};
