"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { motion } from 'framer-motion';
import { Map, Search, Plus, Loader2, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

const AdminTours = () => {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/tours`);
        const data = await response.json();
        if (response.ok) {
          setTours(data);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tours/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setTours(tours.filter((t: any) => t._id !== id));
        toast.success('Tour deleted successfully');
      } else {
        toast.error('Failed to delete tour');
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast.error('Error deleting tour');
    }
  };

  const filteredTours = tours.filter((t: any) => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Tours & Experiences</h1>
            <p className="text-white/40">Manage your luxury desert safari catalog.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text"
                placeholder="Search tours..."
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => router.push('/admin/tours/create')} className="gold-btn px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <Plus size={18} />
              Create New
            </button>
          </div>
        </header>

        {loading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTours.map((tour: any, i) => (
              <motion.div
                key={tour._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-accent/20 border border-white/5 rounded-2xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tour.images[0] || '/hero-bg.png'} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
                      {tour.type === 'experience' ? 'Experience' : 'Tour'}
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-white border border-white/20">
                      {tour.category}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                      {tour.title}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-white/40 font-light">
                    <div className="flex items-center gap-2"><Map size={14} className="text-primary" /> {tour.location}</div>
                    <div className="text-right font-bold text-white text-lg">${tour.price}</div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <Link href={`/admin/tours/${tour._id}`} className="flex-1 bg-white/5 hover:bg-white/10 text-white/70 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                      <Edit2 size={14} /> Edit
                    </Link>
                    <Link 
                      href={`/tours/${tour.slug}`}
                      target="_blank"
                      className="p-2 bg-white/5 hover:bg-primary/20 hover:text-primary text-white/40 rounded-lg transition-all"
                    >
                      <ExternalLink size={18} />
                    </Link>
                    <button onClick={() => handleDelete(tour._id)} className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-white/40 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredTours.length === 0 && (
          <div className="p-32 text-center text-white/20 italic font-serif text-2xl">
            No tours found matching your search.
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminTours;
