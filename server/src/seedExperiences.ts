import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './models/Tour';

dotenv.config();

const experiences = [
  {
    title: "Overnight Desert Safari",
    slug: "overnight-desert-safari",
    description: "Spend a magical night under the Arabian stars in our luxurious private camp.",
    shortDescription: "Magical night under the Arabian stars in our private camp.",
    price: 299,
    duration: "14 Hours",
    category: "Overnight Safari",
    type: "experience",
    location: "Dubai Desert Reserve",
    rating: 4.9,
    images: ["/evening-safari.png"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrive at the private desert camp at sunset." },
      { day: 1, title: "Dinner", description: "Gourmet BBQ under the stars." },
      { day: 2, title: "Morning", description: "Breakfast and sunrise camel ride." }
    ],
    included: ["Tent Accommodation", "BBQ Dinner", "Breakfast", "Camel Riding"],
    excluded: ["Alcoholic Drinks"]
  },
  {
    title: "Luxury Yacht Charter",
    slug: "luxury-yacht-charter",
    description: "Sail through Dubai Marina on a private yacht with a dedicated crew and gourmet dining.",
    shortDescription: "Sail through Dubai Marina on a private luxury yacht.",
    price: 899,
    duration: "4 Hours",
    category: "Yacht",
    type: "experience",
    location: "Dubai Marina",
    rating: 5.0,
    images: ["/hero-bg.png"],
    itinerary: [
      { day: 1, title: "Boarding", description: "Red carpet welcome at Dubai Marina." },
      { day: 1, title: "Sailing", description: "Cruise past Palm Jumeirah and Burj Al Arab." },
      { day: 1, title: "Dining", description: "Chef-prepared meal onboard." }
    ],
    included: ["Private Yacht", "Crew", "Gourmet Meal", "Soft Drinks"],
    excluded: ["Gratuities"]
  },
  {
    title: "Private Dune Dinner",
    slug: "private-dune-dinner",
    description: "An exclusive dining experience set in a secluded dune with a private chef.",
    shortDescription: "Exclusive dining set in a secluded dune with a private chef.",
    price: 499,
    duration: "5 Hours",
    category: "Private Dining",
    type: "experience",
    location: "Lahbab Desert",
    rating: 4.8,
    images: ["/quad-bike.png"],
    itinerary: [
      { day: 1, title: "Transfer", description: "Private luxury transfer to the dunes." },
      { day: 1, title: "Dining", description: "Private chef prepares a 5-course meal." }
    ],
    included: ["Private Chef", "Luxury Transfer", "5-Course Meal"],
    excluded: ["Additional Activities"]
  },
  {
    title: "VIP Desert Falconry",
    slug: "vip-desert-falconry",
    description: "Learn the ancient art of falconry with our expert handlers in a private setting.",
    shortDescription: "Learn the ancient art of falconry with expert handlers.",
    price: 199,
    duration: "3 Hours",
    category: "Wildlife Falconry",
    type: "experience",
    location: "Al Marmoom",
    rating: 4.7,
    images: ["/evening-safari.png"],
    itinerary: [
      { day: 1, title: "Introduction", description: "Meet the falcons and expert handlers." },
      { day: 1, title: "Experience", description: "Hands-on falconry session." }
    ],
    included: ["Falconry Session", "Expert Guide", "Refreshments"],
    excluded: ["Meals"]
  }
];

const seedExperiences = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dubai-desert-adventures');
    console.log('Connected to MongoDB for experiences seeding...');

    await Tour.insertMany(experiences);
    console.log('4 Experiences seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding experiences:', error);
    process.exit(1);
  }
};

seedExperiences();
