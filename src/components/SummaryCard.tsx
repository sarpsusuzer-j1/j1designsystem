import './SummaryCard.css';
import type { ReactNode } from 'react';

const DefaultIcon = () => (
  <svg width="22" height="22" viewBox="0 0 256 256" fill="#828987">
    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11-79.95,75.48A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.1.12Z"/>
  </svg>
);

interface SummaryCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
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
        {icon ?? <DefaultIcon />}
      </div>
    </div>
  );
}
