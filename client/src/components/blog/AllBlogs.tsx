"use client";

import React, { useState } from "react";
import { Calendar, Eye, Tag, Clock, ArrowRight, Heart } from "lucide-react";
import CustomPagination from "../CustomPagination";
import { getReadingTime, truncateText } from "@/lib/getReadingTime";
import Link from "next/link";
import dayjs from "dayjs";
import { getAllBlog } from "@/apis/all-apis";
import { handleError } from "@/utils/response-handler";
import { BlogCardSkeleton } from "../Skelton";
import { IconButton } from "@mui/material";

function AllBlogs({ blogData }: any) {
  const [blogs, setBlogs] = useState(blogData.blogs || []);
  console.log("blogs", blogs);
  const [currentPage, setCurrentPage] = useState(blogData.page || 1);
  const [totalPages, setTotalPages] = useState(blogData.totalPages || 1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (_: any, value: number) => {
    // setCurrentPage(value);
    fetchBlogs(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await getAllBlog(page, 9);
      setBlogs(res.blogs);
      setTotalPages(res.totalPages);
      setCurrentPage(res.page);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!blogData?.blogs || blogData.blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Tag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Blogs Found
          </h2>
          <p className="text-gray-600">Check back later for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-start">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Latest <span className="text-red-600">Blogs</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover insightful articles, tutorials, and industry insights
              from our expert writers
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs?.map((blog: any) => (
            <div key={blog._id}>
              {loading ? (
                <div className="">
                  <BlogCardSkeleton />
                </div>
              ) : (
                <>
                  <article className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform group relative">
                    {/* Featured Badge */}
                    {blog.isfeatured === true && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="absolute right-4 top-4 z-50">
                      <IconButton>
                        <Heart color="red" size={16} />
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
                          {blog.tags
                            .slice(0, 3)
                            .map((tag: any, tagIndex: any) => (
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
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default AllBlogs;
