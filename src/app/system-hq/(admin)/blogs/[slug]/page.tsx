import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default async function ViewAdminBlogPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/system-hq/blogs" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-black">Blog Details</h2>
        </div>
        <Link 
          href={`/system-hq/blogs/${blog.slug}/edit`}
          className="flex items-center gap-2 px-5 py-2 bg-primary text-white font-bold rounded-md hover:bg-primary-hover shadow-sm transition-all"
        >
          <Edit size={16} /> Edit
        </Link>
      </div>

      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-gray-500 text-sm font-medium">
              {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{blog.title}</h1>
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            By {blog.author}
          </div>
        </div>

        {/* Image */}
        {blog.imageUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-md overflow-hidden shadow-sm border border-gray-100">
            <Image 
              src={blog.imageUrl} 
              alt={blog.title} 
              fill 
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose max-w-none prose-img:rounded-md prose-a:text-primary pt-4 border-t border-gray-100"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
