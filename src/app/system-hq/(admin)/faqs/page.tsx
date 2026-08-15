export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import FaqsListClient from "@/components/admin/FaqsListClient";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-500 mt-1">Manage frequently asked questions.</p>
        </div>
        <Link 
          href="/system-hq/faqs/create"
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Add New FAQ</span>
        </Link>
      </div>

      <FaqsListClient faqs={faqs} />
    </div>
  );
}
