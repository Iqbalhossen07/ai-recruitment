"use client";

import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { deleteCity } from "@/app/actions/city";

export default function DeleteCityButton({ id, name }: { id: string, name: string }) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the city: "${name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const response = await deleteCity(id);
      if (response?.error) {
        Swal.fire('Error!', response.error, 'error');
      } else {
        Swal.fire('Deleted!', 'The city has been deleted.', 'success');
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="p-2 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
      title="Delete City"
    >
      <Trash2 size={16} />
    </button>
  );
}
