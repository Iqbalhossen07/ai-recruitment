"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export async function updateUserSettings(prevState: any, formData: FormData) {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) return { error: "Not logged in" };

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) return { error: "Invalid session" };

  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as File | null;

  if (!name || name.trim() === "") {
    return { error: "Name is required" };
  }

  try {
    const updateData: any = { name };
    if (password && password.trim() !== "") {
      updateData.password = password; // Should hash in production
    }

    if (image && image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      updateData.image = `data:${image.type};base64,${buffer.toString("base64")}`;
    }

    await prisma.user.update({
      where: { id: session.userId as string },
      data: updateData,
    });

    return { success: true, message: "Profile updated successfully" };
  } catch (err: any) {
    console.error("Update profile error:", err);
    return { error: "Failed to update profile" };
  }
}
