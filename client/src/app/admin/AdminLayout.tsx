"use client";

import React from "react";
import {
  BarChart3,
  FileText,
  Plus,
  Tag,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { deleteCookies } from "@/utils/delete-cookies";
import { logout } from "@/slice/authSlice";
import { useDispatch } from "react-redux";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "blogs", label: "Manage Blogs", icon: FileText },
  { id: "create-blog", label: "Add Blog", icon: Plus },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "manage-user", label: "Manage Users", icon: Users },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogoutHandler = () => {
    deleteCookies();
    dispatch(logout());
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-md transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold text-emerald-600">
            {sidebarOpen ? "Admin Panel" : "A"}
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item?.id}
              onClick={() => router.push(`/admin/${item?.id}`)}
              className={`flex items-center px-4 py-3 w-full text-left hover:bg-emerald-50 transition-colors ${
                pathname.includes(item.id)
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "text-gray-700"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {sidebarOpen && item?.label}
            </button>
          ))}
        </nav>
        <a href="/" onClick={handleLogoutHandler} className="p-4 border-t">
          <button className="flex items-center text-sm text-gray-600 hover:text-red-600">
            <LogOut className="h-5 w-5 mr-2" />
            {sidebarOpen && "Logout"}
          </button>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
