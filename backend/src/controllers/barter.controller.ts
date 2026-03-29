import { Request, Response } from 'express';
import BarterListing from '../models/BarterListing.js'
import { findMatches } from '../services/matching.service.js';

export const createListing = async (req: Request, res: Response) => {
  const listing = await BarterListing.create({ ...req.body, user: req.user?.id });
  const matches = await findMatches(listing);
  res.status(201).json({ listing, matches });
};

export const getListings = async (req: Request, res: Response) => {
  try {
    const listings = await BarterListing.find({ status: 'open' })
      .populate('user', 'name city country')   // This helps "My Listings" tab work
      .lean();  // Better performance
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings' });
  }
};