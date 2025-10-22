
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import Layout from "./layout/Layout";
import AllCategories from "@/components/categories/AllCategories";
import Blog from "@/components/blog/Blog";
import { getAllBlog, getAllcategory } from "@/apis/all-apis";
import { HeroSkeleton, AllCategoriesSkeleton, BlogCardSkeleton } from "./skeleton";

async function CategorySection() {
  const categoryData = await getAllcategory();
  return <AllCategories categoryData={categoryData} />;
}

async function HeroWithBlogs() {
  const blogData = await getAllBlog();
  return <HeroSection blogData={blogData} />;
}

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroWithBlogs />
      </Suspense>

      <Suspense fallback={<AllCategoriesSkeleton />}>
        <CategorySection />
      </Suspense>

      <Suspense fallback={<BlogCardSkeleton />}>
        <Blog />
      </Suspense>
    </Layout>
  );
}