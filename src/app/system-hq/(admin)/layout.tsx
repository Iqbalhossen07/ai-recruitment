import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | AI Recruit",
  description: "Admin panel for AI Recruit platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Desktop Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col pb-20 md:pb-0">
        <AdminHeader />
        
        <main className="flex-1 px-4 md:px-8 pt-8 pb-8">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation */}
        <AdminBottomNav />
      </div>
    </div>
  );
}
