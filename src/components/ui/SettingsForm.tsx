"use client";

import { useFormState } from "react-dom";
import { updateUserSettings } from "@/app/actions/user-settings";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 bg-primary text-white font-bold rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 ${
        pending ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-hover"
      }`}
    >
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

interface SettingsFormProps {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

export default function SettingsForm({ user }: SettingsFormProps) {
  const [state, formAction] = useFormState(updateUserSettings, null as any);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user.image);

  useEffect(() => {
    if (state) {
      if (state.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: state.message,
          confirmButtonColor: "#26AE61",
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: state.error || "Failed to update profile",
          confirmButtonColor: "#26AE61",
        });
      }
    }
  }, [state]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // We aren't doing actual uploads right now unless configured, 
    // but here is the UI setup for it.
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  return (
    <form action={formAction} className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-black">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Update your account details and password.</p>
      </div>

      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-3xl overflow-hidden shrink-0">
              {photoPreview ? (
                <img src={photoPreview} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold py-1.5 px-3 rounded-md transition-colors">
              <span>Change Photo</span>
              <input type="file" name="image" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>

          <div className="flex-1 flex flex-col gap-4 w-full">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={user.name}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-black"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address <span className="text-xs font-normal text-gray-400 ml-1">(Cannot be changed)</span>
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user.email}
                disabled
                className="w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Leave blank to keep current password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-black"
              />
              <p className="text-xs text-gray-500 mt-1.5">If you want to change your password, enter a new one here.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
