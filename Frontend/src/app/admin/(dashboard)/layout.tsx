"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Topbar always takes full width but contains the toggle */}
      <Topbar onMenuClick={toggleSidebar} />

      <div className="flex pt-16">
        {/* Sidebar width is w-64 (open) or w-20 (closed) */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* FIX: Changed "ml-0" to "ml-20" 
          This ensures that when the sidebar is collapsed, the 
          main content starts after the icons instead of under them.
        */}
        <main 
          className={`flex-1 p-6 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "ml-64" : "ml-20"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}