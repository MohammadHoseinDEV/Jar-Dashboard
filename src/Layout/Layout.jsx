import { Outlet } from 'react-router-dom';
import background from '../assets/images/Dark.jpg';
import Sidebar from '../features/dashboard/components/SidebarMenu/Sidebar';
import { useAuthExpiry } from '../hooks/useAuthExpiry.js';

function Layout() {
  useAuthExpiry();
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background image */}
      <img
        src={background}
        alt="Jar Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-999 flex h-full w-full bg-black/75">
        <Sidebar />

        <div className="flex-1 overflow-hidden p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
