"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

interface PortalTopbarProps {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

export default function PortalTopbar({ user }: PortalTopbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push('/portal/login');
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-2 md:hidden">
        <Link href="/portal/dashboard" className="font-bold text-xl text-primary tracking-tight">
          AI<span className="text-black">Recruit</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-2">
        {/* Breadcrumbs or page title could go here */}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-gray-900">{user.name}</span>
            <span className="text-xs text-gray-500 font-medium">{user.email}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0">
            {user.image ? (
              <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
        </div>
        
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
        
        <button 
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50 flex items-center justify-center"
          title="Logout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        </button>
      </div>
    </header>
  );
}
