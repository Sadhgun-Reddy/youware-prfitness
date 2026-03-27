import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, ChevronDown, User, Mail, Phone, Ruler, Weight, Calendar, Heart, Target, MapPin, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import type { FitnessGoal, Gender } from '../../types';

const fitnessGoals: { value: FitnessGoal; label: string }[] = [
  { value: 'weight_loss', label: 'Weight Loss' },
  { value: 'muscle_gain', label: 'Muscle Gain' },
  { value: 'fitness', label: 'General Fitness' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'rehabilitation', label: 'Rehabilitation' },
  { value: 'general', label: 'General Wellness' },
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '',
    age: '', gender: '' as Gender | '', height: '', weight: '',
    fitnessGoal: '' as FitnessGoal | '',
    gymName: '', gymLocation: '',
    healthConditions: '',
    membershipPlan: 'normal' as 'normal' | 'personal_training',
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    navigate('/membership');
  };

  const canProceed = () => {
    if (step === 1) return form.name && form.email && form.phone && form.password;
    if (step === 2) return form.age && form.gender && form.height && form.weight && form.fitnessGoal;
    if (step === 3) return form.gymName && form.gymLocation;
    return true;
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
              <Dumbbell size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FitZone</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-dark-400 text-sm mt-1">Fill in your details to get started</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                s < step ? 'bg-emerald-500 text-white' : s === step ? 'bg-brand-500 text-white' : 'bg-dark-700 text-dark-400'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 4 && <div className={`w-12 sm:w-20 h-0.5 mx-1 ${s < step ? 'bg-emerald-500' : 'bg-dark-700'}`} />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-dark-800 rounded-2xl border border-dark-700 p-6 sm:p-8"
        >
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-1">Personal Information</h2>
              <p className="text-sm text-dark-400 mb-4">Tell us about yourself</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="John Doe" icon={<User size={18} />} value={form.name} onChange={(e) => updateForm('name', e.target.value)} />
                <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail size={18} />} value={form.email} onChange={(e) => updateForm('email', e.target.value)} />
                <Input label="Phone Number" placeholder="+91 98765 43210" icon={<Phone size={18} />} value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} />
                <Input label="Password" type="password" placeholder="Min 8 characters" icon={<AlertCircle size={18} />} value={form.password} onChange={(e) => updateForm('password', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 2: Physical Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-1">Physical Profile</h2>
              <p className="text-sm text-dark-400 mb-4">This helps us customize your experience</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Age" type="number" placeholder="28" icon={<Calendar size={18} />} value={form.age} onChange={(e) => updateForm('age', e.target.value)} />
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-1.5">Gender</label>
                  <div className="relative">
                    <select
                      value={form.gender}
                      onChange={(e) => updateForm('gender', e.target.value)}
                      className="w-full rounded-xl border border-dark-600 bg-dark-800 text-white px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
                  </div>
                </div>
                <Input label="Height (cm)" type="number" placeholder="175" icon={<Ruler size={18} />} value={form.height} onChange={(e) => updateForm('height', e.target.value)} />
                <Input label="Weight (kg)" type="number" placeholder="78" icon={<Weight size={18} />} value={form.weight} onChange={(e) => updateForm('weight', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Fitness Goal</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {fitnessGoals.map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => updateForm('fitnessGoal', goal.value)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        form.fitnessGoal === goal.value
                          ? 'bg-brand-500/15 border-brand-500 text-brand-400'
                          : 'border-dark-600 text-dark-300 hover:border-dark-500'
                      }`}
                    >
                      <Target size={14} className="inline mr-1.5" />
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Gym & Health */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-1">Gym & Health Details</h2>
              <p className="text-sm text-dark-400 mb-4">Help us understand your gym preferences</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Gym Name" placeholder="e.g., FitZone Gym" icon={<Dumbbell size={18} />} value={form.gymName} onChange={(e) => updateForm('gymName', e.target.value)} />
                <Input label="Gym Location" placeholder="e.g., MG Road, Bangalore" icon={<MapPin size={18} />} value={form.gymLocation} onChange={(e) => updateForm('gymLocation', e.target.value)} />
              </div>
              <Textarea
                label="Health Conditions / Medical Notes"
                placeholder="Mention any injuries, allergies, or medical conditions..."
                rows={3}
                icon={<Heart size={18} />}
                value={form.healthConditions}
                onChange={(e) => updateForm('healthConditions', e.target.value)}
              />
              <p className="text-xs text-dark-500">This information is private and will only be shared with your trainer.</p>
            </div>
          )}

          {/* Step 4: Membership Plan */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-1">Choose Your Plan</h2>
              <p className="text-sm text-dark-400 mb-4">Select the membership that suits you</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => updateForm('membershipPlan', 'normal')}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    form.membershipPlan === 'normal'
                      ? 'border-brand-500 bg-brand-500/5'
                      : 'border-dark-600 hover:border-dark-500'
                  }`}
                >
                  <h3 className="font-bold text-white mb-1">Standard</h3>
                  <p className="text-2xl font-extrabold text-brand-400 mb-2">₹1,499<span className="text-sm text-dark-400 font-normal">/mo</span></p>
                  <ul className="space-y-1.5 text-xs text-dark-300">
                    <li>✓ Attendance tracking</li>
                    <li>✓ Weekly progress tracking</li>
                    <li>✓ Video library access</li>
                  </ul>
                </button>
                <button
                  onClick={() => updateForm('membershipPlan', 'personal_training')}
                  className={`p-6 rounded-2xl border-2 text-left transition-all relative ${
                    form.membershipPlan === 'personal_training'
                      ? 'border-brand-500 bg-brand-500/5'
                      : 'border-dark-600 hover:border-dark-500'
                  }`}
                >
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full">POPULAR</div>
                  <h3 className="font-bold text-white mb-1">Personal Training</h3>
                  <p className="text-2xl font-extrabold text-brand-400 mb-2">₹3,999<span className="text-sm text-dark-400 font-normal">/mo</span></p>
                  <ul className="space-y-1.5 text-xs text-dark-300">
                    <li>✓ Everything in Standard</li>
                    <li>✓ Personalized workout plans</li>
                    <li>✓ Customized diet plans</li>
                    <li>✓ Trainer feedback</li>
                  </ul>
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
            ) : (
              <Link to="/login">
                <Button variant="ghost">Sign In Instead</Button>
              </Link>
            )}
            {step < 4 ? (
              <Button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Proceed to Payment
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
