"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFaq(prevState: any, formData: FormData) {
  try {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;

    if (!question || !answer) {
      return { error: "Question and Answer are required." };
    }

    await prisma.faq.create({
      data: {
        question,
        answer,
      },
    });

  } catch (error: any) {
    console.error("Error creating faq:", error);
    return { error: "Failed to create FAQ." };
  }

  revalidatePath("/system-hq/faqs");
  revalidatePath("/about");
  return { success: true };
}

export async function updateFaq(id: string, prevState: any, formData: FormData) {
  try {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;

    if (!question || !answer) {
      return { error: "Question and Answer are required." };
    }

    await prisma.faq.update({
      where: { id },
      data: {
        question,
        answer,
      },
    });

  } catch (error: any) {
    console.error("Error updating faq:", error);
    return { error: "Failed to update FAQ." };
  }

  revalidatePath("/system-hq/faqs");
  revalidatePath("/about");
  return { success: true };
}

export async function deleteFaq(id: string) {
  try {
    await prisma.faq.delete({
      where: { id },
    });
    
    revalidatePath("/system-hq/faqs");
    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting faq:", error);
    return { error: "Failed to delete FAQ." };
  }
}
