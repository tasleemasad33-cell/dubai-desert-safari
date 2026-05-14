"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter, Loader2, MoreVertical, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AdminBookings = () => {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`https://server-one-alpha-61.vercel.app/api/bookings/all`, {
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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`https://server-one-alpha-61.vercel.app/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setBookings(bookings.map((b: any) => b._id === id ? { ...b, bookingStatus: status } : b));
        toast.success(`Booking status updated to ${status}`);
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const response = await fetch(`https://server-one-alpha-61.vercel.app/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setBookings(bookings.filter((b: any) => b._id !== id));
        toast.success('Booking deleted');
      } else {
        toast.error('Failed to delete booking');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const filteredBookings = bookings.filter((b: any) => 
    b.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.tour?.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Bookings Management</h1>
            <p className="text-white/40">View and manage all customer reservations.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text"
                placeholder="Search bookings..."
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </header>

        <div className="bg-accent/20 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 flex justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/40 text-xs uppercase tracking-widest border-b border-white/5">
                    <th className="p-6 font-medium">Reference</th>
                    <th className="p-6 font-medium">Customer</th>
                    <th className="p-6 font-medium">Tour Experience</th>
                    <th className="p-6 font-medium">Date</th>
                    <th className="p-6 font-medium">Guests</th>
                    <th className="p-6 font-medium">Total</th>
                    <th className="p-6 font-medium">Status</th>
                    <th className="p-6 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredBookings.map((booking: any, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                      <td className="p-6 font-mono text-xs text-white/40 uppercase">#{booking._id.slice(-6)}</td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{booking.user?.name || 'Guest'}</span>
                          <span className="text-xs text-white/30">{booking.user?.email}</span>
                        </div>
                      </td>
                      <td className="p-6 text-white/80">{booking.tour?.title}</td>
                      <td className="p-6 text-white/60">{new Date(booking.tourDate).toLocaleDateString()}</td>
                      <td className="p-6 text-white/60">{booking.numberOfGuests}</td>
                      <td className="p-6 text-white font-bold text-lg">${booking.totalPrice}</td>
                      <td className="p-6">
                        <select 
                          value={booking.bookingStatus} 
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase outline-none cursor-pointer appearance-none",
                            booking.bookingStatus === 'confirmed' ? "bg-green-500/10 text-green-500" : 
                            booking.bookingStatus === 'cancelled' ? "bg-red-500/10 text-red-500" :
                            "bg-yellow-500/10 text-yellow-500"
                          )}
                        >
                          <option value="pending" className="bg-black text-white">Pending</option>
                          <option value="confirmed" className="bg-black text-white">Confirmed</option>
                          <option value="cancelled" className="bg-black text-white">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleDelete(booking._id)} className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                            <span className="text-xs font-bold uppercase tracking-widest px-2">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-20 text-center text-white/20 italic font-serif text-lg">
                        No bookings found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminBookings;
