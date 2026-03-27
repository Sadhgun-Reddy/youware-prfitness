import { AlertTriangle, RefreshCcw, Mail } from 'lucide-react';

export default function ServerError() {
  return (
    <div className="min-h-screen bg-offwhite-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8 text-center bg-white shadow-xl rounded-2xl border-t-4 border-t-red-500">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 shadow-sm relative">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
          <AlertTriangle className="w-12 h-12 relative z-10" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-navy-600 mb-3 tracking-tight">Something Went Wrong</h1>
        <p className="text-navy-500/80 mb-8 px-2 text-sm md:text-base leading-relaxed">
          We're experiencing a technical issue on our end. Please try again in a few minutes.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base shadow-md hover:-translate-y-0.5 transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <a 
            href="mailto:support@fitsyncpro.com" 
            className="btn-outline w-full flex items-center justify-center gap-2 py-3.5 text-base hover:-translate-y-0.5 transition-all"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
