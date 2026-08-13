import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug }
  });

  if (!blog) {
    notFound();
  }

  // Fetch recent blogs for the sidebar (excluding the current one)
  const recentBlogs = await prisma.blog.findMany({
    where: {
      id: { not: blog.id }
    },
    take: 4,
    orderBy: { date: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <BreadcrumbBanner 
        title={blog.title} 
        subtitle={`By ${blog.author} • ${new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-8">
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Blog Content */}
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-md shadow-sm border border-gray-100">
            {blog.imageUrl && (
              <div className="relative w-full h-[300px] md:h-[450px] rounded-md overflow-hidden mb-12 shadow-sm">
                <Image 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none prose-img:rounded-md prose-a:text-primary prose-headings:text-gray-900 prose-p:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Right Column: Sidebar (Recent Blogs) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
                Recent Articles
              </h3>
              
              <div className="space-y-6">
                {recentBlogs.map((recentBlog) => (
                  <Link href={`/blogs/${recentBlog.slug}`} key={recentBlog.id} className="flex gap-4 group">
                    <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0 bg-primary/5">
                      {recentBlog.imageUrl ? (
                        <Image 
                          src={recentBlog.imageUrl} 
                          alt={recentBlog.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Img
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                        {recentBlog.title}
                      </h4>
                      <span className="text-xs font-medium text-gray-500">
                        {new Date(recentBlog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
          
          </div>
          
        </div>
      </div>
    </div>
  );
}
