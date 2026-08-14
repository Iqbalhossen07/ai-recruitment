import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Briefcase, CalendarCheck } from "lucide-react";
import WelcomeBanner from "@/components/portal/WelcomeBanner";

export default async function PortalDashboard() {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) redirect("/portal/login");

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) redirect("/portal/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    include: {
      applications: true
    }
  });

  if (!user) redirect("/api/auth/logout");

  const totalApplications = user.applications.length;
  const totalInterviews = user.applications.filter(a => a.status === 'INTERVIEW_SCHEDULED').length;

  return (
    <div className="w-full">
      <WelcomeBanner userName={user.name.split(' ')[0]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center shrink-0">
            <Briefcase className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Total Applications</p>
            <h3 className="text-3xl font-bold text-black">{totalApplications}</h3>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-yellow-50 text-yellow-500 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
            <CalendarCheck className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Upcoming Interviews</p>
            <h3 className="text-3xl font-bold text-black">{totalInterviews}</h3>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-md border border-primary/20 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-black">Ready for your next opportunity?</h2>
          <p className="text-sm text-gray-600 mt-1">Check out our latest job postings and apply today.</p>
        </div>
        <Link href="/jobs" className="px-5 py-2.5 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition-colors shadow-sm shrink-0">
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
