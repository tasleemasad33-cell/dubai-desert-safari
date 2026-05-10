"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Star, 
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronRight,
  Info,
  Loader2,
  Camera,
  Coffee,
  Car,
  Tent
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const SingleTourPage = () => {
  const { slug } = useParams();
  const { user, token } = useAuth();
  const router = useRouter();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [isBooking, setIsBooking] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tours/${slug}`);
        const data = await response.json();
        if (response.ok) {
          setTour(data);
        } else {
          toast.error('Tour not found');
          router.push('/tours');
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchTour();
  }, [slug, router]);

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login to book a tour');
      router.push('/login');
      return;
    }

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    setIsBooking(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tourId: tour._id,
          tourDate: selectedDate,
          numberOfGuests: guests,
          specialRequests: ''
        })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Booking successful! Redirecting to dashboard...');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        throw new Error(data.message || 'Booking failed');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-primary/20 rounded-full" />
            <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin absolute inset-0" />
            <div className="mt-6 text-primary font-serif italic text-xl animate-pulse">Loading Magic...</div>
        </div>
      </div>
    );
  }

  if (!tour) return null;

  return (
    <main className="min-h-screen bg-background custom-scrollbar pb-32 lg:pb-0">
      <Navbar />

      {/* Cinematic Hero Gallery */}
      <section className="h-[50vh] md:h-[70vh] relative flex overflow-hidden">
        <div className="absolute inset-0 bg-black z-10 opacity-30 pointer-events-none" />
        <div className="w-full lg:w-2/3 h-full relative group cursor-pointer">
          <img src={tour.images?.[0] || '/hero-bg.png'} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="Main" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        <div className="hidden lg:flex w-1/3 flex-col border-l border-white/5">
          <div className="h-1/2 relative group cursor-pointer overflow-hidden">
            <img src={tour.images?.[1] || '/evening-safari.png'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sub 1" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="h-1/2 relative group cursor-pointer overflow-hidden border-t border-white/5">
            <img src={tour.images?.[2] || '/quad-bike.png'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sub 2" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white font-bold uppercase tracking-widest text-sm border border-white/20 px-6 py-3 rounded-full backdrop-blur-md">View Gallery</span>
            </div>
          </div>
        </div>
        
        {/* Floating Title */}
        <div className="absolute bottom-0 left-0 w-full z-20">
            <div className="container mx-auto px-6 pb-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/30 backdrop-blur-md">
                            {tour.category || 'Elite Tour'}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                            <Star size={12} fill="currentColor" />
                            <span className="text-[10px] font-bold">{tour.rating}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight shadow-black drop-shadow-2xl">{tour.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-white/80 text-sm font-medium">
                        <span className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {tour.duration}</span>
                        <span className="flex items-center gap-2"><Users size={16} className="text-primary" /> Max {tour.maxGroupSize || '10'} Guests</span>
                        <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {tour.location}</span>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Sticky Tabs */}
            <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-white/5 pt-4 mb-12 flex gap-8 overflow-x-auto no-scrollbar">
                {['overview', 'itinerary', 'details'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 text-xs font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap",
                            activeTab === tab ? "text-primary" : "text-white/40 hover:text-white"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
                        <section>
                            <h2 className="text-3xl font-serif font-bold mb-6">The <span className="gold-gradient italic">Experience</span></h2>
                            <p className="text-white/60 leading-relaxed text-lg font-light">{tour.description}</p>
                        </section>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="glass-card p-6 rounded-2xl text-center border border-white/5 flex flex-col items-center">
                                <Car size={24} className="text-primary mb-3" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Transport</span>
                                <span className="text-sm font-medium mt-1">Luxury 4x4</span>
                            </div>
                            <div className="glass-card p-6 rounded-2xl text-center border border-white/5 flex flex-col items-center">
                                <Coffee size={24} className="text-primary mb-3" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Dining</span>
                                <span className="text-sm font-medium mt-1">Included</span>
                            </div>
                            <div className="glass-card p-6 rounded-2xl text-center border border-white/5 flex flex-col items-center">
                                <Camera size={24} className="text-primary mb-3" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Photos</span>
                                <span className="text-sm font-medium mt-1">Stops Provided</span>
                            </div>
                            <div className="glass-card p-6 rounded-2xl text-center border border-white/5 flex flex-col items-center">
                                <Tent size={24} className="text-primary mb-3" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Camp</span>
                                <span className="text-sm font-medium mt-1">Private Elite</span>
                            </div>
                        </div>

                        <section className="bg-accent/20 border border-white/5 p-8 md:p-12 rounded-[32px] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                            <h2 className="text-2xl font-serif font-bold mb-8 relative z-10 flex items-center gap-3">
                                <MapPin className="text-primary" /> Seamless Transfers
                            </h2>
                            <p className="text-white/60 leading-relaxed relative z-10">
                                {tour.pickupInfo || 'Complimentary pickup from all major Dubai hotels and central locations. Your dedicated safari captain will arrive in a sanitized, luxury vehicle. You will be contacted via WhatsApp 1 hour prior to your scheduled pickup time.'}
                            </p>
                        </section>
                    </motion.div>
                )}

                {activeTab === 'itinerary' && (
                    <motion.div key="itinerary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <h2 className="text-3xl font-serif font-bold mb-10">Journey <span className="gold-gradient italic">Timeline</span></h2>
                        <div className="space-y-0 relative before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:to-transparent">
                            {tour.itinerary?.length > 0 ? tour.itinerary.map((item: any, i: number) => (
                            <div key={i} className="flex gap-8 relative pb-12 last:pb-0 group">
                                <div className="w-14 h-14 rounded-full bg-background border-4 border-accent flex items-center justify-center shrink-0 z-10 group-hover:border-primary transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                    <span className="text-primary font-bold">{i + 1}</span>
                                </div>
                                <div className="pt-3">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 block">{item.day ? `Stage ${item.day}` : `Phase ${i+1}`}</span>
                                    <h4 className="text-2xl font-serif font-bold text-white mb-3">{item.title}</h4>
                                    <p className="text-white/40 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                            )) : (
                                <p className="text-white/40 italic">A bespoke itinerary will be crafted for you upon booking.</p>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'details' && (
                    <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <section>
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <CheckCircle2 size={16} />
                                    </span>
                                    Included
                                </h2>
                                <ul className="space-y-4">
                                {tour.included?.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-white/70">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    <span className="text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold text-xl">
                                        ×
                                    </span>
                                    Excluded
                                </h2>
                                <ul className="space-y-4">
                                {tour.excluded?.length > 0 ? tour.excluded.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-white/40">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-500/50 shrink-0" />
                                    <span className="text-sm leading-relaxed">{item}</span>
                                    </li>
                                )) : (
                                    <p className="text-white/20 text-sm italic">All essentials are covered in this premium package.</p>
                                )}
                                </ul>
                            </section>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck className="text-primary"/> Important Information</h3>
                            <ul className="text-sm text-white/60 space-y-2 list-disc pl-5">
                                <li>Pregnant women and those with severe back problems are advised against dune bashing. Gentle driving can be requested.</li>
                                <li>Infant seats are available upon request at the time of booking.</li>
                                <li>Vegetarian, vegan, and gluten-free dining options are available (please specify in special requests).</li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* Booking Sidebar / Floating Action Bar on Mobile */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 group perspective-1000 hidden lg:block">
                {/* Animated glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-primary via-primary/20 to-transparent rounded-[42px] blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                <div className="glass-card bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 relative shadow-2xl overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

                    {/* Header */}
                    <div className="flex items-end justify-between mb-8 pb-8 border-b border-white/5 relative z-10">
                        <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                            <Star className="w-3 h-3 text-primary" fill="currentColor" />
                            <span className="text-[9px] uppercase tracking-widest text-primary font-bold">Premium Rate</span>
                        </div>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Price per person</p>
                        <div className="flex items-baseline gap-1">
                            <p className="text-5xl font-serif font-bold text-white">${tour.price}</p>
                            <p className="text-white/40 text-sm">.00</p>
                        </div>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-6 mb-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold block pl-1 flex items-center justify-between">
                                Select Date
                                <span className="text-primary text-[9px]">High Demand</span>
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                <input 
                                    type="date" 
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all cursor-pointer font-medium"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    style={{ colorScheme: 'dark' }}
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold block pl-1">Number of Guests</label>
                            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2 relative overflow-hidden">
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none rounded-2xl" />
                                <button 
                                    onClick={() => setGuests(Math.max(1, guests - 1))}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 text-2xl transition-colors text-white/60 hover:text-white relative z-10"
                                >-</button>
                                <div className="text-center relative z-10">
                                    <span className="font-serif text-2xl font-bold block leading-none mb-1 text-white">{guests}</span>
                                    <span className="text-[9px] text-primary uppercase font-bold tracking-widest">{guests === 1 ? 'Guest' : 'Guests'}</span>
                                </div>
                                <button 
                                    onClick={() => setGuests(guests + 1)}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 text-2xl transition-colors text-white/60 hover:text-white relative z-10"
                                >+</button>
                            </div>
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="flex items-center justify-between py-4 mb-6 border-t border-dashed border-white/10 relative z-10">
                        <span className="text-sm font-medium text-white/60">Total Amount</span>
                        <span className="text-xl font-serif font-bold text-primary">${(tour.price * guests).toLocaleString()}</span>
                    </div>

                    {/* Submit Button */}
                    <button 
                        onClick={handleBooking}
                        disabled={isBooking}
                        className="relative w-full overflow-hidden rounded-2xl group/btn disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_40px_-10px_rgba(197,160,89,0.5)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] group-hover/btn:opacity-90 transition-opacity"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                        <div className="relative py-5 px-6 flex items-center justify-center gap-3 text-black font-bold uppercase tracking-widest text-sm">
                            {isBooking ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    Secure Reservation
                                    <ChevronRight className="transition-transform group-hover/btn:translate-x-1" size={18} />
                                </>
                            )}
                        </div>
                    </button>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4 text-white/50 text-xs text-center relative z-10">
                        <span className="flex items-center justify-center gap-2 font-medium">
                            <ShieldCheck size={16} className="text-primary" /> 
                            Secure Encrypted Booking
                        </span>
                        <span className="flex items-center justify-center gap-2">
                            <Info size={16} className="text-white/30" /> 
                            Free cancellation up to 24h before tour
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Bottom Booking Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-2xl border-t border-white/10 p-4 z-50 lg:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div>
                    <p className="text-[10px] text-primary uppercase tracking-widest font-bold mb-1">Total</p>
                    <p className="text-2xl font-serif font-bold text-white">${(tour.price * guests).toLocaleString()}</p>
                </div>
                <button 
                    onClick={() => {
                        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                        toast('Scroll down to select date & guests.', { icon: '👇' });
                    }}
                    className="gold-btn px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg"
                >
                    Book Now
                </button>
            </div>

            {/* Mobile Form Appends at the very bottom so scroll goes to it */}
             <div className="lg:hidden mt-12 relative overflow-hidden rounded-[2rem] p-[1px]">
                 <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-transparent opacity-50"></div>
                 <div className="relative bg-black/90 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8">
                     <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                        <ShieldCheck className="text-primary w-6 h-6" /> Complete Reservation
                     </h3>
                     <div className="space-y-6 mb-8">
                        <div>
                            <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold block mb-3">Select Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                <input 
                                    type="date" 
                                    min={new Date().toISOString().split('T')[0]} 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 focus:border-primary focus:bg-white/10 transition-colors text-white font-medium" 
                                    value={selectedDate} 
                                    onChange={(e) => setSelectedDate(e.target.value)} 
                                    style={{ colorScheme: 'dark' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] text-white/50 uppercase tracking-widest font-bold block mb-3">Guests</label>
                            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2">
                                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-12 h-12 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center text-xl text-white/70">-</button>
                                <span className="font-serif text-xl font-bold">{guests}</span>
                                <button onClick={() => setGuests(guests + 1)} className="w-12 h-12 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center text-xl text-white/70">+</button>
                            </div>
                        </div>
                     </div>
                     <button onClick={handleBooking} disabled={isBooking} className="gold-btn w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm flex justify-center items-center gap-2 shadow-xl">
                         {isBooking ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                     </button>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default SingleTourPage;


