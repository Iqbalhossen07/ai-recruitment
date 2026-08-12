import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbBanner 
        title="Contact Us" 
        subtitle="Have questions about our platform? We'd love to hear from you." 
      />

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you're a company looking to hire top talent or a candidate searching for your dream job, our team is here to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-black">Office Location</h4>
                  <p className="text-gray-600 mt-1">123 Tech Avenue, Suite 400<br />Dhaka, Bangladesh</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-black">Email Address</h4>
                  <p className="text-gray-600 mt-1">support@airecruit.com<br />hello@airecruit.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-black">Phone Number</h4>
                  <p className="text-gray-600 mt-1">+880 1234 567 890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-8">
            <h3 className="text-xl font-bold text-black mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Your Name</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Your Email</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Subject</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Message</label>
                <textarea required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Write your message here..."></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors">
                  Send Message
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
}
