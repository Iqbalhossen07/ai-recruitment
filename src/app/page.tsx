import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import JobCard from "@/components/ui/JobCard";
import BlogCard from "@/components/ui/BlogCard";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch latest 6 active jobs, cities, and latest 3 blogs
  const [recentJobs, cities, recentBlogs] = await Promise.all([
    prisma.job.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { city: true } // Include city to show on job cards later if needed
    }),
    prisma.city.findMany({
      take: 6,
      include: {
        _count: { select: { jobs: { where: { isActive: true } } } }
      }
    }),
    prisma.blog.findMany({
      take: 3,
      orderBy: { date: 'desc' }
    })
  ]);
  
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
              
              <div className="flex-1 flex items-center px-4 bg-black/40 backdrop-blur-md border border-white/60 rounded-md shadow-inner focus-within:border-primary transition-colors">
                <svg className="w-5 h-5 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                  type="text" 
                  name="q" 
                  placeholder="Keyword, Job title..." 
                  className="w-full py-3 px-3 outline-none text-white bg-transparent placeholder-white/60"
                />
              </div>
              
              <div className="flex-1 flex items-center px-4 bg-black/40 backdrop-blur-md border border-white/60 rounded-md shadow-inner focus-within:border-primary transition-colors">
                <svg className="w-5 h-5 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <input 
                  type="text" 
                  name="loc" 
                  placeholder="Anywhere" 
                  className="w-full py-3 px-3 outline-none text-white bg-transparent placeholder-white/60"
                />
              </div>
              
              <button type="submit" className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-md font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto">
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


      {/* 2. Search Jobs by Cities */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Top Searches</span>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Search Jobs by Cities</h2>
              <p className="text-gray-500 mt-2">Find your perfect job in your desired city across the UK</p>
            </div>
            <Link href="/jobs" className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md font-semibold hover:bg-primary-hover transition-colors shadow-md">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </Link>
          </div>

          {/* City Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link key={city.id} href={`/jobs?city=${city.slug}`} className="group block">
                <div className="rounded-md overflow-hidden border border-gray-200 hover:border-primary shadow-md shadow-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                  {/* City Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle bottom gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  {/* City Info */}
                  <div className="bg-white p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-lg font-bold text-black group-hover:text-primary transition-colors">{city.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium text-black">{city._count.jobs} openings</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {cities.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-500">
                No cities found. 
              </div>
            )}
          </div>

          {/* Mobile View All button */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/jobs" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-hover transition-colors">
              View All Jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Jobs Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Featured Jobs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover the latest opportunities available right now.
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

      {/* 4. Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Why Choose AI Recruit</span>
          <h2 className="text-4xl font-bold text-black mb-4">The Future of Recruitment</h2>
          <p className="text-black mb-16 max-w-2xl mx-auto text-lg">We combine human intuition with machine precision to bring you the best talent and the best opportunities.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-md flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">AI Powered Matching</h3>
              <p className="text-black leading-relaxed">
                Our smart algorithms parse CVs instantly and match candidates with jobs based on deep keyword and contextual analysis.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-md flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Time Saving</h3>
              <p className="text-black leading-relaxed">
                No more manual screening. Our AI pipeline saves HR departments hundreds of hours by surfacing only the most qualified candidates.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-md shadow-md border border-gray-200 hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-md flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Unbiased Selection</h3>
              <p className="text-black leading-relaxed">
                Remove human bias from the initial screening process. Our AI evaluates every application purely on merit and skills.
              </p>
            </div>
          </div>
        </div>
      </section>      {/* 4. Blogs Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-14">
            <div>
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">From Our Blog</span>
              <h2 className="text-3xl md:text-4xl font-bold text-black">Career Advice & Insights</h2>
              <p className="text-black mt-2">Expert tips to help you land your next UK role faster.</p>
            </div>
            <Link href="/blogs" className="hidden md:flex items-center gap-2 text-primary font-semibold border border-primary px-5 py-2.5 rounded-md hover:bg-primary hover:text-white transition-colors">
              View All Articles →
            </Link>
          </div>

          {/* Blog Grid */}
          {recentBlogs.length === 0 ? (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-md border border-dashed border-gray-200">
              No blogs published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {/* Mobile View All */}
          <div className="mt-10 text-center md:hidden">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-primary font-semibold border border-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition-colors">
              View All Articles →
            </Link>
          </div>

        </div>
      </section>

      {/* 5. CTA Section */}
      {/* 5. CTA Section */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white text-center text-black border-t border-gray-100">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-hover text-xs font-bold px-4 py-1.5 rounded-md mb-6 backdrop-blur-sm">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
            AI-Powered Recruitment
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-black">
            Ready to land your{" "}
            <span className="text-primary relative">
              dream job
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="6" fill="transparent"/>
              </svg>
            </span>{" "}
            in the UK?
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your CV and let our intelligent AI match you with the best roles across London, Manchester, Birmingham and beyond — in seconds.
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-10 py-4 rounded-md hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 text-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Browse Jobs
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-gray-500 font-medium text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              No sign-up required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              10,000+ UK jobs
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              AI matched in seconds
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Free for candidates
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
