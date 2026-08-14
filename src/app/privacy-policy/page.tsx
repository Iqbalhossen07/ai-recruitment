import { getPrivacyPolicy } from "@/app/actions/legal";
import BreadcrumbBanner from "@/components/layout/BreadcrumbBanner";

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicy();

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbBanner 
        title="Privacy Policy"
        paths={[{ name: "Privacy Policy", url: "/privacy-policy" }]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-8 prose prose-blue max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
