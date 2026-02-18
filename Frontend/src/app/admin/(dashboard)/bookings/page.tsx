"use client";

import { useEffect, useState } from "react";
import { 
    Calendar, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Wallet, 
    Users, 
    MessageSquare, 
    CheckCircle, 
    MessageCircle, 
    Loader2 
} from "lucide-react";

type Booking = {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    eventType: string;
    guestCount: number;
    eventDate: string;
    budget: string;
    venue: string;
    notes: string;
    createdAt: string;
    isApproved: boolean;
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [approvingId, setApprovingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("admin_token");
            if (!token) return;

            try {
                const res = await fetch(
                    "http://localhost:5000/api/admin/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleApprove = async (id: number) => {
        setApprovingId(id);
        const token = localStorage.getItem("admin_token");
        
        try {
            const res = await fetch(
                `http://localhost:5000/api/admin/bookings/${id}/approve`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.ok) {
                // Update local state immediately
                setBookings(prev => prev.map(b => b.id === id ? { ...b, isApproved: true } : b));
            } else {
                alert("Failed to approve booking ❌");
            }
        } catch (error) {
            alert("An error occurred during approval.");
        } finally {
            setApprovingId(null);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Bookings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage event inquiries and reservation requests</p>
                </div>
                <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">{bookings.length} Total</span>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                    <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-400 font-medium">No bookings yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {bookings.map((b) => (
                        <div
                            key={b.id}
                            className={`bg-white rounded-2xl p-6 shadow-sm border transition-all relative overflow-hidden group ${
                                b.isApproved ? "border-green-100 ring-1 ring-green-50" : "border-gray-100"
                            }`}
                        >
                            {/* Top Accent Bar */}
                            <div className={`absolute top-0 left-0 w-full h-1 transition-opacity ${
                                b.isApproved ? "bg-green-500 opacity-100" : "bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 opacity-0 group-hover:opacity-100"
                            }`} />

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                                        b.isApproved ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                                    }`}>
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-slate-900 text-lg leading-tight">{b.fullName}</h3>
                                            {b.isApproved && (
                                                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-tighter">
                                                    <CheckCircle size={10} /> Approved
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Mail size={14} /> {b.email}</span>
                                            <span className="flex items-center gap-1"><Phone size={14} /> {b.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Received</span>
                                    <span className="text-xs font-medium text-slate-600">
                                        {new Date(b.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar size={12} /> Event Date
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">{b.eventDate || "TBD"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                                        <Sparkles size={12} className="w-3 h-3" /> Event Type
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">{b.eventType}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                                        <Users size={12} /> Guests
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">{b.guestCount} People</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                                        <Wallet size={12} /> Budget
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700">{b.budget}</p>
                                </div>
                            </div>

                            {/* Venue & Notes */}
                            <div className="mt-4 p-4 bg-slate-50 rounded-xl space-y-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <MapPin size={12} /> Venue Info
                                </p>
                                <p className="text-sm text-slate-700 font-medium">{b.venue}</p>
                            </div>

                            {b.notes && (
                                <div className="mt-4 space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <MessageSquare size={12} /> Client Vision
                                    </p>
                                    <p className="text-sm text-slate-600 italic leading-relaxed">"{b.notes}"</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-6 flex gap-3">
                                {b.isApproved ? (
                                    <div className="flex-1 py-2 bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-md shadow-green-100 transition-all">
                                        <CheckCircle size={14} /> Approved
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleApprove(b.id)}
                                        disabled={approvingId === b.id}
                                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
                                    >
                                        {approvingId === b.id ? (
                                            <>
                                                <Loader2 size={14} className="animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Approve"
                                        )}
                                    </button>
                                )}

                                {/* WhatsApp Button */}
                                <a 
                                    href={`https://wa.me/${b.phone.replace(/\D/g, '')}?text=Hello ${encodeURIComponent(b.fullName)}, I'm reaching out regarding your ${encodeURIComponent(b.eventType)} booking inquiry.`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 border border-gray-200 hover:bg-green-50 hover:border-green-200 text-gray-600 hover:text-green-600 rounded-lg transition-colors flex items-center justify-center"
                                    title="Contact on WhatsApp"
                                >
                                    <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Sparkles Component
function Sparkles({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
        </svg>
    )
}