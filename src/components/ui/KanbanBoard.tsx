"use client";

import { useState, useRef } from "react";
import { ApplicationStatus } from "@prisma/client";
import { updateApplicationStatus, deleteApplication } from "@/app/actions/application-status";
import Swal from "sweetalert2";

type Application = any; // simplified for MVP

export default function KanbanBoard({ initialApplications }: { initialApplications: Application[] }) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Group applications by status
  const matched = applications.filter(a => a.status === ApplicationStatus.MATCHED);
  const interview = applications.filter(a => a.status === ApplicationStatus.INTERVIEW_SCHEDULED);
  const hired = applications.filter(a => a.status === ApplicationStatus.HIRED);
  const rejected = applications.filter(a => a.status === ApplicationStatus.REJECTED);
  const notMatched = applications.filter(a => a.status === ApplicationStatus.NOT_MATCHED);

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus, iDateStr?: string, iLink?: string, offeredSalary?: string) => {
    setIsUpdating(true);
    const res = await updateApplicationStatus(appId, newStatus, "", iDateStr, iLink, offeredSalary);
    setIsUpdating(false);

    if (res.success) {
      setApplications(prev => prev.map(app => 
        app.id === appId ? { 
          ...app, 
          status: newStatus, 
          interviewDate: iDateStr ? new Date(iDateStr) : app.interviewDate,
          interviewLink: iLink || app.interviewLink
        } : app
      ));
      setSelectedApp(null);
      
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Candidate has been moved to ${newStatus}. ${['INTERVIEW_SCHEDULED', 'HIRED', 'REJECTED'].includes(newStatus) ? 'An email has been sent.' : ''}`,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: res.message });
    }
  };

  const handleHire = async (appId: string, expectedSalary: string) => {
    const { value: offeredSalary } = await Swal.fire({
      title: 'Offer Details',
      text: `Candidate's expected salary: ${expectedSalary || 'Not specified'}. Enter the final offered salary:`,
      input: 'text',
      inputPlaceholder: 'e.g. 65000',
      showCancelButton: true,
      confirmButtonText: 'Hire & Send Offer',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write an offered salary!'
        }
      }
    });

    if (offeredSalary) {
      await handleStatusChange(appId, ApplicationStatus.HIRED, undefined, undefined, offeredSalary);
    }
  };

  const handleScheduleInterview = async (appId: string) => {
    const { value: formValues } = await Swal.fire({
      title: 'Schedule Interview',
      html:
        '<input type="datetime-local" id="swal-input1" class="swal2-input" placeholder="Date & Time">' +
        '<input type="url" id="swal-input2" class="swal2-input" placeholder="Meeting Link (e.g. Zoom)">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Schedule & Send Email',
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ]
      }
    });

    if (formValues) {
      const [dateStr, link] = formValues;
      if (!dateStr) {
        Swal.fire('Error', 'Please select a date and time.', 'error');
        return;
      }
      await handleStatusChange(appId, ApplicationStatus.INTERVIEW_SCHEDULED, dateStr, link);
    }
  };

  const handleDelete = async (appId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! This will permanently delete the application.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      setIsUpdating(true);
      const res = await deleteApplication(appId);
      setIsUpdating(false);

      if (res.success) {
        setApplications(prev => prev.filter(app => app.id !== appId));
        setSelectedApp(null);
        Swal.fire('Deleted!', 'The application has been deleted.', 'success');
      } else {
        Swal.fire('Error!', res.message, 'error');
      }
    }
  };

  const openModal = (app: Application) => {
    setSelectedApp(app);
  };

  const getCardBgColor = (status: ApplicationStatus) => {
    switch(status) {
      case ApplicationStatus.MATCHED: return "bg-blue-50 hover:bg-blue-100 border-blue-200";
      case ApplicationStatus.INTERVIEW_SCHEDULED: return "bg-yellow-50 hover:bg-yellow-100 border-yellow-200";
      case ApplicationStatus.HIRED: return "bg-green-50 hover:bg-green-100 border-green-200";
      case ApplicationStatus.REJECTED: return "bg-red-50 hover:bg-red-100 border-red-200";
      default: return "bg-gray-50 hover:bg-gray-100 border-gray-200";
    }
  };

  const renderCard = (app: Application) => (
    <div key={app.id} className={`border rounded-md p-5 shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 mb-4 flex flex-col ${getCardBgColor(app.status)}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-2">
          <h4 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">{app.name}</h4>
          <p className="text-sm font-medium text-primary mt-1 line-clamp-1">{app.job.title}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          <span className="truncate">{app.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <span>{app.phone}</span>
        </div>
        {app.expectedSalary && (
          <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{app.expectedSalary}</span>
          </div>
        )}
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200/50 flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-gray-600 font-bold bg-white/60 px-2.5 py-1 rounded-md">
            {new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => openModal(app)}
              className="text-[11px] font-bold text-primary hover:text-primary-hover bg-white px-2 py-1 rounded shadow-sm border border-gray-100 transition-colors"
            >
              View
            </button>
            <button 
              onClick={() => handleDelete(app.id)}
              disabled={isUpdating}
              className="text-[11px] font-bold text-red-600 hover:text-red-700 bg-white px-2 py-1 rounded shadow-sm border border-gray-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
        
        {/* Action Buttons based on status */}
        <div className="flex flex-wrap gap-2 mt-1">
          {app.status === ApplicationStatus.MATCHED && (
             <button onClick={() => handleScheduleInterview(app.id)} disabled={isUpdating} className="flex-1 text-xs font-bold text-white bg-yellow-600 hover:bg-yellow-700 py-1.5 rounded-md transition-colors text-center shadow-sm">Schedule Interview</button>
          )}
          {app.status === ApplicationStatus.INTERVIEW_SCHEDULED && (
             <button onClick={() => handleHire(app.id, app.expectedSalary)} disabled={isUpdating} className="flex-1 text-xs font-bold text-white bg-green-600 hover:bg-green-700 py-1.5 rounded-md transition-colors text-center shadow-sm">Hire Candidate</button>
          )}
          {(app.status === ApplicationStatus.MATCHED || app.status === ApplicationStatus.INTERVIEW_SCHEDULED) && (
             <button onClick={() => handleStatusChange(app.id, ApplicationStatus.REJECTED)} disabled={isUpdating} className="flex-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 py-1.5 rounded-md transition-colors text-center shadow-sm">Reject</button>
          )}
          {app.status === ApplicationStatus.NOT_MATCHED && (
             <button onClick={() => handleScheduleInterview(app.id)} disabled={isUpdating} className="w-full text-xs font-bold text-white bg-yellow-600 hover:bg-yellow-700 py-1.5 rounded-md transition-colors text-center shadow-sm">Schedule Interview</button>
          )}
        </div>
      </div>
    </div>
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 640 ? 320 + 24 : window.innerWidth * 0.85 + 24;
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black font-lora">Candidate Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all job applications and candidates.</p>
        </div>
        
        {/* Navigation Buttons for small screens */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-md bg-white border border-gray-200 shadow-sm text-gray-600 hover:text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-md bg-white border border-gray-200 shadow-sm text-gray-600 hover:text-primary hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        
        {/* MATCHED Column */}
        <div className="flex-shrink-0 w-[85vw] sm:w-80 flex flex-col bg-blue-50/50 rounded-xl border border-blue-100 h-[calc(100vh-240px)] shadow-sm">
          <div className="p-4 border-b border-blue-100 bg-blue-50 rounded-t-xl">
            <h3 className="font-bold text-blue-900 flex justify-between items-center">
              Matched (AI) <span className="bg-blue-200 text-blue-800 px-2.5 py-0.5 rounded-full text-xs shadow-sm">{matched.length}</span>
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            {matched.map(renderCard)}
          </div>
        </div>

        {/* INTERVIEW Column */}
        <div className="flex-shrink-0 w-[85vw] sm:w-80 flex flex-col bg-yellow-50/50 rounded-xl border border-yellow-100 h-[calc(100vh-240px)] shadow-sm">
          <div className="p-4 border-b border-yellow-100 bg-yellow-50 rounded-t-xl">
            <h3 className="font-bold text-yellow-900 flex justify-between items-center">
              Interviewing <span className="bg-yellow-200 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs shadow-sm">{interview.length}</span>
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            {interview.map(renderCard)}
          </div>
        </div>

        {/* HIRED Column */}
        <div className="flex-shrink-0 w-[85vw] sm:w-80 flex flex-col bg-green-50/50 rounded-xl border border-green-100 h-[calc(100vh-240px)] shadow-sm">
          <div className="p-4 border-b border-green-100 bg-green-50 rounded-t-xl">
            <h3 className="font-bold text-green-900 flex justify-between items-center">
              Hired <span className="bg-green-200 text-green-800 px-2.5 py-0.5 rounded-full text-xs shadow-sm">{hired.length}</span>
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            {hired.map(renderCard)}
          </div>
        </div>

        {/* REJECTED Column */}
        <div className="flex-shrink-0 w-[85vw] sm:w-80 flex flex-col bg-red-50/50 rounded-xl border border-red-100 h-[calc(100vh-240px)] shadow-sm">
          <div className="p-4 border-b border-red-100 bg-red-50 rounded-t-xl">
            <h3 className="font-bold text-red-900 flex justify-between items-center">
              Rejected <span className="bg-red-200 text-red-800 px-2.5 py-0.5 rounded-full text-xs shadow-sm">{rejected.length}</span>
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            {rejected.map(renderCard)}
          </div>
        </div>
        
        {/* NOT MATCHED Column (For Manual Review) */}
        <div className="flex-shrink-0 w-[85vw] sm:w-80 flex flex-col bg-gray-50/80 rounded-xl border border-gray-200 h-[calc(100vh-240px)] shadow-sm opacity-90">
          <div className="p-4 border-b border-gray-200 bg-gray-100 rounded-t-xl">
            <h3 className="font-bold text-gray-700 flex justify-between items-center">
              Not Matched (Pool) <span className="bg-gray-200 text-gray-800 px-2.5 py-0.5 rounded-full text-xs shadow-sm">{notMatched.length}</span>
            </h3>
          </div>
          <div className="p-3 flex-1 overflow-y-auto">
            {notMatched.map(renderCard)}
          </div>
        </div>

      </div>

      {/* Candidate Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-black">{selectedApp.name}</h2>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Job Applied For:</p>
                  <a href={`/system-hq/jobs/${selectedApp.job.slug}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline flex items-center gap-1">
                    {selectedApp.job.title}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                  {selectedApp.job.salaryRange && (
                    <p className="text-xs text-gray-600 mt-1">Salary: {selectedApp.job.salaryRange}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email:</p>
                  <p className="font-semibold text-black">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone:</p>
                  <p className="font-semibold text-black">{selectedApp.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Expected Salary:</p>
                  <p className="font-semibold text-black">{selectedApp.expectedSalary || 'N/A'}</p>
                </div>
                {selectedApp.linkedinUrl && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">LinkedIn:</p>
                    <a href={selectedApp.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                      {selectedApp.linkedinUrl}
                    </a>
                  </div>
                )}
                
                <div className="md:col-span-2 pt-2 border-t border-gray-200 mt-2">
                  <a href={selectedApp.cvUrl} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-primary-hover transition-colors inline-flex items-center gap-2 w-max">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                    View Original CV
                  </a>
                </div>
              </div>

              {/* Education & Experience */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    Education
                  </h3>
                  <div className="bg-blue-50/50 p-4 rounded-md border border-blue-100 text-sm text-gray-700 whitespace-pre-wrap h-40 overflow-y-auto">
                    {selectedApp.education || "Not explicitly mentioned."}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 14h6"/><path d="M15 10v4"/><path d="M9 10v4"/></svg>
                    Experience
                  </h3>
                  <div className="bg-yellow-50/50 p-4 rounded-md border border-yellow-100 text-sm text-gray-700 whitespace-pre-wrap h-40 overflow-y-auto">
                    {selectedApp.experience || "Not explicitly mentioned."}
                  </div>
                </div>
              </div>

              {/* Applicant's Extracted Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                  Applicant's Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const POPULAR_SKILLS = [
                      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "NestJS", 
                      "Python", "Django", "Flask", "FastAPI", "Java", "Spring Boot", "C++", "C#", ".NET",
                      "Ruby", "Ruby on Rails", "PHP", "Laravel", "Go", "Rust", "Swift", "Kotlin", "React Native", "Flutter",
                      "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Prisma ORM", "Prisma", "Mongoose",
                      "AWS", "Google Cloud", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitHub Actions",
                      "HTML", "CSS", "Tailwind CSS", "SASS", "Bootstrap", "GraphQL", "REST API",
                      "Figma", "UI/UX", "SEO", "Google Analytics", "Marketing", "Content Strategy", "Machine Learning", "AI"
                    ];
                    
                    const combinedText = ((selectedApp.cvText || '') + ' ' + (selectedApp.aiSummary || '') + ' ' + (selectedApp.experience || '')).toLowerCase();
                    const extractedSkills = POPULAR_SKILLS.filter(skill => combinedText.includes(skill.toLowerCase()));
                    
                    if (extractedSkills.length === 0) {
                      return <span className="text-sm text-gray-500">No specific tech skills detected automatically. Check CV for details.</span>;
                    }
                    
                    return extractedSkills.map((skill, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1.5">
                        {skill}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                    ));
                  })()}
                </div>
              </div>

              {/* Candidate Evaluation */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/></svg>
                  Candidate Evaluation & Notes
                </h3>
                <div className="bg-gray-100 p-4 rounded-md text-gray-800 whitespace-pre-wrap border border-gray-200">
                  {selectedApp.aiSummary || "No candidate evaluation summary available."}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
