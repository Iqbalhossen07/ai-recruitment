"use server";

import prisma from "@/lib/prisma";
import { ApplicationStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function updateApplicationStatus(
  applicationId: string, 
  newStatus: ApplicationStatus, 
  adminNotes: string = "",
  interviewDateStr?: string,
  interviewLink?: string,
  offeredSalary?: string
) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true, user: true }
    });

    if (!application) {
      return { success: false, message: "Application not found." };
    }

    // Handle user account creation if moving to INTERVIEW or HIRED and user doesn't exist
    let userId = application.userId;
    let generatedPassword = "";
    if ((newStatus === ApplicationStatus.INTERVIEW_SCHEDULED || newStatus === ApplicationStatus.HIRED) && !userId) {
      let user = await prisma.user.findUnique({ where: { email: application.email! } });
      if (!user) {
        generatedPassword = Math.random().toString(36).slice(-10);
        user = await prisma.user.create({
          data: {
            name: application.name!,
            email: application.email!,
            password: generatedPassword,
            role: newStatus === ApplicationStatus.HIRED ? Role.EMPLOYEE : Role.APPLICANT,
          }
        });
      }
      userId = user.id;
    }

    const interviewDate = interviewDateStr ? new Date(interviewDateStr) : undefined;

    // Update status and notes
    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { 
        status: newStatus,
        userId: userId,
        interviewDate: interviewDate,
        interviewLink: interviewLink,
        aiSummary: adminNotes ? `${application.aiSummary || ''}\n\nHR Note: ${adminNotes}` : application.aiSummary
      },
      include: { job: true, user: true }
    });

    if (newStatus === ApplicationStatus.HIRED && updated.userId && !generatedPassword) {
      await prisma.user.update({
        where: { id: updated.userId },
        data: { role: Role.EMPLOYEE }
      });
    }

    // Send Emails based on status change
    await sendStatusEmail(updated, newStatus, generatedPassword, offeredSalary);

    revalidatePath("/system-hq/applications");
    return { success: true, message: `Status updated to ${newStatus}` };
  } catch (error: any) {
    console.error("Update status error:", error);
    return { success: false, message: error.message || "Failed to update status." };
  }
}

export async function deleteApplication(applicationId: string) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { userId: true }
    });

    await prisma.application.delete({
      where: { id: applicationId }
    });

    // Check if we need to delete the user account
    if (application?.userId) {
      const remainingApps = await prisma.application.count({
        where: { userId: application.userId }
      });

      if (remainingApps === 0) {
        await prisma.user.delete({
          where: { id: application.userId }
        });
      }
    }

    revalidatePath("/system-hq/applications");
    return { success: true, message: "Application deleted successfully." };
  } catch (error: any) {
    console.error("Delete application error:", error);
    return { success: false, message: "Failed to delete application." };
  }
}

