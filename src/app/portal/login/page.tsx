export const dynamic = 'force-dynamic';
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginForm from "@/components/ui/LoginForm";

import prisma from "@/lib/prisma";

export default async function PortalLoginPage() {
  const sessionCookie = cookies().get("session")?.value;
  
  if (sessionCookie) {
    const session = await decrypt(sessionCookie);
    if (session && session.userId) {
      const user = await prisma.user.findUnique({ where: { id: session.userId as string } });
      if (user) {
        redirect("/portal/dashboard");
      } else {
        redirect("/api/auth/logout");
      }
    }
  }

  return <LoginForm />;
}
