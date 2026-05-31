import './SummaryCard.css';
import type { ReactNode } from 'react';

interface SummaryCardProps {
  value: string | number;
  label: string;
  icon: ReactNode;
  iconBg?: string;
}

export function SummaryCard({ value, label, icon, iconBg = '#F1F2F1' }: SummaryCardProps) {
  return (
    <div className="summary-card">
      <div className="summary-card__content">
        <span className="summary-card__value">{value}</span>
        <span className="summary-card__label">{label}</span>
      </div>
      <div className="summary-card__icon" style={{ background: iconBg }}>
        {icon}
      </div>
    </div>
  );
}
