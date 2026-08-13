"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";

export async function sendContactMessage(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    
    // Server-side validation
    if (!name || !email || !subject || !message) {
      return { success: false, error: "All fields are required" };
    }

    // 1. Save to Database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // 2. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // NOTE: using APP_PASS if needed, but in env user specified SMTP_PASS
      },
    });

    // Use SMTP_USER as admin email to receive notifications
    const adminEmail = process.env.SMTP_USER;

    // 3. Send Email to Admin
    const adminMailOptions = {
      from: `"AI Recruit" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0FA877; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">New Message Received</h2>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; margin-top: 20px;">
              <p style="margin: 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            This is an automated message from AI Recruit Contact Form.
          </div>
        </div>
      `,
    };

    // 4. Send Confirmation Email to User
    const userMailOptions = {
      from: `"AI Recruit Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0FA877; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">Thank You for Contacting Us</h2>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">Hi ${name},</p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              We have received your message regarding <strong>"${subject}"</strong>. Our team will review your inquiry and get back to you as soon as possible.
            </p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #0FA877; margin-top: 20px;">
              <p style="margin: 0; font-size: 14px; color: #666; font-style: italic;">
                " ${message} "
              </p>
            </div>
            <p style="font-size: 16px; color: #555; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>The AI Recruit Team</strong>
            </p>
          </div>
          <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            AI Recruit - London, UK
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);
    
    revalidatePath("/system-hq/messages");
    revalidatePath("/system-hq/dashboard");

    return { success: true, message: "Your message has been sent successfully." };
  } catch (error) {
    console.error("Error sending contact message:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}

export async function deleteMessageAction(id: string) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/system-hq/messages");
    revalidatePath("/system-hq/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, error: "Failed to delete message" };
  }
}

export async function bulkDeleteMessagesAction(ids: string[]) {
  try {
    await prisma.contactMessage.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    revalidatePath("/system-hq/messages");
    revalidatePath("/system-hq/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting messages:", error);
    return { success: false, error: "Failed to delete messages" };
  }
}

export async function markMessageReadAction(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
    revalidatePath("/system-hq/messages");
    revalidatePath("/system-hq/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error marking message read:", error);
    return { success: false, error: "Failed to update message" };
  }
}
