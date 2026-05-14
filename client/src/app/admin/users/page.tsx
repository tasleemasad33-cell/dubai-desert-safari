"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Loader2, Mail, Shield, MoreVertical, Trash2, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Assuming there's a /api/users endpoint for admins
        const response = await fetch(`https://server-one-alpha-61.vercel.app/api/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          toast.error('Failed to load users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`https://server-one-alpha-61.vercel.app/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setUsers(users.filter((u: any) => u._id !== id));
        toast.success('User deleted');
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };



  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || (!user || user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">User Directory</h1>
            <p className="text-white/40">Manage administrative access and customer accounts.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text"
                placeholder="Search by name or email..."
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 w-80 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="gold-btn px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <UserPlus size={18} />
              Add User
            </button>
          </div>
        </header>

        <div className="glass-card rounded-[32px] overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 flex justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/20 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="px-8 py-6 font-bold">User</th>
                    <th className="px-8 py-6 font-bold">Role</th>
                    <th className="px-8 py-6 font-bold">Joined</th>
                    <th className="px-8 py-6 font-bold">Status</th>
                    <th className="px-8 py-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((u: any, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5 font-serif font-bold text-lg">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white">{u.name}</p>
                            <p className="text-xs text-white/30 flex items-center gap-1"><Mail size={12} /> {u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          {u.role === 'admin' ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                              <Shield size={12} /> Administrator
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-white/40 text-[10px] font-bold uppercase">
                              <Users size={12} /> Customer
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-white/40 font-light">
                        {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-8 py-6">
                        <span className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDeleteUser(u._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/20 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
