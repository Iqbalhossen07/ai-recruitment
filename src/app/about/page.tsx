import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-primary-light py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            About AI Recruit
          </h1>
          <p className="text-xl text-gray-700">
            Pioneering the future of hiring through Artificial Intelligence and smart matching.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At AI Recruit, we believe that finding the perfect candidate shouldn't be a game of chance or endless manual screening. Our mission is to bridge the gap between top talent and leading companies using advanced Artificial Intelligence.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We leverage machine learning and natural language processing to analyze CVs, identify key skills, and match them with the exact requirements of job postings. This not only saves time for recruiters but ensures that every applicant is evaluated fairly based on their actual qualifications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Join us in revolutionizing the recruitment pipeline—where smart technology meets human potential.
            </p>
          </div>
          <div className="relative h-96 w-full rounded-md overflow-hidden shadow-lg border border-gray-100">
            <Image 
              src="/about-us.jpg" 
              alt="Our Team working with AI" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
              <p className="text-black font-medium text-lg">Candidates Placed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-black font-medium text-lg">Partner Companies</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">99%</h3>
              <p className="text-black font-medium text-lg">Matching Accuracy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
