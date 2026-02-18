"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Quote,
  Users,
  Star,
  X,
  Sparkles
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  message: string;
  rating: number;
};

const API = "http://localhost:5000/api";

const TestimonialsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
  });

  /* ================= LOAD TESTIMONIALS ================= */
  useEffect(() => {
    loadTestimonials();
  }, []);

  /* ================= SNAPPY AUTO SCROLL (2.5s) ================= */
  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 2500); // 2.5 second gap
    return () => clearInterval(interval);
  }, [testimonials]);

  const loadTestimonials = async () => {
    try {
      const res = await fetch(`${API}/testimonials`);
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to load testimonials", error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API}/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setShowForm(false);
    setFormData({ name: "", role: "", message: "", rating: 5 });
    alert("Thanks! Your review will appear after admin approval.");
  };

  if (loading) return <div className="h-96 bg-[#FCFBF7]" />;

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-32 px-6 bg-[#FCFBF7] relative overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-200 bg-white mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] text-amber-800 font-black tracking-[0.4em] uppercase">Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-[64px] font-serif text-slate-900 leading-[0.9] tracking-tighter">
            Kind Words from <br />
            <span className="italic font-light text-amber-600">Our Patrons</span>
          </h2>
        </div>

        {/* TESTIMONIAL CARD AREA */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[380px] flex items-center">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full p-10 md:p-16 rounded-[3rem] bg-white border border-amber-100 shadow-[0_30px_70px_-20px_rgba(180,150,100,0.15)] text-center"
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center shadow-xl rotate-3">
                    <Quote className="w-7 h-7 fill-amber-400" />
                  </div>

                  <p className="text-xl md:text-2xl text-slate-800 mb-10 leading-relaxed font-serif italic tracking-tight">
                    “{current.message}”
                  </p>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className={star <= current.rating ? "text-amber-500 fill-amber-500" : "text-amber-100"} />
                      ))}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em]">{current.name}</h4>
                      <p className="text-amber-600 font-bold text-[9px] uppercase tracking-widest mt-1">{current.role || "Distinguished Guest"}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LUXURY SCROLLER / PAGINATION */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-1.5 transition-all duration-500 rounded-full overflow-hidden bg-amber-100"
                style={{ width: currentIndex === index ? '40px' : '12px' }}
              >
                {currentIndex === index && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="absolute inset-0 bg-slate-900"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-slate-900/10"
          >
            <Users className="w-4 h-4" />
            Share Your Experience
          </button>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FCFBF7] p-8 rounded-[2.5rem] w-full max-w-lg border border-amber-100 shadow-2xl relative"
            >
              <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X className="w-5 h-5" /></button>
              <h3 className="text-2xl font-serif text-slate-900 mb-6">Your Experience</h3>
              <form onSubmit={submitReview} className="space-y-4">
                <input required placeholder="Full Name" className="w-full p-4 rounded-xl bg-white border border-amber-100 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-200 transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input placeholder="Role" className="w-full p-4 rounded-xl bg-white border border-amber-100 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-200 transition-all" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                <div className="flex gap-2 px-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} onClick={() => setFormData({ ...formData, rating: star })} className={`w-5 h-5 cursor-pointer ${star <= formData.rating ? "text-amber-500 fill-amber-500" : "text-amber-100"}`} />
                  ))}
                </div>
                <textarea required placeholder="Message..." className="w-full p-4 rounded-xl bg-white border border-amber-100 text-slate-900 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-amber-200 transition-all" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-600 transition-all">Submit Review</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsPreview;