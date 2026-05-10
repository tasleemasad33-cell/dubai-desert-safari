"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TourCard from '@/components/TourCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Loader2, X, MapPin, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ToursPage = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/tours`);
        const data = await response.json();
        if (response.ok) {
          setTours(data);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const categories = ['All', 'Luxury Safari', 'Adventure', 'VIP Experience', 'Private Tour', 'City Tour'];

  const filteredTours = tours.filter((tour: any) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background custom-scrollbar">
      <Navbar />
      
      {/* Cinematic Page Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center scale-110" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-medium tracking-[0.4em] uppercase block text-sm mb-6"
          >
            Elite Collections
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-8"
          >
            Signature <span className="gold-gradient italic">Experiences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/60 text-lg font-light"
          >
            From the golden dunes to the azure waters, discover our curated collection of Dubai's most prestigious adventures.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-white/5 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="text"
                placeholder="Search by experience, location or theme..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                      selectedCategory === cat 
                        ? "bg-primary text-black" 
                        : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white transition-all text-sm font-bold"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <div className="w-20 h-20 relative">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-white/20 font-serif italic text-xl">Curating your next adventure...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode='popLayout'>
                {filteredTours.map((tour: any, index: number) => (
                  <motion.div
                    key={tour._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TourCard tour={tour} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredTours.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40"
            >
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <Search size={40} className="text-white/20" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-white mb-4">No Matches Found</h3>
              <p className="text-white/40 max-w-md mx-auto mb-10">We couldn't find any experiences matching your current search. Try adjusting your filters or browsing our elite collections.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="gold-btn px-10 py-4 rounded-full"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Luxury Upsell Footer Section */}
      <section className="py-32 bg-surface/30 border-t border-white/5">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-4xl font-serif font-bold mb-8 italic">Can't find exactly what <span className="gold-gradient">you're looking for?</span></h2>
            <p className="text-white/40 text-lg font-light mb-12">Our concierge team specializes in crafting bespoke journeys tailored to your exact desires. From private camp takeovers to surprise engagement settings, let us create your masterpiece.</p>
            <Link href="/contact" className="px-12 py-5 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-sm">
                Request Bespoke Journey
            </Link>
        </div>
      </section>
    </main>
  );
};

export default ToursPage;

