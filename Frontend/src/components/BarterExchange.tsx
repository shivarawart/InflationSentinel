// src/components/BarterExchange.tsx
import { useState, useEffect } from 'react';
import api from '../lib/api';
import type { BarterListing } from '../types';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const BarterExchange = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<BarterListing[]>([]);
  const [myListings, setMyListings] = useState<BarterListing[]>([]);
  const [suggestedMatches, setSuggestedMatches] = useState<BarterListing[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'matches'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newListing, setNewListing] = useState({
    type: 'offer' as 'offer' | 'request',
    title: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
    fetchListings();
  }, [user]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/barter');
      setListings(res.data);

      const mine = res.data.filter((l: BarterListing) => {
        const listingUserId = typeof l.user === 'object' && l.user !== null 
          ? (l.user as any)._id || (l.user as any).id 
          : l.user;
        return listingUserId === user?.id;
      });
      setMyListings(mine);
    } catch (err) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListing.title.trim() || !newListing.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      const tagsArray = newListing.tags.split(',').map(t => t.trim()).filter(Boolean);

      await api.post('/barter', {
        type: newListing.type,
        title: newListing.title.trim(),
        description: newListing.description.trim(),
        tags: tagsArray,
        location: { 
          city: user?.city || 'Tokyo', 
          country: user?.country || 'JP' 
        }
      });

      toast.success("Listing created successfully!");
      setShowCreateModal(false);
      setNewListing({ type: 'offer', title: '', description: '', tags: '' });
      fetchListings();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create listing");
    }
  };

  const findMatches = async (listingId: string) => {
    try {
      const res = await api.post(`/barter/${listingId}/match`);
      if (res.data && res.data.length > 0) {
        setSuggestedMatches(res.data);
        setActiveTab('matches');
        toast.success(`${res.data.length} matches found!`);
      } else {
        toast("No matches found yet", { icon: 'ℹ️' });
      }
    } catch (err) {
      toast.error("Could not find matches at the moment");
    }
  };

  const filteredListings = activeTab === 'all' 
    ? listings 
    : activeTab === 'my' 
      ? myListings 
      : suggestedMatches;

  if (loading) {
    return <div className="text-center py-20 text-slate-400">Loading barter exchange...</div>;
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-semibold text-white">Barter Exchange</h1>
          <p className="text-slate-400 mt-2">Trade skills and goods without spending cash</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-2xl font-medium flex items-center gap-2 transition-all"
        >
          + Create New Listing
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700 flex gap-8">
        {(['all', 'my', 'matches'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-lg font-medium border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-emerald-500 text-white' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'all' && 'All Listings'}
            {tab === 'my' && 'My Listings'}
            {tab === 'matches' && 'Suggested Matches'}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400">
            No listings found in this tab.
          </div>
        ) : (
          filteredListings.map((listing) => (
            <div 
              key={listing._id} 
              className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-emerald-500 transition-all flex flex-col"
            >
              <div className="flex justify-between mb-6">
                <span className={`px-5 py-2 text-xs font-semibold rounded-2xl uppercase ${
                  listing.type === 'offer' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                }`}>
                  {listing.type}
                </span>
                <span className="text-xs text-slate-500">{listing.location?.city}</span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2">{listing.title}</h3>
              <p className="text-slate-400 line-clamp-4 flex-1 mb-8">{listing.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {listing.tags?.slice(0, 5).map((tag, i) => (
                  <span key={i} className="text-xs bg-slate-800 px-4 py-1.5 rounded-2xl">#{tag}</span>
                ))}
              </div>

              <button
                onClick={() => findMatches(listing._id)}
                className="mt-auto w-full py-4 bg-slate-800 hover:bg-emerald-600 rounded-2xl font-medium transition-all"
              >
                Find Matches
              </button>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-10">
            <h2 className="text-3xl font-semibold mb-8">Create New Listing</h2>
            
            <form onSubmit={createListing} className="space-y-8">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Type</label>
                <select
                  value={newListing.type}
                  onChange={e => setNewListing({ ...newListing, type: e.target.value as 'offer' | 'request' })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white"
                >
                  <option value="offer">I Offer / Give</option>
                  <option value="request">I Request / Need</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="English lessons, Web development help..."
                  value={newListing.title}
                  onChange={e => setNewListing({ ...newListing, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Description</label>
                <textarea
                  placeholder="Describe what you can offer or what you need..."
                  value={newListing.description}
                  onChange={e => setNewListing({ ...newListing, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 h-32 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="english, teaching, language"
                  value={newListing.tags}
                  onChange={e => setNewListing({ ...newListing, tags: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-4 border border-slate-700 rounded-2xl font-medium hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-medium"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarterExchange;