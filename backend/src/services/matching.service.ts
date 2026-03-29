// src/services/matching.service.ts
import BarterListing from '../models/BarterListing.js';

export const findMatches = async (newListing: any) => {
  try {
    // Find potential matches in the same city & country, excluding itself
    const potentialMatches = await BarterListing.find({
      status: 'open',
      _id: { $ne: newListing._id },
      'location.city': newListing.location.city,
      'location.country': newListing.location.country,
    });

    const goodMatches: any[] = [];

    for (const listing of potentialMatches) {
      // Rule-based matching: at least 2 common tags + opposite type (offer vs request)
      const commonTags = listing.tags.filter((tag: string) =>
        newListing.tags.includes(tag)
      );

      if (commonTags.length >= 2 && listing.type !== newListing.type) {
        goodMatches.push(listing);

        // Auto-link them (update both listings)
        if (!newListing.matchedWith) newListing.matchedWith = [];
        if (!listing.matchedWith) listing.matchedWith = [];

        newListing.matchedWith.push(listing._id);
        listing.matchedWith.push(newListing._id);

        await listing.save();
      }
    }

    // Save the new listing if it was modified
    if (newListing.matchedWith && newListing.matchedWith.length > 0) {
      await newListing.save();
    }

    return goodMatches;
  } catch (err) {
    console.error('Error in findMatches:', err);
    return [];
  }
};

// Bonus function (optional - useful for future "Recommended for you" section)
export const getSuggestedMatchesForUser = async (userId: string, city: string, country: string) => {
  try {
    return await BarterListing.find({
      status: 'open',
      'location.city': city,
      'location.country': country,
      user: { $ne: userId }
    }).limit(20);
  } catch (err) {
    console.error(err);
    return [];
  }
};