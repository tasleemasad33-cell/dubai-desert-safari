"use client";

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import FeaturedTours from '@/components/home/FeaturedTours';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Star, Award, Crown, Diamond, Gem, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const eliteServices = [
    { title: 'Private Jet Transfers', desc: 'Arrive in Dubai in absolute privacy and comfort.', icon: Crown },
    { title: 'Exclusive Desert Camps', desc: 'Private locations far from the tourist trails.', icon: Diamond },
    { title: 'Elite Fleet', desc: 'The latest models of luxury 4x4s and dune buggies.', icon: Gem },
    { title: 'Michelin Dining', desc: 'Gourmet desert dinner prepared by world-class chefs.', icon: Award },
  ];

  const faqs = [
    { q: "What is the best time for a desert safari?", a: "The best time is between October and April when the weather is pleasant. Evening safaris (3 PM - 9 PM) are most popular for the sunset views and cooler temperatures." },
    { q: "What should I wear for the safari?", a: "Loose, comfortable clothing is recommended. Light colors reflect heat. For evening/overnight safaris, bring a light jacket as the desert can get cool at night." },
    { q: "Is it safe for children and elderly?", a: "We provide specialized luxury tours with gentler dune driving for families and elderly guests. Our priority is your safety and comfort." },
    { q: "Can I book a private experience?", a: "Yes, we specialize in VIP private tours tailored to your specific requirements, including private pickups, dedicated chefs, and exclusive camp locations." }
  ];

  return (
    <main className="relative min-h-screen bg-background text-foreground custom-scrollbar">
      <Navbar />
      <Hero />
      
      {/* Featured Experiences */}
      <FeaturedTours />

      {/* Brand Story Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10">
                <img 
                  src="/hero-bg.png" 
                  alt="Dubai Luxury" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="glass-card p-6 rounded-2xl">
                    <p className="text-primary font-bold text-lg mb-1">12+ Years</p>
                    <p className="text-white/60 text-xs uppercase tracking-widest">Of Unrivaled Excellence</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
            </motion.div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-primary font-medium tracking-[0.4em] uppercase block text-sm"
                >
                  Beyond Adventure
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-serif font-bold leading-[1.1]"
                >
                  Crafting <span className="gold-gradient italic">Arabian</span> <br />
                  Masterpieces
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-xl leading-relaxed font-light text-balance"
              >
                Dubai Desert Adventures was born from a vision to elevate the traditional safari into a world-class luxury experience. We don't just offer tours; we curate cinematic journeys through the golden dunes, blending raw natural beauty with five-star Arabian hospitality.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Crown className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">VIP Exclusivity</h4>
                    <p className="text-white/40 text-sm">Private access to the most pristine desert conservation areas.</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Elite Safety</h4>
                    <p className="text-white/40 text-sm">Expert guides and a fleet of meticulously maintained vehicles.</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/about" className="gold-btn px-10 py-5 rounded-full inline-flex items-center gap-3 group">
                  Explore Our Legacy
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Services Section */}
      <section className="py-32 bg-surface/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-medium tracking-[0.4em] uppercase block text-xs mb-4">Elite Concierge</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Unrivaled <span className="gold-gradient italic">Luxury Services</span></h2>
            <p className="text-white/40 text-lg font-light">We go above and beyond to ensure your journey is as seamless as it is spectacular.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eliteServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 rounded-[32px] hover:border-primary/40 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8">
              <span className="text-primary font-medium tracking-[0.4em] uppercase block text-xs">Guest Perspectives</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Voices of <br /><span className="gold-gradient italic">The Elite</span></h2>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} className="text-primary" fill="currentColor" />)}
              </div>
              <p className="text-white/60 text-lg font-light italic leading-relaxed">
                "The most incredible experience of my life. From the private helicopter arrival to the candle-lit dinner under the stars, every detail was perfection. Dubai Desert Adventures truly understands the meaning of luxury."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 overflow-hidden border-2 border-primary/40">
                  <img src="/evening-safari.png" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Alexandra von Berg</h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Global Travel Critic</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-6 animate-float">
                <div className="space-y-6 pt-12">
                  <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
                    <img src="/quad-bike.png" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                    <img src="/hero-bg.png" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                    <img src="/evening-safari.png" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
                    <img src="/quad-bike.png" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-surface/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Common <span className="gold-gradient italic">Inquiries</span></h2>
            <p className="text-white/40">Everything you need to know before your adventure.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className="border border-white/5 rounded-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-white/90">{faq.q}</span>
                  <ChevronDown className={cn("text-primary transition-transform duration-500", activeFaq === i ? "rotate-180" : "")} size={20} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === i ? 'auto' : 0, opacity: activeFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-white/50 text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30" style={{ backgroundImage: 'url("/hero-bg.png")' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8">Ready for the <span className="gold-gradient italic">Extraordinary?</span></h2>
            <p className="text-xl text-white/60 mb-12 font-light">Spaces are limited. Secure your private Arabian experience today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/tours" className="gold-btn px-12 py-6 rounded-full text-xl shadow-2xl">
                Book Your Experience
              </Link>
              <Link href="/contact" className="px-12 py-6 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 text-xl backdrop-blur-md">
                Contact Concierge
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-50 w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_40px_-10px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform duration-300 group"
      >
        <MessageSquare size={32} className="text-white group-hover:scale-110 transition-transform" />
      </a>

      {/* Premium Footer */}
      <footer className="bg-black border-t border-white/5 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-6">
              <Link href="/" className="text-3xl font-serif font-bold tracking-tighter block">
                <span className="text-primary">DUBAI</span>
                <span className="text-white ml-1">DESERT</span>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed">
                The pinnacle of luxury desert tourism in Dubai. Award-winning experiences since 2012.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><Link href="/tours" className="hover:text-primary transition-colors">Luxury Safaris</Link></li>
                <li><Link href="/experiences" className="hover:text-primary transition-colors">Exclusive Experiences</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">Our Legacy</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Concierge</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
              <p className="text-white/40 text-xs mb-4">Receive exclusive offers and desert insights.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary/50" />
                <button className="gold-btn px-4 rounded-lg"><ArrowRight size={18} /></button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Location</h4>
              <p className="text-white/40 text-sm">
                Sheikh Zayed Road, Elite Tower<br />
                Office 402, Dubai, UAE
              </p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs tracking-widest uppercase">© 2026 Dubai Desert Adventures. All rights reserved.</p>
            <div className="flex gap-8 text-white/20 text-xs uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

