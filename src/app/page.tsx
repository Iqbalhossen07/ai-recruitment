import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Decorative background blur */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary opacity-10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-light text-primary text-sm font-semibold mb-6">
              AI-Powered Hiring Platform
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Find Your <span className="text-primary relative whitespace-nowrap">Dream Job<svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="8" fill="transparent"/></svg></span><br/>With Smart AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Our intelligent recruitment platform matches your unique skills and experience with the perfect roles in top companies automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/jobs" className="bg-primary text-white px-8 py-4 rounded-md font-semibold hover:bg-primary-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-center">
                Browse Jobs
              </Link>
              <Link href="/about" className="bg-white text-black border border-gray-200 px-8 py-4 rounded-md font-semibold hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
            <Image 
              src="/hero-bg.jpg" 
              alt="AI Recruitment Technology" 
              fill 
              className="object-cover"
              priority
            />
            {/* Floating glassmorphism card */}
            <div className="absolute bottom-8 left-[-20px] bg-white/70 backdrop-blur-md border border-white/50 p-4 rounded-xl shadow-lg flex items-center space-x-4 transform translate-x-12">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="text-black font-bold">99% Match Rate</p>
                <p className="text-gray-600 text-sm">AI precision</p>
              </div>
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
