import { clsx } from 'clsx';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Textarea({ label, error, className, id, icon, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-dark-300 mb-1.5">
          {label}
        </label>
      )}
      {icon && (
        <div className="mb-2 text-sm text-dark-400 inline-block">{icon}</div>
      )}
      <textarea
        id={inputId}
        className={clsx(
          'w-full rounded-xl border border-dark-600 bg-dark-800 text-white placeholder-dark-400 px-4 py-2.5 text-sm transition-all duration-200 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500',
          'hover:border-dark-500',
          error && 'border-red-500 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
