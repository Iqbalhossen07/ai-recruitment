import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import BlogCard from "@/components/ui/BlogCard";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbBanner 
        title="Career Advice & Insights" 
        subtitle="Expert tips to help you land your next UK role faster." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-md border border-dashed border-gray-200">
            No blogs published yet. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
