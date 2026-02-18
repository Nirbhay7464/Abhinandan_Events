"use client";

import { Bell, Check, Inbox, Circle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/app/admin/context/NotificationContext";

export default function NotificationBell() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* BELL BUTTON */}
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) markAllAsRead();
        }}
        className="relative p-2.5 rounded-full hover:bg-gray-100 transition-all active:scale-95"
      >
        <Bell 
          className={`w-5 h-5 transition-colors duration-300 ${
            open ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
          }`} 
        />

        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600 border-2 border-white"></span>
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "circOut" }}
              // FIXED: Added bg-white/95 and explicit border color for contrast
              className="absolute right-0 mt-4 w-80 bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-[24px] border border-slate-200 z-50 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase">
                  Notifications
                </span>
                {unreadCount > 0 && (
                   <span className="text-[10px] font-bold text-white bg-indigo-600 px-2 py-0.5 rounded-full">
                     {unreadCount} NEW
                   </span>
                )}
              </div>

              <div className="max-h-[380px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 px-6 text-center">
                    <Inbox className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 font-light">Your inbox is empty</p>
                  </div>
                ) : (
                  notifications.map((n, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      key={n.id}
                      // FIXED: Added hover and unread background states
                      className={`p-5 border-b border-slate-50 last:border-0 transition-colors relative group ${
                        !n.read ? "bg-indigo-50/40" : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex gap-4">
                         {!n.read && (
                           <Circle className="w-2 h-2 fill-indigo-600 text-indigo-600 mt-1.5 shrink-0" />
                         )}
                         <div className="flex-1">
                            {/* FIXED: Explicitly set text-slate-900 for visibility */}
                            <p className={`text-[13px] leading-relaxed ${!n.read ? "text-slate-900 font-semibold" : "text-slate-600"}`}>
                              {n.message}
                            </p>
                            {/* FIXED: High contrast for timestamp */}
                            <p className="text-[10px] text-slate-400 mt-2 font-medium">
                              {n.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                         </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 bg-slate-50/80 text-center border-t border-slate-100">
                    <button 
                        onClick={() => setOpen(false)}
                        className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                    >
                        Dismiss
                    </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}