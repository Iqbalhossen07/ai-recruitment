"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/app/actions/settings";
import Swal from "sweetalert2";
import { Save } from "lucide-react";

export default function SiteSettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateSiteSettings(formData);
    
    setIsSubmitting(false);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: result.message,
        confirmButtonColor: "#0FA877"
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.error,
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Contact Information</h3>
        <p className="text-sm text-gray-500 mb-6">This information will be displayed on the public Contact Us page.</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Office Location (HTML allowed)</label>
            <textarea
              name="contact_office_location"
              defaultValue={initialSettings.contact_office_location || ""}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="123 Tech Avenue, Suite 400<br/>London, E1 6AN, United Kingdom"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">Use &lt;br/&gt; for line breaks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Email</label>
              <input
                type="email"
                name="contact_email_1"
                defaultValue={initialSettings.contact_email_1 || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Email (Optional)</label>
              <input
                type="email"
                name="contact_email_2"
                defaultValue={initialSettings.contact_email_2 || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Phone</label>
              <input
                type="text"
                name="contact_phone_1"
                defaultValue={initialSettings.contact_phone_1 || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Secondary Phone (Optional)</label>
              <input
                type="text"
                name="contact_phone_2"
                defaultValue={initialSettings.contact_phone_2 || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save size={20} />
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
