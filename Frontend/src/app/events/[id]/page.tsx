"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEventById } from "@/lib/api";
import { Calendar, MapPin, Users } from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (id) loadEvent();
  }, [id]);

  const loadEvent = async () => {
    const data = await getEventById(id as string);
    setEvent(data);
    if (data?.images?.length) {
      setActiveImage(data.images[0]);
    }
  };

  if (!event) {
    return (
      <section className="py-32 text-center text-white">
        Loading event...
      </section>
    );
  }

  return (
    <section className="min-h-screen py-32 px-6 bg-gradient-to-b from-[#12121f] to-[#0a0a12] text-white">
      <div className="max-w-6xl mx-auto">

        {/* HERO IMAGE */}
        <div className="rounded-3xl overflow-hidden mb-10 border border-white/10">
          <img
            src={activeImage}
            alt={event.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* THUMBNAILS */}
        {event.images.length > 1 && (
          <div className="flex gap-4 mb-12 overflow-x-auto">
            {event.images.slice(0, 5).map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`h-24 w-32 object-cover rounded-lg cursor-pointer border transition ${
                  activeImage === img
                    ? "border-white"
                    : "border-white/20"
                }`}
              />
            ))}
          </div>
        )}

        {/* EVENT INFO */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif mb-6">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/60 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {event.date}
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} />
              {event.attendees} Guests
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              {event.location}
            </div>
          </div>

          <p className="text-white/70 leading-relaxed max-w-3xl">
            {event.description}
          </p>
        </div>
      </div>
    </section>
  );
}
