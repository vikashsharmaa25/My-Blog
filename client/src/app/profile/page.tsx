"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import { User, Mail, Upload, Camera } from "lucide-react";
import { updateUserProfile } from "@/apis/all-apis";
import { useSelector } from "react-redux";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user?.user) {
      setFormData({
        username: user?.user?.username || "",
        email: user?.user?.email || "",
      });

      if (user?.user?.profilePic) {
        setPreviewImage(user?.user.profilePic);
      }
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("User is not authenticated!");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    if (profileImage) {
      formDataToSend.append("profilePic", profileImage);
    }

    try {
      const response = await updateUserProfile(formDataToSend);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: response.user._id,
          username: response.user.username,
          email: response.user.email,
          profilePic: response.user.profilePic,
        })
      );
    } catch (error) {
      console.error("Profile update failed:", error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className=" flex items-center justify-center p-4">
        <div className="relative rounded-3xl border max-w-md w-full p-8">
          <h2 className="text-4xl font-semibold text-center text-gray-900 mb-8 tracking-tight">
            Edit Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-emerald-100 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-emerald-400 group-hover:text-emerald-500 transition-colors duration-300" />
                  )}
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 group-hover:scale-125 shadow-md"
                >
                  <Upload className="w-4 h-4 text-white" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 group-hover:text-emerald-500 transition-colors duration-300">
                Upload a new profile photo
              </p>
            </div>

            {/* Username Input */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-6 h-6 group-hover:text-emerald-500 transition-colors duration-300" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-14 pr-4 py-3 bg-gray-50 border-2 border-emerald-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200 transition-all duration-300 hover:shadow-md"
                placeholder="Your username"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-6 h-6 group-hover:text-emerald-500 transition-colors duration-300" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-14 pr-4 py-3 bg-gray-50 border-2 border-emerald-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200 transition-all duration-300 hover:shadow-md"
                placeholder="Your email address"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating Profile...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
