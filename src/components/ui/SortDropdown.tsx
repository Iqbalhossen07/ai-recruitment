"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <select 
      value={currentSort}
      onChange={handleChange}
      className="bg-white border border-gray-200 text-gray-700 font-medium rounded-md px-4 py-2 focus:outline-none focus:border-primary shadow-sm cursor-pointer appearance-none pr-8 relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1.25rem 1.25rem'
      }}
    >
      <option value="newest" className="bg-white text-gray-800 py-2">Newest First</option>
      <option value="oldest" className="bg-white text-gray-800 py-2">Oldest First</option>
    </select>
  );
}
