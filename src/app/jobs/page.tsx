import Link from "next/link";
import prisma from "@/lib/prisma";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import JobCard from "@/components/ui/JobCard";

export default async function JobsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  
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
    <div className="flex flex-col min-h-screen">
      <BreadcrumbBanner 
        title={q ? `Search results for "${q}"` : "Available Opportunities"} 
        subtitle="Find a role that matches your skills and ambitions." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No jobs available at the moment. Please check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
