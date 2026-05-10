"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  BarChart3, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Tours Catalog', icon: Map, href: '/admin/tours' },
    { name: 'Reservations', icon: Calendar, href: '/admin/bookings' },
    { name: 'User Directory', icon: Users, href: '/admin/users' },
    { name: 'Intelligence', icon: BarChart3, href: '/admin/analytics' },
    { name: 'Guest Reviews', icon: MessageSquare, href: '/admin/reviews' },
    { name: 'System Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside className="w-72 h-screen bg-black border-r border-white/5 flex flex-col z-30 relative">
      <div className="p-10">
        <Link href="/" className="group block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-serif font-bold text-black group-hover:rotate-12 transition-transform">D</div>
            <div>
              <p className="text-sm font-serif font-bold tracking-tighter">DUBAI <span className="text-primary">ELITE</span></p>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Admin Portal</p>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-2 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-5 py-4 rounded-[20px] transition-all duration-500 group relative overflow-hidden",
                isActive 
                  ? "bg-primary text-black" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <item.icon size={20} className={cn(
                  isActive ? "text-black" : "text-primary/60 group-hover:text-primary transition-colors"
                )} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary z-0"
                />
              )}
              <ChevronRight size={14} className={cn(
                "transition-all duration-500 relative z-10",
                isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              )} />
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/5">
        <button 
          onClick={logout}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-500 w-full group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

