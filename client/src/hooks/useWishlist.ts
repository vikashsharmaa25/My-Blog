"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/apis/server-apis";
import { handleError, handleSuccess } from "@/utils/response-handler";
import { updateWishlist } from "@/slice/authSlice";

export function useWishlist() {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    if (user?.user?.wishlist) {
      setWishlistIds(user.user.wishlist);
    }
  }, [user]);

  const toggleWishlist = async (blogId: string) => {
    if (!user) {
      router.push("/auth?mode=login");
      return;
    }

    try {
      if (wishlistIds.includes(blogId)) {
        const response = await removeFromWishlist(blogId);
        handleSuccess(response?.message);

        const updatedBlog = response?.blog;
        const updatedWishlistBy = updatedBlog?.wishlistBy || [];

        if (!updatedWishlistBy.includes(user.user._id)) {
          const updatedList = wishlistIds.filter((id) => id !== blogId);
          setWishlistIds(updatedList);
          dispatch(updateWishlist(updatedList));
        }
      } else {
        const response = await addToWishlist(blogId);
        handleSuccess(response?.message);

        const updatedBlog = response?.blog;
        const updatedWishlistBy = updatedBlog?.wishlistBy || [];

        if (updatedWishlistBy.includes(user.user._id)) {
          const updatedList = [...wishlistIds, blogId];
          setWishlistIds(updatedList);
          dispatch(updateWishlist(updatedList));
        }
      }
    } catch (error) {
      // handleError(error);
    }
  };

  return {
    wishlistIds,
    toggleWishlist,
  };
}
