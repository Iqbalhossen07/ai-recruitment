import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import JobCard from "@/components/ui/JobCard";

export default async function Home() {
  // Fetch latest 6 active jobs
  const recentJobs = await prisma.job.findMany({
    where: { isActive: true },
    take: 6,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[60vh] md:min-h-[85vh] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="AI Recruitment Technology" 
            fill 
            className="object-cover"
            priority
          />
          {/* Gradient Overlay: Dark on left for text readability, clear on right for image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20"></div>
          
          {/* Animated decorative glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center justify-center">
          
          {/* Centered Text Content */}
          <div className="text-center max-w-4xl mt-10 md:mt-0 flex flex-col items-center">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs md:text-sm font-bold tracking-wider uppercase mb-4 md:mb-6 backdrop-blur-md shadow-sm">
              AI-Powered Hiring Platform
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Find the most <span className="text-primary relative inline-block">exciting jobs<svg className="absolute w-full h-3 md:h-4 -bottom-1 md:-bottom-2 left-0 text-primary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="transparent"/></svg></span><br/>with Smart AI
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed font-light max-w-2xl">
              Explore thousands of job opportunities. Our intelligent platform matches your unique skills with the perfect roles automatically.
            </p>
            
            {/* Search Bar Form */}
            <form action="/jobs" method="GET" className="w-full max-w-3xl flex flex-col md:flex-row gap-3 transform hover:scale-[1.01] transition-transform duration-300">
              
              <div className="flex-1 flex items-center px-4 bg-black/40 backdrop-blur-md border border-white/60 rounded-lg shadow-inner focus-within:border-primary transition-colors">
                <svg className="w-5 h-5 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                  type="text" 
                  name="q" 
                  placeholder="Keyword, Job title..." 
                  className="w-full py-3 px-3 outline-none text-white bg-transparent placeholder-white/60"
                />
              </div>
              
              <div className="flex-1 flex items-center px-4 bg-black/40 backdrop-blur-md border border-white/60 rounded-lg shadow-inner focus-within:border-primary transition-colors">
                <svg className="w-5 h-5 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <input 
                  type="text" 
                  name="loc" 
                  placeholder="Anywhere" 
                  className="w-full py-3 px-3 outline-none text-white bg-transparent placeholder-white/60"
                />
              </div>
              
              <button type="submit" className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto">
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center items-center gap-3 md:space-x-4 text-sm md:text-base text-gray-200 font-medium">
              <span className="text-white">Popular:</span>
              <Link href="/jobs?q=Frontend" className="hover:text-primary transition-colors underline decoration-white/50 underline-offset-4">Frontend</Link>
              <Link href="/jobs?q=Backend" className="hover:text-primary transition-colors underline decoration-white/50 underline-offset-4">Backend</Link>
              <Link href="/jobs?q=Design" className="hover:text-primary transition-colors underline decoration-white/50 underline-offset-4">Design</Link>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* 2. Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">Featured Jobs</h2>
          <p className="text-gray-600 mt-2">Discover the latest opportunities available right now.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mock Job Cards for now (will be dynamic later) */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold text-primary bg-primary-light px-3 py-1 rounded-full">Engineering</span>
              <h3 className="text-xl font-bold text-black mt-4">Senior Software Engineer</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                Join our backend team to build scalable microservices and AI-driven features.
              </p>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm font-medium text-black">Dhaka, Hybrid</span>
                <Link href={`/jobs/test-${i}`} className="text-primary hover:underline font-medium text-sm">
                  Apply Now &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/jobs" className="text-primary font-medium hover:underline">
            View All Jobs
          </Link>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Why Choose AI Recruit</span>
          <h2 className="text-4xl font-bold text-black mb-4">The Future of Recruitment</h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-lg">We combine human intuition with machine precision to bring you the best talent and the best opportunities.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">AI Powered Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our smart algorithms parse CVs instantly and match candidates with jobs based on deep keyword and contextual analysis.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Time Saving</h3>
              <p className="text-gray-600 leading-relaxed">
                No more manual screening. Our AI pipeline saves HR departments hundreds of hours by surfacing only the most qualified candidates.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Unbiased Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Remove human bias from the initial screening process. Our AI evaluates every application purely on merit and skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Recent Jobs Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Latest Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Check out the most recent job openings from top companies.
            </p>
          </div>
          
          {recentJobs.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No jobs available right now.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/jobs" className="inline-flex items-center justify-center space-x-2 bg-transparent text-primary border border-primary px-8 py-3 rounded-md font-semibold hover:bg-primary hover:text-white transition-colors duration-300">
              <span>View All Jobs</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Blogs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">Career Advice & Blogs</h2>
          <p className="text-gray-600 mt-2">Get the latest tips to crack your next interview.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 w-full relative bg-primary-light">
                <Image 
                  src="/blog-1.jpg" 
                  alt="AI Resume Building" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-primary">Career Tips</span>
                <h3 className="text-lg font-bold text-black mt-2 leading-tight">
                  How to optimize your CV for AI recruitment systems
                </h3>
                <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                  Learn the best practices to make your resume stand out when an AI is reviewing your application before the HR does.
                </p>
                <div className="mt-4">
                  <Link href={`/blogs/test-${i}`} className="text-primary hover:underline font-medium text-sm">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/blogs" className="text-primary font-medium hover:underline">
            View All Articles
          </Link>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take the next step in your career?</h2>
          <p className="text-lg mb-8 text-primary-light">
            Upload your CV today and let our AI find the best opportunities for you in seconds.
          </p>
          <Link 
            href="/jobs" 
            className="px-10 py-4 bg-white text-primary font-bold rounded-md hover:bg-gray-100 transition-colors shadow-lg text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>

    </div>
  );
}
