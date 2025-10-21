"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import { User, Mail, Upload, Camera, Heart, UserCircle2 } from "lucide-react";
import { updateUserProfile } from "@/apis/all-apis";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSuccess } from "@/utils/response-handler";
import { loginSuccess } from "@/slice/authSlice";
import { isValidEmail } from "@/common/validation";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const isEmailValid = !formData.email || isValidEmail(formData.email);

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
    if (!isEmailValid) {
      handleError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    if (profileImage) {
      formDataToSend.append("profilePic", profileImage);
    }

    try {
      const response = await updateUserProfile(formDataToSend);
      // Update Redux so header/avatar reflect changes immediately
      const prevAuth = user; // { user: {...}, accessToken }
      const mergedUser = {
        ...(prevAuth?.user || {}),
        username: response.user.username,
        email: response.user.email,
        profilePic: response.user.profilePic,
      };
      dispatch(
        loginSuccess({
          user: mergedUser,
          accessToken: prevAuth?.accessToken,
        })
      );
      handleSuccess(response?.message || "Profile updated successfully");
    } catch (error) {
      handleError(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-120px)] bg-white">
        {/* Header Banner */}
        <div className="bg-blue-600">
          <div className="mx-auto max-w-5xl px-4 py-10 text-white">
            <div className="flex items-center gap-3">
              <UserCircle2 className="w-8 h-8" />
              <h1 className="text-2xl font-semibold">Your Profile</h1>
            </div>
            <p className="opacity-90 mt-1">Manage your personal information and avatar</p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-4 -mt-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Profile Card */}
            <div className="md:col-span-1">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <div className="w-28 h-28 rounded-full bg-gray-100 border-4 border-blue-100 overflow-hidden">
                      {previewImage ? (
                        <Image src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" width={112} height={112} />
                      ) : user?.user?.profilePic ? (
                        <Image src={user?.user?.profilePic} alt="Profile" className="w-full h-full object-cover" width={112} height={112} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <Camera className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profile-upload"
                      className="absolute -bottom-2 -right-2 w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                    >
                      <Upload className="w-4 h-4 text-white" />
                    </label>
                    <input id="profile-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{formData.username || "User"}</div>
                    <div className="text-sm text-gray-600">{formData.email}</div>
                  </div>
                  <div className="mt-4 w-full grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl border border-gray-200 p-3">
                      <div className="text-xs text-gray-500">Wishlist</div>
                      <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold">
                        <Heart className="w-4 h-4 text-red-500" />
                        {user?.user?.wishlist?.length ?? 0}
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 p-3">
                      <div className="text-xs text-gray-500">Member</div>
                      <div className="text-gray-900 font-semibold">{new Date(user?.user?.createdAt || Date.now()).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Edit Form */}
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Edit Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-blue-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                      placeholder="Your username"
                      required
                      autoComplete="username"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-blue-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                      placeholder="Your email address"
                      autoComplete="email"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading || !isEmailValid}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
