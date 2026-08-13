"use client";

import { useState, useEffect } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import Swal from "sweetalert2";

export default function ContactFormClient() {
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
    setUserAnswer("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate Captcha
    if (parseInt(userAnswer) !== (captchaNum1 + captchaNum2)) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Answer",
        text: `Please answer the math question correctly: ${captchaNum1} + ${captchaNum2} = ?`,
        confirmButtonColor: "#0FA877"
      });
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await sendContactMessage(formData);
    
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: result.message,
        confirmButtonColor: "#0FA877"
      });
      (e.target as HTMLFormElement).reset();
      generateCaptcha();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.error,
        confirmButtonColor: "#0FA877"
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-black mb-2">Full Name</label>
        <input 
          type="text" 
          name="name" 
          required 
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
          placeholder="John Doe" 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-black mb-2">Your Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
          placeholder="john@example.com" 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-black mb-2">Subject</label>
        <input 
          type="text" 
          name="subject" 
          required 
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
          placeholder="How can we help?" 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-black mb-2">Message</label>
        <textarea 
          name="message" 
          required 
          rows={5} 
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" 
          placeholder="Write your message here..."
        ></textarea>
      </div>
      
      {/* Captcha */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 flex items-center justify-between">
        <div>
          <label className="block text-sm font-bold text-black mb-1">Human Verification</label>
          <span className="text-gray-600 text-sm">What is {captchaNum1} + {captchaNum2}?</span>
        </div>
        <input 
          type="number" 
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          required 
          className="w-24 px-4 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center font-bold" 
          placeholder="?" 
        />
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex justify-center py-4 px-4 rounded-md shadow-md text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
