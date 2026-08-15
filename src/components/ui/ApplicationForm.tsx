"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitApplication } from "@/app/actions/application";
import Swal from "sweetalert2";

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useFormState(submitApplication, null);
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");

  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    setCaptcha({ a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError("Please upload a PDF file.");
        e.target.value = "";
        setFileName("");
      } else if (file.size > 10 * 1024 * 1024) {
        setFileError("File size must be less than 10MB.");
        e.target.value = "";
        setFileName("");
      } else {
        setFileError("");
        setFileName(file.name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (parseInt(captchaInput) !== captcha.a + captcha.b) {
      e.preventDefault();
      Swal.fire('Error', 'Incorrect math answer. Please try again.', 'error');
      return;
    }
  };

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        Swal.fire({
          icon: 'success',
          title: state.matched ? 'Congratulations!' : 'Application Received',
          text: state.message,
          confirmButtonColor: '#26AE61',
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
           window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: state.message,
          confirmButtonColor: '#26AE61'
        });
      }
    }
  }, [state]);

  return (
    <div className="bg-gray-50 p-6 rounded-md border border-gray-200" id="apply">
      <h2 className="text-2xl font-bold text-black mb-2">Apply for this Position</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Fill out the form below. Our system will automatically scan your CV for the exact keywords required for this role.
      </p>

      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="jobId" value={jobId} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Full Name</label>
            <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Email Address</label>
            <input type="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Phone Number</label>
            <input type="tel" name="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black" placeholder="+44 7..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Expected Salary</label>
            <input type="text" name="expectedSalary" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black" placeholder="e.g. £40,000 per year" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-black mb-1">LinkedIn URL (Optional)</label>
          <input type="url" name="linkedinUrl" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black" placeholder="https://linkedin.com/in/..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Upload CV (PDF)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 transition-colors cursor-pointer relative">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover">
                  <span>{fileName || "Upload a file"}</span>
                  <input id="cv-upload" name="cv" type="file" required accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </span>
                {!fileName && <p className="pl-1">or drag and drop</p>}
              </div>
              <p className="text-xs text-gray-500">PDF up to 10MB</p>
              {fileError && <p className="text-xs text-red-500 mt-2">{fileError}</p>}
            </div>
          </div>
        </div>

        {/* Bot Protection */}
        <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center justify-between">
          <label className="text-sm font-medium text-black">
            Bot Protection: What is <span className="font-bold text-primary">{captcha.a} + {captcha.b} = ?</span>
          </label>
          <input 
            type="number" 
            required 
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-24 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black text-center font-bold" 
            placeholder="?" 
          />
        </div>

        <div className="pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          System is Scanning your Resume...
        </span>
      ) : "Submit Application"}
    </button>
  );
}
