import './Badge.css';

export type BadgeVariant =
  | 'pass'
  | 'fail'
  | 'live'
  | 'draft'
  | 'no-datapoints'
  | 'no-tests'
  // Legacy variants kept for backward compat
  | 'success-tinted'
  | 'danger-tinted'
  | 'default-outline'
  | 'warning-solid'
  | 'warning-tinted';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
}

const LABELS: Partial<Record<BadgeVariant, string>> = {
  pass: 'Pass',
  fail: 'Fail',
  live: 'Live',
  draft: 'Draft',
  'no-datapoints': '● No Datapoints',
  'no-tests': '● No Tests',
};

export function Badge({ variant, label }: BadgeProps) {
  const displayLabel = label ?? LABELS[variant] ?? variant;
  return (
    <span className={`badge badge--${variant}`}>{displayLabel}</span>
  );
}
