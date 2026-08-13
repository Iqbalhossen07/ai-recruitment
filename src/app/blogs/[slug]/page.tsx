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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Modern Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/blogs" className="text-primary hover:underline font-medium mb-8 inline-flex items-center text-sm transition-colors">
            &larr; Back to all articles
          </Link>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-sm font-bold text-white bg-primary px-3 py-1 rounded-md shadow-sm">
              {blog.category}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                AR
              </div>
              <div className="text-left">
                <p className="text-black leading-none mb-1">AI Recruit Editorial</p>
                <p className="text-gray-500 leading-none">{blog.date}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-10">
        <div className="w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          <Image 
            src="/blog-1.jpg" 
            alt={blog.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="prose prose-lg md:prose-xl prose-headings:text-black prose-p:text-gray-800 prose-a:text-primary max-w-none">
          {blog.content.split('\n\n').map((paragraph: string, idx: number) => {
            if (paragraph.startsWith('###')) {
              return (
                <h3 key={idx} className="text-2xl md:text-3xl font-bold text-black mt-12 mb-6">
                  {paragraph.replace('###', '').trim()}
                </h3>
              );
            }
            if (paragraph.startsWith('>')) {
              return (
                <blockquote key={idx} className="border-l-4 border-primary pl-6 italic text-gray-700 my-8 text-xl font-medium">
                  {paragraph.replace('>', '').trim()}
                </blockquote>
              );
            }
            return <p key={idx} className="mb-6 leading-relaxed">{paragraph.trim()}</p>;
          })}
        </div>
        
        {/* Share & Tags */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#CareerTips</span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#AI</span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#Recruitment</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-black font-bold">Share:</span>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
