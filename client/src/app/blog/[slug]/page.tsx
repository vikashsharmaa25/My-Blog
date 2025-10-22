"use server";

import { getAllBlogSlug } from "@/apis/all-apis";
import Layout from "@/app/layout/Layout";
import SingleBlog from "@/components/blog/single-blog/SingleBlog";
import React from "react";

export async function generateMetadata({ params }: any) {
  const { slug } = params || {};
  try {
    const apiData = await getAllBlogSlug(slug);
    const blog = apiData?.blog;
    const title = blog?.title || "Blog";
    const description = (blog?.content || "").replace(/<[^>]*>/g, " ").slice(0, 160);
    const image = blog?.blogImage?.[0]?.url;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    const url = siteUrl ? `${siteUrl}/blog/${slug}` : `/blog/${slug}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: image ? [{ url: image }] : undefined,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
      },
    } as any;
  } catch {
    return { title: "Blog" } as any;
  }
}

async function Page({ params }: any) {
  const { slug } = params;
  const apiData = await getAllBlogSlug(slug);

  const blog = apiData?.blog;
  const ld = blog
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        datePublished: blog.publishedDate,
        image: blog.blogImage?.[0]?.url,
        articleSection: blog?.category?.name,
        url: (process.env.NEXT_PUBLIC_SITE_URL || "") + `/blog/${slug}`,
        mainEntityOfPage: (process.env.NEXT_PUBLIC_SITE_URL || "") + `/blog/${slug}`,
      }
    : null;

  return (
    <Layout>
      {ld ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ) : null}
      <SingleBlog singleBlogData={apiData?.blog} />
    </Layout>
  );
}

export default Page;
