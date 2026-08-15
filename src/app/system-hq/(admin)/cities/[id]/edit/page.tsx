export const dynamic = 'force-dynamic';
import CityForm from "@/components/admin/CityForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCityPage({ params }: { params: { id: string } }) {
  const city = await prisma.city.findUnique({
    where: { id: params.id }
  });

  if (!city) {
    notFound();
  }

  return (
    <div className="w-full">
      <CityForm city={city} />
    </div>
  );
}
