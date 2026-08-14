import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ApplicationStatus } from "@prisma/client";

export default async function PortalDashboard() {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) redirect("/portal/login");

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) redirect("/portal/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    include: {
      applications: {
        include: {
          job: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  if (!user) redirect("/portal/login");

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'MATCHED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'INTERVIEW_SCHEDULED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIRED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case 'MATCHED': return 'Shortlisted';
      case 'INTERVIEW_SCHEDULED': return 'Interview Scheduled';
      case 'HIRED': return 'Hired';
      case 'REJECTED': return 'Rejected';
      default: return 'Pending';
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-600 mt-1">Track your job applications and upcoming interviews.</p>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-black">Your Applications</h2>
        </div>
        
        {user.applications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>You haven't applied to any jobs yet.</p>
            <Link href="/jobs" className="text-primary hover:underline mt-2 inline-block">Browse Jobs</Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {user.applications.map((app) => (
              <li key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-black">
                      <Link href={`/jobs/${app.job.slug}`} className="hover:text-primary transition-colors">
                        {app.job.title}
                      </Link>
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span>Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                      {app.job.location && <span>📍 {app.job.location}</span>}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                    <Link 
                      href={`/portal/applications/${app.id}`}
                      className="text-sm font-medium text-primary hover:text-primary-hover hover:underline transition-colors px-3 py-1.5 border border-primary/20 rounded-md bg-primary/5"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                {app.status === 'INTERVIEW_SCHEDULED' && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-100 flex items-start gap-3">
                    <div className="text-yellow-500 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-yellow-800">Interview Scheduled!</h4>
                      <p className="text-sm text-yellow-700 mt-1">Please check your email for the interview link and exact timing details.</p>
                    </div>
                  </div>
                )}
                
                {app.status === 'HIRED' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-100 flex items-start gap-3">
                    <div className="text-green-500 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-green-800">Congratulations!</h4>
                      <p className="text-sm text-green-700 mt-1">You have been hired for this position. We have sent an Offer Letter to your email.</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
