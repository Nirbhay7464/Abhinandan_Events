"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, PlayCircle, Camera, Video as VideoIcon } from "lucide-react";
import Link from "next/link";
import { getGalleryPhotos, getGalleryVideos } from "@/lib/api";

function getYoutubeThumbnail(url?: string) {
  if (!url) return null;
  const match = url.match(/v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  const videoId = match?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, v] = await Promise.all([
          getGalleryPhotos(),
          getGalleryVideos(),
        ]);
        setPhotos(p || []);
        setVideos(v || []);
      } catch (e) {
        console.error("Error loading gallery:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] text-slate-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-700 mb-6 transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Atelier
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-3 tracking-tight">
            The <span className="text-amber-600 italic">Archive</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-lg font-medium">
            A vibrant collection of our most celebrated moments and cinematic stories.
          </p>
        </div>

        {/* 1. Photos Section */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <Camera className="text-amber-600" size={18} />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Captured Moments</h2>
            <div className="h-[1px] flex-1 bg-amber-100" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ y: -10 }} // Pop-up effect
                className="group relative aspect-[4/5] rounded-2xl bg-white shadow-md hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden">
                   <img 
                    src={photo.image} 
                    className="w-full h-full object-cover" // No scale transition here
                    alt={photo.title} 
                  />
                </div>
                
                {/* Floating Info Badge - Pops up on hover */}
                <div className="absolute inset-x-4 bottom-4 p-5 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl border border-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-amber-700 text-[9px] font-black uppercase tracking-widest block mb-1">
                    {photo.category}
                  </span>
                  <h3 className="text-base font-serif text-slate-900">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. Video Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <VideoIcon className="text-amber-600" size={18} />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Cinematic Stories</h2>
            <div className="h-[1px] flex-1 bg-amber-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {videos.map((video) => (
              <motion.a 
                key={video.id} 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -10 }} // Pop-up effect
                className="group relative aspect-video rounded-3xl bg-white shadow-md hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-300 overflow-visible"
              >
                <div className="w-full h-full rounded-3xl overflow-hidden relative">
                  <img 
                    src={getYoutubeThumbnail(video.url) || ""} 
                    className="absolute inset-0 w-full h-full object-cover" // No grayscale or scale transitions
                    alt={video.title}
                  />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center group-hover:bg-amber-600 transition-colors duration-300">
                      <PlayCircle className="w-7 h-7 text-amber-600 group-hover:text-white" />
                    </div>
                  </div>
                </div>

                {/* Subdued Bottom Info */}
                <div className="pt-6 px-2">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-bold text-amber-700">
                      {video.duration}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-amber-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {video.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif text-slate-900">{video.title}</h4>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}