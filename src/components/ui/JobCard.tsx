import Link from "next/link";

interface JobProps {
  id: string;
  title: string;
  description: string;
  keywords: string;
  createdAt: Date;
}

export default function JobCard({ job }: { job: JobProps }) {
  // Compute time ago (simplified for demo)
  const hoursAgo = Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60));
  const timeAgoText = hoursAgo < 24 ? `${hoursAgo || 1}h ago` : `${Math.floor(hoursAgo / 24)}d ago`;
  
  // Extract first keyword for category tag
  const category = job.keywords.split(',')[0]?.trim() || "Design";

  return (
    <Link href={`/jobs/${job.id}`} className="block group h-full">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
        
        {/* Header: Logo and Time */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {timeAgoText}
          </span>
        </div>
        
        {/* Title & Subtitle */}
        <div className="mb-4 flex-grow">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {job.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            AI-Recruitment, Dhaka, BD
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-1.5 border border-gray-200 rounded-md px-2.5 py-1 text-xs font-medium text-gray-600">
              <span className="text-blue-600">📍</span> Dhaka, BD
            </div>
            <div className="flex items-center gap-1.5 border border-gray-200 rounded-md px-2.5 py-1 text-xs font-medium text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              {category}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mt-4 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        </div>
        
        {/* Footer */}
        <div className="pt-4 flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Full-time
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            $80k - 100k
          </div>
        </div>
        
      </div>
    </Link>
  );
}
