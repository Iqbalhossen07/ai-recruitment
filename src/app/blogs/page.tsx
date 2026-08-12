import Link from "next/link";
import Image from "next/image";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-black mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Insights, career advice, and news from the team at AI Recruit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <div key={blog.slug} className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
            <div className="h-56 w-full relative bg-primary-light">
              {/* Reusing the same image we generated earlier for placeholder purposes */}
              <Image 
                src="/blog-1.jpg" 
                alt={blog.title} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                {blog.category}
              </span>
              <h3 className="text-xl font-bold text-black leading-tight mb-3">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                {blog.excerpt}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {blog.date} &middot; {blog.readTime}
                </div>
                <Link href={`/blogs/${blog.slug}`} className="text-primary hover:underline font-medium text-sm">
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
