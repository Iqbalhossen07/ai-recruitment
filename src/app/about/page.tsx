import Image from "next/image";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import Link from "next/link";
import FaqAccordion from "@/components/ui/FaqAccordion";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbBanner 
        title="About AI Recruit" 
        subtitle="Pioneering the future of hiring through Artificial Intelligence and smart matching." 
      />

      {/* Main Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-md -z-10 blur-2xl opacity-50"></div>
            <div className="relative h-[500px] w-full rounded-md overflow-hidden shadow-xl border border-black/5 group">
              <Image 
                src="/about-us.jpg" 
                alt="Our Team working with AI" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-white text-black p-6 rounded-md shadow-xl border border-gray-100 hidden md:block">
              <div className="text-3xl font-bold text-primary mb-1">2026</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">Established</div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-3 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              Revolutionizing the <span className="text-primary">Recruitment</span> Pipeline
            </h2>
            
            <div className="space-y-6 text-black text-lg">
              <p className="leading-relaxed font-medium">
                At AI Recruit, we believe that finding the perfect candidate shouldn't be a game of chance or endless manual screening. Our mission is to bridge the gap between top talent and leading companies using advanced Artificial Intelligence.
              </p>
              <p className="leading-relaxed">
                We leverage machine learning and natural language processing to analyze CVs, identify key skills, and match them with the exact requirements of job postings. This not only saves time for recruiters but ensures that every applicant is evaluated fairly based on their actual qualifications.
              </p>
              <p className="leading-relaxed font-bold text-black border-l-4 border-primary pl-4 py-2 my-8 italic">
                "Join us in revolutionizing the recruitment pipeline—where smart technology meets human potential."
              </p>
            </div>
            
            <div className="mt-10">
              <Link href="/contact" className="inline-block bg-primary text-black font-bold px-8 py-4 rounded-md hover:opacity-90 transition-opacity">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Our Advantages</span>
          <h2 className="text-4xl font-bold text-black mb-4">Why Choose AI Recruit</h2>
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
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Got Questions?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-black">Frequently Asked Questions</h2>
          </div>
          
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}
