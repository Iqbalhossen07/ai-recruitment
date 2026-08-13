import Image from "next/image";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import Link from "next/link";

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
            <div className="absolute -bottom-8 -right-8 bg-black text-white p-6 rounded-md shadow-xl border border-white/10 hidden md:block">
              <div className="text-3xl font-bold text-primary mb-1">2026</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Established</div>
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
              <Link href="/contact" className="inline-block bg-black text-white font-bold px-8 py-4 rounded-md hover:bg-primary transition-colors hover:text-black">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">By The Numbers</span>
            <h2 className="text-3xl md:text-4xl font-bold">Our Impact in the UK</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-md text-center hover:border-primary transition-colors duration-300 group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                <svg className="w-8 h-8 text-primary group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-5xl font-bold text-white mb-3 group-hover:text-primary transition-colors">10k+</h3>
              <p className="text-white/80 font-medium text-lg">Candidates Placed</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-10 rounded-md text-center hover:border-primary transition-colors duration-300 group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                <svg className="w-8 h-8 text-primary group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-5xl font-bold text-white mb-3 group-hover:text-primary transition-colors">500+</h3>
              <p className="text-white/80 font-medium text-lg">Partner Companies</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-10 rounded-md text-center hover:border-primary transition-colors duration-300 group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                <svg className="w-8 h-8 text-primary group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-5xl font-bold text-white mb-3 group-hover:text-primary transition-colors">99%</h3>
              <p className="text-white/80 font-medium text-lg">Matching Accuracy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
