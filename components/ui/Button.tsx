import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 relative group overflow-hidden';
  
  const variants = {
    primary: 'bg-brand-accent text-white px-8 py-4 rounded-sm hover:bg-brand-accent-light',
    secondary: 'border border-brand-light/20 text-brand-light px-8 py-4 rounded-sm hover:border-brand-accent hover:text-brand-accent',
    text: 'text-brand-light hover:text-brand-accent uppercase tracking-wider text-sm',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {variant === 'text' && (
          <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-accent transition-all duration-300 group-hover:w-full" />
        )}
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {variant === 'text' && (
        <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-accent transition-all duration-300 group-hover:w-full" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
