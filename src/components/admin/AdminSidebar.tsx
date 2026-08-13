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
  Settings 
} from "lucide-react";
import Image from "next/image";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { name: "Applications", href: "/admin/applications", icon: Users },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-gray-50 border-r border-gray-200 fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200 bg-white">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
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
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
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
          className="flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
        >
          View Website
        </Link>
      </div>
    </aside>
  );
}
