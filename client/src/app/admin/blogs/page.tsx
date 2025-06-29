export const dynamic = "force-dynamic";
import React from "react";
import BlogManagement from "./BlogManagement";
import AdminLayout from "../AdminLayout";
import { getAllBlog } from "@/apis/all-apis";

async function Page() {
  const initialPage = 1;
  const limit = 6;

  const fetchedBlogs = await getAllBlog(initialPage, limit);

  return (
    <AdminLayout>
      <BlogManagement initialData={fetchedBlogs} />
    </AdminLayout>
  );
}

export default Page;
