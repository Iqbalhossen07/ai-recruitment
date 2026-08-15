export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import KanbanBoard from "@/components/ui/KanbanBoard";
import { ApplicationStatus } from "@prisma/client";

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: {
      job: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black">Candidate Applications</h1>
        <p className="text-sm text-gray-500 mt-1">Manage all job applications and candidates.</p>
      </div>
      
      {/* Kanban Board Component */}
      <KanbanBoard initialApplications={applications} />
    </div>
  );
}
