import fs from "fs/promises";
import path from "path";

// Define the base upload directory (public/uploads)
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Ensures the upload directory exists
 */
async function ensureDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch (error) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Uploads a file and returns the accessible URL path
 * @param file The File object from formData
 * @param prefix Optional prefix for the filename (e.g., "blog-", "avatar-")
 * @returns The relative path to access the file (e.g., "/uploads/filename.ext")
 */
export async function uploadFile(file: File, prefix: string = ""): Promise<string | null> {
  if (!file || file.size === 0) return null;

  await ensureDir();

  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Create a unique filename
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const ext = path.extname(file.name);
  const fileName = `${prefix}${uniqueSuffix}${ext}`;
  
  const filePath = path.join(UPLOAD_DIR, fileName);
  await fs.writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}

/**
 * Deletes a file given its relative URL path
 * @param fileUrl The relative URL (e.g., "/uploads/filename.ext")
 */
export async function deleteFile(fileUrl: string | null | undefined): Promise<void> {
  if (!fileUrl) return;

  // Ensure we only try to delete files in the /uploads/ directory
  if (!fileUrl.startsWith("/uploads/")) return;

  const fileName = fileUrl.replace("/uploads/", "");
  const filePath = path.join(UPLOAD_DIR, fileName);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    // Ignore error if file doesn't exist
    console.error(`Failed to delete file at ${filePath}:`, error);
  }
}

/**
 * Replaces an old file with a new one. 
 * If the new file is empty/null, it keeps the old file.
 * @param newFile The new File object
 * @param oldFileUrl The URL of the old file
 * @param prefix Prefix for the new filename
 * @returns The final URL to save in the database
 */
export async function replaceFile(newFile: File | null, oldFileUrl: string | null, prefix: string = ""): Promise<string | null> {
  // If no new file is uploaded, keep the old one
  if (!newFile || newFile.size === 0) {
    return oldFileUrl;
  }

  // If a new file is provided, delete the old one first
  if (oldFileUrl) {
    await deleteFile(oldFileUrl);
  }

  // Upload the new file
  const newUrl = await uploadFile(newFile, prefix);
  return newUrl;
}
