"use client";

import { Blog } from "@prisma/client";
import Image from "next/image";
import ActionButtons from "./ActionButtons";
import { deleteBlog } from "@/app/actions/blog";
import Swal from "sweetalert2";

export default function BlogsGridClient({ blogs }: { blogs: Blog[] }) {
  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${title}"? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const response = await deleteBlog(id);
      if (response?.error) {
        Swal.fire('Error!', response.error, 'error');
      } else {
        Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-primary/5 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
          {/* Image */}
          <div className="relative h-40 w-full overflow-hidden bg-gray-100">
            {blog.imageUrl ? (
              <Image 
                src={blog.imageUrl} 
                alt={blog.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                {blog.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-grow flex flex-col">
            <h3 className="font-bold text-gray-900 line-clamp-2 mb-2" title={blog.title}>
              {blog.title}
            </h3>
            
            <div className="mt-auto pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                <span className="truncate flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {blog.author}
                </span>
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-100 flex justify-end">
                <ActionButtons 
                  viewUrl={`/system-hq/blogs/${blog.slug}`}
                  editUrl={`/system-hq/blogs/${blog.slug}/edit`}
                  onDelete={() => handleDelete(blog.id, blog.title)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {blogs.length === 0 && (
        <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No blogs found. Create your first blog!</p>
        </div>
      )}
    </div>
  );
}
