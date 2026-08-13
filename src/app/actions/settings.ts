"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSiteSettings(formData: FormData) {
  try {
    const keys = ["contact_office_location", "contact_email_1", "contact_email_2", "contact_phone_1", "contact_phone_2"];
    
    for (const key of keys) {
      const value = formData.get(key) as string;
      if (value !== null && value !== undefined) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    
    revalidatePath("/contact");
    revalidatePath("/system-hq/site-settings");
    
    return { success: true, message: "Site settings updated successfully." };
  } catch (error) {
    console.error("Error updating site settings:", error);
    return { success: false, error: "Failed to update site settings." };
  }
}
