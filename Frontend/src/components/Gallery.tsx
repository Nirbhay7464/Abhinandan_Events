"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PlayCircle, ArrowUpRight, Camera, Video as VideoIcon } from "lucide-react";
import { getGalleryPhotos, getGalleryVideos } from "@/lib/api";

type Photo = { id: number | string; image: string; title: string; category: string; };
type VideoItem = { id: number | string; title: string; category: string; duration: string; url?: string; };

function getYoutubeThumbnail(url?: string) {
  if (!url) return null;
  const match = url.match(/v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  const videoId = match?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

const GalleryPreview = () => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [p, v] = await Promise.all([getGalleryPhotos(), getGalleryVideos()]);
        setPhotos(p?.slice(0, 6) || []); 
        setVideos(v?.slice(0, 4) || []); 
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="h-96 flex items-center justify-center bg-[#FCFBF7] text-amber-800/30 font-bold tracking-[0.2em] uppercase text-xs">
      Curating Gallery...
    </div>
  );

  return (
    <section id="gallery" className="py-32 px-6 bg-[#FCFBF7] relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-[100px] -mr-32 -mt-32" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="h-px w-10 bg-amber-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-[72px] font-serif text-slate-900 leading-[0.9] tracking-tighter">
              Event <span className="italic font-light text-amber-600">Gallery</span>
            </h2>
          </div>
          
          <div className="flex p-1.5 rounded-2xl bg-white border border-amber-100 shadow-xl shadow-amber-900/5">
            {["photos", "videos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeTab === tab 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                    : "text-slate-400 hover:text-amber-600"
                }`}
              >
                {tab === "photos" ? <Camera size={14}/> : <VideoIcon size={14}/>}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          {activeTab === "photos" ? (
            <motion.div 
              key="photos" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {photos.map((photo) => (
                <div key={photo.id} className="relative group aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white border border-amber-100 shadow-sm">
                  <img src={photo.image} alt={photo.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                  
                  {/* Luxury Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                    <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {photo.category}
                    </span>
                    <h3 className="text-white font-serif text-3xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="videos" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {videos.map((video) => (
                <div key={video.id} className="group relative aspect-video rounded-[3rem] overflow-hidden bg-slate-200 border border-amber-100 shadow-2xl">
                  <img src={getYoutubeThumbnail(video.url) || ""} className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-50 group-hover:scale-105 transition-all duration-[1s]" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-amber-600 group-hover:border-transparent transition-all duration-500 shadow-2xl">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-900/80 to-transparent">
                    <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{video.category}</span>
                    <h4 className="text-3xl font-serif text-white mb-2">{video.title}</h4>
                    <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">{video.duration}</span>
                  </div>
                  {video.url && <a href={video.url} target="_blank" className="absolute inset-0 cursor-pointer" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 text-center">
          <Link href="/gallery" className="group inline-flex items-center gap-6 px-14 py-6 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-600 transition-all duration-500 shadow-2xl shadow-slate-900/20">
            View Full Collection
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;