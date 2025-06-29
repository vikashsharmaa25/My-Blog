"use server";

import React from "react";
import BlogCard from "./BlogCard";
import { getAllBlog } from "@/apis/all-apis";
import { handleError } from "@/utils/response-handler";

const getBlogdata = async () => {
  try {
    const response = await getAllBlog();
    return response;
  } catch (error) {
    // handleError(error);
  }
};

async function Blog() {
  const apidata = await getBlogdata();
  return (
    <div>
      <BlogCard blogs={apidata?.blogs} />
    </div>
  );
}

export default Blog;
