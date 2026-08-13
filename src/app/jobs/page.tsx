import Link from "next/link";
import prisma from "@/lib/prisma";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import JobCard from "@/components/ui/JobCard";
import JobsFilterSidebar from "@/components/ui/JobsFilterSidebar";
import SortDropdown from "@/components/ui/SortDropdown";

export default async function JobsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const loc = typeof searchParams.loc === 'string' ? searchParams.loc : undefined;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  
  // Base where clause - only active and non-expired jobs
  const whereClause: any = { 
    isActive: true,
    OR: [
      { deadline: null },
      { deadline: { gt: new Date() } }
    ]
  };

  if (q) {
    whereClause.AND = [
      {
        OR: [
          { title: { contains: q } },
          { keywords: { contains: q } },
          { description: { contains: q } },
        ]
      }
    ];
  }
  
  if (loc) {
    const locCondition = loc.toLowerCase() === "remote" 
      ? { OR: [{ cityId: null }, { location: { contains: "Remote" } }] }
      : { city: { name: { equals: loc } } };

    if (whereClause.AND) {
      whereClause.AND.push(locCondition);
    } else {
      whereClause.AND = [locCondition];
    }
  }

  const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
  if (type) {
    if (whereClause.AND) whereClause.AND.push({ jobType: type });
    else whereClause.AND = [{ jobType: type }];
  }

  const salary = typeof searchParams.salary === 'string' ? searchParams.salary : undefined;
  if (salary) {
    if (whereClause.AND) whereClause.AND.push({ salaryRange: salary });
    else whereClause.AND = [{ salaryRange: salary }];
  }

  // Fetch cities for dynamic sidebar with job counts
  const citiesData = await prisma.city.findMany({
    orderBy: { name: 'asc' },
    select: { 
      id: true, 
      name: true,
      _count: {
        select: {
          jobs: {
            where: {
              isActive: true,
              OR: [
                { deadline: null },
                { deadline: { gt: new Date() } }
              ]
            }
          }
        }
      }
    }
  });

  const remoteCount = await prisma.job.count({
    where: {
      isActive: true,
      OR: [
        { deadline: null },
        { deadline: { gt: new Date() } }
      ],
      AND: {
        OR: [
          { cityId: null },
          { location: { contains: "Remote" } }
        ]
      }
    }
  });

  const cities = citiesData.map(c => ({ id: c.id, name: c.name, count: c._count.jobs }));

  const jobs = await prisma.job.findMany({
    where: whereClause,
    include: { city: true },
    orderBy: { createdAt: sort === 'oldest' ? 'asc' : 'desc' }
  });

  // Fetch unique job types and salaries for filters
  const allJobsData = await prisma.job.findMany({
    where: { isActive: true },
    select: { salaryRange: true, jobType: true }
  });

  const salaries = Array.from(new Set(allJobsData.map(j => j.salaryRange).filter(Boolean))) as string[];
  const jobTypes = Array.from(new Set(allJobsData.map(j => j.jobType).filter(Boolean))) as string[];
  
  // Sort job types alphabetically
  jobTypes.sort();
  
  // Sort salaries logically based on the first number found in the string
  salaries.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return numA - numB;
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
          <JobsFilterSidebar cities={cities} remoteCount={remoteCount} salaries={salaries} jobTypes={jobTypes} />

          {/* Right Side - Job Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-black">
                Showing <span className="text-primary">{jobs.length}</span> Jobs
              </h3>
              <SortDropdown />
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
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
