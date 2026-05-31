import './NavBar.css';

const icons = {
  logo: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#3DDC84"/>
      <path d="M7 14L11.5 9L16 14L11.5 19L7 14Z" fill="#040F0B"/>
      <path d="M14 14L18.5 9L23 14L18.5 19L14 14Z" fill="#040F0B" opacity="0.5"/>
    </svg>
  ),
  home: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 7.5L10 2.5L17.5 7.5V17.5H12.5V12.5H7.5V17.5H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3 5V10C3 13.87 6.13 17.5 10 18.5C13.87 17.5 17 13.87 17 10V5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  graph: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="5" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="15" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 13.5L8.5 7M11.5 6.5L13.5 9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  alert: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L2 17H18L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="14" r="0.75" fill="currentColor"/>
    </svg>
  ),
  controls: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="2.5" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="9" width="16" height="2.5" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="14" width="16" height="2.5" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="7" cy="5.25" r="1.5" fill="var(--eclipse-700)" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="13" cy="10.25" r="1.5" fill="var(--eclipse-700)" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="7" cy="15.25" r="1.5" fill="var(--eclipse-700)" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2V4M10 16V18M2 10H4M16 10H18M4.1 4.1L5.5 5.5M14.5 14.5L15.9 15.9M4.1 15.9L5.5 14.5M14.5 5.5L15.9 4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const navItems = [
  { icon: 'home', label: 'Home' },
  { icon: 'graph', label: 'Assets' },
  { icon: 'alert', label: 'Alerts' },
  { icon: 'controls', label: 'Controls', active: true },
  { icon: 'shield', label: 'Compliance' },
];

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">{icons.logo}</div>
      <div className="navbar-items">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`navbar-item ${item.active ? 'navbar-item--active' : ''}`}
            title={item.label}
          >
            {icons[item.icon as keyof typeof icons]}
          </button>
        ))}
      </div>
      <div className="navbar-bottom">
        <button className="navbar-item" title="Settings">{icons.settings}</button>
        <div className="navbar-avatar">S</div>
      </div>
    </nav>
  );
}
