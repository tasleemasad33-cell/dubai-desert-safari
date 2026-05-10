"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6"
            >
              Get in <span className="gold-gradient italic">Touch</span>
            </motion.h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Ready for your next adventure? Contact our luxury travel consultants today to plan your exclusive Dubai desert experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="glass p-8 rounded-3xl flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-1">Call Us</h4>
                  <p className="text-white/40 text-sm">+971 4 123 4567</p>
                  <p className="text-white/40 text-sm">+971 50 987 6543</p>
                </div>
              </div>
              <div className="glass p-8 rounded-3xl flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-1">Email Us</h4>
                  <p className="text-white/40 text-sm">info@dubaidesert.com</p>
                  <p className="text-white/40 text-sm">bookings@dubaidesert.com</p>
                </div>
              </div>
              <div className="glass p-8 rounded-3xl flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-1">Visit Us</h4>
                  <p className="text-white/40 text-sm">Sheikh Zayed Road, Dubai</p>
                  <p className="text-white/40 text-sm">United Arab Emirates</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="glass p-10 rounded-3xl h-full">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Email Address</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Interested Experience</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                      <option>Evening Desert Safari</option>
                      <option>VIP Overnight Safari</option>
                      <option>Dune Buggy Adventure</option>
                      <option>Luxury Yacht Tour</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Your Message</label>
                    <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" className="md:col-span-2 gold-btn py-4 rounded-xl text-lg mt-4">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
