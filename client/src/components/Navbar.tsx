"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // We only show the user-specific parts after mounting to avoid hydration mismatch
  const isLoggedIn = mounted && !!user;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4',
        mounted && isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent'
      )}
    >

      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-serif font-bold tracking-tighter flex items-center"
          >
            <span className="text-primary">DUBAI</span>
            <span className="text-white ml-1">DESERT</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button className="text-white/70 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link 
                href={user?.role === 'admin' ? '/admin' : '/dashboard'} 
                className="text-sm font-medium text-primary hover:text-white transition-colors flex items-center gap-2"
              >
                <User size={18} />
                {user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="gold-btn px-6 py-2 rounded-full text-sm">
              Book Now
            </Link>
          )}
        </div>


        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
                <span className="text-primary">DUBAI</span>
                <span className="text-white ml-1">DESERT</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className="text-4xl font-serif font-bold text-white/90 hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/10 space-y-6">
              {isLoggedIn ? (
                <div className="space-y-4">
                  <Link 
                    href={user?.role === 'admin' ? '/admin' : '/dashboard'}
                    className="text-2xl font-serif font-bold text-primary block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="text-lg text-white/50 block"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="gold-btn w-full py-4 rounded-2xl text-center text-lg block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                </Link>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};



export default Navbar;
