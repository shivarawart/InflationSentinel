import mongoose from 'mongoose';

const priceReportSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, enum: ['JPY', 'USD', 'INR'], required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const PriceReport = mongoose.models.PriceReport || mongoose.model('PriceReport', priceReportSchema);

export default PriceReport;