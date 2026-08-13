"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function JobsFilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const q = searchParams.get('q') || '';
  const loc = searchParams.get('loc') || '';
  const type = searchParams.get('type') || '';
  const salary = searchParams.get('salary') || '';

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    
    formData.forEach((value, key) => {
      if (value) params.append(key, value.toString());
    });
    
    router.push(`/jobs?${params.toString()}`);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/jobs');
  };

  return (
    <aside className="w-full lg:w-1/4">
      <form 
        key={searchParams.toString()} 
        method="GET" 
        action="/jobs" 
        className="bg-white border border-gray-200 rounded-md p-6 shadow-sm sticky top-24" 
        onChange={handleChange}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">Filter Jobs</h2>
          <button onClick={handleClear} type="button" className="text-sm text-primary font-medium hover:underline">Clear All</button>
        </div>

        {/* Keyword Search */}
        <div className="mb-6">
          <label htmlFor="q" className="block text-sm font-bold text-black mb-2">Keyword</label>
          <div className="relative">
            <input 
              type="text" 
              id="q"
              name="q" 
              defaultValue={q}
              placeholder="e.g. React Developer" 
              className="w-full bg-white border border-gray-300 text-black rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-black mb-3">Location</label>
          <div className="space-y-2">
            {["London", "Manchester", "Birmingham", "Bristol", "Edinburgh", "Remote"].map((city) => (
              <label key={city} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="radio" name="loc" value={city} defaultChecked={loc === city} className="peer sr-only" />
                  <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-sm peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                  <svg className="w-3.5 h-3.5 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-black group-hover:text-primary transition-colors">{city}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-black mb-3">Job Type</label>
          <div className="space-y-2">
            {["Full-time", "Part-time", "Contract", "Freelance"].map((t) => (
              <label key={t} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="radio" name="type" value={t} defaultChecked={type === t} className="peer sr-only" />
                  <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-sm peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                  <svg className="w-3.5 h-3.5 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-black group-hover:text-primary transition-colors">{t}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-black mb-3">Salary</label>
          <div className="space-y-2">
            {["£20k - £40k", "£40k - £60k", "£60k - £80k", "£80k+"].map((range) => (
              <label key={range} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="radio" name="salary" value={range} defaultChecked={salary === range} className="peer sr-only" />
                  {/* Circle for radio button style */}
                  <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full peer-checked:border-primary peer-checked:border-[5px] transition-all"></div>
                </div>
                <span className="text-black group-hover:text-primary transition-colors">{range}</span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </aside>
  );
}
