"use client";
import { useState } from "react"; // Added useState
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react"; // Added Loader2

export default function BookingPage() {
  // 1. Initialize loading state
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFBF7] pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-50/60 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
            <Sparkles size={12} className="animate-pulse" />
            Inquiry Form
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">
            Start Your <span className="italic text-amber-600">Journey</span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Please provide the details of your upcoming celebration. Our team will review your requirements and respond within 24 hours.
          </p>
        </motion.div>

        {/* Expanded Form */}
        <motion.form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true); // 2. Start Loader

            const formData = new FormData(e.currentTarget);

            try {
              const res = await fetch("http://localhost:5000/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fullName: formData.get("fullName"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  preferredContact: formData.get("preferredContact"),
                  eventType: formData.get("eventType"),
                  guestCount: Number(formData.get("guestCount")),
                  eventDate: formData.get("eventDate"),
                  budget: formData.get("budget"),
                  venue: formData.get("venue"),
                  notes: formData.get("notes"),
                }),
              });

              const data = await res.json();

              if (data.success) {
                alert("Booking submitted successfully!");
                e.currentTarget.reset();
              } else {
                alert("Something went wrong");
              }
            } 
             finally {
              setIsLoading(false); // 3. Stop Loader
            }
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-slate-50 space-y-12"
        >
          {/* Section 1: Contact Information */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">01</span>
              <h2 className="text-xl font-serif text-slate-800">Contact Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input name="fullName"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                <input name="email"
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                <input name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Preferred Contact Method</label>
                <select name="preferredContact" className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-600 appearance-none">
                  <option>Select Option</option>
                  <option>Email</option>
                  <option>Phone Call</option>
                  <option>WhatsApp</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Event Details */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">02</span>
              <h2 className="text-xl font-serif text-slate-800">Event Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Event Type</label>
                <select name="eventType" className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-600 appearance-none">
                  <option>What are we celebrating?</option>
                  <option>Grand Wedding</option>
                  <option>Corporate Gala</option>
                  <option>Anniversary</option>
                  <option>Luxury Birthday</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Estimated Guest Count</label>
                <input name="guestCount"
                  type="number"
                  placeholder="e.g. 150"
                  className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-900"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Event Date</label>
                <input name="eventDate"
                  type="date"
                  className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-900"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Investment / Budget Range</label>
                <select name="budget" className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-600 appearance-none">
                  <option>Select Range</option>
                  <option>$10k - $25k</option>
                  <option>$25k - $50k</option>
                  <option>$50k - $100k</option>
                  <option>$100k+</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Venue Details</label>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="radio" name="venue" value="have-venue" className="w-4 h-4 accent-amber-600" />
                  <span className="text-sm text-slate-600">I already have a venue</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="radio" name="venue" value="need-value" className="w-4 h-4 accent-amber-600" />
                  <span className="text-sm text-slate-600">Need help finding a venue</span>
                </label>
              </div>
            </div>
          </section>

          {/* Section 3: The Vision */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">03</span>
              <h2 className="text-xl font-serif text-slate-800">The Vision</h2>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Additional Notes</label>
              <textarea name="notes"
                rows={4}
                placeholder="Tell us about your theme, colors, and must-have elements..."
                className="w-full bg-slate-50 border-b border-transparent focus:border-amber-500 rounded-2xl px-6 py-4 transition-all outline-none text-slate-900 placeholder:text-slate-300 resize-none"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <motion.button
              whileHover={!isLoading ? { scale: 1.01, backgroundColor: "#000" } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              disabled={isLoading}
              type="submit"
              className={`w-full py-6 rounded-2xl bg-slate-900 text-white font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-4 group ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  Processing...
                  <Loader2 size={16} className="animate-spin text-amber-500" />
                </>
              ) : (
                <>
                  Send Inquiry
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </motion.button>
            <p className="text-center mt-6 text-[10px] text-slate-400 uppercase tracking-widest">
              By submitting, you agree to our <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}