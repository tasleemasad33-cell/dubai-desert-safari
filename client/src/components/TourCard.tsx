"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';


interface TourCardProps {
  tour: {
    _id?: string;
    title: string;
    slug?: string;
    images?: string[];
    image?: string; // fallback for static
    price: number;
    duration: string;
    rating: number;
    location: string;
    category: string;
  };
}

const TourCard = ({ tour }: TourCardProps) => {
  const displayImage = tour.images && tour.images.length > 0 ? tour.images[0] : (tour.image || '/hero-bg.png');
  const tourSlug = tour.slug || tour.title.toLowerCase().replace(/ /g, '-');

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-accent/30 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500"
    >
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={displayImage}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-primary border border-primary/20">
          {tour.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(tour.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-xs text-white/50">({tour.rating})</span>
        </div>

        <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
          {tour.title}
        </h3>

        <div className="flex items-center justify-between border-t border-white/5 pt-4 mb-6">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Clock size={16} className="text-primary" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <MapPin size={16} className="text-primary" />
            {tour.location}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">From</p>
            <p className="text-2xl font-serif font-bold text-white">${tour.price}</p>
          </div>
          <Link 
            href={`/tours/${tourSlug}`}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300"
          >
            <ChevronRight className="group-hover:text-black" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
};


export default TourCard;
