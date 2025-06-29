"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Upload, Camera } from "lucide-react";
import { userRegister } from "@/apis/auth-apis";
import { handleError, handleSuccess } from "@/utils/response-handler";

function SignupPage({ setActiveTab }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await userRegister(formData);
      setActiveTab("login");
      handleSuccess(response?.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-6 h-6 text-gray-600" />
            )}
          </div>
          <label
            htmlFor="profile-upload"
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <Upload className="w-3 h-3 text-white" />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <p className="text-xs text-gray-400 text-center">
          Upload your profile photo
        </p>
      </div>

      {/* Signup form */}
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            placeholder="Username"
            className="w-full pl-12 pr-12 py-3  text-gray-600 border border-gray-600 rounded-xl placeholder-gray-600 transition-all duration-300 outline-none"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Email"
            className="w-full pl-12 pr-12 py-3  text-gray-600 border border-gray-600 rounded-xl placeholder-gray-600 transition-all duration-300 outline-none"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Create password"
            className="w-full pl-12 pr-12 py-3  text-gray-600 border border-gray-600 rounded-xl placeholder-gray-600 transition-all duration-300 outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        <div className="space-y-2">
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  formData.password.length >= i * 2
                    ? formData.password.length >= 8
                      ? "bg-emerald-500"
                      : "bg-yellow-500"
                    : "bg-white/20"
                }`}
              ></div>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            Password strength:
            {formData.password.length >= 8
              ? "Strong"
              : formData.password.length >= 4
              ? "Medium"
              : "Weak"}
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !formData.email || !formData?.password}
          className="w-full text-white bg-red-500 font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
