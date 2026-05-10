"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CreateTour() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: 0,
    type: 'tour',
    category: 'Luxury Safari',
    duration: '',
    location: '',
    difficulty: 'easy',
    isFeatured: false,
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user || user.role !== 'admin')) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://server-one-alpha-61.vercel.app/api/tours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success('Tour created successfully');
        router.push('/admin/tours');
      } else {
        const err = await response.json();
        toast.error(err.message || 'Error creating tour');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/tours" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white mb-2">Create Tour</h1>
              <p className="text-white/40">Add a new luxury experience.</p>
            </div>
          </div>
        </header>

        <div className="glass-card rounded-[32px] p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Slug</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Short Description</label>
              <input required type="text" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Full Description</label>
              <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Price ($)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Duration</label>
                <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" placeholder="e.g. 6 Hours" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Location</label>
                <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50">
                  <option value="tour" className="bg-black">Tour</option>
                  <option value="experience" className="bg-black">Experience</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Category</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-medium">Difficulty</label>
                <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary/50">
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 py-4">
              <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 accent-primary" />
              <label htmlFor="isFeatured" className="text-white font-medium">Feature this tour on homepage</label>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button type="submit" disabled={isSubmitting} className="gold-btn w-full py-4 rounded-xl flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Create Tour</>}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
