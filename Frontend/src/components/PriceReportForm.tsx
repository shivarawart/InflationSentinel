// src/components/PriceReportForm.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import toast from 'react-hot-toast';

const PriceReportForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    item: '',
    price: '',
    currency: (user?.country === 'JP' ? 'JPY' : 'USD') as 'JPY' | 'USD',
    lat: 35.6762,   // default Tokyo
    lng: 139.6503,
    city: user?.city || 'Tokyo',
    country: user?.country || 'JP',
  });
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Auto-detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setForm(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
        },
        () => {
          console.log('Geolocation not available, using defaults');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.item.trim() || !form.price) {
      toast.error('Item name and price are required!');
      return;
    }

    setLoading(true);
    try {
      await api.post('/prices/report', {
        item: form.item.trim(),
        price: Number(form.price),
        currency: form.currency,
        location: {
          lat: form.lat,
          lng: form.lng,
          city: form.city,
          country: form.country,
        },
      });
      toast.success('✅ Price reported successfully! Live map updated instantly.');
      setForm({ ...form, item: '', price: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to report price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔥 Full Width Responsive Form Container
    <div className="group relative w-full h-full bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-black/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 lg:p-8 xl:p-10 2xl:p-12 shadow-2xl shadow-slate-900/50 hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden">
      
      {/* Premium Header */}
      <div className="absolute -top-8 lg:-top-12 -right-8 lg:-right-12 w-48 lg:w-64 h-48 lg:h-64 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8 lg:mb-12 pb-8 border-b border-slate-700/30">
          <div className="w-4 h-16 lg:w-5 lg:h-20 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/50 flex-shrink-0"></div>
          <div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl">
              Report Price
            </h2>
            <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl font-medium mt-2 lg:mt-3 max-w-md">
              Help track inflation in real-time
            </p>
          </div>
        </div>

        {/* 🔥 Responsive Form Grid */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
          
          {/* Hero Item Input */}
          <div className="relative">
            <label className="block text-sm lg:text-base text-slate-400 font-bold mb-4 tracking-wide uppercase">
              Item / Service
            </label>
            <div className="relative">
              <input
                type="text"
                value={form.item}
                onChange={(e) => setForm({ ...form, item: e.target.value })}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl px-6 lg:px-8 py-6 lg:py-7 text-xl lg:text-2xl font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 peer"
                placeholder="Rice 5kg, Milk 1L, Taxi ride..."
                required
                autoComplete="off"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -m-px opacity-0 peer-focus:opacity-100 peer-focus:animate-pulse transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>

          {/* 🔥 Responsive Price + Currency Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Price Input */}
            <div className="relative">
              <label className="block text-sm lg:text-base text-slate-400 font-bold mb-4 tracking-wide uppercase">
                Current Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl px-6 lg:px-8 py-6 lg:py-7 text-2xl lg:text-3xl xl:text-4xl font-mono font-black text-emerald-400 focus:outline-none focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 peer placeholder-slate-500"
                placeholder="0.00"
                required
              />
            </div>

            {/* Currency + Location */}
            <div className="space-y-6 lg:space-y-8">
              
              {/* Currency Select */}
              <div className="relative">
                <label className="block text-sm lg:text-base text-slate-400 font-bold mb-4 tracking-wide uppercase">
                  Currency
                </label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value as 'JPY' | 'USD' })}
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl px-6 lg:px-8 py-6 lg:py-7 text-xl lg:text-2xl font-bold text-white focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 appearance-none bg-no-repeat bg-right"
                >
                  <option value="JPY">¥ JPY (Japan Yen)</option>
                  <option value="USD">$ USD (US Dollar)</option>
                </select>
                <svg className="absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 w-6 h-6 lg:w-7 lg:h-7 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Location Info */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 lg:p-7">
                <div className="flex items-center justify-between text-sm lg:text-base text-slate-400 mb-2">
                  <span className="font-bold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </span>
                  {userLocation && (
                    <span className="text-emerald-400 font-mono text-xs lg:text-sm bg-emerald-500/10 px-3 py-1 rounded-xl">
                      📍 GPS Active
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-slate-500 font-mono text-xs lg:text-sm">
                  <div>
                    <span className="text-slate-400">City:</span><br />
                    <strong>{form.city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Country:</span><br />
                    <strong>{form.country}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🔥 Hero Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-700 hover:via-emerald-600 hover:to-emerald-800 disabled:from-slate-700 disabled:to-slate-800 py-8 lg:py-10 rounded-3xl font-black text-xl lg:text-2xl xl:text-3xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 active:shadow-emerald-500/70 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Report Price Now
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PriceReportForm;