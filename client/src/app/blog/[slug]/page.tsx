"use server";

import { getAllBlogSlug } from "@/apis/all-apis";
import Layout from "@/app/layout/Layout";
import SingleBlog from "@/components/blog/single-blog/SingleBlog";
import React from "react";

async function Page({ params }: any) {
  const { slug } = params;
  console.log("slug", slug);
  const apiData = await getAllBlogSlug(slug);
  console.log("apiData", apiData);

  return (
    <Layout>
      <SingleBlog singleBlogData={apiData?.blog} />
    </Layout>
  );
}

export default Page;
