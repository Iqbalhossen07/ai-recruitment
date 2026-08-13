"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminHeader() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    // We can clear cookie using a server action, or just clear document.cookie and redirect
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <header className="h-24 md:h-28 bg-transparent flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-8 py-4 mb-6 relative z-10">
      
      {/* Welcome & Info */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 md:p-6 w-full flex flex-col md:flex-row justify-between items-center shadow-sm">
        
        <div className="mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-1">
            Welcome back, <span className="text-primary">Admin User</span>
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Here is what's happening in <span className="font-bold text-black">{currentMonthYear}</span>
          </p>
        </div>

        {/* Date & Time Widget */}
        <div className="bg-white rounded-xl py-3 px-6 shadow-sm border border-gray-100 flex items-center gap-4 min-w-[280px]">
          <div className="h-12 w-12 rounded-full border-2 border-black flex items-center justify-center bg-gray-50">
            {/* Clock Icon simulating analog */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-black">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary tracking-tight">
              {formatTime(time).split(' ')[0]} <span className="text-sm font-semibold">{formatTime(time).split(' ')[1]}</span>
            </div>
            <div className="text-xs font-bold text-black uppercase tracking-wider">
              {formatDate(time)}
            </div>
          </div>
        </div>
        
      </div>

      {/* Top right profile / logout (Mobile hidden, shown in sidebar/bottom nav) */}
      <div className="absolute top-8 right-10 hidden md:flex items-center gap-4">
        <button 
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm border border-gray-200"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white">
          A
        </div>
      </div>
    </header>
  );
}
