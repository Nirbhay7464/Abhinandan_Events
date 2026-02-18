"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { getRecentEvents } from "@/lib/api";

export default function EventsArchivePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getRecentEvents();
        setEvents(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] text-slate-900 pt-32 pb-32 selection:bg-amber-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Minimalist Intro */}
        <div className="mb-32">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-700 transition-colors mb-12 text-[10px] font-black uppercase tracking-[0.4em] group">
            <ArrowLeft size={14} /> Back to Atelier
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tighter">
              The <span className="text-amber-600 italic">Production</span> Journal
            </h1>
            <p className="text-slate-500 text-sm uppercase tracking-[0.3em] font-medium leading-relaxed border-l-2 border-amber-100 pl-6">
              A chronological record of spatial design and <br/> world-class event production.
            </p>
          </div>
        </div>

        {/* Editorial Event List */}
        <div className="space-y-40">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}
            >
              {/* Image Container with POP-UP Effect */}
              <motion.div 
                whileHover={{ y: -12 }} // Pop-up Lift
                className="w-full lg:w-7/12 group"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-white shadow-xl group-hover:shadow-[0_30px_60px_-15px_rgba(180,150,100,0.25)] transition-all duration-500 border border-amber-50">
                  <img 
                    src={event.image} 
                    className="w-full h-full object-cover" // NO SCALE/COLOR TRANSITIONS
                    alt={event.title} 
                  />
                  {/* Floating Location Tag */}
                  <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 border border-amber-100 shadow-sm">
                    <MapPin size={10} className="text-amber-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">{event.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* Text Side */}
              <div className="w-full lg:w-5/12 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={12} className="text-amber-600/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                      {event.date}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight text-slate-900">
                    {event.title}
                  </h2>
                  
                  <p className="text-slate-500 text-base font-medium leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Event Metadata Grid */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-amber-100">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-slate-400 font-black mb-2">Principal</span>
                    <span className="text-slate-800 text-sm font-serif italic">{event.client}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-slate-400 font-black mb-2">Volume</span>
                    <div className="flex items-center gap-2">
                      <Users size={12} className="text-amber-600/40" />
                      <span className="text-slate-800 text-sm font-serif italic">{event.attendees} Guests</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/events/${event.id}`} 
                  className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 hover:text-amber-700 transition-all pt-2"
                >
                  Explore Studio Case Study 
                  <div className="p-2 rounded-full border border-amber-200 group-hover:bg-amber-600 group-hover:border-amber-600 transition-all">
                    <ArrowRight size={12} className="group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Flourish */}
        <div className="mt-48 text-center border-t border-amber-100 pt-20">
            <div className="w-1 h-12 bg-gradient-to-b from-amber-400 to-transparent mx-auto mb-8" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-800/40">End of Season Record</p>
        </div>
      </div>
    </main>
  );
}