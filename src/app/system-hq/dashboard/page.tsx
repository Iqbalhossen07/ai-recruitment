import { prisma } from "@/lib/prisma";
import { Briefcase, Users, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch stats from DB
  const [totalJobs, totalApplicants, totalBlogs, unreadMessages] = await Promise.all([
    prisma.job.count(),
    prisma.application.count(),
    prisma.blog.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const stats = [
    { name: "Total Jobs", value: totalJobs, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50", link: "/system-hq/jobs" },
    { name: "Total Applicants", value: totalApplicants, icon: Users, color: "text-green-500", bg: "bg-green-50", link: "/system-hq/applications" },
    { name: "Total Blogs", value: totalBlogs, icon: FileText, color: "text-purple-500", bg: "bg-purple-50", link: "/system-hq/blogs" },
    { name: "Unread Messages", value: unreadMessages, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-50", link: "/system-hq/messages" },
  ];

  // Fetch recent activity (just a combination of latest applicants and messages for demo)
  const recentApplicants = await prisma.application.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { job: true },
  });

  return (
    <div className="space-y-6">
      
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.link} className="block group">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-bold text-gray-500">{stat.name}</h3>
              </div>
              <p className="text-3xl font-extrabold text-black">
                {stat.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Main dashboard content area - Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-black">Recent Applications</h2>
            <Link href="/system-hq/applications" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentApplicants.length === 0 ? (
              <p className="text-gray-500 text-sm">No applications found.</p>
            ) : (
              recentApplicants.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                      {app.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-sm">{app.name || "Unknown"}</h4>
                      <p className="text-xs font-medium text-gray-500">Applied for: {app.job?.title}</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200">
                    {app.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h2 className="text-xl font-bold text-black mb-6">Quick Actions</h2>
           <div className="space-y-3">
              <Link href="/system-hq/jobs/create" className="flex items-center gap-3 w-full p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors border border-gray-100 hover:border-primary/20 text-gray-700 font-semibold text-sm">
                <Briefcase size={18} />
                Post a new Job
              </Link>
              <Link href="/system-hq/blogs/create" className="flex items-center gap-3 w-full p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors border border-gray-100 hover:border-primary/20 text-gray-700 font-semibold text-sm">
                <FileText size={18} />
                Write a Blog Post
              </Link>
              <Link href="/system-hq/settings" className="flex items-center gap-3 w-full p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors border border-gray-100 hover:border-primary/20 text-gray-700 font-semibold text-sm">
                <Users size={18} />
                Update Profile
              </Link>
           </div>
        </div>
      </div>

    </div>
  );
}
