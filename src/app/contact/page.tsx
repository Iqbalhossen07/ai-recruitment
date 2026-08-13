import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbBanner 
        title="Contact Us" 
        subtitle="Have questions about our platform? We'd love to hear from you." 
      />

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Information */}
          <div className="lg:col-span-5">
            <div className="mb-10">
              <span className="text-sm font-bold uppercase tracking-wider text-primary mb-3 block">
                Get In Touch
              </span>
              <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
                We'd love to hear from you.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're a company looking to hire top talent or a candidate searching for your dream job, our team is here to assist you. Drop us a message or visit our office.
              </p>
            </div>
            
            <div className="space-y-8 bg-gray-50 p-8 rounded-xl border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Office Location</h4>
                  <p className="text-gray-600 leading-relaxed">123 Tech Avenue, Suite 400<br />London, E1 6AN, United Kingdom</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Email Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    <a href="mailto:support@airecruit.com" className="hover:text-primary transition-colors">support@airecruit.com</a><br />
                    <a href="mailto:hello@airecruit.com" className="hover:text-primary transition-colors">hello@airecruit.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Phone Number</h4>
                  <p className="text-gray-600 leading-relaxed">+44 20 7123 4567<br />+44 79 1234 5678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 md:p-10">
              <h3 className="text-2xl font-bold text-black mb-8">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Your Email</label>
                  <input type="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Subject</label>
                  <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Write your message here..."></textarea>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full flex justify-center py-4 px-4 rounded-md shadow-md text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-colors">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] relative border-t border-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d158857.72810629237!2d-0.241681537829286!3d51.52877184083652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        ></iframe>
      </section>
    </div>
  );
}
