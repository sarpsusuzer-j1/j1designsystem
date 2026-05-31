import './SliderTab.css';

interface Tab {
  label: string;
  value: string;
}

interface SliderTabProps {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
}

export function SliderTab({ tabs, active, onChange }: SliderTabProps) {
  return (
    <div className="slider-tab">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`slider-tab__item ${active === tab.value ? 'slider-tab__item--active' : ''}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
