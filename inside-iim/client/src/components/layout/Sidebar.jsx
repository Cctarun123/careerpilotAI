import { NavLink } from 'react-router-dom';
import Icon from '../icons/Icons';
import { NAV_ITEMS } from '../../config/navItems';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="glass-card p-3 sticky top-20">
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-md text-sm transition-colors flex items-center gap-3 ${
                  isActive
                    ? 'bg-black text-white font-medium'
                    : link.featured
                      ? 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                      : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                }`
              }
            >
              <Icon name={link.icon} className="w-4 h-4 shrink-0" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
