"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadFile, replaceFile, deleteFile } from "@/lib/upload";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function createCity(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const imageFile = formData.get("imageFile") as File;

    if (!name || !imageFile || imageFile.size === 0) {
      return { error: "Name and Image are required." };
    }

    const slug = generateSlug(name);
    const imageUrl = await uploadFile(imageFile, "city-");

    if (!imageUrl) {
      return { error: "Failed to upload image." };
    }

    await prisma.city.create({
      data: {
        name,
        slug,
        image: imageUrl,
      },
    });

  } catch (error: any) {
    console.error("Error creating city:", error);
    if (error.code === 'P2002') {
      return { error: "A city with this name already exists." };
    }
    return { error: "Failed to create city." };
  }

  revalidatePath("/system-hq/cities");
  revalidatePath("/");
  return { success: true };
}

export async function updateCity(id: string, prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const imageFile = formData.get("imageFile") as File | null;

    if (!name) {
      return { error: "Name is required." };
    }

    const city = await prisma.city.findUnique({ where: { id } });
    if (!city) {
      return { error: "City not found." };
    }

    const slug = generateSlug(name);
    
    // Replace image if a new one is uploaded
    const imageUrl = await replaceFile(imageFile, city.image, "city-");

    await prisma.city.update({
      where: { id },
      data: {
        name,
        slug,
        image: imageUrl || city.image,
      },
    });

  } catch (error: any) {
    console.error("Error updating city:", error);
    if (error.code === 'P2002') {
      return { error: "A city with this name already exists." };
    }
    return { error: "Failed to update city." };
  }

  revalidatePath("/system-hq/cities");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCity(id: string) {
  try {
    await prisma.city.delete({
      where: { id },
    });
    revalidatePath("/system-hq/cities");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting city:", error);
    return { error: "Failed to delete city. It may be linked to existing jobs." };
  }
}
