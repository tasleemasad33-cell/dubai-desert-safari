"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Calendar, Loader2, ArrowUpRight, Bell, Search, Filter, MoreHorizontal, Download, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings/all`, {
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
      fetchBookings();
    }
  }, [token]);

  if (authLoading || (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const totalRevenue = bookings.reduce((sum, b: any) => sum + b.totalPrice, 0);

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12.5%', color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-500' },
    { label: 'Total Bookings', value: bookings.length.toString(), icon: Calendar, trend: '+8.2%', color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-500' },
    { label: 'Active Users', value: '1.2K', icon: Users, trend: '+15.3%', color: 'from-purple-500/20 to-purple-500/5', iconColor: 'text-purple-500' },
    { label: 'Conversion', value: '3.4%', icon: TrendingUp, trend: '+4.1%', color: 'from-primary/20 to-primary/5', iconColor: 'text-primary' },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/40 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-serif font-bold tracking-tight">Executive <span className="gold-gradient">Command</span></h1>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <p className="text-white/40 text-xs uppercase tracking-widest hidden md:block">Real-time Operations</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-primary/40 w-64 transition-all"
              />
            </div>
            <button className="relative text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-xs font-bold">{user.name}</p>
                <p className="text-[10px] text-primary uppercase tracking-widest">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark p-px">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <Users size={20} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-serif font-bold mb-2"
                >
                  Dashboard <span className="gold-gradient italic">Overview</span>
                </motion.h2>
                <p className="text-white/40">Monitoring the pulse of Dubai Desert Adventures.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
                  <Download size={16} /> Export
                </button>
                <button 
                  onClick={() => router.push('/admin/tours')}
                  className="gold-btn flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold"
                >
                  <Plus size={16} /> New Experience
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "relative p-6 rounded-3xl border border-white/5 overflow-hidden group hover:border-primary/20 transition-all duration-500 bg-gradient-to-br",
                    stat.color
                  )}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-black/40 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                        <stat.icon size={24} className={stat.iconColor} />
                      </div>
                      <div className={cn("flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-black/40", stat.iconColor)}>
                        {stat.trend} <ArrowUpRight size={12} />
                      </div>
                    </div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
                  </div>
                  {/* Decorative Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity Table */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-card rounded-[32px] overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-xl font-serif font-bold">Recent <span className="text-primary">Reservations</span></h3>
                  <button onClick={() => router.push('/admin/bookings')} className="text-xs font-bold text-white/40 hover:text-primary transition-colors flex items-center gap-1">
                    Manage All <ArrowUpRight size={14} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-20 flex justify-center">
                      <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-white/20 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                          <th className="px-8 py-4 font-bold">Customer</th>
                          <th className="px-8 py-4 font-bold">Experience</th>
                          <th className="px-8 py-4 font-bold">Amount</th>
                          <th className="px-8 py-4 font-bold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {bookings.slice(0, 6).map((booking: any, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-primary border border-white/5">
                                  {booking.user?.name?.charAt(0) || 'G'}
                                </div>
                                <span className="text-sm font-medium">{booking.user?.name || 'Guest'}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <p className="text-sm text-white/70">{booking.tour?.title}</p>
                              <p className="text-[10px] text-white/30 uppercase">{new Date(booking.tourDate).toLocaleDateString()}</p>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-sm font-bold text-primary">${booking.totalPrice}</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/20 hover:text-white">
                                <MoreHorizontal size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>

              {/* Performance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-[32px] p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-serif font-bold">Performance</h3>
                  <Filter size={18} className="text-white/20" />
                </div>
                
                <div className="space-y-8">
                  {[
                    { label: 'Booking Capacity', val: '84%', color: 'bg-primary' },
                    { label: 'User Retention', val: '62%', color: 'bg-emerald-500' },
                    { label: 'Revenue Target', val: '45%', color: 'bg-blue-500' },
                    { label: 'Social Reach', val: '92%', color: 'bg-purple-500' },
                  ].map((p, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                        <span className="text-white/40">{p.label}</span>
                        <span className="text-white">{p.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: p.val }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 + (i * 0.1) }}
                          className={cn("h-full rounded-full", p.color)} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h4 className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
                    <TrendingUp size={16} /> Insights
                  </h4>
                  <p className="text-white/40 text-xs leading-relaxed">
                    Bookings are up by 24% this week. We recommend increasing slot availability for 'Premium Evening Safari'.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
