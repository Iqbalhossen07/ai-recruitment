"use client";

import { useEffect, useState } from "react";

interface WelcomeBannerProps {
  userName: string;
}

export default function WelcomeBanner({ userName }: WelcomeBannerProps) {
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

  return (
    <div className="bg-primary/5 border border-primary/10 rounded-md p-5 md:p-6 w-full flex flex-col md:flex-row justify-between items-center shadow-sm mb-8">
      <div className="mb-6 md:mb-0 text-center md:text-left w-full md:w-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-2">
          Welcome back, <span className="text-primary">{userName}</span>
        </h1>
        <p className="text-gray-600 text-sm font-medium">
          Here is what's happening with your applications in <span className="font-bold text-black">{currentMonthYear}</span>
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
  );
}
