"use server";

import HeroSection from "@/components/HeroSection";
import Layout from "./layout/Layout";
import AllCategories from "@/components/categories/AllCategories";
import Blog from "@/components/blog/Blog";
import { getAllBlog, getAllcategory } from "@/apis/all-apis";
import { handleError } from "@/utils/response-handler";

const getAllCategoryData = async () => {
  try {
    const response = await getAllcategory();
    return response;
  } catch (error) {
    // handleError(error);
  }
};
const getAllBlogData = async () => {
  try {
    const response = await getAllBlog();
    return response;
  } catch (error) {
    // handleError(error);
  }
};

export default async function Home() {
  const categoryData = await getAllCategoryData();
  const blogData = await getAllBlogData();
  return (
    <Layout>
      <HeroSection blogData={blogData} />
      <AllCategories categoryData={categoryData} />
      <Blog />
    </Layout>
  );
}
