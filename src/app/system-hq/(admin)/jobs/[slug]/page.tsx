import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, MapPin, Briefcase } from "lucide-react";
import JobActions from "@/components/admin/JobActions";

export default async function AdminJobDetailsPage({ params }: { params: { slug: string } }) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    include: {
      applications: true,
      _count: {
        select: { applications: true }
      }
    }
  });

  if (!job) {
    notFound();
  }

  // Calculate formatted deadline or fallback
  const formattedDeadline = job.deadline 
    ? new Date(job.deadline).toLocaleDateString()
    : "Not Set";

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/system-hq/jobs" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold text-black flex-1">Job Details</h2>
        <div className="flex items-center gap-2 hidden sm:flex">
          <JobActions id={job.id} title={job.title} slug={job.slug} />
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8 mb-6">
        <div className="border-b border-gray-100 pb-8 mb-8 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4 tracking-tight">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                job.isActive 
                  ? "bg-green-50 text-green-700 border-green-200" 
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}>
                {job.isActive ? "Active" : "Draft"}
              </span>
              <span>•</span>
              <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>Deadline: <span className="text-red-500 font-bold">{formattedDeadline}</span></span>
              {job.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                </>
              )}
              {job.jobType && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Briefcase size={14} /> {job.jobType}</span>
                </>
              )}
              {job.salaryRange && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-primary font-bold">Salary: {job.salaryRange}</span>
                </>
              )}
            </div>
          </div>
          <div className="bg-green-50/50 text-green-700 px-8 py-4 rounded-md flex flex-col items-center justify-center border border-green-200 min-w-[140px]">
            <span className="text-4xl font-black leading-none">{job._count.applications}</span>
            <span className="text-xs font-bold uppercase tracking-widest mt-2">Applicants</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-3">Description</h3>
              <div className="prose prose-sm prose-p:text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
            {job.keywords && (
              <div>
                <h3 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-3">Keywords</h3>
                <div className="prose prose-sm prose-p:text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: job.keywords }} />
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-3">Requirements</h3>
              <div className="prose prose-sm prose-p:text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: job.requirements }} />
            </div>
            {job.opportunities && (
              <div>
                <h3 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-3">Opportunities</h3>
                <div className="prose prose-sm prose-p:text-gray-600 max-w-none" dangerouslySetInnerHTML={{ __html: job.opportunities }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
