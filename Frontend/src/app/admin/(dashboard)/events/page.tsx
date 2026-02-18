"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Plus, Trash2, Image as ImageIcon } from "lucide-react";

type Event = {
  id: number;
  title: string;
  image: string;
  date: string;
  location?: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  /* LOAD EVENTS */
  const loadEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setEvents([]);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  /* FILE → BASE64 */
  const toBase64 = (file: File) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });

  /* ADD EVENT */
  const addEvent = async () => {
    if (!title || !date || images.length === 0 || !description) {
      alert("All fields required");
      return;
    }

    if (!token) {
      alert("Login required");
      return;
    }

    setLoading(true);

    try {
      const base64Images = await Promise.all(
        images.slice(0, 5).map(toBase64)
      );

      const res = await fetch(
        "http://localhost:5000/api/admin/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            images: base64Images,
            description,
            eventDate: date,
            location,
          }),
        }
      );

      if (!res.ok) throw new Error();

      setTitle("");
      setDate("");
      setLocation("");
      setDescription("");
      setImages([]);

      loadEvents();
    } catch {
      alert("Failed to add event");
    }

    setLoading(false);
  };

  /* DELETE */
  const removeEvent = async (id: number) => {
    if (!token) return;

    await fetch(
      `http://localhost:5000/api/admin/events/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    loadEvents();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
        <p className="text-sm text-gray-500">Create and organize your platform events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CREATE FORM - Left Side */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 sticky top-24">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Plus size={18} className="text-blue-600" />
              <h2 className="font-semibold text-gray-700">Add New Event</h2>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Event Details</label>
              
              {/* Corrected Visibility: text-gray-900 and bg-white */}
              <input
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
              />

              <textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                <input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider pt-2">Media</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(Array.from(e.target.files || []))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="text-center space-y-1">
                  <ImageIcon className="mx-auto text-gray-400 group-hover:text-blue-500 transition-colors" size={24} />
                  <p className="text-xs text-gray-500">Click to upload images (Max 5)</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {images.slice(0, 5).map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      className="w-12 h-12 object-cover rounded-md border border-gray-200 flex-shrink-0"
                    />
                  ))}
                </div>
              )}

              <button
                onClick={addEvent}
                disabled={loading}
                className="w-full bg-[#2563EB] text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
              >
                {loading ? "Adding..." : (
                  <>
                    <Plus size={18} />
                    Add Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* LIST - Right Side */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative h-44">
                  <img
                    src={e.image}
                    className="h-full w-full object-cover"
                    alt={e.title}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removeEvent(e.id)}
                      className="bg-red-50 p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-base line-clamp-1">
                    {e.title}
                  </h3>
                  
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={14} className="text-blue-500" />
                      <span className="text-xs text-gray-600">{e.date}</span>
                    </div>
                    {e.location && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={14} className="text-red-500" />
                        <span className="text-xs text-gray-600 line-clamp-1">{e.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {events.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400">No events found. Start by adding one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}