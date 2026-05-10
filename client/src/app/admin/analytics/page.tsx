"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, Loader2, ArrowUpRight, ArrowDownRight, PieChart, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const AdminAnalytics = () => {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [user, authLoading, router]);

  if (authLoading || (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const performanceMetrics = [
    { label: 'Net Profit', value: '$84,230', trend: '+14.2%', isUp: true, color: 'text-emerald-500' },
    { label: 'Avg. Booking Value', value: '$420', trend: '-2.1%', isUp: false, color: 'text-rose-500' },
    { label: 'New Customers', value: '1,240', trend: '+18.5%', isUp: true, color: 'text-blue-500' },
    { label: 'Cancellation Rate', value: '1.2%', trend: '-0.4%', isUp: true, color: 'text-emerald-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Market Insights</h1>
            <p className="text-white/40">Data-driven performance analysis and forecasting.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-all">
              <Calendar size={18} />
              Last 30 Days
            </button>
            <button className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
              <Download size={18} />
              Generate Intelligence Report
            </button>
          </div>
        </header>

        {loading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Performance Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 rounded-3xl"
                >
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-4">{m.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-bold">{m.value}</h3>
                    <div className={cn("flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-black/40", m.color)}>
                      {m.trend} {m.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-[32px] p-8 min-h-[400px] flex flex-col"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-serif font-bold">Revenue <span className="text-primary">Growth</span></h3>
                  <BarChart3 size={20} className="text-white/20" />
                </div>
                <div className="flex-1 flex items-end gap-3 pt-10">
                  {[40, 60, 45, 90, 65, 85, 100, 75, 95, 80, 110, 120].map((h, i) => (
                    <div key={i} className="flex-1 group relative">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className="bg-primary/20 hover:bg-primary group-hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all rounded-t-lg"
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${h}k
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-white/20 uppercase tracking-widest font-bold">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-[32px] p-8 flex flex-col"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-serif font-bold">Category <span className="text-primary">Distribution</span></h3>
                  <PieChart size={20} className="text-white/20" />
                </div>
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-64 h-64 rounded-full border-[20px] border-white/5 relative">
                        <div className="absolute inset-0 rounded-full border-[20px] border-primary border-r-transparent border-b-transparent rotate-45" />
                        <div className="absolute inset-[-10px] rounded-full border-[40px] border-primary/20 border-l-transparent border-t-transparent -rotate-12" />
                    </div>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-4xl font-bold">72%</span>
                        <span className="text-[10px] text-white/40 uppercase font-bold">Evening Safari</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs text-white/60">Evening Safari (72%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <span className="text-xs text-white/60">Private Yacht (18%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                        <span className="text-xs text-white/60">City Tours (6%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                        <span className="text-xs text-white/60">Others (4%)</span>
                    </div>
                </div>
              </motion.div>
            </div>

            {/* Heatmap/Activity Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-[32px] p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Activity size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold">Global Activity</h3>
                    <p className="text-white/30 text-xs">Booking density by region and time.</p>
                </div>
              </div>
              <div className="h-40 w-full bg-white/5 rounded-2xl overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] opacity-20 invert" />
                {/* Random Activity Dots */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
                        style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
                    />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAnalytics;
