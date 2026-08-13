import prisma from "@/lib/prisma";
import JobForm from "@/components/admin/JobForm";
import { notFound } from "next/navigation";

export default async function EditJobPage({ params }: { params: { slug: string } }) {
  const [job, cities] = await Promise.all([
    prisma.job.findUnique({
      where: { slug: params.slug }
    }),
    prisma.city.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  if (!job) {
    notFound();
  }

  return (
    <div className="w-full">
      <JobForm job={job} cities={cities} />
    </div>
  );
}
