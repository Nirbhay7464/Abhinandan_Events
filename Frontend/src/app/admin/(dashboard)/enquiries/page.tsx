"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Mail, User, MessageSquare, Clock, Inbox } from "lucide-react";

const socket = io("http://localhost:5000");

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  const loadEnquiries = async () => {
    const res = await fetch(
      "http://localhost:5000/api/admin/enquiries",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setEnquiries(data);
  };

  useEffect(() => {
    loadEnquiries();

    // 🔥 REAL-TIME LISTENER
    socket.on("new_enquiry", (data) => {
      setEnquiries((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("new_enquiry");
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section matching Dashboard Style */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Enquiries</h1>
        <p className="text-sm text-gray-500">View and manage customer messages in real-time</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-50 border-b px-6 py-3">
          <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <User size={14} /> Client Details
          </div>
          <div className="col-span-7 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare size={14} /> Message
          </div>
          <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Clock size={14} /> Received
          </div>
        </div>

        {/* Enquiries List */}
        <div className="divide-y divide-gray-100">
          {enquiries.length > 0 ? (
            enquiries.map((e) => (
              <div
                key={e.id}
                className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 transition-colors group"
              >
                {/* Client Info */}
                <div className="col-span-3 pr-4">
                  <p className="font-bold text-gray-800 text-sm">{e.name}</p>
                  <div className="flex items-center gap-1.5 text-blue-600 mt-1">
                    <Mail size={12} />
                    <span className="text-xs font-medium truncate">{e.email}</span>
                  </div>
                </div>

                {/* Message Content */}
                <div className="col-span-7 pr-8">
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    "{e.message}"
                  </p>
                </div>

                {/* Meta Info */}
                <div className="col-span-2 flex flex-col justify-center">
                  <span className="text-[11px] font-medium px-2 py-1 rounded bg-blue-50 text-blue-600 w-fit">
                    Recent
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date().toLocaleDateString()} {/* Replace with e.createdAt if available */}
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-white">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Inbox className="text-gray-300" size={32} />
              </div>
              <p className="text-gray-400 font-medium">No enquiries found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}