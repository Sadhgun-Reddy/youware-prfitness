import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ children, className, padding = 'md', hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-dark-800 border border-dark-700',
        paddings[padding],
        hover && 'hover:border-dark-600 hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}
