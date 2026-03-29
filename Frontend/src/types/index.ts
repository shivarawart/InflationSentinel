// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
}

export interface Location {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface PriceReport {
  _id: string;
  item: string;
  price: number;
  currency: 'JPY' | 'USD' | 'INR';
  location: Location;
  reportedBy?: string | { name: string };
  photoUrl?: string;
  createdAt: string;
}

export interface BarterListing {
  _id: string;
  user?: string | User;                    // Can be ID or populated user
  type: 'offer' | 'request';
  title: string;
  description: string;
  tags: string[];
  location: { city: string; country: string };
  status: 'open' | 'matched' | 'closed';
  matchedWith?: string[];
  createdAt?: string;
}

// For populated versions (when backend sends user object)
export interface PopulatedBarterListing extends Omit<BarterListing, 'user'> {
  user?: User;
}