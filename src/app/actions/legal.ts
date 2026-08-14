"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPrivacyPolicy() {
  const policy = await prisma.privacyPolicy.findFirst();
  return policy?.content || "<p>No Privacy Policy has been set yet.</p>";
}

export async function getTermsAndConditions() {
  const terms = await prisma.termsAndConditions.findFirst();
  return terms?.content || "<p>No Terms & Conditions have been set yet.</p>";
}

export async function savePrivacyPolicy(content: string) {
  const policy = await prisma.privacyPolicy.findFirst();
  if (policy) {
    await prisma.privacyPolicy.update({
      where: { id: policy.id },
      data: { content }
    });
  } else {
    await prisma.privacyPolicy.create({
      data: { content }
    });
  }
  revalidatePath("/privacy-policy");
  return { success: true };
}

export async function saveTermsAndConditions(content: string) {
  const terms = await prisma.termsAndConditions.findFirst();
  if (terms) {
    await prisma.termsAndConditions.update({
      where: { id: terms.id },
      data: { content }
    });
  } else {
    await prisma.termsAndConditions.create({
      data: { content }
    });
  }
  revalidatePath("/terms-conditions");
  return { success: true };
}
