import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import Layout from "./layout/Layout";
import AllCategories from "@/components/categories/AllCategories";
import Blog from "@/components/blog/Blog";
import { getAllBlog, getAllcategory } from "@/apis/all-apis";

// Separate async components for parallel loading
async function CategorySection() {
  const categoryData = await getAllcategory();
  return <AllCategories categoryData={categoryData} />;
}

async function HeroWithBlogs() {
  const blogData = await getAllBlog();
  return <HeroSection blogData={blogData} />;
}

// Loading fallbacks
function HeroSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-96 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroWithBlogs />
      </Suspense>

      <Suspense fallback={<CategorySkeleton />}>
        <CategorySection />
      </Suspense>

      <Suspense fallback={<BlogSkeleton />}>
        <Blog />
      </Suspense>
    </Layout>
  );
}