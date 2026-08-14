"use client";

import { useState } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { savePrivacyPolicy, saveTermsAndConditions } from "@/app/actions/legal";
import Swal from "sweetalert2";
import { Save } from "lucide-react";

interface LegalFormProps {
  type: "privacy" | "terms";
  initialContent: string;
}

export default function LegalForm({ type, initialContent }: LegalFormProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (type === "privacy") {
        await savePrivacyPolicy(content);
      } else {
        await saveTermsAndConditions(content);
      }
      
      Swal.fire({
        title: "Saved!",
        text: "The page content has been updated.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to save the content.",
        icon: "error"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <label className="block text-sm font-bold text-black mb-2">
          Page Content
        </label>
        <div className="bg-white">
          <RichTextEditor value={content} onChange={setContent} />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
