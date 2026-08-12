import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">Available Opportunities</h1>
        <p className="text-gray-600 mt-4 text-lg">Find a role that matches your skills and ambitions.</p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No jobs available at the moment. Please check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex-grow">
                <span className="text-xs font-semibold text-primary bg-primary-light px-3 py-1 rounded-full">
                  Hiring
                </span>
                <h3 className="text-xl font-bold text-black mt-4">{job.title}</h3>
                <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                  {job.description}
                </p>
                
                {/* Keywords rendering */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.keywords.split(',').slice(0, 3).map((keyword, idx) => (
                    <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {keyword.trim()}
                    </span>
                  ))}
                  {job.keywords.split(',').length > 3 && (
                    <span className="text-xs text-gray-400 px-1 py-1">+{job.keywords.split(',').length - 3}</span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link 
                  href={`/jobs/${job.id}`} 
                  className="text-primary hover:underline font-medium text-sm px-4 py-2 bg-primary-light rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
