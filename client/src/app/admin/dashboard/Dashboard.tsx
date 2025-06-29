import React from "react";
import AdminLayout from "../AdminLayout";
import StatsCard from "./StatsCard";
import { Calendar, Eye, FileText, Plus, Tag, Users } from "lucide-react";
import Link from "next/link";

const Dashboard = ({ blogData, allCount }: any) => {
  const counts = allCount?.allCount || {};
  const stats = [
    {
      title: "Total Blogs",
      value: `${counts.blogs ?? 0}`,
      icon: FileText,
      change: "+12%",
      color: "bg-emerald-500",
    },
    {
      title: "Total Users",
      value: `${counts.users ?? 0}`,
      icon: Users,
      change: "+8%",
      color: "bg-teal-600",
    },
    {
      title: "Categories",
      value: `${counts.categories ?? 0}`,
      icon: Tag,
      change: "+2",
      color: "bg-emerald-600",
    },
  ];

  const recentBlogs = blogData?.blogs;
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat: any, index: any) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Blogs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-h-[500px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Blogs
              </h3>
              <Link
                href="/admin/blogs"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentBlogs?.map((blog: any) => (
                <div
                  key={blog._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <Link
                      href={`/blog/${blog?.slug}`}
                      className="font-medium text-gray-700 hover:underline underline-offset-4"
                    >
                      {blog.title.length > 30
                        ? `${blog.title.slice(0, 40)}...`
                        : blog.title}
                    </Link>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(blog?.publishedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        blog.isPublished
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {blog.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/create-blog"
                className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <Plus className="h-8 w-8 text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-emerald-700">
                  Add New Blog
                </span>
              </Link>
              <Link
                href="/admin/categories"
                className="flex flex-col items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
              >
                <Tag className="h-8 w-8 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-teal-700">
                  Manage Categories
                </span>
              </Link>
              <Link
                href="/admin/manage-user"
                className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <Users className="h-8 w-8 text-emerald-600 mb-2" />
                <span className="text-sm font-medium text-emerald-700">
                  Manage Users
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
