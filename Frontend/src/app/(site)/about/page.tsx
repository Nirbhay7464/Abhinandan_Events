"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, ArrowRight, Compass, Crown, Heart, Quote } from "lucide-react";

interface Value {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const AboutPage = () => {
  const values: Value[] = [
    {
      title: "Bespoke Curation",
      desc: "We don't believe in templates. Every event is a unique canvas, reflecting your personal story and heritage.",
      icon: <Compass className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "The Royal Protocol",
      desc: "Our signature approach to high-profile celebrations—where tradition is treated with the highest level of modern luxury.",
      icon: <Crown className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "Seamless Execution",
      desc: "We manage the chaos so you can enjoy the celebration. Logistics handled with surgical precision and absolute grace.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    },
  ];

  return (
    <main className="bg-[#FCFBF7] min-h-screen text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/40 -skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-200 bg-white mb-8 shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] text-amber-800 font-black tracking-[0.4em] uppercase">Est. 2010 • The Abhinandan Standard</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-12">
              Beyond Planning. <br />
              <span className="italic font-light text-amber-600">Creating Legacies.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-xl border-l-2 border-amber-200 pl-8">
                Turning abstract dreams into tangible history. We are the silent architects 
                behind Maharashtra's most prestigious and soul-stirring celebrations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE THREE PILLARS */}
      <section className="py-24 px-6 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FCFBF7] border border-amber-100 flex items-center justify-center mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FOUNDER'S TALE (Natural Color + Personal Touch) */}
      <section className="py-32 px-6 bg-[#FCFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            
            {/* Owner Image Side */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-4 border border-amber-200 rounded-[3rem] -z-10 translate-x-4 translate-y-4" />
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/owner.png" 
                  alt="Founder of Abhinandan Events" 
                  className="w-full h-full object-cover" // Natural color, no grayscale or transitions
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-8 rounded-3xl shadow-xl max-w-[260px]">
                <Quote className="w-8 h-8 text-amber-500 mb-4 opacity-50" />
                <p className="text-sm font-light italic leading-relaxed mb-4">
                  "Events are not just dates on a calendar; they are the milestones of a lifetime."
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">The Visionary</p>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-slate-900">
                  Fifteen Years <br />
                  <span className="text-amber-600 italic">Of Passionate Curation.</span>
                </h2>
              </div>
              
              <div className="space-y-8 text-slate-500 font-medium leading-loose text-lg">
                <p>
                  What started as a labor of love for family weddings in 2010 has evolved into a full-scale event production house. At <span className="text-slate-900">Abhinandan Events</span>, we treat every milestone like our own family affair—with the dedication and creativity it deserves.
                </p>
                <p>
                   We specialize in bridging the gap between grand traditional heritage and modern luxury. Our expert planners don't just coordinate; they visualize and breathe life into your dreams, creating lifelong memories you will cherish forever.
                </p>
              </div>

              {/* Founder Sign-off */}
              <div className="pt-12 flex items-center justify-between border-t border-amber-100">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-amber-600" />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-400">Founder & CEO</p>
                      <h4 className="text-2xl font-serif text-slate-900 italic">Abhinandan J.</h4>
                   </div>
                </div>

               
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </main>
  );
};

export default AboutPage;