import Link from "next/link";
import Image from "next/image";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";

export default function BlogsPage() {
  const blogs = [
    {
      slug: 'optimize-cv-for-ai',
      title: 'How to optimize your CV for AI recruitment systems',
      excerpt: 'Learn the best practices to make your resume stand out when an AI is reviewing your application before the HR does.',
      category: 'Career Tips',
      date: 'Aug 12, 2026',
      readTime: '5 min read',
    },
    {
      slug: 'top-skills-2026',
      title: 'Top 10 Tech Skills Employers are Looking for in 2026',
      excerpt: 'Discover the most in-demand skills in the tech industry and how you can acquire them to stay ahead of the curve.',
      category: 'Industry Trends',
      date: 'Aug 10, 2026',
      readTime: '7 min read',
    },
    {
      slug: 'ace-your-next-interview',
      title: 'How to ace your next behavioral interview',
      excerpt: 'Behavioral interviews can be tricky. Here is a comprehensive guide on using the STAR method to answer perfectly.',
      category: 'Interview Prep',
      date: 'Aug 05, 2026',
      readTime: '6 min read',
    },
    {
      slug: 'remote-work-culture',
      title: 'Navigating remote work culture and building connections',
      excerpt: 'Working remotely offers flexibility, but how do you build meaningful relationships with your team from afar?',
      category: 'Work Culture',
      date: 'Aug 01, 2026',
      readTime: '4 min read',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbBanner 
        title="Our Blog" 
        subtitle="Insights, career advice, and news from the team at AI Recruit." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.slug} className="group h-full rounded-md overflow-hidden bg-white border border-gray-200 hover:border-primary transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
            <div className="h-56 relative overflow-hidden">
              <Image 
                src="/blog-1.jpg" 
                alt={blog.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white bg-primary px-2.5 py-1 rounded-md">{blog.category}</span>
                  <span className="text-xs text-black font-medium">{blog.readTime}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">{blog.date}</span>
              </div>
              <h3 className="text-xl font-bold text-black group-hover:text-primary transition-colors leading-snug">
                {blog.title}
              </h3>
              <p className="text-black text-sm mt-3 line-clamp-2 flex-grow">
                {blog.excerpt}
              </p>
              <div className="mt-6">
                <Link href={`/blogs/${blog.slug}`} className="inline-block bg-primary text-black font-bold px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity text-sm">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
