import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye, MapPin, Briefcase } from "lucide-react";
import DeleteJobButton from "@/components/admin/DeleteJobButton";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-black">Jobs Management</h2>
          <p className="text-sm text-gray-500">Create, edit, and manage job postings.</p>
        </div>
        <Link 
          href="/system-hq/jobs/create" 
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Post New Job
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-sm">
              <th className="py-4 px-4 font-semibold">Job Title</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 font-semibold">Applicants</th>
              <th className="py-4 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No jobs found. Click "Post New Job" to add one.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-black mb-1">{job.title}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                      )}
                      {job.jobType && (
                        <span className="flex items-center gap-1">
                          <Briefcase size={12} /> {job.jobType}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      job.isActive 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}>
                      {job.isActive ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="inline-flex items-center justify-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                      {job._count.applications}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/jobs/${job.id}`}
                        target="_blank"
                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Job"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link 
                        href={`/system-hq/jobs/${job.id}/edit`}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Edit Job"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteJobButton id={job.id} title={job.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
