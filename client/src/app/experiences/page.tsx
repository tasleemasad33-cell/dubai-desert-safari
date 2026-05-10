"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Compass, Anchor, Utensils, Tent, Star, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const getIcon = (category: string = '') => {
  const cat = category.toLowerCase();
  if (cat.includes('yacht') || cat.includes('boat') || cat.includes('water')) return <Anchor className="text-primary w-8 h-8" />;
  if (cat.includes('dinner') || cat.includes('food') || cat.includes('dining')) return <Utensils className="text-primary w-8 h-8" />;
  if (cat.includes('falcon') || cat.includes('wildlife')) return <Compass className="text-primary w-8 h-8" />;
  return <Tent className="text-primary w-8 h-8" />;
};

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/tours?type=experience`);
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Exclusive Collections</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight"
          >
            Curated <br/>
            <span className="gold-gradient italic">Experiences</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-white/60 text-lg mb-12 font-light leading-relaxed"
          >
            Beyond the dunes, we offer a world of luxury and adventure. From yacht charters to private desert dinners, discover the heights of Dubai's hospitality tailored exclusively for you.
          </motion.p>
        </div>
      </section>

      {/* Signature Experiences Grid */}
      <section className="py-20 relative">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Signature <span className="gold-gradient italic">Collection</span></h2>
              <p className="text-white/60 max-w-xl">Immerse yourself in our meticulously crafted experiences designed to create unforgettable memories.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-primary w-12 h-12" />
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 text-xl font-serif italic">New bespoke experiences are being crafted. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={exp._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden relative shrink-0">
                    <img 
                      src={exp.images?.[0] || "/hero-bg.png"} 
                      alt={exp.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                      <span className="text-white font-bold text-sm">${exp.price}</span>
                    </div>
                  </div>
                  
                  <div className="p-8 relative flex-1 flex flex-col">
                    <div className="absolute -top-12 left-8 w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-primary/50 transition-colors">
                      {getIcon(exp.category)}
                    </div>
                    <h3 className="text-2xl font-serif font-bold mt-4 mb-3 group-hover:text-primary transition-colors line-clamp-1">{exp.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{exp.shortDescription || exp.description}</p>
                    
                    <Link href={`/tours/${exp.slug}`} className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest group/link mt-auto">
                      Explore Details
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bespoke Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Craft Your <br/>
                <span className="gold-gradient italic">Bespoke Journey</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Looking for something truly unique? Our concierge team specializes in creating tailor-made itineraries. Whether it's a romantic proposal in the dunes or a corporate retreat, we turn your vision into reality.
              </p>
              <ul className="space-y-4">
                {['Personalized Itineraries', 'Dedicated Concierge', 'Exclusive Access', 'Unmatched Privacy'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link href="/contact" className="gold-btn px-8 py-4 rounded-xl font-bold uppercase tracking-widest inline-flex items-center gap-3">
                  Contact Concierge
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden border border-primary/20 p-2"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img src="/hero-bg.png" alt="Bespoke Experience" className="w-full h-full object-cover rounded-[2.5rem] relative z-10 grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExperiencesPage;