async function sendStatusEmail(application: any, newStatus: ApplicationStatus, generatedPassword?: string, offeredSalary?: string) {
  let subject = "";
  let htmlBody = "";
  let adminSubject = "";
  let adminHtmlBody = "";
  const portalUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/portal/login`;
  
  const accountInfoHtml = generatedPassword ? `
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;"><strong>We have created a Portal account for you:</strong></p>
      <p style="margin: 0 0 10px 0;"><strong>Login URL:</strong> <a href="${portalUrl}" style="color: #26AE61;">${portalUrl}</a></p>
      <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${application.email}</p>
      <p style="margin: 0;"><strong>Password:</strong> ${generatedPassword}</p>
    </div>
  ` : `
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;">You can log in to your existing Portal account to track updates.</p>
      <p style="margin: 0;"><strong>Login URL:</strong> <a href="${portalUrl}" style="color: #26AE61;">${portalUrl}</a></p>
    </div>
  `;

  switch (newStatus) {
    case ApplicationStatus.INTERVIEW_SCHEDULED:
      subject = `Interview Invitation - ${application.job.title}`;
      const iDate = application.interviewDate ? new Date(application.interviewDate).toLocaleString() : 'TBD';
      htmlBody = `
        <div style="font-family: Arial, sans-serif; max-w: 600px; padding: 20px;">
          <h2 style="color: #F59E0B;">Interview Scheduled</h2>
          <p>Dear ${application.name},</p>
          <p>We are pleased to invite you to an interview for the <strong>${application.job.title}</strong> position.</p>
          <div style="background-color: #FFFBEB; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Date & Time:</strong> ${iDate}</p>
            ${application.interviewLink ? `<p style="margin: 0;"><strong>Meeting Link / Location:</strong> <a href="${application.interviewLink}">${application.interviewLink}</a></p>` : ''}
          </div>
          ${accountInfoHtml}
          <p>Best regards,<br>HR Team</p>
        </div>
      `;
      adminSubject = `Admin Notice: Interview Scheduled for ${application.name}`;
      adminHtmlBody = `<p>You have successfully sent an interview invitation to <strong>${application.name}</strong> for the <strong>${application.job.title}</strong> position.</p><p>Interview Time: ${iDate}</p>`;
      break;

    case ApplicationStatus.REJECTED:
      subject = `Update on your application for ${application.job.title}`;
      htmlBody = `
        <div style="font-family: Arial, sans-serif; max-w: 600px; padding: 20px;">
          <h2 style="color: #EF4444;">Application Update</h2>
          <p>Dear ${application.name},</p>
          <p>Thank you for taking the time to apply and interview for the <strong>${application.job.title}</strong> position.</p>
          <p>While we were impressed with your background, we have decided to move forward with other candidates whose qualifications more closely align with our current needs.</p>
          <p>We wish you the best in your job search and future professional endeavors.</p>
          <p>Best regards,<br>HR Team</p>
        </div>
      `;
      adminSubject = `Admin Notice: Rejection Sent to ${application.name}`;
      adminHtmlBody = `<p>You have successfully sent a rejection email to <strong>${application.name}</strong> for the <strong>${application.job.title}</strong> position.</p>`;
      break;

    case ApplicationStatus.HIRED:
      subject = `Offer Letter - Welcome to the Team!`;
      htmlBody = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-w: 600px; padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: 5px solid #10B981; border-radius: 8px; margin: 0 auto;">
          <h2 style="color: #10B981; margin-top: 0; font-size: 24px;">Congratulations! You're Hired!</h2>
          <p style="color: #374151; font-size: 16px; line-height: 1.5;">Dear ${application.name},</p>
          <p style="color: #374151; font-size: 16px; line-height: 1.5;">We are thrilled to formally offer you the position of <strong>${application.job.title}</strong> at our company.</p>
          
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 6px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #111827; font-size: 18px;">Offer Details</h3>
            <ul style="color: #4B5563; font-size: 15px; padding-left: 20px; line-height: 1.6;">
              <li><strong>Position:</strong> ${application.job.title}</li>
              <li><strong>Offered Salary:</strong> ${offeredSalary || 'To be discussed'}</li>
              <li><strong>Location:</strong> ${application.job.location || 'Remote'}</li>
              <li><strong>Employment Type:</strong> ${application.job.jobType || 'Full-time'}</li>
            </ul>
          </div>

          <p style="color: #374151; font-size: 16px; line-height: 1.5;">Your portal account has been upgraded to an Employee account. Please log in to view your formal onboarding instructions and complete the necessary paperwork.</p>
          
          ${accountInfoHtml}
          
          <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-top: 25px;">We look forward to welcoming you to the team!</p>
          <p style="color: #6B7280; font-size: 14px; margin-bottom: 0;">Best regards,<br><strong style="color: #111827;">HR Team</strong></p>
        </div>
      `;
      adminSubject = `Admin Notice: Offer Letter Sent to ${application.name}`;
      adminHtmlBody = `<p>You have successfully sent an Offer Letter to <strong>${application.name}</strong> for the <strong>${application.job.title}</strong> position.</p><p>Offered Salary: ${offeredSalary}</p>`;
      break;

    default:
      return; // Do not send email for other statuses like MATCHED/NOT_MATCHED from the board
  }

  try {
    // Send to applicant
    await transporter.sendMail({
      from: `Elite Recruit <${process.env.SMTP_USER}>`,
      to: application.email,
      subject,
      html: htmlBody
    });

    // Send notification to Admin
    if (adminSubject && adminHtmlBody) {
      await transporter.sendMail({
        from: `Elite Recruit System <${process.env.SMTP_USER}>`,
        to: "iqbalhossen0711@gmail.com",
        subject: adminSubject,
        html: adminHtmlBody
      });
    }
  } catch (error) {
    console.error("Failed to send status email:", error);
  }
}
