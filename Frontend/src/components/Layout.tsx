// src/components/Layout.tsx
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar - Clean & Fixed Width */}
      <div className="w-72 border-r border-slate-800 bg-slate-900 flex-shrink-0 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Clean & Professional */}
        <header className="h-16 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between shrink-0 z-50">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              IS
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight text-white">InflationSentinel</div>
              <div className="text-xs text-slate-400 -mt-1">Cost-of-Living Shield</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-800 px-5 py-2 rounded-3xl border border-slate-700">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm font-medium">LIVE</span>
            </div>

            <div className="text-slate-400 text-sm hidden md:block">
              Real-time • Tokyo / New York / Gurugram
            </div>
          </div>
        </header>

        {/* Main Scrollable Content - True Full Width */}
        <main className="flex-1 overflow-auto p-6 md:p-8 lg:p-10 xl:p-12 bg-slate-950">
          {/* This container gives breathing room on very large screens but stays full-width on laptops */}
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;