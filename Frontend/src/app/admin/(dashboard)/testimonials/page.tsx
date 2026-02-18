"use client";

import { useEffect, useState } from "react";
import { Star, Trash2, Eye, EyeOff, Quote, User, CheckCircle2 } from "lucide-react";
import { io as socketIO } from "socket.io-client";

type Testimonial = {
  id: number;
  name: string;
  role?: string | null;
  message: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
};

const API = "http://localhost:5000/api/admin/testimonials";

export default function AdminTestimonialsPage() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  /* ================= FETCH ================= */
  const fetchTestimonials = async () => {
    try {
      if (!token) {
        setError("Not authenticated");
        return;
      }

      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch testimonials");

      const data = await res.json();
      setTestimonials(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    const socket = socketIO("http://localhost:5000");

    socket.on("new_testimonial", (newTestimonial: Testimonial) => {
      setTestimonials((prev) => [newTestimonial, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* ================= TOGGLE ================= */
  const toggleStatus = async (id: number) => {
    try {
      const res = await fetch(`${API}/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isActive: !t.isActive } : t
        )
      );
    } catch {
      alert("Failed to update testimonial");
    }
  };

  /* ================= DELETE ================= */
  const deleteTestimonial = async (id: number) => {
    if (!confirm("Delete this testimonial permanently?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete testimonial");
    }
  };

  /* ================= UI STATES ================= */
  if (loading) return (
    <div className="flex items-center gap-2 text-gray-400 p-6">
      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span>Loading testimonials...</span>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 border border-red-100 rounded-xl text-red-600">
      {error}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-sm text-gray-500">Manage customer feedback and website reviews</p>
        </div>
        <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-blue-600" />
          <span className="text-xs font-semibold text-blue-700">{testimonials.length} Total</span>
        </div>
      </div>

      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <Quote className="text-gray-200 mb-2" size={48} />
          <p className="text-gray-400">No testimonials found yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 leading-tight">{t.name}</p>
                      {t.role && (
                        <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5">{t.role}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= t.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quote size={32} className="absolute -top-2 -left-2 text-gray-50 opacity-50" />
                  <p className="text-gray-600 text-sm italic leading-relaxed relative z-10 pl-2">
                    {t.message}
                  </p>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    t.isActive
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}
                >
                  {t.isActive ? "● Public" : "○ Draft"}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStatus(t.id)}
                    className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                      t.isActive
                        ? "bg-gray-50 text-gray-500 hover:bg-gray-100"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                    title={t.isActive ? "Hide from website" : "Show on website"}
                  >
                    {t.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    {t.isActive ? "Hide" : "Approve"}
                  </button>

                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    title="Delete permanently"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}