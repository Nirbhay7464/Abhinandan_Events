"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building, Heart, Sparkles, ArrowUpRight, CheckCircle, Star, Palette, ClipboardCheck, Utensils, Truck } from "lucide-react";
import { JSX } from "react";

const ServicesPreview = () => {
  const services = [
    {
      title: "Wedding Planning",
      desc: "Comprehensive coordination from conceptualization to the final applause, ensuring your dream wedding becomes a reality.",
      icon: <Heart className="w-6 h-6" />,
      features: ["Full Planning", "Theme Design", "Budgeting"]
    },
    {
      title: "Vendor Management",
      desc: "Curating and coordinating with top-tier partners to guarantee the highest quality of service for every aspect of your event.",
      icon: <ClipboardCheck className="w-6 h-6" />,
      features: ["Sourcing", "Contracts", "On-site Liaison"]
    },
    {
      title: "Decor & Execution",
      desc: "Transforming venues into immersive environments with high-end floral design, lighting, and bespoke aesthetic planning.",
      icon: <Palette className="w-6 h-6" />,
      features: ["Floral Design", "Lighting Art", "Stage Setup"]
    },
    {
      title: "Food & Beverage",
      desc: "Elevating the guest experience with gourmet menu planning and flawless catering management services.",
      icon: <Utensils className="w-6 h-6" />,
      features: ["Menu Curation", "Service Staff", "Presentation"]
    }
  ];

  return (
    <section id="services" className="relative py-32 px-6 bg-[#FCFBF7] overflow-hidden">
      
      {/* Royal Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.3]" />
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 bg-amber-200/20 rounded-full blur-[120px]"
          animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-200 bg-white shadow-sm mb-8">
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-800">
              OUR SPECIALTIES
            </span>
          </div>
          
          <h2 className="text-5xl md:text-[72px] font-serif font-light text-slate-900 mb-8 leading-[0.9] tracking-tighter">
            Curating Your <br />
            <span className="text-amber-600 italic">Signature Moment</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-amber-100/50 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
              
              <div className="relative h-full p-10 rounded-[2rem] bg-white border border-amber-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="mb-8 p-4 rounded-2xl bg-amber-50 w-fit text-amber-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium flex-grow">
                  {service.desc}
                </p>
                
                <div className="space-y-4 mb-10">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-amber-50">
                  <span className="text-[10px] font-black text-amber-800/40 uppercase tracking-[0.2em]">
                    0{index + 1}
                  </span>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us & CTA */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h3 className="text-4xl font-serif text-slate-900 tracking-tighter">Why Abhinandan?</h3>
            <div className="grid gap-8">
              {[
                { title: "Guest Management", desc: "Precision RSVP tracking and white-glove hospitality services for every attendee." },
                { title: "Transport & Logistics", desc: "Seamless movement of equipment and guests across any location or city." },
                { title: "Event Flow", desc: "Meticulous minute-by-minute scheduling for a stress-free celebration." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <div className="p-3 rounded-2xl bg-white border border-amber-100 shadow-sm shadow-amber-900/5">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-12 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles size={120} className="text-amber-400" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-serif text-white mb-6 leading-tight">Thinking of an event? <br/><span className="text-amber-400 italic font-light">We make it happen.</span></h3>
              <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                Connect with our lead consultants to transform your vision into an immersive reality.
              </p>
              <Link 
                href="/services" 
                className="group inline-flex items-center gap-4 px-10 py-5 bg-amber-600 text-white font-black rounded-2xl transition-all hover:bg-amber-500 shadow-xl shadow-amber-900/40"
              >
                VIEW ALL SERVICES
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;