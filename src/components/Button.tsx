import './Button.css';
import type { ReactNode } from 'react';

export type ButtonVariant = 'black-40' | 'outline-40' | 'outline-32';

interface ButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
}

export function Button({ variant = 'black-40', children, onClick, icon }: ButtonProps) {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
