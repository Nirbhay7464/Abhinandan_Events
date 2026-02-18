"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Users, MapPin, ChevronRight, Sparkles, ArrowUpRight } from "lucide-react";

interface EventType {
  id: string;
  name: string;
  count: string;
  img: string;
}

const Hero = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [activeEvent, setActiveEvent] = useState<string>("wedding");

  const eventTypes: EventType[] = [
    { id: "wedding", name: "Weddings", count: "180+", img: "/wedding.png" },
    { id: "corporate", name: "Corporate", count: "250+", img: "/corporate.png" },
    { id: "social", name: "Festive Occasions", count: "120+", img: "/festive.png" },
    { id: "conference", name: "Seminars & Summits", count: "95+", img: "/seminars.png" },
  ];

  const activeImageData = eventTypes.find(t => t.id === activeEvent) || eventTypes[0];

  return (
    <section ref={containerRef} className="relative pt-24 pb-24 px-6 overflow-hidden min-h-screen bg-[#FCFBF7]" id="home">

      {/* BACKGROUND ELEMENTS - Ivory & Silk Theme */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#F3EAD3_0%,transparent_40%)] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#E2E8F0_0%,transparent_30%)] opacity-40" />

        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[140px]"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtle Paper Texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-12">

        {/* HEADER AREA */}
        <motion.div style={{ y: textY, opacity }} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-amber-200 bg-white/60 backdrop-blur-md mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-800">
              Abhinandan Events
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-[74px] font-extrabold mb-6 tracking-tighter leading-[0.95] text-slate-900">
            {/* Every Celebration Deserves Perfection,*/} Dreaming of the Perfect Event? <br />
            <motion.span
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              {/* Let’s Create Yours. */}We Design. We Plan. We Deliver.
            </motion.span>
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-light mb-12">
            From intimate weddings to grand corporate gatherings, we curate seamless experiences with precision, elegance, and attention to every detail.
          </p>
        </motion.div>

        {/* GRID LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">

          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* BUTTONS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveEvent(type.id)}
                  className={`p-5 rounded-2xl border transition-all duration-500 relative text-left ${activeEvent === type.id
                    ? "bg-white border-amber-300 shadow-xl shadow-amber-900/5 ring-1 ring-amber-100"
                    : "bg-white/40 border-slate-100 hover:border-amber-200"
                    }`}
                >
                  <h3 className={`text-[10px] uppercase tracking-widest font-bold mb-2 transition-colors ${activeEvent === type.id ? "text-amber-600" : "text-slate-400"}`}>
                    {type.name}
                  </h3>
                  <p className={`text-2xl font-bold ${activeEvent === type.id ? "text-slate-900" : "text-slate-700"}`}>{type.count}</p>
                </button>
              ))}
            </div>

            {/* MAIN IMAGE COMPONENT */}
            <motion.div className="relative flex-1 min-h-[480px] rounded-[40px] overflow-hidden border border-white shadow-2xl group shadow-slate-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeImageData.img}
                    className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                    alt={activeEvent}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>


            </motion.div>
          </div>

          {/* SIDE PANEL */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-10 rounded-[40px] bg-white border border-slate-100 flex-1 relative overflow-hidden group shadow-xl shadow-slate-200/50">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-100/30 blur-[50px] rounded-full group-hover:bg-amber-100/50 transition-all" />

              <h4 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Start Planning</h4>
              <p className="text-slate-500 text-base mb-10 leading-relaxed font-light">
                Connect with our lead consultants to transform your vision into an immersive reality.
              </p>

              <div className="space-y-5 mb-12">
                {['End-to-End Event Management', 'Vendor & Venue Coordination', 'Guest & Hospitality Handling'].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" />
                    {text}
                  </div>
                ))}
              </div>

              <a href="/booking" className="block w-full">
                <button className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10">
                  Schedule Your Consultation
                </button>
              </a>
            </div>

            {/* STATS AREA */}
            <div className="p-8 rounded-[32px] bg-amber-50/50 border border-amber-100/50 flex items-center justify-between">
              {/* Years of Excellence Stat */}
              <div className="text-center flex-1 px-2">
                <span className="block text-3xl font-bold text-slate-900">15+</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold mt-1 block leading-tight">
                  Years of Event Excellence
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="h-12 w-px bg-amber-200" />

              {/* Premium Celebrations Stat */}
              <div className="text-center flex-1 px-2">
                <span className="block text-3xl font-bold text-slate-900">300+</span>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold mt-1 block leading-tight">
                  Premium Celebrations Curated
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;