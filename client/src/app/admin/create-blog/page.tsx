import React from "react";
import AddBlog from "./AddBlog";
import AdminLayout from "../AdminLayout";
import { getAllcategory } from "@/apis/all-apis";

const page = async () => {
  const categoryData = await getAllcategory();
  return (
    <AdminLayout>
      <AddBlog categoryData={categoryData} />
    </AdminLayout>
  );
};

export default page;
