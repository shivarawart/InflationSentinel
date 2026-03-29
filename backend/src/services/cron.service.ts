import cron from 'node-cron';
import PriceReport from '../models/PriceReport.js';
import CityIndex from '../models/CityIndex.js';

// Run every hour
export const startCronJobs = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('🔄 Running hourly index & alert calculation...');

    // Aggregate city indices (example for groceries)
    const agg = await PriceReport.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      { $group: {
          _id: { city: '$location.city', country: '$location.country', category: '$item' },
          avgPrice: { $avg: '$price' },
          count: { $sum: 1 }
        }
      }
    ]);

    for (const item of agg) {
      await CityIndex.findOneAndUpdate(
        { city: item._id.city, country: item._id.country, category: item._id.category },
        { index: Math.round(item.avgPrice * 100 / 100) }, // simple index
        { upsert: true }
      );
    }

    console.log('✅ City indices updated');
  });
};