import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="bg-primary-light py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Find Your Dream Job with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Our intelligent recruitment platform matches your skills and experience with the perfect roles in top companies automatically.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/jobs" 
              className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-hover transition-colors shadow-lg"
            >
              Browse Jobs
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3 bg-white text-primary border border-primary font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              Learn More
            </Link>
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

      {/* 3. Why Choose Us Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🚀</div>
              <h3 className="text-xl font-bold text-black mb-2">AI Matching</h3>
              <p className="text-gray-600">Your profile is instantly matched with the perfect jobs based on your exact skills.</p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">⏳</div>
              <h3 className="text-xl font-bold text-black mb-2">Fast Process</h3>
              <p className="text-gray-600">No more waiting for months. Get shortlisted and interviewed faster than ever.</p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🤝</div>
              <h3 className="text-xl font-bold text-black mb-2">Transparent</h3>
              <p className="text-gray-600">Track your application status live through your personalized applicant portal.</p>
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
              <div className="h-48 bg-gray-200 w-full flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
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
