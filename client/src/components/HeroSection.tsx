"use client";

import { extractTextFromHTML } from "@/lib/getReadingTime";
import { Button, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { Calendar1, MoveRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { Dialogs } from "./Dialogs";

function HeroSection({ blogData }: any) {
  const featuredBlogs =
    blogData?.blogs?.filter((blog: any) => blog.isfeatured)?.slice(0, 3) || [];

  const mainBlog = featuredBlogs[0];
  const sideBlogs = featuredBlogs.slice(1);

  const { wishlistIds, toggleWishlist, openDialog, setOpenDialog } =
    useWishlist();

  if (!featuredBlogs.length) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            No Featured Posts Yet
          </h3>
          <p className="text-gray-600">
            Check back soon for featured articles!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Blog */}
        <div className="lg:w-2/3 w-full relative">
          <div className="group relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={mainBlog?.blogImage[0]?.url || ""}
              alt={mainBlog?.title || ""}
              fill
              className="object-fill"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 right-4 z-10">
              <IconButton onClick={() => toggleWishlist(mainBlog._id)}>
                <Heart
                  size={18}
                  fill={wishlistIds.includes(mainBlog._id) ? "red" : "none"}
                  color={wishlistIds.includes(mainBlog._id) ? "red" : "white"}
                />
              </IconButton>
            </div>

            <div className="absolute bottom-0 p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <span className="category-custom-bg text-white text-xs font-bold px-4 py-2 rounded-full">
                  {mainBlog?.category?.name || ""}
                </span>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Calendar1 size={12} />
                  <span>
                    {dayjs(mainBlog?.publishedDate).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
              <Link href={`/blog/${mainBlog?.slug}`}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {mainBlog?.title}
                </h2>
              </Link>
              <p className="text-lg text-gray-200 mb-6 line-clamp-3">
                {extractTextFromHTML(mainBlog?.content || "", 180)}
              </p>
              <Button variant="text" className="custom-button">
                <Link
                  href={`/blog/${mainBlog?.slug}`}
                  className="flex items-center gap-2"
                >
                  <span>Read More</span>
                  <MoveRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Side Blogs */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {sideBlogs.map((blog: any) => (
            <div
              key={blog._id}
              className="group bg-white rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 z-10">
                <IconButton onClick={() => toggleWishlist(blog._id)}>
                  <Heart
                    size={16}
                    fill={wishlistIds.includes(blog._id) ? "red" : "none"}
                    color={wishlistIds.includes(blog._id) ? "red" : "gray"}
                  />
                </IconButton>
              </div>
              <div className="flex flex-col sm:flex-row h-[280px] sm:h-[265px]">
                <div className="relative sm:w-2/5 w-full h-1/2 sm:h-full">
                  <Image
                    src={blog.blogImage[0]?.url || "/placeholder.jpg"}
                    alt={blog.title}
                    fill
                    className="object-fill"
                  />
                </div>
                <div className="flex flex-col justify-between p-6 sm:w-3/5">
                  <div className="space-y-3">
                    <span className="text-xs font-bold category-custom-bg px-3 py-1 rounded-full">
                      {blog.category?.name || "General"}
                    </span>
                    <Link href={`/blog/${blog?.slug}`}>
                      <h3 className="text-lg font-bold line-clamp-2 text-gray-900 hover:text-blue-600">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {extractTextFromHTML(blog.content, 100)}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 pt-4">
                    <Calendar1 size={12} />
                    <span>
                      {dayjs(blog?.publishedDate).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialogs open={openDialog} handleClose={() => setOpenDialog(false)} />
    </div>
  );
}

export default HeroSection;
