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

  const recentBlogs = [
    {
      slug: 'top-skills-2026',
      title: 'Top 10 Tech Skills Employers are Looking for in 2026',
      date: 'Aug 10, 2026',
      image: '/blog-1.jpg'
    },
    {
      slug: 'ace-your-next-interview',
      title: 'How to ace your next behavioral interview',
      date: 'Aug 05, 2026',
      image: '/blog-1.jpg'
    },
    {
      slug: 'remote-work-culture',
      title: 'Navigating remote work culture and building connections',
      date: 'Aug 01, 2026',
      image: '/blog-1.jpg'
    },
    {
      slug: 'salary-negotiation-tips',
      title: 'Expert tips for negotiating your starting salary',
      date: 'Jul 28, 2026',
      image: '/blog-1.jpg'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbBanner 
        title={blog.title}
        paths={[{ name: "Blogs", url: "/blogs" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - Main Content (Col-8) */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <span className="text-sm font-bold uppercase tracking-wider text-primary mb-3 block">
                {blog.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    AR
                  </div>
                  <span className="text-black">AI Recruit</span>
                </div>
                <span>&bull;</span>
                <span>{blog.date}</span>
                <span>&bull;</span>
                <span>{blog.readTime}</span>
              </div>
            </div>

            <div className="w-full h-[300px] md:h-[450px] relative rounded-md overflow-hidden bg-gray-100 mb-10 shadow-sm border border-gray-200">
              <Image 
                src="/blog-1.jpg" 
                alt={blog.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-gray-800 prose-a:text-primary">
              {blog.content.split('\n\n').map((paragraph: string, idx: number) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={idx} className="text-2xl font-bold text-black mt-10 mb-4">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith('>')) {
                  return (
                    <blockquote key={idx} className="border-l-4 border-primary pl-4 italic text-gray-700 my-6 text-lg font-medium">
                      {paragraph.replace('>', '').trim()}
                    </blockquote>
                  );
                }
                return <p key={idx} className="mb-5 leading-relaxed">{paragraph.trim()}</p>;
              })}
            </div>

            {/* Tags & Share */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#CareerTips</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#AI</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#Recruitment</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-black font-bold text-sm">Share:</span>
                <button className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </button>
                <button className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Blogs (Col-4) */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-black border-b border-gray-300 pb-3 mb-6">
                Recent Articles
              </h3>
              
              <div className="space-y-6">
                {recentBlogs.map((recent) => (
                  <Link href={`/blogs/${recent.slug}`} key={recent.slug} className="group flex gap-4 items-start">
                    <div className="w-20 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image src={recent.image} alt={recent.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {recent.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">{recent.date}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/blogs" className="block w-full text-center bg-white border border-primary text-primary font-bold py-2.5 rounded-md hover:bg-primary hover:text-black transition-colors">
                  View All Blogs
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
