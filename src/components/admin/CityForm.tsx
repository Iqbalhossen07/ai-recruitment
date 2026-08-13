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
          <label className="block text-sm font-bold text-gray-700 mb-2">City Image *</label>
          <div className="mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 hover:bg-gray-50 transition-colors relative">
            <div className="text-center w-full">
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm mx-auto mb-4 border border-gray-200">
                  <Image 
                    src={imagePreview} 
                    alt="City Preview" 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Invalid+Image";
                    }}
                  />
                </div>
              ) : (
                <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                <label
                  htmlFor="imageFile"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-hover px-2 py-1 shadow-sm border border-gray-200"
                >
                  <span>Upload a file</span>
                  <input
                    id="imageFile"
                    name="imageFile"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const url = URL.createObjectURL(e.target.files[0]);
                        setImagePreview(url);
                      }
                    }}
                    required={!city?.image}
                  />
                </label>
                <p className="pl-1 pt-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
          <Link 
            href="/system-hq/cities"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || (!imagePreview && !city)}
            className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSubmitting ? "Saving..." : city ? "Update City" : "Add City"}
          </button>
        </div>
      </form>
    </div>
  );
}
