import { NavLink } from 'react-router-dom';
import Icon from '../icons/Icons';
import { MOBILE_NAV } from '../../config/navItems';

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="flex justify-around items-center h-16 px-1">
        {MOBILE_NAV.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2 py-1 rounded-md text-[10px] transition-colors ${
                isActive ? 'text-black' : 'text-neutral-500'
              }`
            }
          >
            <Icon name={link.icon} className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
