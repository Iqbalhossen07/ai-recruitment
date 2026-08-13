"use client";

import Link from "next/link";
import { Edit, Trash2, Eye } from "lucide-react";

interface ActionButtonsProps {
  editUrl?: string;
  viewUrl?: string;
  onDelete?: () => void;
  deleteTitle?: string;
}

export default function ActionButtons({ editUrl, viewUrl, onDelete, deleteTitle = "Delete" }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {viewUrl && (
        <Link 
          href={viewUrl}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors text-xs font-semibold"
          title="View Details"
        >
          <Eye size={14} /> View
        </Link>
      )}
      
      {editUrl && (
        <Link 
          href={editUrl}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors text-xs font-semibold"
          title="Edit"
        >
          <Edit size={14} /> Edit
        </Link>
      )}
      
      {onDelete && (
        <button 
          onClick={onDelete}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors text-xs font-semibold"
          title={deleteTitle}
        >
          <Trash2 size={14} /> Delete
        </button>
      )}
    </div>
  );
}
