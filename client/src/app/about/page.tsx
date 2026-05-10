"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Award, Shield, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 relative z-10"
            >
              <span className="text-primary font-medium tracking-[0.3em] uppercase block text-sm">The Legacy</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                Redefining Luxury <br />
                <span className="gold-gradient italic">in the Dunes</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed font-light max-w-xl">
                Since 2012, Dubai Desert Adventures has pioneered high-end tourism in the Arabian desert. We started with a simple vision: to provide a desert safari experience that completely transforms the standard of luxury.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <h4 className="text-4xl font-serif font-bold text-white mb-2">12<span className="text-primary">+</span></h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold text-white mb-2">50<span className="text-primary">k</span></h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Happy Guests</p>
                </div>
                <div className="hidden md:block">
                  <h4 className="text-4xl font-serif font-bold text-white mb-2">15<span className="text-primary">+</span></h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Awards Won</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group"
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
              <img 
                src="/hero-bg.png" 
                alt="About Us" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
              
              <div className="absolute bottom-10 left-10 z-30">
                <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center mb-6">
                  <Award className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Excellence in Tourism</h3>
                <p className="text-white/60 text-sm mt-2">Recognized globally for luxury</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white/5 relative border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              Our <span className="gold-gradient italic">Philosophy</span>
            </motion.h2>
            <p className="text-white/60 text-lg">We believe that true luxury lies in the details, the exclusivity, and the uninterrupted connection with nature.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Shield className="w-10 h-10 text-primary" />,
                title: "Uncompromising Quality",
                desc: "From our fleet of luxury vehicles to our gourmet dining, every element is curated to the highest standard."
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: "Expert Guides",
                desc: "Our safari captains are highly trained, passionate locals who share the rich history of the dunes."
              },
              {
                icon: <Clock className="w-10 h-10 text-primary" />,
                title: "Impeccable Timing",
                desc: "We respect your time, ensuring seamless transitions, precise pickups, and perfectly timed golden hour views."
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass-card p-10 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-black rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{value.title}</h3>
                <p className="text-white/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[150px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass p-16 rounded-[3rem] border border-primary/30 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/30 rounded-full blur-[80px]" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready to Experience <br/><span className="gold-gradient italic">The Extraordinary?</span></h2>
            <p className="text-white/70 text-xl mb-12 max-w-2xl mx-auto font-light">
              Join the thousands of guests who have discovered the magic of the desert with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/tours" className="gold-btn px-10 py-5 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 group">
                View Our Tours
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="px-10 py-5 rounded-xl font-bold uppercase tracking-widest border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
