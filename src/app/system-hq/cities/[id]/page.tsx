import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import JobsGridClient from "@/components/admin/JobsGridClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CityJobsPage({ params }: { params: { id: string } }) {
  const city = await prisma.city.findUnique({
    where: { id: params.id }
  });

  if (!city) {
    notFound();
  }

  // Fetch jobs for this city
  const jobs = await prisma.job.findMany({
    where: { cityId: city.id },
    include: {
      _count: {
        select: { applications: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/system-hq/cities"
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Jobs in {city.name}</h1>
          <p className="text-gray-500 mt-1">Showing all jobs listed under the location: {city.name}</p>
        </div>
      </div>

      <JobsGridClient initialJobs={jobs} />
    </div>
  );
}
