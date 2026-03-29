// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import PriceMap from '../components/PriceMap';
import LiveActivity from '../components/LiveActivity';
import api from '../lib/api';
import type { PriceReport } from '../types';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [prices, setPrices] = useState<PriceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [shieldScore] = useState(87);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const res = await api.get('/prices');
        setPrices(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load price data");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();

    // Auto-refresh every 25 seconds
    const interval = setInterval(fetchPrices, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-semibold tracking-tight text-white">
          Shield Dashboard
        </h1>
        <p className="text-slate-400 mt-3 text-lg">
          Real-time inflation intelligence • Protecting your purchasing power
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Shield Score */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all">
          <div className="text-emerald-400 text-sm font-medium tracking-widest">SHIELD SCORE</div>
          <div className="text-7xl font-bold text-white mt-6">{shieldScore}</div>
          <div className="mt-3 text-emerald-500 text-sm flex items-center gap-1">
            ↑ 8 this week
          </div>
        </div>

        {/* Estimated Savings */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all">
          <div className="text-slate-400 text-sm font-medium tracking-widest">EST. SAVINGS</div>
          <div className="text-7xl font-bold text-white mt-6">¥2,340</div>
          <div className="text-slate-500 text-sm mt-3">This month</div>
        </div>

        {/* Live Reports */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all">
          <div className="text-slate-400 text-sm font-medium tracking-widest">LIVE REPORTS</div>
          <div className="text-7xl font-bold text-white mt-6 flex items-baseline gap-3">
            {prices.length}
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-emerald-400 text-sm mt-3">Updated just now</div>
        </div>

        {/* Active Barters */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all">
          <div className="text-slate-400 text-sm font-medium tracking-widest">ACTIVE BARTERS</div>
          <div className="text-7xl font-bold text-white mt-6">23</div>
          <div className="text-slate-500 text-sm mt-3">In your area</div>
        </div>
      </div>

      {/* Main Content - Map + Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Price War Map */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-white">Price War Map</h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              LIVE UPDATES ENABLED
            </div>
          </div>

          <div className="h-[620px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400">
                Loading live map...
              </div>
            ) : (
              <PriceMap prices={prices} />
            )}
          </div>
        </div>

        {/* Live Activity Sidebar */}
        <div className="lg:col-span-4">
          <LiveActivity prices={prices} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;