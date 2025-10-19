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
      <article className="px-4 py-8">
        <div className="relative h-96 overflow-hidden">
          {blogData?.blogImage?.[0]?.url ? (
            <>
              <Image
                src={blogData.blogImage[0].url}
                alt={blogData?.title || "Blog image"}
                width={500}
                height={500}
                className="w-full h-full object-fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </>
          ) : null}
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Tag size={14} />
              {blogData?.category?.name}
            </span>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
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
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {blogData?.title}
          </h1>
        </div>

        {/* Article Content */}
        <div
          className="custom-blog-content prose"
          dangerouslySetInnerHTML={{
            __html: blogData?.content,
          }}
        />

        {/* Tags */}
        <div className="p-8 mb-8">
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
        {blogData?._id && <Comments blogId={blogData._id} />}
      </article>
    </div>
  );
}

export default SingleBlog;
