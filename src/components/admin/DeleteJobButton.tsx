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
      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
      title="Delete Job"
    >
      <Trash2 size={16} />
    </button>
  );
}
