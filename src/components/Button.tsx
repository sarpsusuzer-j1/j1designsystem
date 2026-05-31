import './Button.css';
import type { ReactNode } from 'react';

export type ButtonVariant = 'black' | 'outline' | 'black-40' | 'outline-40' | 'outline-32';

interface ButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
}

// Normalize legacy variant names to new ones
function resolveVariant(v: ButtonVariant): string {
  if (v === 'black-40') return 'black';
  if (v === 'outline-40') return 'outline';
  if (v === 'outline-32') return 'outline-sm';
  return v;
}

export function Button({ variant = 'black', children, onClick, icon }: ButtonProps) {
  const cls = resolveVariant(variant);
  return (
    <button className={`btn btn--${cls}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
