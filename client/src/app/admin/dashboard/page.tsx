"use server";

import React from "react";
import Dashboard from "./Dashboard";
import { getAllBlog, getAllCount } from "@/apis/all-apis";
import { fetchAllCount } from "@/apis/server-apis";

const getAllBlogData = async () => {
  try {
    const response = await getAllBlog();
    return response;
  } catch (error) {
    // handleError(error);
  }
};

const getAllCountData = async () => {
  try {
    const response = await fetchAllCount();
    return response;
  } catch (error) {
    // handleError(error);
  }
};

async function page() {
  const blogData = await getAllBlogData();
  const allCount = await getAllCountData();
  return (
    <div>
      <Dashboard blogData={blogData} allCount={allCount} />
    </div>
  );
}

export default page;
