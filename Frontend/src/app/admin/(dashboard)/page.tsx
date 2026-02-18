"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import {
  Image as ImageIcon,
  Calendar,
  Star,
  MessageCircle,
  ArrowUpRight,
  PlusCircle,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";

type Stats = {
  gallery: number;
  events: number;
  testimonials: number;
  enquiries: number;
  bookings: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    gallery: 0,
    events: 0,
    testimonials: 0,
    enquiries: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) return;

      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="text-blue-600" size={20} />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">System Overview</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Here is what's happening with your platform today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-200"
          >
            <PlusCircle size={16} />
            New Event
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Gallery"
          value={loading ? 0 : stats.gallery}
          icon={ImageIcon}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Active Events"
          value={loading ? 0 : stats.events}
          icon={Calendar}
          color="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Testimonials"
          value={loading ? 0 : stats.testimonials}
          icon={Star}
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="New Enquiries"
          value={loading ? 0 : stats.enquiries}
          icon={MessageCircle}
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Bookings"
          value={loading ? 0 : stats.bookings}
          icon={Calendar}
          color="bg-purple-50 text-purple-600"
        />

      </div>

      {/* Quick Navigation / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Quick Management</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Manage Events', href: '/admin/events', desc: 'Add or remove upcoming events', color: 'blue' },
              { label: 'Client Enquiries', href: '/admin/enquiries', desc: 'Check real-time messages', color: 'emerald' },
              { label: 'Gallery Media', href: '/admin/gallery', desc: 'Update images and videos', color: 'indigo' },
              { label: 'Reviews', href: '/admin/testimonials', desc: 'Approve client feedback', color: 'amber' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="group p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-blue-100 hover:shadow-md hover:shadow-blue-50 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-[#2563EB] rounded-2xl p-6 text-white shadow-lg shadow-blue-200 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Admin Pro Tips</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              New enquiries appear in real-time. Keep your browser open to receive instant updates on the Enquiries page!
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <Link href="/admin/enquiries" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
              Check Inbox
            </Link>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
}