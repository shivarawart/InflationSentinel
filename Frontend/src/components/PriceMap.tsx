// src/components/PriceMap.tsx
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { PriceReport } from '../types';
import { getSocket } from '../lib/socket';
import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';

// Fix Leaflet default marker icons (important for Vite)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const PriceMap = ({ prices }: { prices: PriceReport[] }) => {
  const socket = getSocket();

  useEffect(() => {
    socket?.on('priceUpdate', (newPrice: PriceReport) => {
      console.log('🆕 New price reported:', newPrice.item);
      toast.success(`${newPrice.item} updated - ${newPrice.price} ${newPrice.currency}`);
    });

    return () => {
      socket?.off('priceUpdate');
    };
  }, [socket]);

  // Calculate center based on prices or default to Tokyo
  const validPrices = prices.filter(p => p.location?.lat && p.location?.lng);

  const center: [number, number] = validPrices.length > 0 
    ? [
        validPrices.reduce((sum, p) => sum + p.location.lat, 0) / validPrices.length,
        validPrices.reduce((sum, p) => sum + p.location.lng, 0) / validPrices.length,
      ]
    : [35.6762, 139.6503]; // Tokyo

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-700 bg-slate-950">
      <MapContainer
        center={center}
        zoom={validPrices.length > 0 ? 12 : 10}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        {/* Dark theme tiles - clean and professional */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {prices.map((price) => {
          if (!price.location?.lat || !price.location?.lng) return null;

          return (
            <Marker
              key={price._id}
              position={[price.location.lat, price.location.lng]}
            >
              <Popup className="rounded-2xl shadow-xl">
                <div className="p-5 min-w-[260px]">
                  <div className="font-semibold text-lg text-white">{price.item}</div>
                  
                  <div className="text-4xl font-mono text-emerald-400 mt-3 mb-4">
                    {price.price} <span className="text-xl text-emerald-500">{price.currency}</span>
                  </div>

                  <div className="text-sm text-slate-400">
                    📍 {price.location.city}, {price.location.country}
                  </div>

                  <div className="text-xs text-slate-500 mt-4">
                    Reported {new Date(price.createdAt).toLocaleString()}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Simple Legend */}
      <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-slate-700 px-4 py-3 rounded-2xl text-xs text-slate-400 z-[1000]">
        {prices.length} live price pins • Click marker for details
      </div>
    </div>
  );
};

export default PriceMap;