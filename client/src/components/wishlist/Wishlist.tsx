"use client";

import React from "react";
import { Heart, Eye, Calendar, ArrowRight, Clock } from "lucide-react";
import { getReadingTime, truncateText } from "@/lib/getReadingTime";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";

function Wishlist({ wishlistData }: any) {
  if (!wishlistData || wishlistData?.wishlist?.length === 0) {
    return (
      <div className="">
        <div className="">
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Start adding blogs to your wishlist to see them here!
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      {/* Header Section */}
      <div className="text-start mb-12 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          My Reading Wishlist
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your curated collection of must-read articles and tutorials
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistData?.wishlist?.map((blog: any) => (
          <article
            key={blog?._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform group relative"
          >
            {/* Featured Badge */}
            {blog.isfeatured && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              </div>
            )}

            <div className="absolute right-4 top-4 z-50">
              <IconButton disabled>
                <Heart color="red" fill="red" size={16} />
              </IconButton>
            </div>

            {/* Blog Image */}
            <div className="relative h-48 overflow-hidden">
              {blog.blogImage?.[0]?.url ? (
                <img
                  src={blog.blogImage?.[0]?.url || ``}
                  alt={blog.title}
                  className="w-full h-full object-fill transition-transform duration-300"
                />
              ) : null}

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>

            {/* Blog Content */}
            <div className="p-6">
              {/* Category and Date */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block hover-category-custom-bg category-custom-bg px-3 py-1 rounded-full text-xs font-medium">
                  {blog.category?.name || ""}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  {dayjs(blog?.publishedDate).format("MMM DD, YYYY")}
                </div>
              </div>

              {/* Title */}
              <Link
                href={`/blog/${blog?.slug}`}
                className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors"
              >
                {blog.title}
              </Link>

              {/* Content Preview */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {truncateText(blog.content)}
              </p>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map((tag: any, tagIndex: any) => (
                    <span
                      key={tagIndex}
                      className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      +{blog.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Footer */}
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
                  className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group relative"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
