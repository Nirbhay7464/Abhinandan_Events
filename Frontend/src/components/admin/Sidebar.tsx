"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Star,
  MessageSquare,
  MessageCircle,
  LogOut,
  BookTextIcon,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Gallery", icon: Briefcase, href: "/admin/gallery" },
  { name: "Recent Events", icon: MessageCircle, href: "/admin/events" },
  { name: "Testimonials", icon: Star, href: "/admin/testimonials" },
  { name: "Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
  { name: "Bookings", icon: BookTextIcon, href: "/admin/bookings" },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-20"} 
      `}
    >
      {/* Changed w-64 to w-full to let it follow the parent aside width */}
      <div className="flex flex-col h-full w-full overflow-hidden">
        
        {/* Navigation Links */}
        <nav className="px-3 py-4 space-y-2 flex-1"> 
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-lg text-[14px] transition-all
                  ${isOpen ? "px-4 py-2.5 gap-3" : "px-0 py-3 justify-center"}
                  ${active
                    ? "bg-[#EBF2FF] text-[#2563EB] font-medium"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <item.icon 
                  size={20} 
                  className={`shrink-0 ${active ? "text-[#2563EB]" : "text-gray-400"}`} 
                />
                
                {/* Text hides completely when sidebar is closed */}
                <span className={`whitespace-nowrap transition-opacity duration-200 ${
                  isOpen ? "opacity-100 block" : "opacity-0 hidden"
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button Area */}
        <div className="p-3 border-t border-gray-50">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full rounded-lg text-[14px] text-red-500 hover:bg-red-50 transition-all font-medium group
              ${isOpen ? "px-4 py-2.5 gap-3" : "px-0 py-3 justify-center"}
            `}
          >
            <LogOut 
              size={20} 
              className="text-red-400 group-hover:text-red-600 transition-colors shrink-0" 
            />
            <span className={`whitespace-nowrap transition-opacity duration-200 ${
              isOpen ? "opacity-100 block" : "opacity-0 hidden"
            }`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}