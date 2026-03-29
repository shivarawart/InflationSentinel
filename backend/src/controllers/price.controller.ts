import { Request, Response } from 'express';
import PriceReport from '../models/PriceReport.js';
import { emitPriceUpdate } from '../utils/socket.js';
import CityIndex from '../models/CityIndex.js';   // ← Fixed the require()

export const reportPrice = async (req: Request, res: Response) => {
  try {
    const price = await PriceReport.create({
      ...req.body,
      reportedBy: req.user?.id,        // Now TypeScript is happy
    });

    emitPriceUpdate(price);            // Live update to all connected map clients
    res.status(201).json(price);
  } catch (error: any) {
    res.status(500).json({ message: 'Error reporting price', error: error.message });
  }
};

export const getPrices = async (req: Request, res: Response) => {
  try {
    const { city, country } = req.query;

    const query: any = {};
    if (city) query['location.city'] = city;
    if (country) query['location.country'] = country;

    const prices = await PriceReport.find(query)
      .sort({ createdAt: -1 })
      .limit(500)
      .populate('reportedBy', 'name');   // Optional: show who reported

    res.json(prices);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching prices', error: error.message });
  }
};

export const getCityIndices = async (req: Request, res: Response) => {
  try {
    const indices = await CityIndex.find({}).sort({ lastUpdated: -1 });
    res.json(indices);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching city indices', error: error.message });
  }
};