import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              AI Recruit
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-black hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-black hover:text-primary transition-colors font-medium">
              About Us
            </Link>
            <Link href="/jobs" className="text-black hover:text-primary transition-colors font-medium">
              Jobs
            </Link>
            <Link href="/blogs" className="text-black hover:text-primary transition-colors font-medium">
              Blogs
            </Link>
            <Link href="/contact" className="text-black hover:text-primary transition-colors font-medium">
              Contact Us
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-5 py-2 text-primary font-medium hover:bg-primary-light rounded-md transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/jobs" 
              className="px-5 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-hover transition-colors shadow-md"
            >
              Find Jobs
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button className="text-black hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
