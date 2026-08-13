import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, MapPin, Briefcase } from "lucide-react";
import DeleteJobButton from "@/components/admin/DeleteJobButton";

export default async function AdminJobDetailsPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
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

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/system-hq/jobs" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold text-black flex-1">Job Details</h2>
        <div className="flex gap-2">
          <Link 
            href={`/system-hq/jobs/${job.id}/edit`}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-blue-100 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            <Edit size={16} /> Edit
          </Link>
          <div className="w-24">
            <DeleteJobButton id={job.id} title={job.title} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
        <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                job.isActive 
                  ? "bg-green-50 text-green-700 border-green-200" 
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}>
                {job.isActive ? "Active" : "Draft"}
              </span>
              <span>•</span>
              <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
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
            </div>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-3 rounded-xl flex flex-col items-center justify-center border border-primary/20">
            <span className="text-2xl font-black leading-none">{job._count.applications}</span>
            <span className="text-xs font-bold uppercase tracking-wider mt-1">Applicants</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-black mb-3 border-b border-gray-100 pb-2">Description</h3>
            <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-black mb-3 border-b border-gray-100 pb-2">Requirements</h3>
            <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: job.requirements }} />
          </div>
          {job.opportunities && (
            <div>
              <h3 className="text-lg font-bold text-black mb-3 border-b border-gray-100 pb-2">Opportunities</h3>
              <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: job.opportunities }} />
            </div>
          )}
          {job.keywords && (
            <div>
              <h3 className="text-lg font-bold text-black mb-3 border-b border-gray-100 pb-2">Keywords</h3>
              <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: job.keywords }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
