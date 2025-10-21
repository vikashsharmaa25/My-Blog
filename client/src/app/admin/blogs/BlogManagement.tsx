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
  Box,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Container,
  Stack,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  Calendar,
  Edit,
  Eye,
  ImageIcon,
  Plus,
  Search,
  Trash2,
  Filter,
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
    <Box sx={{ bgcolor: "white", minHeight: "100vh", py: 4 }}>
      <Container>
        {/* Header */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          mb={4}
          gap={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={500} color="text.primary" gutterBottom>
              Manage Blogs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create, edit, and manage your blog posts
            </Typography>
          </Box>
          <Link href="/admin/create-blog" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
             className="primary_button"
            >
              Add New Blog
            </Button>
          </Link>
        </Box>

        {/* Filters & Search */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <TextField
                placeholder="Search blogs..."
                size="small"
                fullWidth
                sx={{
                  maxWidth: { sm: 400 },
                  bgcolor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#64748B" />
                    </InputAdornment>
                  ),
                }}
              />
              <Select
                defaultValue="All"
                size="small"
                sx={{
                  minWidth: 160,
                  bgcolor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: 2,
                  },
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Filter size={16} color="#64748B" />
                  </InputAdornment>
                }
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </Select>
            </Stack>
          </Box>

          {/* Table */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" py={8}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F8FAFB" }}>
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                      Title
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                      Featured
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                      Views
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.map((blog: any) => (
                    <TableRow
                      key={blog._id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "#F8FAFB",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 48,
                              height: 48,
                              bgcolor: "primary.50",
                              border: "2px solid",
                              borderColor: "divider",
                            }}
                          >
                            {blog?.blogImage[0]?.url ? (
                              <Image
                                src={blog.blogImage[0].url}
                                alt="Blog Image"
                                width={48}
                                height={48}
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              <ImageIcon size={24} color="#1976D2" />
                            )}
                          </Avatar>
                          <Tooltip title={blog?.title} arrow placement="top-start">
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="text.primary"
                              sx={{
                                maxWidth: 250,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {blog?.title}
                            </Typography>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={blog?.isPublished ? "Published" : "Draft"}
                          size="small"
                          color={blog?.isPublished ? "primary" : "warning"}
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            borderRadius: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={blog?.isfeatured ? "Yes" : "No"}
                          size="small"
                          color={blog?.isfeatured ? "success" : "default"}
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            borderRadius: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Calendar size={14} color="#64748B" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(blog?.publishedDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color="text.primary">
                          {blog.views.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Link href={`/blog/${blog?.slug}`}>
                            <IconButton
                              size="small"
                              sx={{
                                color: "primary.main",
                                "&:hover": {
                                  bgcolor: "primary.50",
                                },
                              }}
                            >
                              <Eye size={18} />
                            </IconButton>
                          </Link>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(blog._id)}
                            sx={{
                              color: "info.main",
                              "&:hover": {
                                bgcolor: "info.lighter",
                              },
                            }}
                          >
                            <Edit size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => openDeleteDialog(blog._id)}
                            sx={{
                              color: "error.main",
                              "&:hover": {
                                bgcolor: "error.lighter",
                              },
                            }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </Box>
        )}

        {/* Confirm Dialog */}
        <ConfirmDialog
          open={confirmOpen}
          onClose={closeDeleteDialog}
          onConfirm={confirmDeleteBlog}
          title="Confirm Deletion"
          description="Are you sure you want to delete this blog?"
        />
      </Container>
    </Box>
  );
}

export default BlogManagement;