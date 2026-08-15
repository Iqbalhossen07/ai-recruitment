import { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import PortalSidebar from "@/components/layout/PortalSidebar";
import PortalTopbar from "@/components/layout/PortalTopbar";
import PortalMobileNav from "@/components/layout/PortalMobileNav";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const sessionCookie = cookies().get("session")?.value;
  let user = null;

  if (sessionCookie) {
    const session = await decrypt(sessionCookie);
    if (session && session.userId) {
      user = await prisma.user.findUnique({
        where: { id: session.userId as string },
        select: { name: true, email: true, image: true }
      });
    }
  }

  // If user is logged in, show the Dashboard Layout
  if (user) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex">
        <PortalSidebar />
        
        <div className="flex-1 min-w-0 md:ml-64 flex flex-col pb-20 md:pb-0 h-screen overflow-hidden">
          <PortalTopbar user={user} />
          
          <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden overflow-y-auto px-4 md:px-8 pt-8 pb-8">
            {children}
          </main>
        </div>
        
        <PortalMobileNav />
      </div>
    );
  }

  // If not logged in (e.g., Login page), show simple layout
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl text-primary tracking-tight">
              AI<span className="text-black">Recruit</span> <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-md ml-2">Portal</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/jobs" className="text-sm text-gray-600 hover:text-primary transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Elite Recruit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
