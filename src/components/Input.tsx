import './Input.css';
import type { ReactNode } from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  prefix?: ReactNode;
}

export function Input({ placeholder, value, onChange, prefix }: InputProps) {
  return (
    <div className="input-wrapper">
      {prefix && <span className="input-prefix">{prefix}</span>}
      <input
        className={`input ${prefix ? 'input--has-prefix' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
