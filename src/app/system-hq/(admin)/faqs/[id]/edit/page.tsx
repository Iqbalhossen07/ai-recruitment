export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import FaqForm from "@/components/admin/FaqForm";
import { notFound } from "next/navigation";

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const faq = await prisma.faq.findUnique({
    where: { id: params.id },
  });

  if (!faq) {
    notFound();
  }

  return (
    <div className="py-6">
      <FaqForm faq={faq} />
    </div>
  );
}
