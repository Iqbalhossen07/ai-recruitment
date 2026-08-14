"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings,
} from "lucide-react";

export default function PortalSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard, colorClass: "text-blue-500", bgClass: "bg-blue-50", hoverClass: "hover:bg-blue-50" },
    { name: "My Applications", href: "/portal/applications", icon: Briefcase, colorClass: "text-emerald-500", bgClass: "bg-emerald-50", hoverClass: "hover:bg-emerald-50" },
    { name: "Settings", href: "/portal/settings", icon: Settings, colorClass: "text-slate-500", bgClass: "bg-slate-50", hoverClass: "hover:bg-slate-50" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#f8f9fa] border-r border-gray-200 fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 bg-[#f8f9fa] border-b border-gray-100">
        <Link href="/portal/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="AI Recruit Logo"
            width={32}
            height={32}
            className="rounded-md object-cover"
          />
          <span className="text-xl font-extrabold text-black tracking-tight">AI Recruit</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-md text-[15px] font-bold transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                  : `bg-white text-gray-700 shadow-sm border border-gray-50 hover:shadow-md hover:scale-[1.02]`
              }`}
            >
              <Icon 
                className={`h-5 w-5 ${isActive ? "text-white" : item.colorClass}`} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      {/* Footer link to main site */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <Link 
          href="/" 
          target="_blank"
          className="flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-200"
        >
          View Website
        </Link>
      </div>
    </aside>
  );
}
