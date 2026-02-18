"use client";

import { Menu } from "lucide-react";
import NotificationBell from "./NotificationBell";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white border-b">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Left Section: Branding */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="text-gray-600 hover:bg-gray-100 p-1.5 rounded-md transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-gray-100">
               {/* Reference: Dashboard logo placement */}
               <span className="text-[10px] font-bold text-blue-600">LOGO</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-gray-800 text-[15px]">Abhinandan</span>
              <span className="text-[11px] text-gray-500 font-medium">Events</span>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-5">
          <NotificationBell />
          <div className="w-9 h-9 rounded-full bg-[#FFE8D1] text-[#E67E22] flex items-center justify-center font-bold text-sm border border-[#FFD8B1]">
            B
          </div>
        </div>
      </div>

      {/* Tri-color Accent Bar - Moved to Bottom */}
      <div className="flex h-[3px] w-full">
        <div className="h-full w-1/3 bg-[#FFC107]"></div>
        <div className="h-full w-1/3 bg-[#4285F4]"></div>
        <div className="h-full w-1/3 bg-[#EA4335]"></div>
      </div>
    </header>
  );
}