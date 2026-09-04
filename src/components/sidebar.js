import { NavLink } from 'react-router-dom';
import GDIcon from '@ux/icon/gd-the-go';
import Dashboard from '@ux/icon/dashboard';
import Graph from '@ux/icon/graph';
import Users from '@ux/icon/users3';
import Shipping from '@ux/icon/shipping';
import text from '@ux/text';

import '../styles/sidebar.css';
import '@ux/icon/gd-the-go/index.css';
import '@ux/icon/dashboard/index.css';
import '@ux/icon/graph/index.css';
import '@ux/icon/users3/index.css';
import '@ux/icon/shipping/index.css';
import '@ux/text/styles';

const links = [
  { to: '/', label: 'Overview', icon: Dashboard, end: true },
  { to: '/epics', label: 'Epics', icon: Graph },
  { to: '/designers', label: 'Designers', icon: Users },
  { to: '/builds', label: 'Builds', icon: Shipping },
];

function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Primary">
      <div className="sidebar-header">
        <GDIcon height={32} width={32} aria-hidden="true" />
        <text.span as="caption" size={-1}>
          GDF
        </text.span>
      </div>
      <div className="context-switcher" aria-hidden="true">
        <text.span as="action">Global Design Foundations</text.span>
      </div>
      <ul className="sidebar-menu">
        {links.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? 'sidebar-menu-item active' : 'sidebar-menu-item'
              }
            >
              <Icon height={24} width={24} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
