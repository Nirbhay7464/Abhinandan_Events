"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Sparkles, Maximize2, Layers, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getGalleryPhotos } from "@/lib/api";

export default function PhotoGalleryPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await getGalleryPhotos();
        setPhotos(data || []);
      } catch (e) {
        console.error("Error loading photos:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Close modal on 'Esc' key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] text-slate-900 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-amber-600/60 hover:text-amber-700 transition-colors text-[10px] font-black uppercase tracking-[0.4em] mb-4"
          >
            <Layers size={12} /> View All Collections
          </Link>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter text-slate-900">
            The <span className="italic text-amber-600">Visual</span> Archive
          </h1>
          <div className="w-20 h-px bg-amber-200 mx-auto mt-6" />
        </div>

        {/* Strict Grid Pattern */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white border border-amber-100/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-amber-900/10">
                  
                  {/* Natural Color Image */}
                  <img
                    src={photo.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={photo.title}
                  />

                  {/* Grid Overlay with "View Full" button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-amber-400 text-[9px] font-black uppercase tracking-[0.3em] block mb-2">
                        {photo.category || "Curation"}
                      </span>
                      <h3 className="text-xl font-serif text-white mb-6 leading-tight">
                        {photo.title}
                      </h3>
                      
                      {/* View Button */}
                      <button className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-amber-500 hover:text-white transition-colors">
                        <Maximize2 size={14} />
                        View Full Image
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Modal Lightbox */}
<AnimatePresence>
  {selectedPhoto && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 md:p-8 backdrop-blur-md"
      onClick={() => setSelectedPhoto(null)}
    >
      {/* Close Button */}
      <button 
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
        onClick={() => setSelectedPhoto(null)}
      >
        <X size={40} strokeWidth={1.5} />
      </button>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* KEY CHANGE: Removed fixed aspect ratios and used object-contain */}
        <img
          src={selectedPhoto.image}
          alt={selectedPhoto.title}
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
        />
        
        <div className="mt-4 text-center max-w-2xl">
          <h2 className="text-white text-xl md:text-2xl font-serif tracking-tight">
            {selectedPhoto.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-px w-4 bg-amber-500" />
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">
              {selectedPhoto.category}
            </p>
            <span className="h-px w-4 bg-amber-500" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

        {/* Empty State */}
        {photos.length === 0 && (
          <div className="text-center py-40">
            <Camera className="w-8 h-8 text-amber-200 mx-auto mb-4" />
            <p className="text-slate-400 font-serif italic text-lg">Archive being updated...</p>
          </div>
        )}
      </div>
    </main>
  );
}