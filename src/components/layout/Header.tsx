"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Jobs", href: "/jobs" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              AI Recruit
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`font-medium transition-colors border-b-2 py-2 ${
                    isActive 
                      ? "text-primary border-primary" 
                      : "text-black border-transparent hover:text-primary transition-colors"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-5 py-2 text-primary font-medium hover:bg-primary-light rounded-md transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/jobs" 
              className="px-5 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-hover transition-colors shadow-md"
            >
              Find Jobs
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button className="text-black hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
