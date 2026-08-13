"use client";

import Swal from "sweetalert2";
import { deleteJob } from "@/app/actions/job";
import ActionButtons from "./ActionButtons";

export default function JobActions({ id, title, slug }: { id: string, title: string, slug: string }) {
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
    <ActionButtons 
      viewUrl={`/system-hq/jobs/${slug}`}
      editUrl={`/system-hq/jobs/${slug}/edit`}
      onDelete={handleDelete}
      deleteTitle="Delete Job"
    />
  );
}
