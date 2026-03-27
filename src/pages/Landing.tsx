import { Link } from 'react-router-dom';
import React from "react";

import { Dumbbell, MapPin, BarChart3, PlayCircle, Users, ShieldCheck, ArrowRight, ChevronRight, CheckCircle } from 'lucide-react';

const features = [
  { icon: MapPin, title: 'Geo-Verified Check-In', desc: 'No manual attendance — GPS verifies you\'re at the gym automatically.' },
  { icon: BarChart3, title: 'Weekly Progress Tracking', desc: 'Track weight, measurements, and photos every week with trainer feedback.' },
  { icon: PlayCircle, title: 'Video Library', desc: 'Curated workout videos sorted by muscle group and difficulty level.' },
  { icon: Dumbbell, title: 'Personal Training Plans', desc: 'Custom workout and diet plans crafted by your personal trainer.' },
  { icon: Users, title: 'Trainer-Member Connect', desc: 'Direct feedback loop with trainer remarks and weekly progress reviews.' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'Razorpay-powered payments with UPI, cards, and net banking.' },
];

const howItWorks = [
  { step: 1, title: 'Register & Choose Plan', desc: 'Sign up in 3 easy steps and pick the plan that fits your goals.' },
  { step: 2, title: 'Check In at the Gym', desc: 'Tap one button when you arrive — GPS does the rest.' },
  { step: 3, title: 'Track Your Progress', desc: 'Submit weekly updates and get personalized trainer feedback.' },
  { step: 4, title: 'Achieve Your Goals', desc: 'Stay consistent and watch your body transform with expert guidance.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-offwhite-300/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-accent-500" />
              <span className="text-xl font-bold text-navy-600">FitSync Pro</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-navy-600/70 hover:text-navy-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-navy-600/70 hover:text-navy-600 transition-colors">How It Works</a>
              <Link to="/login" className="text-sm font-medium text-navy-600/70 hover:text-navy-600 transition-colors">Login</Link>
              <Link to="/register/step-1" className="btn-primary text-sm !py-2 !px-4">Register Now</Link>
            </nav>
            <Link to="/register/step-1" className="md:hidden btn-primary text-sm !py-2 !px-4">Register</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-accent-500/20 text-accent-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Dumbbell className="w-4 h-4" /> Your Complete Gym Ecosystem
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Train Smarter.<br />
              <span className="text-accent-400">Track Progress.</span><br />
              Get Results.
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              FitSync Pro brings together attendance tracking, progress monitoring, workout videos, and personal training — all in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register/step-1" className="btn-primary text-lg !px-8 !py-4 flex items-center gap-2 w-full sm:w-auto justify-center">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-lg !px-8 !py-4 w-full sm:w-auto text-center">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-24 bg-offwhite-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">Everything You Need</h2>
            <p className="text-lg text-navy-600/60 max-w-2xl mx-auto">A complete ecosystem designed for gym members and trainers to work together seamlessly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card-hover group">
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-accent-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-navy-600 mb-2">{feature.title}</h3>
                <p className="text-navy-600/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">How It Works</h2>
            <p className="text-lg text-navy-600/60 max-w-2xl mx-auto">Get started in minutes and see results within weeks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-navy-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-navy-600 mb-2">{item.title}</h3>
                <p className="text-navy-600/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 md:py-24 bg-offwhite-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-navy-600/60 max-w-2xl mx-auto">Flexible plans that fit your fitness goals and budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Normal Plan */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-navy-600 mb-2">Normal Membership</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-navy-600">₹1,500</span>
                <span className="text-navy-600/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Gym access (all days)', 'Basic equipment usage', 'Attendance tracking', 'Weekly progress submission', 'Video library access'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-navy-600/80">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/register/step-1" className="btn-outline w-full text-center block">
                Get Started
              </Link>
            </div>
            {/* PT Plan */}
            <div className="card p-8 border-2 border-accent-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="text-xl font-bold text-navy-600 mb-2">Personal Training</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-navy-600">₹3,500</span>
                <span className="text-navy-600/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Everything in Normal Plan', 'Personal trainer assigned', 'Custom workout plan', 'Custom diet plan', 'Trainer remarks & feedback', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-navy-600/80">
                    <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/register/step-1" className="btn-primary w-full text-center block">
                Get Started <ChevronRight className="w-4 h-4 inline" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-navy-600 to-navy-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform?</h2>
          <p className="text-white/70 text-lg mb-8">Join FitSync Pro today and take the first step towards a healthier, stronger you.</p>
          <Link to="/register/step-1" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            Register Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-800 text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-accent-500" />
              <span className="text-lg font-bold text-white">FitSync Pro</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="mailto:support@fitsyncp.in" className="hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm">
            © 2025 FitZone Gym. Powered by FitSync Pro.
          </div>
        </div>
      </footer>
    </div>
  );
}
