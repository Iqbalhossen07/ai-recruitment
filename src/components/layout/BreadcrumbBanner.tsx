import Image from "next/image";
import Link from "next/link";

interface BreadcrumbBannerProps {
  title: string;
  subtitle?: string;
  paths?: { name: string; url: string }[];
}

export default function BreadcrumbBanner({ title, subtitle, paths }: BreadcrumbBannerProps) {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-b border-gray-100 bg-white">
      <Image 
        src="/breadcrumb-bg.jpg" 
        alt="Background" 
        fill 
        className="object-cover -z-10 opacity-20"
        priority
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
          {title}
        </h1>
        
        <div className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-600 mb-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {paths?.map((path, index) => (
            <span key={index} className="flex items-center space-x-2">
              <span>/</span>
              {path.url ? (
                <Link href={path.url} className="hover:text-primary transition-colors">{path.name}</Link>
              ) : (
                <span className="text-primary">{path.name}</span>
              )}
            </span>
          ))}
          {!paths && (
            <span className="flex items-center space-x-2">
              <span>/</span>
              <span className="text-primary">{title}</span>
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-lg text-gray-700 mt-4">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
