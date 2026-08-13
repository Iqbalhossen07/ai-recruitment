import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";
import ContactFormClient from "@/components/ContactFormClient";
import { getSiteSettings } from "@/lib/settings";

export default async function ContactPage() {
  const settings = await getSiteSettings();

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
            
            <div className="space-y-8 bg-gray-50 p-8 rounded-md border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center shadow-sm border border-gray-200 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Office Location</h4>
                  <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: settings.contact_office_location }}></p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center shadow-sm border border-gray-200 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Email Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    <a href={`mailto:${settings.contact_email_1}`} className="hover:text-primary transition-colors block">{settings.contact_email_1}</a>
                    {settings.contact_email_2 && (
                      <a href={`mailto:${settings.contact_email_2}`} className="hover:text-primary transition-colors block">{settings.contact_email_2}</a>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center shadow-sm border border-gray-200 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Phone Number</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {settings.contact_phone_1}<br />
                    {settings.contact_phone_2}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-md shadow-lg p-8 md:p-10">
              <h3 className="text-2xl font-bold text-black mb-8">Send us a message</h3>
              <ContactFormClient />
            </div>
          </div>
          
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] relative border-t border-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.47339878167!2d-0.2416812060371307!3d51.5285582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
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
