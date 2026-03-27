import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Gender, FitnessGoal } from '../../types';

export interface FormData {
  // Step 1
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  gender: Gender | '';
  // Step 2
  height: string;
  weight: string;
  fitnessGoal: FitnessGoal | '';
  healthConditions: string;
  // Step 3
  gymName: string;
  gymLocation: string;
}

const initialForm: FormData = {
  fullName: '', email: '', password: '', confirmPassword: '', dob: '', gender: '',
  height: '', weight: '', fitnessGoal: '', healthConditions: '',
  gymName: '', gymLocation: '',
};

function getPasswordStrength(pw: string): { label: string; color: string; width: string } {
  if (!pw) return { label: '', color: 'bg-gray-200', width: 'w-0' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak', color: 'bg-error', width: 'w-1/4' };
  if (score <= 2) return { label: 'Fair', color: 'bg-accent-500', width: 'w-2/4' };
  if (score <= 3) return { label: 'Good', color: 'bg-blue-500', width: 'w-3/4' };
  return { label: 'Strong', color: 'bg-success', width: 'w-full' };
}

export default function RegisterStep1() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.dob) e.dob = 'Date of birth is required';
    if (!form.gender) e.gender = 'Please select gender';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      sessionStorage.setItem('regForm', JSON.stringify(form));
      navigate('/register/step-2');
    }
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-600">Create Your Account</h1>
          <p className="text-sm text-navy-600/60 mt-1">Step 1 of 3 — Personal Information</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s === 1 ? 'bg-accent-500' : 'bg-offwhite-300'}`} />
          ))}
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Full Name</label>
              <input type="text" className="input-field" placeholder="e.g. Arjun Mehta" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
              {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Email Address</label>
              <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Password</label>
              <input type="password" className="input-field" placeholder="Minimum 8 characters" value={form.password} onChange={e => update('password', e.target.value)} />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    <div className={`h-1 flex-1 rounded-full ${strength.width.split(' ')[0] >= 1 ? strength.color : 'bg-gray-200'}`} style={{ width: '25%' }} />
                    <div className={`h-1 flex-1 rounded-full ${strength.width === 'w-2/4' || strength.width === 'w-3/4' || strength.width === 'w-full' ? strength.color : 'bg-gray-200'}`} style={{ width: '25%' }} />
                    <div className={`h-1 flex-1 rounded-full ${strength.width === 'w-3/4' || strength.width === 'w-full' ? strength.color : 'bg-gray-200'}`} style={{ width: '25%' }} />
                    <div className={`h-1 flex-1 rounded-full ${strength.width === 'w-full' ? strength.color : 'bg-gray-200'}`} style={{ width: '25%' }} />
                  </div>
                  <p className="text-xs text-navy-600/50 mt-1">{strength.label}</p>
                </div>
              )}
              {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Confirm Password</label>
              <input type="password" className="input-field" placeholder="Re-enter your password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
              {errors.confirmPassword && <p className="text-error text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-1">Date of Birth</label>
              <input type="date" className="input-field" value={form.dob} onChange={e => update('dob', e.target.value)} max={new Date().toISOString().split('T')[0]} />
              {errors.dob && <p className="text-error text-xs mt-1">{errors.dob}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-600 mb-2">Gender</label>
              <div className="flex gap-3">
                {(['male', 'female', 'other'] as const).map(g => (
                  <button key={g} type="button" onClick={() => update('gender', g)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${form.gender === g ? 'border-accent-500 bg-accent-50 text-accent-700' : 'border-offwhite-300 bg-white text-navy-600/70 hover:border-navy-200'}`}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="text-error text-xs mt-1">{errors.gender}</p>}
            </div>
          </div>

          <button onClick={handleContinue} className="btn-primary w-full mt-8">
            Continue to Step 2
          </button>

          <p className="text-center text-sm text-navy-600/60 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-accent-500 font-medium hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
