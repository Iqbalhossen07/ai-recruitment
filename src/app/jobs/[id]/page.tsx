import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id }
  });

  if (!job || !job.isActive) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Jobs Link */}
      <Link href="/jobs" className="text-primary hover:underline font-medium mb-8 inline-flex items-center">
        &larr; Back to all jobs
      </Link>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-8 mt-6">
        {/* Job Header */}
        <div className="border-b border-gray-100 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-black">{job.title}</h1>
          <p className="text-sm text-gray-500 mt-2">Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {job.keywords.split(',').map((keyword, idx) => (
              <span key={idx} className="text-sm font-medium text-primary bg-primary-light px-3 py-1 rounded">
                {keyword.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>

        {/* Job Requirements */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-black mb-4">Requirements</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
        </div>

        {/* Application Form Placeholder */}
        <div className="bg-gray-50 p-6 rounded-md border border-gray-200" id="apply">
          <h2 className="text-2xl font-bold text-black mb-2">Apply for this Position</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Fill out the form below. Our AI will automatically scan your CV for the exact keywords required for this role.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Email Address</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Phone Number</label>
                <input type="tel" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+880 1..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Expected Salary</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. 50,000 BDT" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-1">LinkedIn URL (Optional)</label>
              <input type="url" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="https://linkedin.com/in/..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Upload CV (PDF)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" />
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
