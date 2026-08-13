"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJob(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const jobType = formData.get("jobType") as string;
    const salaryRange = formData.get("salaryRange") as string;
    const keywords = formData.get("keywords") as string;
    const requirements = formData.get("requirements") as string;
    const description = formData.get("description") as string;
    const isActive = formData.get("isActive") === "on";

    if (!title || !description || !requirements) {
      return { error: "Title, Description, and Requirements are required." };
    }

    await prisma.job.create({
      data: {
        title,
        location,
        jobType,
        salaryRange,
        keywords,
        requirements,
        description,
        isActive,
      },
    });

  } catch (error: any) {
    console.error("Error creating job:", error);
    return { error: "Failed to create job. Please try again." };
  }
  
  revalidatePath("/system-hq/jobs");
  revalidatePath("/jobs");
  redirect("/system-hq/jobs");
}

export async function updateJob(id: string, prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const jobType = formData.get("jobType") as string;
    const salaryRange = formData.get("salaryRange") as string;
    const keywords = formData.get("keywords") as string;
    const requirements = formData.get("requirements") as string;
    const description = formData.get("description") as string;
    const isActive = formData.get("isActive") === "on";

    if (!title || !description || !requirements) {
      return { error: "Title, Description, and Requirements are required." };
    }

    await prisma.job.update({
      where: { id },
      data: {
        title,
        location,
        jobType,
        salaryRange,
        keywords,
        requirements,
        description,
        isActive,
      },
    });

  } catch (error: any) {
    console.error("Error updating job:", error);
    return { error: "Failed to update job. Please try again." };
  }
  
  revalidatePath("/system-hq/jobs");
  revalidatePath("/jobs");
  redirect("/system-hq/jobs");
}

export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({
      where: { id },
    });
    revalidatePath("/system-hq/jobs");
    revalidatePath("/jobs");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting job:", error);
    return { error: "Failed to delete job." };
  }
}
