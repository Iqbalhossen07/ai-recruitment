import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, MapPin } from "lucide-react";
import Image from "next/image";
import DeleteCityButton from "@/components/admin/DeleteCityButton";

export default async function CitiesPage() {
  const cities = await prisma.city.findMany({
    include: {
      _count: {
        select: { jobs: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Cities</h1>
          <p className="text-gray-500 mt-1">Add, edit, or delete cities for job locations.</p>
        </div>
        <Link 
          href="/system-hq/cities/create" 
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors shadow-sm font-bold"
        >
          <Plus size={20} />
          <span>Add New City</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div key={city.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:border-primary/30 hover:shadow-md transition-all">
            <div className="relative h-40 w-full bg-gray-100">
              <Image 
                src={city.image} 
                alt={city.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <MapPin size={18} />
                <h3 className="text-xl font-bold">{city.name}</h3>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-bold text-black">{city._count.jobs}</span>
                <span className="text-gray-500 ml-1">Jobs listed</span>
              </div>
              <div className="flex gap-2">
                <Link 
                  href={`/system-hq/cities/${city.id}/edit`}
                  className="p-2 bg-gray-50 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Edit City"
                >
                  <Edit size={16} />
                </Link>
                <DeleteCityButton id={city.id} name={city.name} />
              </div>
            </div>
          </div>
        ))}

        {cities.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No cities added yet</h3>
            <p className="text-gray-500 mb-6">Create a city to allow jobs to be associated with it.</p>
            <Link 
              href="/system-hq/cities/create" 
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-hover transition-colors font-bold"
            >
              <Plus size={20} /> Add First City
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
