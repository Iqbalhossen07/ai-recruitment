"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Job } from "@prisma/client";
import { createJob, updateJob } from "@/app/actions/job";
import RichTextEditor from "./RichTextEditor";
import Swal from "sweetalert2";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface JobFormProps {
  job?: Job; // If provided, we are in Edit mode
}

export default function JobForm({ job }: JobFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for Rich Text editors
  const [description, setDescription] = useState(job?.description || "");
  const [requirements, setRequirements] = useState(job?.requirements || "");
  const [opportunities, setOpportunities] = useState(job?.opportunities || "");
  const [keywords, setKeywords] = useState(job?.keywords || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Append rich text content manually since they aren't standard inputs
    formData.set("description", description);
    formData.set("requirements", requirements);
    formData.set("opportunities", opportunities);
    formData.set("keywords", keywords);

    let response;
    
    if (job) {
      response = await updateJob(job.id, null, formData);
    } else {
      response = await createJob(null, formData);
    }

    setIsSubmitting(false);

    if (response?.error) {
      Swal.fire("Error!", response.error, "error");
    } else if (response?.success) {
      await Swal.fire({
        title: "Success!",
        text: job ? "Job updated successfully." : "Job created successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      router.push("/system-hq/jobs");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/system-hq/jobs" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold text-black">
          {job ? "Edit Job Posting" : "Create New Job"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={job?.title || ""}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={job?.location || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="e.g. Remote, Dhaka, London"
            />
          </div>

          {/* Job Type */}
          <div>
            <label htmlFor="jobType" className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              defaultValue={job?.jobType || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-white"
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Salary Range */}
          <div>
            <label htmlFor="salaryRange" className="block text-sm font-bold text-gray-700 mb-2">Salary Range</label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              defaultValue={job?.salaryRange || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="e.g. $80k - $120k / year"
            />
          </div>

          {/* Deadline */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-bold text-gray-700 mb-2">Application Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              defaultValue={job?.deadline ? new Date(job.deadline).toISOString().split('T')[0] : ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Description - Rich Text */}
        <div className="pt-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Job Description *</label>
          <RichTextEditor 
            value={description}
            onChange={setDescription}
            placeholder="Describe the role, responsibilities, and the company..."
          />
        </div>

        {/* Requirements - Rich Text */}
        <div className="pt-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Requirements *</label>
          <RichTextEditor 
            value={requirements}
            onChange={setRequirements}
            placeholder="List the skills, experience, and qualifications required..."
          />
        </div>

        {/* Opportunities - Rich Text */}
        <div className="pt-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Opportunities</label>
          <RichTextEditor 
            value={opportunities}
            onChange={setOpportunities}
            placeholder="What you will learn, career growth, perks..."
          />
        </div>

        {/* Keywords - Rich Text */}
        <div className="pt-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Keywords & Tags</label>
          <RichTextEditor 
            value={keywords}
            onChange={setKeywords}
            placeholder="e.g. React, Next.js, CSS..."
          />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="isActive" 
              defaultChecked={job ? job.isActive : true}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            <span className="ml-3 text-sm font-bold text-gray-700">Publish this Job</span>
          </label>
        </div>

        {/* Actions */}
        <div className="pt-6 flex justify-end gap-4">
          <Link 
            href="/system-hq/jobs"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !description || !requirements}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover focus:ring-4 focus:ring-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSubmitting ? "Saving..." : job ? "Update Job" : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
