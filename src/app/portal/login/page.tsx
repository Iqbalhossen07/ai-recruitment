import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginForm from "@/components/ui/LoginForm";

export default async function PortalLoginPage() {
  const sessionCookie = cookies().get("session")?.value;
  
  if (sessionCookie) {
    const session = await decrypt(sessionCookie);
    if (session && session.userId) {
      redirect("/portal/dashboard");
    }
  }

  return <LoginForm />;
}
