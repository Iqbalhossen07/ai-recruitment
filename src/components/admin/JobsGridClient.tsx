"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Info, MapPin, Briefcase, Search } from "lucide-react";
import DeleteJobButton from "@/components/admin/DeleteJobButton";

type Job = {
  id: string;
  title: string;
  location: string | null;
  jobType: string | null;
  isActive: boolean;
  _count: { applications: number };
};

export default function JobsGridClient({ initialJobs }: { initialJobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = initialJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-black">Jobs Management</h2>
          <p className="text-sm text-gray-500">Create, edit, and manage job postings.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <Link 
            href="/system-hq/jobs/create" 
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <Plus size={18} />
            Post New Job
          </Link>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
          No jobs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col h-full">
              
              {/* Header Status & Applicants */}
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${
                  job.isActive 
                    ? "bg-green-50 text-green-700 border-green-100" 
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }`}>
                  {job.isActive ? "Active" : "Draft"}
                </span>
                
                <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold" title="Total Applicants">
                  {job._count.applications} apps
                </div>
              </div>
              
              {/* Job Info */}
              <div className="flex-grow">
                <h3 className="font-bold text-black text-lg leading-tight mb-2 line-clamp-2" title={job.title}>
                  {job.title}
                </h3>
                
                <div className="flex flex-col gap-1.5 text-xs text-gray-500 font-medium">
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-gray-400" /> {job.location}
                    </span>
                  )}
                  {job.jobType && (
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={12} className="text-gray-400" /> {job.jobType}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <Link 
                  href={`/system-hq/jobs/${job.id}`}
                  className="flex-1 flex justify-center items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors font-medium text-sm"
                  title="View Details"
                >
                  <Info size={14} /> View
                </Link>
                
                <Link 
                  href={`/system-hq/jobs/${job.id}/edit`}
                  className="flex-1 flex justify-center items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-100 text-blue-500 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors font-medium text-sm"
                  title="Edit Job"
                >
                  <Edit size={14} /> Edit
                </Link>
                
                <div className="w-full">
                  <DeleteJobButton id={job.id} title={job.title} />
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
