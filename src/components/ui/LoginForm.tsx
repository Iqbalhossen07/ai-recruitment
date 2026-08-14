"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";

import Swal from "sweetalert2";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function PortalLoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleSuccess = async () => {
      if (state?.success) {
        if (state.role === "APPLICANT") {
          await Swal.fire({
            title: "Welcome Back!",
            text: "Successfully logged in to Candidate Portal.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            confirmButtonColor: '#26AE61'
          });
          window.location.href = "/portal/dashboard";
        } else if (state.role === "EMPLOYEE") {
           await Swal.fire({
            title: "Welcome!",
            text: "Successfully logged in.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            confirmButtonColor: '#26AE61'
          });
          window.location.href = "/portal/dashboard";
        } else {
           window.location.href = "/";
        }
      }
    };
    handleSuccess();
  }, [state, router]);

  return (
    <div className="min-h-[calc(100vh-130px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-md shadow-lg border border-gray-100">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="font-bold text-2xl text-primary tracking-tight">AI<span className="text-black">Recruit</span></span>
          </Link>
          <h2 className="text-center text-3xl font-extrabold text-black">
            Candidate Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to check your application status
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-black mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-black rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {state?.error && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-md border border-red-100">
              {state.error}
            </div>
          )}

          <div>
            <SubmitButton />
          </div>
          
        </form>
      </div>
    </div>
  );
}
