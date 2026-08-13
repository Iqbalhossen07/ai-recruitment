"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { City } from "@prisma/client";
import { createCity, updateCity } from "@/app/actions/city";
import Swal from "sweetalert2";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";

interface CityFormProps {
  city?: City;
}

export default function CityForm({ city }: CityFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(city?.image || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    let response;
    
    if (city) {
      response = await updateCity(city.id, null, formData);
    } else {
      response = await createCity(null, formData);
    }

    setIsSubmitting(false);

    if (response?.error) {
      Swal.fire("Error!", response.error, "error");
    } else if (response?.success) {
      await Swal.fire({
        title: "Success!",
        text: city ? "City updated successfully." : "City created successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      router.push("/system-hq/cities");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/system-hq/cities" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold text-black">
          {city ? "Edit City" : "Add New City"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">City Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={city?.name || ""}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g. London, Dhaka, New York"
          />
        </div>

        <div>
          <label htmlFor="imageFile" className="block text-sm font-bold text-gray-700 mb-2">City Image *</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
                setImagePreview(url);
              }
            }}
            required={!city?.image} // Required if creating new city
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all mb-4"
          />
          {imagePreview && (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
              <Image 
                src={imagePreview} 
                alt="City Preview" 
                fill 
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                }}
              />
            </div>
          )}
        </div>

        <div className="pt-6 flex justify-end gap-4">
          <Link 
            href="/system-hq/cities"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !imagePreview}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover focus:ring-4 focus:ring-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSubmitting ? "Saving..." : city ? "Update City" : "Add City"}
          </button>
        </div>
      </form>
    </div>
  );
}
