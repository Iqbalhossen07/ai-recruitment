"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  MapPin 
} from "lucide-react";
import Image from "next/image";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/system-hq/dashboard", icon: LayoutDashboard, colorClass: "text-blue-500", bgClass: "bg-blue-50", hoverClass: "hover:bg-blue-50" },
    { name: "Cities", href: "/system-hq/cities", icon: MapPin, colorClass: "text-rose-500", bgClass: "bg-rose-50", hoverClass: "hover:bg-rose-50" },
    { name: "Jobs", href: "/system-hq/jobs", icon: Briefcase, colorClass: "text-emerald-500", bgClass: "bg-emerald-50", hoverClass: "hover:bg-emerald-50" },
    { name: "Applications", href: "/system-hq/applications", icon: Users, colorClass: "text-amber-500", bgClass: "bg-amber-50", hoverClass: "hover:bg-amber-50" },
    { name: "Blogs", href: "/system-hq/blogs", icon: FileText, colorClass: "text-purple-500", bgClass: "bg-purple-50", hoverClass: "hover:bg-purple-50" },
    { name: "Messages", href: "/system-hq/messages", icon: MessageSquare, colorClass: "text-indigo-500", bgClass: "bg-indigo-50", hoverClass: "hover:bg-indigo-50" },
    { name: "FAQs", href: "/system-hq/faqs", icon: HelpCircle, colorClass: "text-cyan-500", bgClass: "bg-cyan-50", hoverClass: "hover:bg-cyan-50" },
    { name: "Settings", href: "/system-hq/settings", icon: Settings, colorClass: "text-slate-500", bgClass: "bg-slate-50", hoverClass: "hover:bg-slate-50" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#f8f9fa] border-r border-gray-200 fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 bg-[#f8f9fa] border-b border-gray-100">
        <Link href="/system-hq/dashboard" className="flex items-center gap-3">
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
