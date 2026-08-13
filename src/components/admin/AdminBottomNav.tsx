"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Menu
} from "lucide-react";
import { useState } from "react";

export default function AdminBottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNav = [
    { name: "Home", href: "/system-hq/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/system-hq/jobs", icon: Briefcase },
    { name: "Users", href: "/system-hq/applications", icon: Users },
  ];

  const secondaryNav = [
    { name: "Blogs", href: "/system-hq/blogs" },
    { name: "Messages", href: "/system-hq/messages" },
    { name: "FAQs", href: "/system-hq/faqs" },
    { name: "Settings", href: "/system-hq/settings" },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 px-2 py-2 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-6 w-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
        
        {/* More Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl transition-colors ${
            isMenuOpen ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Menu className="h-6 w-6 mb-1" strokeWidth={isMenuOpen ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>

      {/* Expanded Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed bottom-20 left-0 w-full bg-white border-t border-gray-200 shadow-xl z-40 rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">More Options</h3>
            <div className="grid grid-cols-2 gap-3">
              {secondaryNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center font-bold text-gray-700 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
              <button 
                onClick={() => {
                  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.href = "/login";
                }}
                className="text-red-500 font-bold px-6 py-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay for expanded menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-30" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
