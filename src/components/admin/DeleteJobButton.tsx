"use client";

import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { deleteJob } from "@/app/actions/job";

export default function DeleteJobButton({ id, title }: { id: string, title: string }) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the job: "${title}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const response = await deleteJob(id);
      if (response?.error) {
        Swal.fire('Error!', response.error, 'error');
      } else {
        Swal.fire('Deleted!', 'The job has been deleted.', 'success');
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="w-full flex justify-center items-center gap-1.5 px-3 py-1.5 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors font-medium text-sm"
      title="Delete Job"
    >
      <Trash2 size={14} /> Delete
    </button>
  );
}
