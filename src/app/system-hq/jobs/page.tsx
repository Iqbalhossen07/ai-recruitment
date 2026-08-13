import prisma from "@/lib/prisma";
import JobsGridClient from "@/components/admin/JobsGridClient";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  return (
    <div className="w-full">
      <JobsGridClient initialJobs={jobs} />
    </div>
  );
}
