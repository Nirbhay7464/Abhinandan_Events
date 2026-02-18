"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, ArrowUpRight, CheckCircle, 
  Phone, MessageSquare, Star, Crown, Compass, Music, MapPin,
  Palette, Utensils, ClipboardCheck, Truck, Users
} from "lucide-react";
import Link from "next/link";

const STATIC_SERVICES = [
  {
    title: "Wedding Planning",
    subtitle: "Cinematic Romantacism",
    description: "What started as a passion for family celebrations in 2010 has evolved into a premier wedding production house. We don't just plan; we curate heritage moments, transforming your personal love stories into immersive, cinematic experiences.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    accent: "bg-amber-50",
    features: ["Wedding Planning", "Theme Conceptualization", "Destination Curating", "Couture Styling"],
  },
  {
    title: "Vendor & Venue Management",
    subtitle: "Surgical Precision",
    description: "We treat event timelines like blueprints. From rigorous vendor management and on-site liaison to seamless guest hospitality, we ensure every second is calculated for a stress-free experience.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069",
    accent: "bg-slate-100",
    features: ["Vendor Management", "Event Flow Scheduling", "Guest Management", "On-site Coordination"],
  },
  {
    title: "Event Flow Management",
    subtitle: "Spatial Storytelling",
    description: "Bridging the gap between vision and reality through high-concept spatial design. Our experts incorporate every unique idea into a tangible masterpiece of floral architecture and lighting.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000",
    accent: "bg-amber-100/30",
    features: ["Decor Planning", "Floral Design", "Lighting Execution", "Stage Architecture"],
  },
  {
    title: "Decor Planning & Execution",
    subtitle: "Seamless Excellence",
    description: "The height of milestone celebrations requires ironclad logistics. We manage everything from gourmet food and beverage curation to complex transport and equipment movement across any location.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070",
    accent: "bg-slate-50",
    features: ["F&B Management", "Transport & Logistics", "Equipment Movement", "VIP Concierge"],
  },
  {
    title: "Guest Managemetent & Hospitality",
    subtitle: "Strategic Sophistication",
    description: "Designing sophisticated environments that inspire and engage. Whether it's a high-stakes global summit or an intimate milestone anniversary, we manage your brand's narrative with absolute discretion.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012",
    accent: "bg-amber-50",
    features: ["Product Unveilings", "Anniversary Galas", "Executive Retreats", "Milestone Birthdays"],
  },
  {
    title: "Food & Beverage Curation",
    subtitle: "Strategic Sophistication",
    description: "Designing sophisticated environments that inspire and engage. Whether it's a high-stakes global summit or an intimate milestone anniversary, we manage your brand's narrative with absolute discretion.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012",
    accent: "bg-amber-50",
    features: ["Product Unveilings", "Anniversary Galas", "Executive Retreats", "Milestone Birthdays"],
  },
  {
    title: "Transport & Logistics",
    subtitle: "Strategic Sophistication",
    description: "Designing sophisticated environments that inspire and engage. Whether it's a high-stakes global summit or an intimate milestone anniversary, we manage your brand's narrative with absolute discretion.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012",
    accent: "bg-amber-50",
    features: ["Product Unveilings", "Anniversary Galas", "Executive Retreats", "Milestone Birthdays"],
  }
];

export default function ServicesPage() {
  return (
    <main className="bg-[#FCFBF7] min-h-screen text-slate-900 pb-20 selection:bg-amber-100">
      
      {/* 1. ARCHITECTURAL HERO */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white -z-0 skew-x-12 translate-x-20" />
        <div className="absolute top-40 left-10 w-64 h-64 bg-amber-100/30 blur-[100px] rounded-full -z-0" />

        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-200 bg-white mb-10 shadow-sm"
          >
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-800">The Abhinandan Legacy</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
            Thinking of Event? <br />
            <span className="text-amber-600 italic font-light">We Make It Happen.</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-xl font-medium leading-relaxed border-l-2 border-amber-200 pl-8 hidden md:block">
            From conceptualizing and visualizing to putting together the world's 
            most prestigious celebrations. We treat every event like our own family affair.
          </p>
        </div>
      </section>

      {/* 2. SERVICES LISTING */}
      <section className="px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto space-y-56">
          {STATIC_SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
            >
              {/* Visual Side */}
              <div className="flex-1 relative group w-full">
                <div className={`absolute -inset-6 ${service.accent} rounded-[3rem] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2`} />
                <div className="relative aspect-[4/5] md:aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-amber-100 hidden md:block">
                    <Sparkles className="w-6 h-6 text-amber-600 mb-2" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Master-class Execution</p>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 space-y-10">
                <div className="space-y-4">
                  <span className="text-amber-600 text-xs font-black uppercase tracking-[0.3em]">{service.subtitle}</span>
                  <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-slate-900">{service.title}</h2>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">{service.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 border-b border-amber-100 pb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-slate-900 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 blur-[100px] rounded-full" />
          <h2 className="text-4xl md:text-7xl font-serif text-white mb-8 relative z-10">
            Let's create memories <br /> <span className="italic text-amber-500 font-light">you'll cherish forever.</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center relative z-10">
            <Link href="tel:+1234567890" className="flex items-center justify-center gap-3 px-8 py-4 bg-white rounded-xl font-bold hover:bg-amber-500 hover:text-white transition-all">
              <Phone className="w-5 h-5" /> Call Our Planner
            </Link>
            <Link href="/contact" className="flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all">
              <MessageSquare className="w-5 h-5" /> WhatsApp Inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}