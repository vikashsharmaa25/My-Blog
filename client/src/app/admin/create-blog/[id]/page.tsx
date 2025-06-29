export const dynamic = "force-dynamic";
import React from "react";
import AdminLayout from "../../AdminLayout";
import AddBlog from "../AddBlog";
import { getAllcategory } from "@/apis/all-apis";

async function page() {
  const categoryData = await getAllcategory();
  return (
    <>
      <AdminLayout>
        <AddBlog categoryData={categoryData} />
      </AdminLayout>
    </>
  );
}

export default page;
