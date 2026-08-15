export const dynamic = 'force-dynamic';
"use client";

import { useState, useEffect } from "react";
import { getAdminProfile, updateAdminProfile } from "@/app/actions/admin";
import Swal from "sweetalert2";
import Image from "next/image";
import { Save, Upload, User as UserIcon, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const [admin, setAdmin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      const data = await getAdminProfile();
      if (data) {
        setAdmin(data);
        if (data.image) setImagePreview(data.image);
      }
      setIsLoading(false);
    };
    fetchAdmin();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("id", admin.id);
    
    const response = await updateAdminProfile(null, formData);

    setIsSubmitting(false);

    if (response?.error) {
      Swal.fire("Error!", response.error, "error");
    } else if (response?.success) {
      await Swal.fire({
        title: "Success!",
        text: "Profile updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      window.location.reload();
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and account settings.</p>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl w-full">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Profile Picture Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-100">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-gray-50 bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm relative">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Profile Preview" fill className="object-cover" />
                ) : (
                  <UserIcon size={48} className="text-gray-400" />
                )}
                
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload size={24} className="text-white" />
                </div>
              </div>
              <input 
                type="file" 
                id="image" 
                name="image" 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Profile Picture</h3>
              <p className="text-sm text-gray-500 mb-4 max-w-md">Upload a new avatar to personalize your account. Recommended size is 256x256px.</p>
              <label 
                htmlFor="image" 
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-bold rounded-md hover:bg-gray-50 transition-colors cursor-pointer inline-block"
              >
                Change Picture
              </label>
            </div>
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={admin?.name}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={admin?.email}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
              />
            </div>
          </div>

          {/* Password Settings */}
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
            <div className="max-w-md">
              <label htmlFor="newPassword" className="block text-sm font-bold text-gray-700 mb-2">New Password (Optional)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
