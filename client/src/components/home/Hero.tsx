"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-110"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 block text-xs sm:text-sm">
            The Ultimate Arabian Experience
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 sm:mb-8 leading-tight">
            Discover the Soul <br />
            <span className="gold-gradient italic">of the Desert</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-white/70 mb-8 sm:mb-10 leading-relaxed font-light px-4 sm:px-0">
            Embark on a journey of luxury and adventure. Experience Dubai's most exclusive desert safaris with breathtaking views and premium hospitality.
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/tours" className="gold-btn group flex items-center gap-2 px-8 py-4 rounded-full text-lg">
              Book Your Safari
              <ChevronRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="flex items-center gap-3 text-white hover:text-primary transition-colors group">

              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                <Play className="fill-white group-hover:fill-primary transition-colors" size={20} />
              </div>
              <span className="font-medium">Watch Film</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Statistics */}
      <div className="absolute bottom-10 left-0 w-full hidden md:block">
        <div className="container mx-auto px-6 flex justify-between items-end border-t border-white/10 pt-8">
          <div className="flex gap-16">
            {[
              { label: 'Tours Completed', value: '15K+' },
              { label: 'Happy Guests', value: '50K+' },
              { label: 'Luxury Camps', value: '12' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-serif font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs uppercase tracking-widest text-white/40">Scroll to Explore</p>
            <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
