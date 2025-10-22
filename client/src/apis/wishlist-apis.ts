"use client";
import axiosInstance from "@/lib/axiosInstance";

export const addToWishlist = async (blogId: string) => {
  const response = await axiosInstance.post(`/v1/user/add-wishlist/${blogId}`);
  return response.data;
};

export const removeFromWishlist = async (blogId: string) => {
  const response = await axiosInstance.delete(`/v1/user/remove-wishlist/${blogId}`);
  return response.data;
};
