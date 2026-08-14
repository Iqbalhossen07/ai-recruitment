import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import ApplicationForm from "@/components/ui/ApplicationForm";

export default async function JobDetailsPage({ params }: { params: { slug: string } }) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug }
  });

  if (!job || !job.isActive) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbBanner 
        title={job.title}
        paths={[{ name: "Jobs", url: "/jobs" }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Back to Jobs Link */}
        <Link href="/jobs" className="text-primary hover:underline font-medium mb-8 inline-flex items-center">
          &larr; Back to all jobs
        </Link>

        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-8 mt-6">
        {/* Job Header */}
        <div className="border-b border-gray-100 pb-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">{job.title}</h1>
            <p className="text-sm text-gray-500 mt-2">
              Posted on {new Date(job.createdAt).toLocaleDateString()} 
              {job.location && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-md">📍 {job.location}</span>}
              {job.jobType && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-md">{job.jobType}</span>}
              {job.salaryRange && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-md">💰 {job.salaryRange}</span>}
            </p>
          </div>
          
          <a href="#apply" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md font-bold transition-colors text-center shadow-md">
            Apply Now
          </a>
        </div>

        {/* Job Description */}
        <div className="mb-8 prose prose-blue max-w-none">
          <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-2">Job Description</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>

        {/* Job Requirements */}
        <div className="mb-8 prose prose-blue max-w-none">
          <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-2">Requirements</h2>
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.requirements }} />
        </div>

        {/* Opportunities */}
        {job.opportunities && (
          <div className="mb-8 prose prose-blue max-w-none">
            <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-2">What We Offer</h2>
            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.opportunities }} />
          </div>
        )}

        {/* Keywords / Tags (Now Rich Text) */}
        {job.keywords && (
          <div className="mb-10 prose prose-blue max-w-none">
            <h2 className="text-xl font-bold text-black mb-4 border-b border-gray-100 pb-2">Keywords & Tags</h2>
            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.keywords }} />
          </div>
        )}

        {/* Application Form */}
        <ApplicationForm jobId={job.id} />
      </div>
    </div>
    </div>
  );
}
