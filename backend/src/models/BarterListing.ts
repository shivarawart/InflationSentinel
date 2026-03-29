import mongoose from 'mongoose';

const barterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['offer', 'request'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: { type: String, enum: ['open', 'matched', 'closed'], default: 'open' },
  matchedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BarterListing' }],
  createdAt: { type: Date, default: Date.now }
});

const BarterListing = mongoose.models.BarterListing || mongoose.model('BarterListing', barterSchema);

export default BarterListing;