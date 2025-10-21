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
import { IconButton, Paper, Box, Typography, Chip, Stack, Button } from "@mui/material";
import { useWishlist } from "@/hooks/useWishlist";

function AllBlogs({ blogData }: any) {
  const [blogs, setBlogs] = useState(blogData.blogs || []);
  const [currentPage, setCurrentPage] = useState(blogData.page || 1);
  const [totalPages, setTotalPages] = useState(blogData.totalPages || 1);
  const [loading, setLoading] = useState(false);
  const { wishlistIds, toggleWishlist } = useWishlist();

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
    <div>
      {/* Header Section */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box className="px-4 sm:px-6 lg:px-8 py-8">
          <Box textAlign="left">
            <Typography variant="overline" color="primary">Latest</Typography>
            <Typography variant="h4" fontWeight={800} color="text.primary" mb={1}>
              Our Latest Blogs
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover insightful articles, tutorials, and industry insights from our expert writers
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs?.map((blog: any) => (
            <div key={blog._id}>
              {loading ? (
                <div className="">
                  <BlogCardSkeleton />
                </div>
              ) : (
                <>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      overflow: 'hidden',
                      bgcolor: 'white',
                      transition: 'all .25s ease',
                      '&:hover': {
                        boxShadow: '0 10px 24px rgba(33,150,243,.12)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                      {blog.isfeatured === true && (
                        <Chip
                          label="Featured"
                          size="small"
                          sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}
                          color="warning"
                        />
                      )}
                      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => toggleWishlist(blog._id)}
                          sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                        >
                          <Heart
                            size={16}
                            fill={wishlistIds.includes(blog._id) ? 'red' : 'none'}
                            color={wishlistIds.includes(blog._id) ? 'red' : 'gray'}
                          />
                        </IconButton>
                      </Box>
                      {blog.blogImage?.[0]?.url ? (
                        <img
                          src={blog.blogImage?.[0]?.url || ``}
                          alt={blog.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : null}
                      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(0,0,0,.06)' } }} />
                    </Box>

                    <Box sx={{ p: 2.5 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
                        <Chip label={blog.category?.name || ''} size="small" color="primary" variant="outlined" />
                        <Box display="flex" alignItems="center" sx={{ color: 'text.secondary' }}>
                          <Calendar size={12} style={{ marginRight: 4 }} />
                          <Typography variant="caption" color="text.secondary">
                            {dayjs(blog?.publishedDate).format('MMM DD, YYYY')}
                          </Typography>
                        </Box>
                      </Box>

                      <Link href={`/blog/${blog?.slug}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}>
                          {blog.title}
                        </Typography>
                      </Link>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {truncateText(blog.content)}
                      </Typography>

                      {blog.tags && blog.tags.length > 0 && (
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1.5 }}>
                          {blog.tags.slice(0, 3).map((tag: any, tagIndex: any) => (
                            <Chip key={tagIndex} size="small" label={`#${tag}`} variant="outlined" />
                          ))}
                          {blog.tags.length > 3 && (
                            <Chip size="small" label={`+${blog.tags.length - 3} more`} variant="outlined" />
                          )}
                        </Stack>
                      )}

                      <Box display="flex" alignItems="center" justifyContent="space-between" pt={1.5} sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <Stack direction="row" spacing={2} sx={{ color: 'text.secondary' }}>
                          <Box display="flex" alignItems="center">
                            <Eye size={12} style={{ marginRight: 4 }} />
                            <Typography variant="caption">{blog.views?.toLocaleString() || 0}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Clock size={12} style={{ marginRight: 4 }} />
                            <Typography variant="caption">{getReadingTime(blog.content)}</Typography>
                          </Box>
                        </Stack>
                        <Link href={`/blog/${blog?.slug}`} style={{ textDecoration: 'none' }}>
                          <Button size="small" variant="text" endIcon={<ArrowRight size={16} />}
                            sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main' }}
                          >
                            Read More
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Paper>
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
