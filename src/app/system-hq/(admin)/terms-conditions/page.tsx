export const dynamic = 'force-dynamic';
import { getTermsAndConditions } from "@/app/actions/legal";
import LegalForm from "@/components/admin/LegalForm";

export default async function AdminTermsConditionsPage() {
  const content = await getTermsAndConditions();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Terms & Conditions Settings</h1>
        <p className="text-gray-500 mt-1">Update the terms & conditions content displayed on the public website.</p>
      </div>
      
      <LegalForm type="terms" initialContent={content === "<p>No Terms & Conditions have been set yet.</p>" ? "" : content} />
    </div>
  );
}
