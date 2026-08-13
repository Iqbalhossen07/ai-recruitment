import Image from "next/image";
import Link from "next/link";
import { Blog } from "@prisma/client";

export default function BlogCard({ blog }: { blog: Blog }) {
  // Extract a short preview from rich text content if needed
  const extractText = (html: string) => {
    return html.replace(/<[^>]+>/g, '').substring(0, 120) + '...';
  };

  return (
    <article className="bg-primary/5 rounded-xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      <Link href={`/blogs/${blog.slug}`} className="block relative h-48 w-full overflow-hidden bg-gray-50">
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
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm">
            {blog.category}
          </span>
        </div>
      </Link>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-3">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <Link href={`/blogs/${blog.slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {blog.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {extractText(blog.content)}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
              {blog.author.charAt(0)}
            </div>
            <span className="text-sm font-bold text-gray-900">{blog.author}</span>
          </div>
          
          <Link href={`/blogs/${blog.slug}`} className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
            Read More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
