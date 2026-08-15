export const dynamic = 'force-dynamic';
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Mail, Phone, Calendar, Star, GraduationCap } from "lucide-react";

export default async function ApplicationDetails({ params }: { params: { id: string } }) {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) redirect("/portal/login");

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) redirect("/portal/login");

  const application = await prisma.application.findUnique({
    where: { 
      id: params.id,
      userId: session.userId as string, // Ensure the application belongs to the logged-in user
    },
    include: {
      job: true
    }
  });

  if (!application) {
    redirect("/portal/applications");
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MATCHED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'INTERVIEW_SCHEDULED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIRED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'MATCHED': return 'Shortlisted';
      case 'INTERVIEW_SCHEDULED': return 'Interview Scheduled';
      case 'HIRED': return 'Hired';
      case 'REJECTED': return 'Rejected';
      default: return 'Pending Review';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <Link href="/portal/applications" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-gray-50/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-black">
                {application.job.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(application.status)}`}>
                {getStatusText(application.status)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Briefcase className="w-4 h-4 text-primary" />
                {application.job.jobType || "Full Time"}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-primary" />
                Applied: {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            {application.cvUrl && (
              <a 
                href={application.cvUrl.startsWith('/') || application.cvUrl.startsWith('http') ? application.cvUrl : `/${application.cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                View Submitted CV
              </a>
            )}
          </div>
        </div>

        {/* Application Status Alerts */}
        {(application.status === 'INTERVIEW_SCHEDULED' || application.status === 'HIRED' || application.status === 'REJECTED') && (
          <div className="px-6 md:px-8 py-5 border-b border-gray-100 bg-white">
            {application.status === 'INTERVIEW_SCHEDULED' && (
              <div className="p-5 bg-yellow-50 rounded-md border border-yellow-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="bg-yellow-100 p-2.5 rounded-full text-yellow-600 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-900 text-lg">Interview Scheduled!</h3>
                  <p className="text-yellow-800 text-sm mt-1 leading-relaxed">
                    We have sent an email with the interview details, including the meeting link and exact timing. Please check your inbox (and spam folder).
                  </p>
                </div>
              </div>
            )}

            {application.status === 'HIRED' && (
              <div className="p-5 bg-green-50 rounded-md border border-green-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="bg-green-100 p-2.5 rounded-full text-green-600 shrink-0">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900 text-lg">Congratulations!</h3>
                  <p className="text-green-800 text-sm mt-1 leading-relaxed">
                    You have been hired for this position. We are excited to have you on the team. Check your email for your official offer letter and onboarding instructions.
                  </p>
                </div>
              </div>
            )}
            
            {application.status === 'REJECTED' && (
              <div className="p-5 bg-red-50 rounded-md border border-red-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="bg-red-100 p-2.5 rounded-full text-red-600 shrink-0">
                  <ArrowLeft className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-red-900 text-lg">Update on your application</h3>
                  <p className="text-red-800 text-sm mt-1 leading-relaxed">
                    Thank you for your interest. Unfortunately, we have decided to move forward with other candidates at this time. We wish you the best in your job search!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Applicant Details */}
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-bold text-black mb-4">Your Submitted Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
              <p className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-md border border-gray-100">{application.name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</p>
              <p className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-md border border-gray-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {application.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
              <p className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-md border border-gray-100 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {application.phone || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Expected Salary</p>
              <p className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-md border border-gray-100">
                {application.expectedSalary || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Evaluation Summary */}
        <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50/30">
          <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            AI Evaluation Summary
          </h3>
          <div className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              {application.aiSummary || "Your resume is currently under review by our AI matching system."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
