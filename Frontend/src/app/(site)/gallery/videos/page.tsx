"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, PlayCircle, Video as VideoIcon, Sparkles, Clock, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { getGalleryVideos } from "@/lib/api";

function getYoutubeThumbnail(url?: string) {
  if (!url) return null;
  const match = url.match(/v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  const videoId = match?.[1];
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
}

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getGalleryVideos();
        setVideos(data || []);
      } catch (e) {
        console.error("Error loading videos:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] text-slate-900 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header - Editorial Style */}
        <div className="mb-24 space-y-6">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-amber-700 transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Collections
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none mb-6">
                Cinematic <br />
                <span className="text-amber-600 italic font-light">Stories.</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed border-l-2 border-amber-200 pl-6">
                Moving pictures that capture the soul and rhythm of our most prestigious celebrations.
              </p>
            </motion.div>
            
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-amber-100 shadow-sm">
                <MonitorPlay className="text-amber-600" size={20} />
                <div className="h-8 w-px bg-amber-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Premium Productions
                </span>
            </div>
          </div>
        </div>

        {/* Videos Grid - Wider layout for Cinematic Feel */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {videos.map((video, index) => (
              <motion.a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block"
              >
                {/* Video Card Container */}
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-xl transition-all duration-500 group-hover:shadow-amber-900/20 group-hover:-translate-y-2">
                  
                  {/* Thumbnail */}
                  <img
                    src={getYoutubeThumbnail(video.url) || ""}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:opacity-70"
                    alt={video.title}
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 w-20 h-20 bg-white/30 rounded-full animate-ping group-hover:hidden" />
                        <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:scale-110 transition-all duration-500">
                            <PlayCircle className="w-10 h-10 text-amber-600 group-hover:text-white" />
                        </div>
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 flex gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white border border-white/20">
                      {video.category}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-6 right-6 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm flex items-center gap-2 border border-white/10">
                    <Clock size={10} className="text-amber-400" />
                    <span className="text-[10px] font-bold text-white tracking-widest">{video.duration}</span>
                  </div>
                </div>

                {/* Video Meta Information */}
                <div className="mt-8 space-y-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">
                        Official Trailer
                    </span>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tight leading-tight group-hover:text-amber-700 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-slate-400 text-sm font-medium italic">
                    Press to play in high definition
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Empty State */}
          {videos.length === 0 && (
            <div className="py-40 text-center">
              <VideoIcon className="w-12 h-12 text-amber-200 mx-auto mb-6" />
              <p className="text-slate-400 font-serif italic text-xl">Cinematic archive is being processed...</p>
            </div>
          )}
        </section>

       

      </div>
    </main>
  );
}