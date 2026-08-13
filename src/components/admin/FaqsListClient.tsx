"use client";

import { useState } from "react";
import { Faq } from "@prisma/client";
import ActionButtons from "./ActionButtons";
import { deleteFaq } from "@/app/actions/faq";
import Swal from "sweetalert2";
import { X } from "lucide-react";

export default function FaqsListClient({ faqs }: { faqs: Faq[] }) {
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);

  const handleDelete = async (id: string, question: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete this FAQ? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const response = await deleteFaq(id);
      if (response?.error) {
        Swal.fire('Error!', response.error, 'error');
      } else {
        Swal.fire('Deleted!', 'The FAQ has been deleted.', 'success');
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
        {faqs.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No FAQs found. Create your first FAQ!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600">Question</th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600">Last Updated</th>
                  <th className="px-6 py-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 line-clamp-2">{faq.question}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(faq.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex justify-end">
                      <div className="flex items-center gap-2">
                        {/* Custom View Button for Modal */}
                        <button 
                          onClick={() => setSelectedFaq(faq)}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors text-xs font-semibold"
                          title="View Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          View
                        </button>
                        <ActionButtons 
                          editUrl={`/system-hq/faqs/${faq.id}/edit`}
                          onDelete={() => handleDelete(faq.id, faq.question)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View FAQ Modal */}
      {selectedFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-md w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900 pr-8">FAQ Details</h3>
              <button 
                onClick={() => setSelectedFaq(null)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto flex-grow">
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Question</h4>
                <p className="text-lg md:text-xl font-bold text-gray-900">{selectedFaq.question}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Answer</h4>
                <div 
                  className="prose prose-sm md:prose-base max-w-none prose-a:text-primary prose-headings:text-gray-900 prose-p:text-gray-700 bg-gray-50 p-6 rounded-md border border-gray-100"
                  dangerouslySetInnerHTML={{ __html: selectedFaq.answer }}
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => setSelectedFaq(null)}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <a 
                href={`/system-hq/faqs/${selectedFaq.id}/edit`}
                className="px-6 py-2 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition-colors shadow-sm"
              >
                Edit FAQ
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
