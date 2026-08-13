import JobForm from "@/components/admin/JobForm";
import prisma from "@/lib/prisma";

export default async function CreateJobPage() {
  const cities = await prisma.city.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="w-full">
      <JobForm cities={cities} />
    </div>
  );
}
