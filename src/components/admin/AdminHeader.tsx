"use client";

import { useEffect, useState } from "react";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getAdminProfile } from "@/app/actions/admin";
import { logoutAction } from "@/app/actions/auth";
import Image from "next/image";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [time, setTime] = useState(new Date());
  const [admin, setAdmin] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAdmin = async () => {
      const data = await getAdminProfile();
      if (data) setAdmin(data);
    };
    fetchAdmin();
  }, [pathname]); // Refetch when pathname changes in case profile updated

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit",
      second: "2-digit"
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const currentMonthYear = time.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const handleLogout = async () => {
    await logoutAction();
    router.push("/system-hq/login");
  };

  const isDashboard = pathname === "/system-hq/dashboard";

  return (
    <div className="flex flex-col w-full">
      {/* Real Topbar */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-4 md:px-8 z-50 relative">
        <div 
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="flex items-center gap-3 cursor-pointer py-2">
            <span className="text-sm font-bold text-gray-700 hidden md:block">
              {admin?.name || "Admin User"}
            </span>
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden relative">
              {admin?.image ? (
                <Image src={admin.image} alt="Admin" fill className="object-cover" />
              ) : (
                admin?.name ? admin.name.charAt(0).toUpperCase() : "A"
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <p className="text-sm font-bold text-gray-900 truncate">{admin?.name || "Admin User"}</p>
                <p className="text-xs text-gray-500 truncate">{admin?.email || "admin@airecruit.com"}</p>
              </div>
              <Link 
                href="/system-hq/settings" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings size={16} /> Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Welcome & Info Section - Only on Dashboard */}
      {isDashboard && (
        <div className="px-4 md:px-8 py-6 md:py-8 relative z-10">
          <div className="bg-primary/5 border border-primary/10 rounded-md p-5 md:p-6 w-full flex flex-col md:flex-row justify-between items-center shadow-sm">
            
            <div className="mb-6 md:mb-0 text-center md:text-left w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-2">
                Welcome back, <span className="text-primary">{admin?.name || "Admin User"}</span>
              </h1>
              <p className="text-gray-600 text-sm font-medium">
                Here is what's happening in <span className="font-bold text-black">{currentMonthYear}</span>
              </p>
            </div>

            {/* Date & Time Widget */}
            <div className="bg-white rounded-md py-3 px-5 shadow-sm border border-gray-100 flex items-center gap-4 min-w-[260px]">
              <div className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center bg-gray-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-primary tracking-tight">
                  {formatTime(time).split(' ')[0]} <span className="text-xs font-semibold">{formatTime(time).split(' ')[1]}</span>
                </div>
                <div className="text-[10px] font-bold text-black uppercase tracking-wider">
                  {formatDate(time)}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
