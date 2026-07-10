import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { LogoWordmark } from '../icons/Logo';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/dashboard">
          <LogoWordmark />
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500 hidden sm:inline">
              {user.name}
              {user.targetRole && (
                <span className="text-neutral-700 ml-2">/ {user.targetRole}</span>
              )}
            </span>
            <Button variant="ghost" onClick={logout} className="text-sm">
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
