import { getSiteSettings } from "@/lib/settings";
import SiteSettingsClient from "@/components/admin/SiteSettingsClient";

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 mt-1">Manage global website settings like Contact Information.</p>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl w-full">
        <SiteSettingsClient initialSettings={settings} />
      </div>
    </div>
  );
}
