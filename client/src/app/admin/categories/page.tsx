import React from "react";
import CategoryManagement from "./CategoryManagement";
import AdminLayout from "../AdminLayout";
import { getAllcategory } from "@/apis/all-apis";

async function page() {
  const categoryData = await getAllcategory();
  return (
    <AdminLayout>
      <CategoryManagement categoryData={categoryData} />
    </AdminLayout>
  );
}

export default page;
