import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Gender, FitnessGoal } from '../../types';

export default function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '' as Gender | '',
    height: '',
    weight: '',
    fitnessGoal: '' as FitnessGoal | '',
    healthConditions: '',
    gymName: 'FitZone Gym',
    gymLocation: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Please enter a valid email address';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!form.gender) newErrors.gender = 'Please select a gender';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.height) newErrors.height = 'Height is required';
    if (!form.weight) newErrors.weight = 'Weight is required';
    if (!form.fitnessGoal) newErrors.fitnessGoal = 'Please select a fitness goal';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.gymLocation.trim()) newErrors.gymLocation = 'Gym location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      // Handle registration - for now just log
      console.log('Registration submitted:', form);
    }
  };

  const getPasswordStrength = () => {
    const password = form.password;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const fitnessGoals = [
    { value: 'weight_loss', label: 'Weight Loss', icon: 'local_fire_department' },
    { value: 'muscle_gain', label: 'Muscle Gain', icon: 'fitness_center' },
    { value: 'general_fitness', label: 'General Fit', icon: 'grade' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8]">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md shadow-[0_4px_20px_rgba(26,60,94,0.08)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-[#1A3C5E]">FitSync Pro</div>
          <nav className="hidden md:flex space-x-8 items-center">
            <a className="font-medium text-sm tracking-wide text-[#43474E] hover:text-[#E87722] transition-colors duration-300" href="#">Help</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-[480px] bg-white rounded-xl shadow-[0_10px_40px_rgba(26,60,94,0.05)] p-10">
          {/* Step Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between relative mb-4">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#e6e8ea] -translate-y-1/2 z-0"></div>
              {[1, 2, 3].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white ${
                    s < step ? 'bg-[#1A3C5E] text-white' : s === step ? 'bg-[#1A3C5E] text-white' : 'bg-[#e0e3e5] text-[#43474E]'
                  }`}>
                    {s < step ? '✓' : s}
                  </div>
                  <span className={`absolute top-10 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider ${
                    s <= step ? 'text-[#1A3C5E]' : 'text-[#43474E]'
                  }`}>
                    {s === 1 ? 'Personal Info' : s === 2 ? 'Health Details' : 'Gym Selection'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-14 text-center">
              <span className="text-xs font-bold tracking-[0.05em] text-[#43474E] uppercase">Step {step} of 3</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A3C5E] tracking-tight">
              {step === 1 ? 'Create Your Account' : step === 2 ? 'Your Health Details' : 'Your Gym'}
            </h2>
            <p className="text-sm text-[#43474E] mt-1">
              {step === 1 ? 'Join the elite sanctuary of fitness performance.' : 
               step === 2 ? 'This helps your trainer personalise your experience.' : 
               'Tell us about your gym so we can link your account.'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
            {step === 1 && (
              <>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#73777f] text-[20px]">person</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      className={`w-full bg-[#F2F4F6] border-none rounded-sm pl-10 pr-4 py-3 text-sm font-medium text-[#191C1E] focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all ${errors.name ? 'border border-[#ba1a1a]' : ''}`}
                      placeholder="Alex Sterling"
                    />
                  </div>
                  {errors.name && <span className="text-[11px] font-medium text-[#ba1a1a]">{errors.name}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#73777f] text-[20px]">mail</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      className={`w-full bg-[#F2F4F6] border-none rounded-sm pl-10 pr-4 py-3 text-sm font-medium text-[#191C1E] focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all ${errors.email ? 'border border-[#ba1a1a]' : ''}`}
                      placeholder="alex.sterling@example.com"
                    />
                  </div>
                  {errors.email && <span className="text-[11px] font-medium text-[#ba1a1a]">{errors.email}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#73777f] text-[20px]">lock</span>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => updateForm('password', e.target.value)}
                      className="w-full bg-[#F2F4F6] border-none rounded-sm pl-10 pr-10 py-3 text-sm font-medium text-[#191C1E] focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all"
                      placeholder="Enter password"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#73777f] text-[20px] cursor-pointer">visibility</span>
                  </div>
                  {form.password && (
                    <div className="pt-1 flex items-center justify-between">
                      <div className="flex gap-1 flex-grow">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className={`h-1 flex-grow rounded-full ${i <= getPasswordStrength() ? 'bg-[#E87722]' : 'bg-[#e6e8ea]'}`}></div>
                        ))}
                      </div>
                      <span className="ml-3 text-[10px] font-bold text-[#E87722] uppercase tracking-tighter">
                        {getPasswordStrength() <= 1 ? 'Weak' : getPasswordStrength() === 2 ? 'Fair' : getPasswordStrength() === 3 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Confirm Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#73777f] text-[20px]">lock</span>
                    <input
                      type="password"
                      value={form.confirmPassword}
                      onChange={(e) => updateForm('confirmPassword', e.target.value)}
                      className={`w-full bg-[#F2F4F6] border-none rounded-sm pl-10 pr-4 py-3 text-sm font-medium text-[#191C1E] focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all ${errors.confirmPassword ? 'border border-[#ba1a1a]' : ''}`}
                      placeholder="Confirm password"
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-[11px] font-medium text-[#ba1a1a]">{errors.confirmPassword}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Date of Birth</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#73777f] text-[20px]">calendar_today</span>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => updateForm('dob', e.target.value)}
                      className={`w-full bg-[#F2F4F6] border-none rounded-sm pl-10 pr-4 py-3 text-sm font-medium text-[#191C1E] focus:ring-1 focus:ring-[#1A3C5E]/40 focus:bg-white transition-all ${errors.dob ? 'border border-[#ba1a1a]' : ''}`}
                    />
                  </div>
                  {errors.dob && <span className="text-[11px] font-medium text-[#ba1a1a]">{errors.dob}</span>}
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#43474E]">Gender Identification</label>
                  <div className="flex gap-4">
                    {['male', 'female', 'other'].map((g) => (
                      <label key={g} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={form.gender === g}
                          onChange={(e) => updateForm('gender', e.target.value)}
                          className="hidden peer"
                        />
                        <div className="w-5 h-5 rounded-full border-2 border-[#c3c6cf] peer-checked:border-[#E87722] peer-checked:bg-[#E87722] flex items-center justify-center transition-all">
                          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-[#43474E] peer-checked:text-[#1A3C5E] capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && <span className="text-[11px] font-medium text-[#ba1a1a]">{errors.gender}</span>}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#43474E] ml-1">Height (cm)</label>
                    <input
                      type="number"
                      value={form.height}
                      onChange={(e) => updateForm('height', e.target.value)}
                      className={`w-full h-14 px-5 bg-[#F2F4F6] border-none rounded-xl focus:ring-2 focus:ring-[#1A3C5E]/20 transition-all text-[#1A3C5E] font-medium ${errors.height ? 'border border-[#ba1a1a]' : ''}`}
                      placeholder="180"
                    />
                    {errors.height && <span className="text-[11px] font-medium text-[#ba1a1a] ml-1">{errors.height}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#43474E] ml-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={form.weight}
                      onChange={(e) => updateForm('weight', e.target.value)}
                      className={`w-full h-14 px-5 bg-[#F2F4F6] border-none rounded-xl focus:ring-2 focus:ring-[#1A3C5E]/20 transition-all text-[#1A3C5E] font-medium ${errors.weight ? 'border border-[#ba1a1a]' : ''}`}
                      placeholder="75"
                    />
                    {errors.weight && <span className="text-[11px] font-medium text-[#ba1a1a] ml-1">{errors.weight}</span>}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#43474E] ml-1">Fitness Goal</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {fitnessGoals.map((goal) => (
                      <button
                        key={goal.value}
                        type="button"
                        onClick={() => updateForm('fitnessGoal', goal.value)}
                        className={`group flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                          form.fitnessGoal === goal.value
                            ? 'bg-[#ffdbc8] text-[#743400] ring-2 ring-[#612b00]/20'
                            : 'bg-[#F2F4F6] text-[#43474E] hover:bg-[#e6e8ea]'
                        }`}
                      >
                        <span className="material-symbols-outlined mb-2 text-2xl">{goal.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-wider">{goal.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.fitnessGoal && <span className="text-[11px] font-medium text-[#ba1a1a]">{errors.fitnessGoal}</span>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#43474E] ml-1">Health Conditions (Optional)</label>
                  <textarea
                    value={form.healthConditions}
                    onChange={(e) => updateForm('healthConditions', e.target.value)}
                    className="w-full p-5 bg-[#F2F4F6] border-none rounded-xl focus:ring-2 focus:ring-[#1A3C5E]/20 transition-all text-[#1A3C5E] font-medium resize-none"
                    placeholder="Any injuries, allergies, or medical conditions we should know about?"
                    rows={3}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#1A3C5E]">Gym Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={form.gymName}
                      disabled
                      className="w-full bg-[#F2F4F6] border-none rounded-lg px-4 py-3 text-[#43474E] font-medium cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-help group-hover:text-[#1A3C5E] transition-colors text-[#73777f]">
                      <span className="material-symbols-outlined text-[20px]">info</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#1A3C5E]">Gym Location</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3C5E]/60 text-[20px]">location_on</span>
                    <input
                      type="text"
                      value={form.gymLocation}
                      onChange={(e) => updateForm('gymLocation', e.target.value)}
                      className={`w-full bg-[#F2F4F6] border-none rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#1A3C5E]/20 transition-all ${errors.gymLocation ? 'border border-[#ba1a1a]' : ''}`}
                      placeholder="Jubilee Hills, Hyderabad"
                    />
                  </div>
                  {errors.gymLocation && <span className="text-[11px] font-medium text-[#ba1a1a]">{errors.gymLocation}</span>}
                </div>

                <div className="bg-[#EBF5FF] p-4 rounded-xl flex gap-3 border border-blue-100/50">
                  <span className="material-symbols-outlined text-blue-600 text-[20px] shrink-0">info</span>
                  <p className="text-[12px] text-blue-800 leading-relaxed">
                    Your gym check-in location is pre-configured by your admin. Your GPS will be verified when you check in.
                  </p>
                </div>

                <div className="border border-[#c3c6cf]/30 rounded-xl overflow-hidden">
                  <button className="w-full flex items-center justify-between p-4 bg-[#F2F4F6] text-[#1A3C5E] font-bold text-sm" type="button">
                    <span>Review Your Details</span>
                    <span className="material-symbols-outlined">expand_more</span>
                  </button>
                  <div className="p-4 bg-white space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#43474E]">Name</span>
                      <span className="font-semibold text-[#1A3C5E]">{form.name || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#43474E]">Email</span>
                      <span className="font-semibold text-[#1A3C5E]">{form.email || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#43474E]">Fitness Goal</span>
                      <span className="font-semibold text-[#1A3C5E] capitalize">{form.fitnessGoal?.replace('_', ' ') || 'Not selected'}</span>
                    </div>
                    <div className="pt-2 border-t border-[#c3c6cf]/20">
                      <p className="text-[10px] text-[#43474E] italic">
                        Plan type: <span className="text-[#E87722] not-italic font-medium">Not yet selected — you'll choose on the next screen.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* CTA Button */}
            <div className="pt-6 space-y-4 text-center">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-[#1A3C5E] to-[#002645] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1A3C5E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Continue to Step {step + 1}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-br from-[#E87722] to-[#D1661D] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Create My Account
                </button>
              )}
              
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="w-full px-8 py-4 text-sm font-bold text-[#1A3C5E] uppercase tracking-widest hover:bg-[#F2F4F6] rounded-xl transition-all"
                >
                  Back
                </button>
              )}

              {step === 1 && (
                <Link to="/login" className="inline-block text-xs font-semibold text-[#43474E] hover:text-[#E87722] transition-colors">
                  Already have an account? <span className="text-[#1A3C5E] underline decoration-2 underline-offset-4">Log in</span>
                </Link>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F8F9FB] py-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full max-w-7xl mx-auto gap-6">
          <div className="text-[10px] text-[#43474E] max-w-md text-center md:text-left leading-relaxed">
            By clicking continue, you acknowledge and agree to the Health Data Consent and our primary <a className="underline font-bold text-[#1A3C5E]" href="#">Privacy Policy</a> regarding your biometric information.
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-6">
              <a className="text-[#43474E] text-[10px] uppercase tracking-[0.05em] hover:text-[#E87722] underline decoration-2 underline-offset-4 transition-all duration-200" href="#">Privacy Policy</a>
              <a className="text-[#43474E] text-[10px] uppercase tracking-[0.05em] hover:text-[#E87722] underline decoration-2 underline-offset-4 transition-all duration-200" href="#">Terms of Service</a>
              <a className="text-[#43474E] text-[10px] uppercase tracking-[0.05em] hover:text-[#E87722] underline decoration-2 underline-offset-4 transition-all duration-200" href="#">Support</a>
            </div>
            <div className="text-[#43474E] text-[10px] uppercase tracking-[0.05em]">© 2024 FitSync Pro. The Kinetic Sanctuary.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}