import Link from "next/link";

interface JobProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  location?: string | null;
  jobType?: string | null;
  salaryRange?: string | null;
  deadline?: Date | null;
  createdAt: Date;
}

export default function JobCard({ job }: { job: JobProps }) {
  // Compute time ago
  const hoursAgo = Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60));
  const timeAgoText = hoursAgo < 24 ? `${hoursAgo || 1}h ago` : `${Math.floor(hoursAgo / 24)}d ago`;
  
  // Use real deadline or fallback to 30 days if not set
  const deadlineDate = job.deadline ? new Date(job.deadline) : new Date(new Date(job.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  
  // Extract first keyword for category tag (strip html from rich text keywords)
  const plainKeywords = job.keywords.replace(/<[^>]*>?/gm, '');
  const category = plainKeywords.split(',')[0]?.trim() || "Technology";
  
  // Strip HTML for description snippet
  const plainDescription = job.description.replace(/<[^>]*>?/gm, '');

  return (
    <Link href={`/jobs/${job.slug}`} className="block group h-full">
      <div className="bg-gradient-to-r from-primary/5 to-white border border-gray-200 hover:border-primary rounded-md p-6 shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-300 transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
        
        {/* Header: Logo and Time */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-white rounded-md border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-md">
            {timeAgoText}
          </span>
        </div>
        
        {/* Title & Subtitle */}
        <div className="mb-4 flex-grow">
          <h3 className="text-xl font-bold text-primary line-clamp-1">
            {job.title}
          </h3>
          <p className="text-black text-sm mt-1 font-medium">
            AI-Recruit {job.location ? `, ${job.location}` : ""}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-md px-2.5 py-1 text-xs font-bold text-black">
              <span className="text-primary">📍</span> {job.location || "Remote"}
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-md px-2.5 py-1 text-xs font-bold text-black">
              <div className="w-2 h-2 rounded-md bg-primary"></div>
              {category}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-black text-sm mt-4 line-clamp-2 leading-relaxed">
            {plainDescription}
          </p>
        </div>
        
        {/* Footer */}
        <div className="pt-4 border-t border-gray-200/60 flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm font-medium text-black">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {job.jobType || "Full-time"}
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {job.salaryRange || "Negotiable"}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-black bg-gray-100 px-2 py-1 rounded-md">
              <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Deadline: {formattedDeadline}
            </div>
            
            <button className="bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-md hover:bg-primary-hover transition-colors shadow-sm">
              Apply Now
            </button>
          </div>
        </div>
        
      </div>
    </Link>
  );
}
