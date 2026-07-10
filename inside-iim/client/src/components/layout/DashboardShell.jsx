import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function DashboardShell({ children }) {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
