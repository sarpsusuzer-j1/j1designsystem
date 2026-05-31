import './NavBar.css';
import {
  House,
  Monitor,
  Cube,
  Bell,
  Stack,
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
  { icon: Stack,      label: 'Vulnerabilities' },
  { icon: Sliders,    label: 'Controls', active: true },
  { icon: Plugs,      label: 'Integrations' },
  { icon: Warning,    label: 'Exposures' },
  { icon: GitBranch,  label: 'Automations' },
];

export function NavBar() {
  return (
    <nav className="navbar">
      {/* Logo placeholder — SVG asset needed from Figma */}
      <div className="navbar-logo">
        <div className="navbar-logo-placeholder" />
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
