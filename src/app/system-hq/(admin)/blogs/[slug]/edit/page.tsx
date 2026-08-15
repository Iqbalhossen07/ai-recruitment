export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="py-6">
      <BlogForm blog={blog} />
    </div>
  );
}
