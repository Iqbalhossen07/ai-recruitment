"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadFile, replaceFile, deleteFile } from "@/lib/upload";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function createBlog(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const dateStr = formData.get("date") as string;
    const imageFile = formData.get("imageFile") as File;

    if (!title || !category || !content || !dateStr || !imageFile || imageFile.size === 0) {
      return { error: "All fields including Image are required." };
    }

    const slug = generateSlug(title);
    const date = new Date(dateStr);
    
    // Upload image
    const imageUrl = await uploadFile(imageFile, "blog-");

    if (!imageUrl) {
      return { error: "Failed to upload image." };
    }

    await prisma.blog.create({
      data: {
        title,
        slug,
        category,
        content,
        author: author || "Admin",
        date,
        imageUrl,
      },
    });

  } catch (error: any) {
    console.error("Error creating blog:", error);
    if (error.code === 'P2002') {
      return { error: "A blog with this title already exists." };
    }
    return { error: "Failed to create blog." };
  }

  revalidatePath("/system-hq/blogs");
  revalidatePath("/blogs");
  revalidatePath("/");
  return { success: true };
}

export async function updateBlog(id: string, prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const dateStr = formData.get("date") as string;
    const imageFile = formData.get("imageFile") as File | null;

    if (!title || !category || !content || !dateStr) {
      return { error: "All text fields are required." };
    }

    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      return { error: "Blog not found." };
    }

    const slug = generateSlug(title);
    const date = new Date(dateStr);
    
    // Replace image if a new one is uploaded
    const imageUrl = await replaceFile(imageFile, blog.imageUrl || "", "blog-");

    await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        content,
        author: author || "Admin",
        date,
        imageUrl: imageUrl || blog.imageUrl,
      },
    });

  } catch (error: any) {
    console.error("Error updating blog:", error);
    if (error.code === 'P2002') {
      return { error: "A blog with this title already exists." };
    }
    return { error: "Failed to update blog." };
  }

  revalidatePath("/system-hq/blogs");
  revalidatePath("/blogs");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBlog(id: string) {
  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (blog?.imageUrl) {
      // Best effort to delete old image
      try {
        await deleteFile(blog.imageUrl);
      } catch (e) {
        console.error("Failed to delete blog image file:", e);
      }
    }

    await prisma.blog.delete({
      where: { id },
    });
    
    revalidatePath("/system-hq/blogs");
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return { error: "Failed to delete blog." };
  }
}
