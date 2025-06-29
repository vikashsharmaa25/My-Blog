"use server";
import React from "react";
import Layout from "../layout/Layout";
import AllBlogs from "@/components/blog/AllBlogs";
import { handleError } from "@/utils/response-handler";
import { getAllBlog } from "@/apis/all-apis";

const getAllBlogData = async () => {
  const initialPage = 1;
  const limit = 9;
  try {
    const response = await getAllBlog(initialPage, limit);
    return response;
  } catch (error) {
    handleError(error);
  }
};

async function page() {
  const blogData = await getAllBlogData();
  return (
    <Layout>
      <AllBlogs blogData={blogData} />
    </Layout>
  );
}

export default page;
