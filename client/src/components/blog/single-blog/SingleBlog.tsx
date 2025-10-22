import React from "react";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Comments from "./Comments";

function SingleBlog({ singleBlogData }: any) {
  const blogData = singleBlogData;
  return (
    <div className="">
      {/* Main Content */}
      <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative h-[450px] overflow-hidden rounded-xl bg-gray-100">
          {blogData?.blogImage?.[0]?.url ? (
            <>
              <Image
                src={blogData.blogImage[0].url}
                alt={blogData?.title || "Blog image"}
                width={900}
                height={900}
                className="w-full h-full object-contain"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </>
          ) : null}
        </div>

        <div className="px-1 sm:px-2 lg:px-0 mt-6 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Tag size={14} />
              {blogData?.category?.name}
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(blogData?.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {blogData?.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                {blogData?.views?.toLocaleString()} views
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {blogData?.title}
          </h1>
        </div>

        {/* Article Content */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div
            className="custom-blog-content prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-headings:mt-8 prose-headings:mb-3 prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-img:my-6 prose-img:rounded-xl prose-img:shadow-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-pink-600 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:text-gray-600 prose-hr:my-2 prose-hr:border-gray-200"
            dangerouslySetInnerHTML={{ __html: blogData?.content }}
          />
        </div>

        {/* Tags */}
        <div className="px-1 sm:px-2 lg:px-0 my-8 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blogData?.tags?.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Comments */}
        {blogData?._id && (
          <div className="px-1 sm:px-2 lg:px-0 max-w-4xl mx-auto">
            <Comments blogId={blogData._id} />
          </div>
        )}
      </article>
    </div>
  );
}

export default SingleBlog;
