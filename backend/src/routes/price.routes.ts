import { Router } from 'express';
import {
  reportPrice,
  getPrices,
  getCityIndices,
} from '../controllers/price.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import PriceReport from '../models/PriceReport.js';

const router = Router();

// Public routes
router.get('/', getPrices);              // GET /api/prices
router.get('/indices', getCityIndices); // GET /api/prices/indices

// Protected routes
router.post('/report', protect, reportPrice); // POST /api/prices/report
router.get('/latest/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const latest = await PriceReport.find({ 'location.city': city })
      .sort({ createdAt: -1 })
      .limit(1);
    res.json(latest);
  } catch (err: any) {
    res.status(500).json({ message: 'Error fetching latest price', error: err.message });
  }
});

export default router;