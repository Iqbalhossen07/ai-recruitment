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
  salaryRange: string | null;
  description: string;
  keywords: string;
  createdAt: Date;
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
          {filteredJobs.map((job) => {
            // Compute time ago
            const hoursAgo = Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60));
            const timeAgoText = hoursAgo < 24 ? `${hoursAgo || 1}h ago` : `${Math.floor(hoursAgo / 24)}d ago`;
            
            // Calculate fake deadline (30 days from creation)
            const deadlineDate = new Date(job.createdAt);
            deadlineDate.setDate(deadlineDate.getDate() + 30);
            const formattedDeadline = deadlineDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            
            // Extract first keyword for category tag
            const plainKeywords = job.keywords.replace(/<[^>]*>?/gm, '');
            const category = plainKeywords.split(',')[0]?.trim() || "Technology";
            
            // Strip HTML for description snippet
            const plainDescription = job.description.replace(/<[^>]*>?/gm, '');

            return (
              <div key={job.id} className="bg-gradient-to-r from-primary/5 to-white border border-gray-200 rounded-md p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
                
                {/* Header: Status, Time and Apps */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold border ${
                      job.isActive 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                      {job.isActive ? "Active" : "Draft"}
                    </span>
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md">
                      {timeAgoText}
                    </span>
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold" title="Total Applicants">
                    {job._count.applications} apps
                  </div>
                </div>
                
                {/* Title & Subtitle */}
                <div className="mb-4 flex-grow">
                  <h3 className="text-lg font-bold text-primary line-clamp-1 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-black text-xs font-medium">
                    AI-Recruit {job.location ? `, ${job.location}` : ""}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1 text-[10px] font-bold text-black">
                      <span className="text-primary">📍</span> {job.location || "Remote"}
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-2 py-1 text-[10px] font-bold text-black">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {category}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-black text-xs mt-3 line-clamp-2 leading-relaxed opacity-80">
                    {plainDescription}
                  </p>
                </div>
                
                {/* Footer details */}
                <div className="pt-3 border-t border-gray-200/60 flex flex-col gap-2 mb-4">
                  <div className="flex justify-between items-center text-xs font-medium text-black">
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {job.jobType || "Full-time"}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {job.salaryRange || "Negotiable"}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-black bg-gray-100/80 px-2 py-1 rounded-md">
                      <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {formattedDeadline}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-gray-200/60 flex flex-wrap items-center gap-1.5">
                  <Link 
                    href={`/system-hq/jobs/${job.id}`}
                    className="flex-1 flex justify-center items-center gap-1 px-2 py-1.5 bg-white border border-emerald-100 text-emerald-600 rounded-md hover:bg-emerald-50 hover:border-emerald-200 transition-colors font-medium text-xs shadow-sm"
                    title="View Details"
                  >
                    <Info size={12} /> View
                  </Link>
                  
                  <Link 
                    href={`/system-hq/jobs/${job.id}/edit`}
                    className="flex-1 flex justify-center items-center gap-1 px-2 py-1.5 bg-white border border-blue-100 text-blue-500 rounded-md hover:bg-blue-50 hover:border-blue-200 transition-colors font-medium text-xs shadow-sm"
                    title="Edit Job"
                  >
                    <Edit size={12} /> Edit
                  </Link>
                  
                  <div className="w-full">
                    <DeleteJobButton id={job.id} title={job.title} />
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
