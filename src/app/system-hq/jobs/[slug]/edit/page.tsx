import prisma from "@/lib/prisma";
import JobForm from "@/components/admin/JobForm";
import { notFound } from "next/navigation";

export default async function EditJobPage({ params }: { params: { slug: string } }) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug }
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="w-full">
      <JobForm job={job} />
    </div>
  );
}
