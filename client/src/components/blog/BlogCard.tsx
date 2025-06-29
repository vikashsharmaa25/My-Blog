"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import dayjs from "dayjs";
import { Button, IconButton } from "@mui/material";
import { getReadingTime, truncateText } from "@/lib/getReadingTime";
import { Dialogs } from "../Dialogs";
import { useWishlist } from "@/hooks/useWishlist";

function BlogCard({ blogs }: any) {
  const { wishlistIds, toggleWishlist, openDialog, setOpenDialog } =
    useWishlist();

  return (
    <>
      <div className="py-10">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl md:text-3xl font-blog text-gray-900 tracking-tight relative inline-block">
              <span className="relative z-20 font-semibold">Blogs</span>
              <span className="absolute left-0 bottom-0 w-[70%] h-[2px] bg-red-500 rounded-full z-10"></span>
            </h1>
            <p className="text-gray-500 text-lg">
              Discover the latest insights, tutorials, and articles curated just
              for you.
            </p>
          </div>
          <Button variant="text" className="hover-underline">
            <Link href="/blogs">View all</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blogs?.slice(0, 6)?.map((blog: any) => (
            <article
              key={blog?._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform group relative"
            >
              {blog.isfeatured == true && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <div className="absolute right-4 top-4 z-50">
                <IconButton onClick={() => toggleWishlist(blog._id)}>
                  <Heart
                    size={16}
                    fill={wishlistIds.includes(blog._id) ? "red" : "none"}
                    color={wishlistIds.includes(blog._id) ? "red" : "gray"}
                  />
                </IconButton>
              </div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.blogImage?.[0]?.url}
                  alt={blog.title}
                  className="w-full h-full object-fill"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block category-custom-bg px-3 py-1 rounded-full text-xs font-medium">
                    {blog.category?.name || ""}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {dayjs(blog?.publishedDate).format("MMM DD, YYYY")}
                  </div>
                </div>

                <Link
                  href={`/blog/${blog?.slug}`}
                  className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600"
                >
                  {blog.title}
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {truncateText(blog.content)}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {blog.views?.toLocaleString() || 0}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {getReadingTime(blog.content)}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${blog?.slug}`}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center items-center mt-5">
          <Button variant="text" className="hover-underline">
            <Link href="">view more</Link>
            <ChevronDown size={18} />
          </Button>
        </div>
      </div>

      <Dialogs open={openDialog} handleClose={() => setOpenDialog(false)} />
    </>
  );
}

export default BlogCard;
