"use client";
import React, { useEffect, useState } from "react";
import { getAllBlog, deleteBlogById } from "@/apis/all-apis";
import {
  Button,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputBase,
  CircularProgress,
} from "@mui/material";
import {
  Calendar,
  Edit,
  Eye,
  ImageIcon,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleError, handleSuccess } from "@/utils/response-handler";
import Image from "next/image";
import CustomPagination from "@/components/CustomPagination";
import { ConfirmDialog } from "@/components/Dialogs";

function BlogManagement({ initialData }: any) {
  const [blogs, setBlogs] = useState(initialData.blogs || []);
  const [currentPage, setCurrentPage] = useState(initialData.page || 1);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const router = useRouter();

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await getAllBlog(page, 6);
      setBlogs(res.blogs);
      setTotalPages(res.totalPages);
      setCurrentPage(res.page);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: any) => {
    router.push(`/admin/create-blog/${id}`);
  };

  const handlePageChange = (_: any, value: number) => {
    fetchBlogs(value);
  };

  const openDeleteDialog = (id: string) => {
    setBlogToDelete(id);
    setConfirmOpen(true);
  };

  const closeDeleteDialog = () => {
    setBlogToDelete(null);
    setConfirmOpen(false);
  };

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return;
    try {
      const res = await deleteBlogById(blogToDelete);
      handleSuccess(res?.message);
      fetchBlogs(currentPage);
    } catch (err) {
      handleError(err);
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Blogs</h2>
        <Link
          href="/admin/create-blog"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <InputBase
              placeholder="Search blogs..."
              fullWidth
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <Select defaultValue="All" displayEmpty className="w-40" size="small">
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </Select>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Title</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Featured</b>
                  </TableCell>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Views</b>
                  </TableCell>
                  <TableCell>
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog: any) => (
                  <TableRow key={blog._id} hover>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                          {blog?.blogImage[0]?.url ? (
                            <Image
                              src={blog.blogImage[0].url}
                              alt="Blog Image"
                              width={100}
                              height={100}
                              className="object-fill w-full h-full"
                            />
                          ) : (
                            <div className="mt-1 ml-2">
                              <ImageIcon size={30} />
                            </div>
                          )}
                        </div>
                        <Tooltip
                          title={blog?.title}
                          arrow
                          placement="top-start"
                        >
                          <span>
                            {blog?.title.length > 30
                              ? `${blog?.title.slice(0, 30)}...`
                              : blog.title}
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          blog?.isPublished
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-yellow-800"
                        }`}
                      >
                        {blog?.isPublished ? "Published" : "Draft"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          blog?.isfeatured === true
                            ? "bg-blue-100 text-emerald-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog?.isfeatured === true ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar size={12} />
                        {new Date(blog?.publishedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{blog.views}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/blog/${blog?.slug}`}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Button
                          onClick={() => handleEdit(blog._id)}
                          className="action-btn"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          onClick={() => openDeleteDialog(blog._id)}
                          className="action-btn"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeleteBlog}
        title="Confirm Deletion"
        description="Are you sure you want to delete this blog ?"
      />
    </div>
  );
}

export default BlogManagement;
