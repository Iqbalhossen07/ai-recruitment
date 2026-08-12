import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";

export default function BlogDetailsPage({ params }: { params: { slug: string } }) {
  // Dummy data mapping
  const blogData: Record<string, any> = {
    'optimize-cv-for-ai': {
      title: 'How to optimize your CV for AI recruitment systems',
      category: 'Career Tips',
      date: 'Aug 12, 2026',
      readTime: '5 min read',
      content: `
Artificial Intelligence is completely transforming how companies hire today. When you apply for a job, chances are an AI recruitment system will scan your CV before a human recruiter even sees it.

To ensure your CV makes it past the algorithms, you need to understand how they work. AI systems look for specific keywords, clean formatting, and clear structures.

### 1. Use the Right Keywords
The most important factor is keywords. The AI compares your CV against the job description. If the job asks for "Node.js", "Microservices", and "System Design", make sure those exact words appear naturally in your experience or skills section. 

### 2. Keep the Formatting Clean
Avoid complex layouts, multiple columns, or graphics. A single-column layout is much easier for an AI parser to read. Standard headings like "Experience", "Education", and "Skills" are your best friend.

### 3. Highlight Measurable Achievements
AI systems are often programmed to look for quantifiable data. Instead of saying "Improved sales", say "Increased sales by 25% over 6 months".

By adapting your resume to these systems, you significantly increase your chances of landing that interview. Good luck!
      `
    }
  };

  const blog = blogData[params.slug];

  if (!blog) {
    // If we don't have dummy data for this slug, just show a generic one
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link href="/blogs" className="text-primary hover:underline font-medium">
          &larr; Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbBanner 
        title={blog.title}
        paths={[{ name: "Blog", url: "/blogs" }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <Link href="/blogs" className="text-primary hover:underline font-medium mb-8 inline-flex items-center">
          &larr; Back to all blogs
        </Link>

        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-primary mb-4 block">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-500">
            Published on {blog.date} &middot; {blog.readTime}
          </div>
        </div>

      <div className="w-full h-80 md:h-96 relative mb-12 rounded-md overflow-hidden bg-primary-light">
        <Image 
          src="/blog-1.jpg" 
          alt={blog.title} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        {blog.content.split('\n\n').map((paragraph: string, idx: number) => {
          if (paragraph.startsWith('###')) {
            return <h3 key={idx} className="text-2xl font-bold text-black mt-8 mb-4">{paragraph.replace('###', '').trim()}</h3>;
          }
          return <p key={idx} className="mb-4 leading-relaxed">{paragraph.trim()}</p>;
        })}
        </div>
      </div>
    </div>
  );
}
