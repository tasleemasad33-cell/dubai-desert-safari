import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './models/Tour';

dotenv.config();

const tours = [
  {
    title: "Premium Evening Desert Safari",
    slug: "premium-evening-desert-safari",
    description: "Experience the magic of the Arabian desert as the sun sets. Enjoy dune bashing, camel riding, and a gourmet BBQ dinner under the stars.",
    shortDescription: "Sunset dune bashing, camel rides & gourmet BBQ dinner.",
    price: 150,
    duration: "6 Hours",
    category: "Luxury Safari",
    location: "Dubai Desert",
    rating: 4.9,
    images: ["/evening-safari.png"],
    itinerary: [
      { day: 1, title: "Pickup", description: "Luxury 4x4 pickup from your hotel." },
      { day: 1, title: "Dune Bashing", description: "Thrilling 45-minute dune bashing experience." },
      { day: 1, title: "Sunset Photo", description: "Stop for photos at the highest dune." },
      { day: 1, title: "Dinner", description: "International BBQ buffet at our private camp." }
    ],
    included: ["Hotel Pickup & Drop-off", "Dune Bashing", "BBQ Dinner", "Camel Riding", "Sandboarding", "Unlimited Drinks"],
    highlights: ["Sunset Photo Opportunity", "VIP Seating Area", "Live Entertainment Shows"]
  },
  {
    title: "Private Dune Buggy Adventure",
    slug: "private-dune-buggy-adventure",
    description: "Take control of a high-performance 2000cc dune buggy and conquer the red sands of Lahbab. Pure adrenaline and unmatched views.",
    shortDescription: "High-speed 2000cc buggy desert adventure.",
    price: 299,
    duration: "4 Hours",
    category: "Adventure",
    location: "Lahbab Desert",
    rating: 4.8,
    images: ["/quad-bike.png"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Safety briefing and gear setup." },
      { day: 1, title: "Buggy Tour", description: "2 hours of self-drive buggy adventure with guide." },
      { day: 1, title: "Refreshments", description: "Chilled water and snacks in the desert." }
    ],
    included: ["Self-drive Buggy", "Safety Gear", "Professional Guide", "Refreshments"],
    highlights: ["High-performance Buggies", "Open Desert Tracks", "GoPro Recording Available"]
  }
];


const seedTours = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dubai-desert-adventures');
    console.log('Connected to MongoDB for tour seeding...');

    await Tour.deleteMany({});
    console.log('Cleared existing tours.');

    await Tour.insertMany(tours);
    console.log('Tours seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding tours:', error);
    process.exit(1);
  }
};

seedTours();
