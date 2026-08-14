import { getPrivacyPolicy } from "@/app/actions/legal";
import LegalForm from "@/components/admin/LegalForm";

export default async function AdminPrivacyPolicyPage() {
  const content = await getPrivacyPolicy();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Privacy Policy Settings</h1>
        <p className="text-gray-500 mt-1">Update the privacy policy content displayed on the public website.</p>
      </div>
      
      <LegalForm type="privacy" initialContent={content === "<p>No Privacy Policy has been set yet.</p>" ? "" : content} />
    </div>
  );
}
