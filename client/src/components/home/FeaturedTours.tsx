import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TourCard from '../TourCard';
import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const FeaturedTours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/tours`);
        const data = await response.json();
        if (response.ok) {
          setTours(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 block text-xs sm:text-sm"
            >
              Curated Experiences
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold"
            >
              Our Most Popular <br />
              <span className="gold-gradient italic">Luxury Safaris</span>
            </motion.h2>
          </div>
          <Link 
            href="/tours"
            className="mt-6 sm:mt-8 md:mt-0 flex items-center gap-2 text-white hover:text-primary transition-colors font-medium border-b border-white/10 pb-1 text-sm sm:text-base w-fit group"
          >
            View All Tours <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour: any, index: number) => (
              <motion.div
                key={tour._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


export default FeaturedTours;
