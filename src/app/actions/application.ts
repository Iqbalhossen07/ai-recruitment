"use server";

import prisma from "@/lib/prisma";
import { evaluateResume } from "@/lib/ai";
import { ApplicationStatus, Role } from "@prisma/client";
import nodemailer from "nodemailer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function submitApplication(prevState: any, formData: FormData) {
  try {
    const jobId = formData.get("jobId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const expectedSalary = formData.get("expectedSalary") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const file = formData.get("cv") as File;

    if (!file || file.size === 0) {
      return { success: false, message: "Please upload a valid PDF CV." };
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return { success: false, message: "Job not found." };
    }

    // 1. Extract text from PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let resumeText = "";
    try {
      const PDFParser = require("pdf2json");
      resumeText = await new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", () => resolve(pdfParser.getRawTextContent()));
        pdfParser.parseBuffer(buffer);
      });
    } catch (err) {
      console.error("PDF Parse error:", err);
      return { success: false, message: "Could not read the PDF file. Please ensure it is a valid text-based PDF." };
    }

    // 2. Evaluate with AI
    // Fallback to NOT_MATCHED if AI fails or evaluates to false
    let isMatched = false;
    let aiSummary = "";
    let education = "";
    let experience = "";
    
    // Only call AI if we have text
    if (resumeText.trim().length > 50) {
       const aiResult = await evaluateResume(resumeText, job.keywords);
       isMatched = aiResult.matched;
       aiSummary = aiResult.summary;
       education = aiResult.education;
       experience = aiResult.experience;
    }

    // Save the uploaded CV to disk
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.pdf`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure uploads directory exists
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      console.error("Could not create uploads directory", e);
    }
    
    const filePath = path.join(uploadsDir, uniqueFilename);
    await writeFile(filePath, buffer);
    const cvUrl = `/uploads/${uniqueFilename}`; 

    // 3. Save Application without creating user account yet
    const application = await prisma.application.create({
      data: {
        jobId: job.id,
        userId: null, // User account created only when interview is scheduled
        name,
        email,
        phone,
        expectedSalary,
        linkedinUrl,
        cvUrl,
        status: isMatched ? ApplicationStatus.MATCHED : ApplicationStatus.NOT_MATCHED,
        education,
        experience,
        aiSummary 
      }
    });

    // 4. Send Email Notification to Admin
    try {
      await transporter.sendMail({
        from: `AI Recruit <${process.env.SMTP_USER}>`,
        to: "iqbalhossen0711@gmail.com", // Admin Email
        subject: `New Application Received: ${name} for ${job.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #26AE61;">New Candidate Application</h2>
            <p>A new application has been submitted for the <strong>${job.title}</strong> position.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 0 0 10px 0;"><strong>Status:</strong> ${isMatched ? '<span style="color:#2563EB;font-weight:bold;">MATCHED</span>' : '<span style="color:#F59E0B;font-weight:bold;">NOT MATCHED</span>'}</p>
            </div>
            <p>Log in to the <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/system-hq/applications">Admin Dashboard</a> to review the candidate's details and AI evaluation.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send admin notification email:", emailErr);
    }

    return { 
      success: true, 
      matched: isMatched,
      message: isMatched 
        ? "Application submitted successfully. Our team will review and contact you shortly." 
        : "Your application has been received. Our team will contact you if shortlisted."
    };

  } catch (error: any) {
    console.error("Application submission error:", error);
    return { success: false, message: error.message || "Failed to submit application." };
  }
}
