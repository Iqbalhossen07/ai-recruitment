import prisma from "@/lib/prisma";
import JobForm from "@/components/admin/JobForm";
import { notFound } from "next/navigation";

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id }
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
