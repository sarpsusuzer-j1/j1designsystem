import './NavBar.css';
import {
  House,
  Monitor,
  Cube,
  Bell,
  Siren,
  Sliders,
  Plugs,
  Warning,
  GitBranch,
  GearSix,
} from '@phosphor-icons/react';

const navItems = [
  { icon: House,      label: 'Home' },
  { icon: Monitor,    label: 'Dashboard' },
  { icon: Cube,       label: 'Assets' },
  { icon: Bell,       label: 'Alerts' },
  { icon: Siren,      label: 'Vulnerabilities' },
  { icon: Sliders,    label: 'Controls', active: true },
  { icon: Plugs,      label: 'Integrations' },
  { icon: Warning,    label: 'Exposures' },
  { icon: GitBranch,  label: 'Automations' },
];

const J1Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" stroke="#B0B4B2" strokeWidth="1.2"/>
    <ellipse cx="14" cy="14" rx="6" ry="13" stroke="#B0B4B2" strokeWidth="1.2"/>
    <line x1="1" y1="14" x2="27" y2="14" stroke="#B0B4B2" strokeWidth="1.2"/>
    <line x1="3.5" y1="8" x2="24.5" y2="8" stroke="#B0B4B2" strokeWidth="1"/>
    <line x1="3.5" y1="20" x2="24.5" y2="20" stroke="#B0B4B2" strokeWidth="1"/>
  </svg>
);

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <J1Logo />
      </div>

      <div className="navbar-items">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`navbar-item ${item.active ? 'navbar-item--active' : ''}`}
              title={item.label}
            >
              <Icon size={20} weight="regular" />
            </button>
          );
        })}
      </div>

      <div className="navbar-bottom">
        <button className="navbar-item navbar-gear" title="Settings">
          <GearSix size={22} weight="regular" />
        </button>
        <div className="navbar-avatar">S</div>
      </div>
    </nav>
  );
}
