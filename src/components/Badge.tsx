import './Badge.css';

export type BadgeVariant =
  | 'success-tinted'
  | 'danger-tinted'
  | 'default-outline'
  | 'warning-solid'
  | 'warning-tinted';

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
}

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>{label}</span>
  );
}
