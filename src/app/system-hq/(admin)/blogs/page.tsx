export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import BlogsGridClient from "@/components/admin/BlogsGridClient";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs Management</h1>
          <p className="text-gray-500 mt-1">Manage and publish your blog articles.</p>
        </div>
        <Link 
          href="/system-hq/blogs/create"
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Add New Blog</span>
        </Link>
      </div>

      <BlogsGridClient blogs={blogs} />
    </div>
  );
}
