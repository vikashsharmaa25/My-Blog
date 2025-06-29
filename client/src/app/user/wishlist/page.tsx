"use server";

import Layout from "@/app/layout/Layout";
import Wishlist from "@/components/wishlist/Wishlist";
import React from "react";
import { getBlogWishList } from "@/apis/server-apis";

const getWishListData = async () => {
  const initialPage = 1;
  const limit = 6;
  try {
    const response = await getBlogWishList(initialPage, limit);
    return response;
  } catch (error) {}
};

async function page() {
  const wishlistData = await getWishListData();
  return (
    <Layout>
      <Wishlist wishlistData={wishlistData} />
    </Layout>
  );
}

export default page;
