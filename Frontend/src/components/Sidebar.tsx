// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Shield Map', icon: '🛡️' },
    { to: '/barter', label: 'Barter Exchange', icon: '🔄' },
    { to: '/report', label: 'Report Price', icon: '📍' },
  ];

  return (
    <div className="w-72 border-r border-slate-800 bg-slate-900 flex flex-col h-full overflow-hidden">
      {/* Logo Header */}
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            IS
          </div>
          <div className="min-w-0">
            <div className="text-2xl font-semibold text-white tracking-tight">InflationSentinel</div>
            <div className="text-xs text-slate-400 -mt-1">Cost-of-Living Shield</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="text-2xl transition-transform group-hover:scale-110">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-6 border-t border-slate-800 bg-slate-950 mt-auto">
        {user ? (
          <div className="space-y-6">
            {/* User Info Card */}
            <div className="flex items-center gap-4 bg-slate-800 rounded-2xl p-5">
              <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center text-2xl font-semibold text-white flex-shrink-0">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white truncate">{user.name}</div>
                <div className="text-sm text-slate-400 truncate">
                  {user.city}, {user.country}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 py-4 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl border border-slate-700 hover:border-red-500/30 transition-all font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4V7m-4 4V7" />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            Please login to continue
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;