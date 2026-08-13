"use client";

import Swal from "sweetalert2";
import { deleteCity } from "@/app/actions/city";
import ActionButtons from "./ActionButtons";

export default function CityActions({ id, name }: { id: string, name: string }) {
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
    <ActionButtons 
      editUrl={`/system-hq/cities/${id}/edit`}
      onDelete={handleDelete}
      deleteTitle="Delete City"
    />
  );
}
