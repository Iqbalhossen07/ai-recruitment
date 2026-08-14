"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings,
  Menu,
  Users
} from "lucide-react";
import { useState } from "react";
import { logoutAction } from "@/app/actions/auth";

export default function PortalMobileNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pastelColors = [
    { text: "text-blue-500", bg: "bg-blue-50" },
    { text: "text-emerald-500", bg: "bg-emerald-50" },
    { text: "text-slate-500", bg: "bg-slate-50" },
  ];

  const allNav = [
    { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard, color: pastelColors[0] },
    { name: "My Apps", href: "/portal/applications", icon: Briefcase, color: pastelColors[1] },
    { name: "Settings", href: "/portal/settings", icon: Settings, color: pastelColors[2] },
  ];

  const bottomNavItems = allNav.slice(0, 3);

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white z-50 px-3 py-3 flex justify-between items-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] border-t border-gray-100">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-20 h-16 rounded-md transition-colors ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/30" 
                  : `${item.color.bg} ${item.color.text}`
              }`}
            >
              <Icon className="h-6 w-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-bold text-center leading-tight px-1">{item.name}</span>
            </Link>
          );
        })}
        
        {/* More Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center justify-center w-16 h-16 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-6 w-6 mb-1" strokeWidth={2.5} />
          <span className="text-[11px] font-bold">Menu</span>
        </button>
      </div>

      {/* Off-canvas Mobile Sidebar */}
      <div 
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-full bg-[#f8f9fa] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-gray-900">AI Recruit</span>
          </div>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
          {allNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-md text-[15px] font-bold transition-all ${
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : `${item.color.bg} ${item.color.text} hover:opacity-80`
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-5 border-t border-gray-200 bg-white">
          <button 
            onClick={async () => {
              await logoutAction();
              window.location.href = "/portal/login";
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-red-50 text-red-500 font-bold rounded-md hover:bg-red-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Logout
          </button>
        </div>
      </div>
      
      {/* Overlay for off-canvas menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
