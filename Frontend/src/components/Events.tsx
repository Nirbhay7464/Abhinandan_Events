// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   Calendar,
//   MapPin,
//   Users,
//   ArrowUpRight,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { getRecentEvents, getEventsStats } from "@/lib/api";

// type EventType = {
//   id: number;
//   title: string;
//   image: string;
//   date: string;
//   attendees: number;
//   client: string;
//   location: string;
//   description: string;
// };

// type StatsType = {
//   eventsThisYear: number;
//   upcomingEvents: number;
//   citiesCovered: number;
// };

// const RecentEventsPreview = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [events, setEvents] = useState<EventType[]>([]);
//   const [stats, setStats] = useState<StatsType>({
//     eventsThisYear: 0,
//     upcomingEvents: 0,
//     citiesCovered: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const eventsData = await getRecentEvents();
//       const statsData = await getEventsStats();

//       setEvents(Array.isArray(eventsData) ? eventsData : []);
//       setStats(statsData || stats);
//     } catch (error) {
//       console.error("Error loading events data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextSlide = () => {
//     if (events.length === 0) return;
//     setCurrentIndex((prev) => (prev + 1) % events.length);
//   };

//   const prevSlide = () => {
//     if (events.length === 0) return;
//     setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
//   };

//   if (loading) {
//     return (
//       <section className="py-32 px-6 bg-gradient-to-b from-[#12121f] to-[#0a0a12]">
//         <div className="max-w-7xl mx-auto text-center text-white/60">
//           Loading events...
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-32 px-6 bg-gradient-to-b from-[#12121f] to-[#0a0a12]">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
//           <div>
//             <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
//               <span className="text-sm font-medium text-white/60">
//                 LATEST WORK
//               </span>
//             </div>

//             <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
//               Recent Events
//             </h2>

//             <p className="text-lg text-white/60 max-w-2xl">
//               Showcasing our latest projects and success stories
//             </p>
//           </div>

//           <div className="flex gap-4 mt-6 md:mt-0">
//             <button
//               onClick={prevSlide}
//               className="p-3 rounded-lg border border-white/10 bg-white/5"
//             >
//               <ChevronLeft className="w-5 h-5 text-white" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className="p-3 rounded-lg border border-white/10 bg-white/5"
//             >
//               <ChevronRight className="w-5 h-5 text-white" />
//             </button>
//           </div>
//         </div>

//         {/* EVENTS GRID */}
//         {events.length > 0 && (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//             {events.map((event, index) => (
//               <motion.div
//                 key={event.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="group overflow-hidden rounded-3xl border border-white/10"
//               >
//                 <div className="aspect-[4/3] overflow-hidden">
//                   <img
//                     src={event.image}
//                     alt={event.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                   />
//                 </div>

//                 <div className="p-8">
//                   <div className="flex items-center gap-3 mb-4 text-sm text-white/60">
//                     <Calendar className="w-4 h-4" />
//                     {event.date}

//                     <Users className="w-4 h-4 ml-4" />
//                     {event.attendees}
//                   </div>

//                   <h3 className="text-2xl font-serif text-white mb-3">
//                     {event.title}
//                   </h3>

//                   <p className="text-white/50 mb-6">
//                     Client:{" "}
//                     <span className="text-white/70">
//                       {event.client}
//                     </span>
//                   </p>

//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2 text-sm text-white/60">
//                       <MapPin className="w-4 h-4" />
//                       {event.location}
//                     </div>

//                     <Link
//                       href={`/events/${event.id}`}
//                       className="text-sm text-white/60 hover:text-white"
//                     >
//                       View Details →
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* STATS */}
//         <div className="grid grid-cols-3 gap-6 mb-16">
//           <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
//             <div className="text-3xl text-white mb-2">
//               {stats.eventsThisYear}
//             </div>
//             <div className="text-sm text-white/50">
//               Events This Year
//             </div>
//           </div>

//           <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
//             <div className="text-3xl text-white mb-2">
//               {stats.upcomingEvents}
//             </div>
//             <div className="text-sm text-white/50">
//               Upcoming Events
//             </div>
//           </div>

//           <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
//             <div className="text-3xl text-white mb-2">
//               {stats.citiesCovered}+
//             </div>
//             <div className="text-sm text-white/50">
//               Cities Covered
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="text-center">
//           <Link
//             href="/events"
//             className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a12] rounded-lg"
//           >
//             View All Events
//             <ArrowUpRight className="w-5 h-5" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecentEventsPreview;
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { getRecentEvents, getEventsStats } from "@/lib/api";

// Types remain identical to maintain backend compatibility
type EventType = {
  id: number;
  title: string;
  image: string;
  date: string;
  attendees: number;
  client: string;
  location: string;
  description: string;
};

type StatsType = {
  eventsThisYear: number;
  upcomingEvents: number;
  citiesCovered: number;
};

const RecentEventsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<EventType[]>([]);
  const [stats, setStats] = useState<StatsType>({
    eventsThisYear: 0,
    upcomingEvents: 0,
    citiesCovered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const eventsData = await getRecentEvents();
      const statsData = await getEventsStats();
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setStats(statsData || stats);
    } catch (error) {
      console.error("Error loading events data:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  if (loading) {
    return (
      <section className="py-32 px-6 bg-[#FCFBF7]">
        <div className="max-w-7xl mx-auto text-center text-amber-900/40 tracking-widest uppercase text-xs font-bold">
          Archiving Excellence...
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 bg-[#FCFBF7] relative">
      {/* Royal Texture Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50/50 mb-6">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-black tracking-[0.3em] text-amber-800 uppercase">
                Case Studies
              </span>
            </div>

            <h2 className="text-5xl md:text-[64px] font-serif text-slate-900 mb-6 leading-[0.9] tracking-tighter">
              Recent <span className="italic font-light text-amber-600">Events</span>
            </h2>

            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Discover how we turn ambitious visions into flawlessly executed realities across the globe.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-4 rounded-2xl border border-amber-100 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="p-4 rounded-2xl border border-amber-100 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EVENTS GRID */}
        {events.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col bg-white rounded-[2.5rem] border border-amber-100 overflow-hidden hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black text-slate-900 tracking-widest uppercase">
                    {event.date}
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                       <Users className="w-3.5 h-3.5" />
                       {event.attendees} guests
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 tracking-tight group-hover:text-amber-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 font-medium">
                    {event.description}
                  </p>

                  <div className="flex justify-between items-center pt-6 border-t border-amber-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      {event.location}
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest hover:text-amber-600 transition-colors"
                    >
                      Case Study <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { label: "Grand Productions", value: stats.eventsThisYear },
            { label: "Awaiting Curtain", value: stats.upcomingEvents },
            { label: "Global Presence", value: `${stats.citiesCovered}+` }
          ].map((stat, i) => (
            <div key={i} className="relative group p-10 rounded-[2rem] bg-white border border-amber-100 text-center overflow-hidden">
              <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black text-amber-700 uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/events"
            className="group inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-600 transition-all duration-500 shadow-2xl shadow-slate-900/20"
          >
            Explore Portfolio
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentEventsPreview;