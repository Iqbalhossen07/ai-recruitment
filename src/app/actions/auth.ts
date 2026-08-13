"use server";

import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Invalid email or password" };
    }

    // In a real app, use bcrypt to compare hashes. For dummy, we compare plain text.
    if (user.password !== password) {
      return { error: "Invalid email or password" };
    }

    // Create secure session
    await createSession(user.id, user.role);

    return { success: true, role: user.role };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred" };
  }
}
