// src/routes/barter.routes.ts
import { Router } from 'express';
import { createListing, getListings } from '../controllers/barter.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { findMatches } from '../services/matching.service.js';   // Make sure this import exists

const router = Router();

// Create new barter listing
router.post('/', protect, createListing);

// Get all listings
router.get('/', getListings);

// Find matches for a specific listing  ← This was missing!
router.post('/:id/match', protect, async (req, res) => {
  try {
    const listing = await require('../models/BarterListing').findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const matches = await findMatches(listing);
    
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error finding matches' });
  }
});

export default router;