export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import MessagesClient from "@/components/admin/MessagesClient";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Message Management</h1>
          <p className="text-gray-500 mt-1">Manage and view contact form submissions.</p>
        </div>
      </div>

      <MessagesClient initialMessages={messages} />
    </div>
  );
}
