"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Calendar, Send, Clock, Sparkles, ArrowUpRight } from "lucide-react";
import { submitContactForm } from "@/lib/api";

const ContactPreview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | { success: boolean; message: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const result = await submitContactForm(formData);
      setSubmitStatus(result);
      
      if (result.success) {
        setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = {
    phone: "+91 98765 43210",
    email: "info@abhinandan.com",
    address: "123 Event Street, Mumbai, India",
    hours: "Mon - Sat: 9:00 AM - 7:00 PM"
  };

  const eventTypes = ["Corporate Event", "Wedding", "Social Event", "Conference", "Other"];

  return (
    <section id="contact" className="py-32 px-6 bg-[#FCFBF7] relative overflow-hidden">
      {/* Royal Aesthetic Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100/40 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-white mb-6 shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] text-amber-800 font-bold tracking-[0.3em] uppercase">Connect</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-slate-900 tracking-tighter leading-[0.9]">
              Let’s Craft Your <br />
              <span className="italic font-light text-amber-600">Next Masterpiece</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-xs leading-relaxed border-l-2 border-amber-200 pl-6">
            From intimate gatherings to grand celebrations, our concierge team is at your service.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-12"
          >
            <div className="space-y-10">
              {[
                { icon: Phone, label: "Phone", val: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                { icon: Mail, label: "Email", val: contactInfo.email, href: `mailto:${contactInfo.email}` },
                { icon: MapPin, label: "Location", val: contactInfo.address },
                { icon: Clock, label: "Hours", val: contactInfo.hours },
              ].map((item, i) => (
                <div key={i} className="group flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-lg text-slate-900 font-serif hover:text-amber-600 transition-colors">{item.val}</a>
                    ) : (
                      <p className="text-lg text-slate-900 font-serif">{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            
          </motion.div>

          {/* RIGHT: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_40px_100px_-30px_rgba(180,150,100,0.12)] border border-amber-50 relative overflow-hidden">
              {/* Subtle Form Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-[100px] -z-0" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-xl text-sm font-bold tracking-tight ${submitStatus.success ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-0 py-3 bg-transparent border-b border-amber-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-all font-serif text-lg placeholder:text-slate-200"
                      placeholder="e.g. Alexander Sterling"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-0 py-3 bg-transparent border-b border-amber-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-all font-serif text-lg placeholder:text-slate-200"
                      placeholder="alex@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-amber-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-all font-serif text-lg placeholder:text-slate-200"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Occasion</label>
                    <select
                      name="eventType" value={formData.eventType} onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-amber-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-all font-serif text-lg cursor-pointer appearance-none"
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">The Vision</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} rows={3} required minLength={10}
                    className="w-full px-0 py-3 bg-transparent border-b border-amber-200 text-slate-900 focus:outline-none focus:border-slate-900 transition-all font-serif text-lg placeholder:text-slate-200 resize-none"
                    placeholder="Describe the dream experience..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full overflow-hidden py-6 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.4em] rounded-2xl transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {submitting ? 'Submitting Inquiry...' : 'Send Message'}
                    {!submitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </span>
                  <div className="absolute inset-0 bg-amber-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                
                <p className="text-slate-400 text-[9px] text-center font-bold uppercase tracking-[0.2em]">
                   Confidentiality Guaranteed — Response within 24 hours
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPreview;