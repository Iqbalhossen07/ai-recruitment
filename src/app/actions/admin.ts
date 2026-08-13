"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";

// Helper function to get the current admin user
// In a real app with next-auth, you would use getServerSession()
export async function getAdminProfile() {
  try {
    let admin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    // If no admin exists, create a default one (just for development/demo purposes)
    if (!admin) {
      admin = await prisma.user.create({
        data: {
          name: "Admin User",
          email: "admin@airecruit.com",
          password: "password123", // In real app, this should be hashed
          role: "ADMIN"
        }
      });
    }
    
    // Don't send password to client
    const { password, ...adminData } = admin;
    return adminData;
  } catch (error) {
    console.error("Error fetching admin:", error);
    return null;
  }
}

export async function updateAdminProfile(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;
    const imageFile = formData.get("image") as File;

    if (!id || !name || !email) {
      return { error: "Name and Email are required." };
    }

    const updateData: any = {
      name,
      email,
    };

    if (newPassword) {
      // In a real app, hash this password before saving!
      updateData.password = newPassword;
    }

    // Handle Image Upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = `admin-${uniqueSuffix}${path.extname(imageFile.name)}`;
      
      const uploadDir = path.join(process.cwd(), "public/uploads");
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, buffer);
      
      updateData.image = `/uploads/${filename}`;
    }

    await prisma.user.update({
      where: { id },
      data: updateData
    });

    revalidatePath("/system-hq/settings");
    revalidatePath("/system-hq"); // To update header
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating admin profile:", error);
    return { error: "Failed to update profile." };
  }
}
