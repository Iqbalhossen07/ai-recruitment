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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbBanner 
        title={blog.title} 
        subtitle={`By ${blog.author} • ${new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-8">
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        {blog.imageUrl && (
          <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-12 shadow-md">
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
          className="prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-primary prose-headings:text-gray-900 prose-p:text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
