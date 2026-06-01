import './NavBar.css';
import {
  House,
  Monitor,
  Cube,
  Bell,
  FadersHorizontal,
  Siren,
  Plugs,
  Warning,
  GitBranch,
  Cpu,
  GearSix,
} from '@phosphor-icons/react';

// JupiterOne globe logo mark (wireframe sphere)
const J1Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="12.5" stroke="#B0B4B2" strokeWidth="1.2"/>
    <ellipse cx="14" cy="14" rx="5.5" ry="12.5" stroke="#B0B4B2" strokeWidth="1.2"/>
    <line x1="1.5" y1="14" x2="26.5" y2="14" stroke="#B0B4B2" strokeWidth="1.1"/>
    <line x1="3.5" y1="8.5" x2="24.5" y2="8.5" stroke="#B0B4B2" strokeWidth="0.9"/>
    <line x1="3.5" y1="19.5" x2="24.5" y2="19.5" stroke="#B0B4B2" strokeWidth="0.9"/>
  </svg>
);

// Nav items — verified order from screen-references.md
const navItems = [
  { icon: House,            label: 'Home' },
  { icon: Monitor,          label: 'Dashboard' },
  { icon: Cube,             label: 'Inventory' },
  { icon: Bell,             label: 'Alerts' },
  { icon: FadersHorizontal, label: 'Controls', active: true },
  { icon: Siren,            label: 'Vulnerabilities' },
  { icon: Plugs,            label: 'Integrations' },
  { icon: Warning,          label: 'Risks' },
  { icon: GitBranch,        label: 'Graph' },
  { icon: Cpu,              label: 'AI-ASM' },
];

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <J1Logo />
        </div>
        <div className="navbar-items">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`navbar-item${item.active ? ' navbar-item--active' : ''}`}
                title={item.label}
                aria-label={item.label}
              >
                <Icon size={20} weight="regular" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="navbar-bottom">
        <button className="navbar-item" title="Settings" aria-label="Settings">
          <GearSix size={20} weight="regular" />
        </button>
        <div className="navbar-avatar" aria-label="Profile">S</div>
      </div>
    </nav>
  );
}
