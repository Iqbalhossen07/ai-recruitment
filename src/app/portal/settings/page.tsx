export const dynamic = 'force-dynamic';
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/ui/SettingsForm";

export default async function PortalSettings() {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) redirect("/portal/login");

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) redirect("/portal/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    select: { name: true, email: true, image: true }
  });

  if (!user) redirect("/portal/login");

  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account profile and preferences.</p>
        </div>
      </div>

      <SettingsForm user={user} />
    </div>
  );
}
