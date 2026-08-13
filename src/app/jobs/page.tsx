import Link from "next/link";
import prisma from "@/lib/prisma";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import JobCard from "@/components/ui/JobCard";

export default async function JobsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const loc = typeof searchParams.loc === 'string' ? searchParams.loc : undefined;
  
  const whereClause: any = { isActive: true };
  if (q) {
    whereClause.OR = [
      { title: { contains: q } },
      { keywords: { contains: q } },
      { description: { contains: q } },
    ];
  }

  const jobs = await prisma.job.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbBanner 
        title={q ? `Search results for "${q}"` : "Available Opportunities"} 
        subtitle="Find a role that matches your skills and ambitions." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-1/4">
            <form method="GET" action="/jobs" className="bg-white border border-gray-200 rounded-md p-6 shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">Filter Jobs</h2>
                <Link href="/jobs" className="text-sm text-primary font-medium hover:underline">Clear All</Link>
              </div>

              {/* Keyword Search */}
              <div className="mb-6">
                <label htmlFor="q" className="block text-sm font-bold text-black mb-2">Keyword</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="q"
                    name="q" 
                    defaultValue={q}
                    placeholder="e.g. React Developer" 
                    className="w-full bg-white border border-gray-300 text-black rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-black mb-3">Location</label>
                <div className="space-y-2">
                  {["London", "Manchester", "Birmingham", "Bristol", "Edinburgh", "Remote"].map((city) => (
                    <label key={city} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" name="loc" value={city} defaultChecked={loc === city} className="peer sr-only" />
                        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-sm peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                        <svg className="w-3.5 h-3.5 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-black group-hover:text-primary transition-colors">{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-black mb-3">Job Type</label>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Freelance"].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" name="type" value={type} className="peer sr-only" />
                        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-sm peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                        <svg className="w-3.5 h-3.5 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-black group-hover:text-primary transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-black mb-3">Salary</label>
                <div className="space-y-2">
                  {["£20k - £40k", "£40k - £60k", "£60k - £80k", "£80k+"].map((range) => (
                    <label key={range} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" name="salary" value={range} className="peer sr-only" />
                        {/* Circle for radio button style */}
                        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full peer-checked:border-primary peer-checked:border-[5px] transition-all"></div>
                      </div>
                      <span className="text-black group-hover:text-primary transition-colors">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-md hover:opacity-90 transition-opacity">
                Apply Filters
              </button>
            </form>
          </aside>

          {/* Right Side - Job Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-black">
                Showing <span className="text-primary">{jobs.length}</span> Jobs
              </h3>
              <select className="bg-white border border-gray-200 text-black font-medium rounded-md px-4 py-2 focus:outline-none focus:border-primary shadow-sm cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
            </div>

            {jobs.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-md text-center py-20">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
                <Link href="/jobs" className="inline-block mt-6 bg-primary text-black font-bold px-6 py-2 rounded-md hover:opacity-90">
                  Clear Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
