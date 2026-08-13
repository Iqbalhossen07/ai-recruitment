"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Faq } from "@prisma/client";
import { createFaq, updateFaq } from "@/app/actions/faq";
import RichTextEditor from "./RichTextEditor";
import Swal from "sweetalert2";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface FaqFormProps {
  faq?: Faq;
}

export default function FaqForm({ faq }: FaqFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answer, setAnswer] = useState(faq?.answer || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.set("answer", answer);
    
    let response;
    
    if (faq) {
      response = await updateFaq(faq.id, null, formData);
    } else {
      response = await createFaq(null, formData);
    }

    setIsSubmitting(false);

    if (response?.error) {
      Swal.fire("Error!", response.error, "error");
    } else if (response?.success) {
      await Swal.fire({
        title: "Success!",
        text: faq ? "FAQ updated successfully." : "FAQ created successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      router.push("/system-hq/faqs");
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/system-hq/faqs" className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold text-black">
          {faq ? "Edit FAQ" : "Add New FAQ"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-bold text-gray-700 mb-2">Question *</label>
          <input
            type="text"
            id="question"
            name="question"
            defaultValue={faq?.question || ""}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g. How do I apply for a job?"
          />
        </div>

        <div className="pt-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Answer *</label>
          <RichTextEditor 
            value={answer}
            onChange={setAnswer}
            placeholder="Write the detailed answer here..."
          />
        </div>

        <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
          <Link 
            href="/system-hq/faqs"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white font-bold rounded-md hover:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSubmitting ? "Saving..." : faq ? "Update FAQ" : "Save FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
}
