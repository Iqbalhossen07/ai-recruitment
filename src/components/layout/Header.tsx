"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt="AI Recruit Logo"
                width={36}
                height={36}
                className="rounded-md object-cover"
              />
              <span className="text-xl font-bold text-primary tracking-tight">AI Recruit</span>
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
              href="/portal/login" 
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
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-black hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col space-y-3 mt-4 border-t border-gray-100">
              <Link 
                href="/portal/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-5 py-3 text-primary border border-primary font-medium rounded-md transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/jobs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-5 py-3 bg-primary text-white font-medium rounded-md shadow-md hover:bg-primary/90 transition-colors"
              >
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
