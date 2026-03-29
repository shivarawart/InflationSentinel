// src/components/LiveActivity.tsx
import type { PriceReport } from '../types';

const LiveActivity = ({ prices }: { prices: PriceReport[] }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-semibold text-white">Live Activity</h3>
          <p className="text-slate-400 text-sm mt-1">Real-time price reports</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-3xl">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 text-sm font-medium">REAL-TIME</span>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {prices.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
              📍
            </div>
            <p className="text-slate-400 text-lg">No price reports yet</p>
            <p className="text-slate-500 text-sm mt-2">Be the first to report a price</p>
          </div>
        ) : (
          prices.slice(0, 10).map((price) => (
            <div 
              key={price._id}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-semibold text-white text-lg leading-tight">
                    {price.item}
                  </div>
                  <div className="text-emerald-400 font-mono text-3xl mt-3">
                    {price.price} <span className="text-xl text-emerald-500/80">{price.currency}</span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400 whitespace-nowrap ml-4">
                  {new Date(price.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-400 flex items-center gap-2">
                📍 {price.location.city}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      {prices.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500 flex justify-between">
          <span>Latest {Math.min(10, prices.length)} reports</span>
          <span className="font-mono">Updated live</span>
        </div>
      )}
    </div>
  );
};

export default LiveActivity;