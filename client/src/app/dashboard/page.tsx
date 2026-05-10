"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Settings, User, CreditCard, ChevronRight, Loader2, Calendar, MapPin, Bell, Shield, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user, token, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const response = await fetch(`https://server-one-alpha-61.vercel.app/api/bookings/my`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setBookings(data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyBookings();
    }
  }, [token]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const upcomingBookings = bookings.filter((b: any) => new Date(b.tourDate) >= new Date());
  const pastBookings = bookings.filter((b: any) => new Date(b.tourDate) < new Date());

  const handleLogout = () => {
    logout();
    router.push('/');
    toast.success('Logged out successfully');
  };

  const renderContent = () => {
    switch(activeTab) {
        case 'bookings':
            return (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <header className="mb-12">
                        <h1 className="text-4xl font-serif font-bold mb-2">My <span className="gold-gradient italic">Adventures</span></h1>
                        <p className="text-white/40">Manage your upcoming and past desert experiences.</p>
                    </header>

                    <section className="mb-12">
                        <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        Upcoming Experiences
                        </h2>
                        {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="animate-spin text-primary" />
                        </div>
                        ) : upcomingBookings.length === 0 ? (
                        <div className="glass-card rounded-[32px] p-12 text-center border-dashed border-2 border-white/5">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar size={32} className="text-white/20" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-2">No Upcoming Adventures</h3>
                            <p className="text-white/40 mb-8 max-w-md mx-auto">Your next extraordinary journey awaits. Discover our elite collections and secure your spot today.</p>
                            <button onClick={() => router.push('/tours')} className="gold-btn px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs">Explore Experiences</button>
                        </div>
                        ) : (
                        <div className="space-y-6">
                            {upcomingBookings.map((booking: any, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card p-6 md:p-8 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all duration-500 group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="w-full md:w-32 h-48 md:h-32 rounded-2xl bg-black overflow-hidden border border-white/10 relative">
                                    <img src={booking.tour?.images?.[0] || "/evening-safari.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Tour" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
                                </div>
                                <div>
                                    <span className="text-primary text-[10px] uppercase font-bold tracking-widest mb-2 block">Confirmed</span>
                                    <h3 className="text-2xl font-serif font-bold mb-2">{booking.tour?.title || 'Luxury Desert Safari'}</h3>
                                    <div className="flex flex-wrap gap-4 text-xs text-white/40 font-medium">
                                        <span className="flex items-center gap-1"><Calendar size={14} className="text-primary"/> {new Date(booking.tourDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span className="flex items-center gap-1"><User size={14} className="text-primary"/> {booking.numberOfGuests} VIP Guests</span>
                                    </div>
                                </div>
                                </div>
                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                                <div className="text-left md:text-right">
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total Paid</p>
                                    <p className="text-3xl font-serif font-bold text-white">${booking.totalPrice}</p>
                                </div>
                                <button className="px-6 py-2.5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Manage</button>
                                </div>
                            </motion.div>
                            ))}
                        </div>
                        )}
                    </section>

                    <section>
                        <h2 className="text-xl font-serif font-bold mb-6 text-white/40">Past Adventures</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pastBookings.length === 0 ? (
                            <p className="text-white/20 text-sm italic col-span-2">Your journey with us has yet to begin.</p>
                        ) : (
                            pastBookings.map((booking: any, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <MapPin size={20} className="text-white/40" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">{booking.tour?.title || 'Tour'}</h4>
                                    <p className="text-xs text-white/40">{new Date(booking.tourDate).toLocaleDateString()}</p>
                                </div>
                                </div>
                                <ChevronRight size={18} className="text-white/20" />
                            </div>
                            ))
                        )}
                        </div>
                    </section>
                </motion.div>
            );
        case 'wishlist':
            return (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <header className="mb-12">
                        <h1 className="text-4xl font-serif font-bold mb-2">Saved <span className="gold-gradient italic">Experiences</span></h1>
                        <p className="text-white/40">Curate your dream Dubai itinerary.</p>
                    </header>
                    <div className="glass-card rounded-[32px] p-16 text-center border border-white/5">
                        <Heart size={48} className="text-white/10 mx-auto mb-6" />
                        <h3 className="text-2xl font-serif font-bold mb-2">Your wishlist is empty</h3>
                        <p className="text-white/40 mb-8 max-w-sm mx-auto">Explore our tours and click the heart icon to save your favorites for later.</p>
                        <button onClick={() => router.push('/tours')} className="gold-btn px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest">Discover Tours</button>
                    </div>
                </motion.div>
            );
        case 'payments':
            return (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <header className="mb-12">
                        <h1 className="text-4xl font-serif font-bold mb-2">Payment <span className="gold-gradient italic">Methods</span></h1>
                        <p className="text-white/40">Manage your billing information securely.</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="glass-card p-8 rounded-[32px] relative overflow-hidden group border border-primary/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <CreditCard size={32} className="text-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full">Primary</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-mono text-xl tracking-widest">•••• •••• •••• 4242</p>
                                    <p className="text-white/40 text-xs">Expires 12/28</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-8 rounded-[32px] flex flex-col items-center justify-center border-dashed border-2 border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <span className="text-2xl">+</span>
                            </div>
                            <p className="text-sm font-bold">Add New Method</p>
                        </div>
                    </div>
                </motion.div>
            );
        case 'settings':
            return (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <header className="mb-12">
                        <h1 className="text-4xl font-serif font-bold mb-2">Profile <span className="gold-gradient italic">Settings</span></h1>
                        <p className="text-white/40">Update your personal information and preferences.</p>
                    </header>
                    <div className="glass-card rounded-[32px] p-8 md:p-12">
                        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/5">
                            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif text-4xl border border-primary/30">
                                {user.name?.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">{user.name}</h3>
                                <p className="text-white/40">{user.email}</p>
                                <button className="mt-4 text-xs text-primary font-bold uppercase tracking-widest hover:underline">Change Avatar</button>
                            </div>
                        </div>
                        
                        <div className="space-y-6 max-w-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Full Name</label>
                                    <input type="text" defaultValue={user.name} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Email Address</label>
                                    <input type="email" defaultValue={user.email} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Phone Number</label>
                                <input type="tel" placeholder="+971 50 123 4567" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:outline-none" />
                            </div>
                            <div className="pt-6">
                                <button className="gold-btn px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        default:
            return null;
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Aesthetic Header Banner */}
      <div className="h-64 md:h-80 w-full relative -mt-20">
          <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/40" />
      </div>

      <div className="container mx-auto px-6 relative -mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-[32px] p-8 sticky top-32">
              <div className="flex flex-col items-center text-center mb-10 pb-8 border-b border-white/5">
                <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <User size={40} className="text-primary relative z-10" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-1">{user.name}</h3>
                <p className="text-white/40 text-xs font-mono">{user.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'bookings', name: 'My Adventures', icon: ShoppingBag },
                  { id: 'wishlist', name: 'Saved Tours', icon: Heart },
                  { id: 'payments', name: 'Billing Info', icon: CreditCard },
                  { id: 'settings', name: 'Preferences', icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 relative overflow-hidden group",
                      activeTab === item.id 
                        ? "text-black" 
                        : "text-white/40 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {activeTab === item.id && (
                        <motion.div layoutId="dashboard-tab" className="absolute inset-0 bg-primary z-0" />
                    )}
                    <div className="flex items-center gap-3 relative z-10">
                        <item.icon size={16} className={cn(activeTab === item.id ? "text-black" : "text-primary")} />
                        {item.name}
                    </div>
                    {activeTab === item.id && <ChevronRight size={14} className="relative z-10" />}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-white/5">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/40 hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-300"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 pb-20">
             <AnimatePresence mode="wait">
                 {renderContent()}
             </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
};

export default UserDashboard;


