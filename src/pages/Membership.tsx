import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, CreditCard, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Membership() {
  const navigate = useNavigate();

  const handlePayment = () => {
    // In production, Razorpay integration would go here
    navigate('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} className="text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Complete Your Payment</h1>
          <p className="text-dark-400 text-sm mt-1">Secure payment powered by Razorpay</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800 rounded-2xl border border-dark-700 p-6 sm:p-8"
        >
          {/* Order Summary */}
          <div className="space-y-4 mb-6">
            <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Order Summary</h3>
            <div className="flex items-center justify-between py-3 border-b border-dark-700">
              <div>
                <p className="text-sm font-medium text-white">Personal Training Plan</p>
                <p className="text-xs text-dark-400">Monthly subscription</p>
              </div>
              <p className="text-lg font-bold text-brand-400">₹3,999</p>
            </div>
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-dark-400">GST (18%)</span>
              <span className="text-dark-300">₹719.82</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-dark-600">
              <span className="font-semibold text-white">Total</span>
              <span className="text-xl font-bold text-white">₹4,718.82</span>
            </div>
          </div>

          {/* Features */}
          <div className="bg-dark-900 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">What you get</p>
            <div className="space-y-2">
              {[
                'Geofenced attendance tracking',
                'Weekly progress monitoring',
                'Workout video library access',
                'Personalized workout plans',
                'Customized diet plans',
                'Direct trainer feedback',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-dark-300">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-2 text-xs text-dark-500 mb-6">
            <Shield size={14} />
            <span>Your payment is encrypted and secure. We never store your card details.</span>
          </div>

          <Button onClick={handlePayment} fullWidth size="lg">
            Pay with Razorpay
          </Button>

          <div className="mt-4 text-center">
            <button onClick={() => navigate(-1)} className="text-sm text-dark-400 hover:text-white transition-colors inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Back to registration
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
