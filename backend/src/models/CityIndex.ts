import mongoose from 'mongoose';

const cityIndexSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  index: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

const CityIndex = mongoose.models.CityIndex || mongoose.model('CityIndex', cityIndexSchema);

export default CityIndex;