import BarterListing from '../models/BarterListing.js';

export const findMatches = async (newListing: any) => {
  // Simple but powerful rule-based + predictive matching (AI-free)
  const potential = await BarterListing.find({
    status: 'open',
    _id: { $ne: newListing._id },
    location: { city: newListing.location.city, country: newListing.location.country }
  });

  const matches = potential.filter((listing: any) => {
    // Match if at least 2 tags overlap
    const overlap = listing.tags.filter((tag: string) => newListing.tags.includes(tag));
    return overlap.length >= 2 && listing.type !== newListing.type;
  });

  // Auto-link matches
  for (const match of matches) {
    newListing.matchedWith.push(match._id);
    match.matchedWith.push(newListing._id);
    await match.save();
  }
  await newListing.save();

  return matches;
};