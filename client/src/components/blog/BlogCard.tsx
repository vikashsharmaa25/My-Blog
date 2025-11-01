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
import { Button, IconButton, Paper, Box, Typography, Chip, Stack } from "@mui/material";
import { getReadingTime, truncateText } from "@/lib/getReadingTime";
import { useWishlist } from "@/hooks/useWishlist";

function BlogCard({ blogs }: any) {
  const { wishlistIds, toggleWishlist } = useWishlist();

  return (
    <>
      <div className="py-10">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <Typography variant="overline" color="primary">Highlights</Typography>
            <Typography variant="h5" fontWeight={700} color="text.primary" className="tracking-tight">
              Blogs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover the latest insights, tutorials, and articles curated just for you.
            </Typography>
          </div>
          <Button variant="text">
            <Link href="/blogs" className="lowercase">View all</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blogs?.slice(0, 6)?.map((blog: any) => (
            <Paper
              key={blog?._id}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                bgcolor: 'white',
                transition: 'all .25s ease',
                '&:hover': { boxShadow: '0 10px 24px rgba(33,150,243,.12)' }
              }}
            >
              <Box sx={{ position: 'relative', height: 192, overflow: 'hidden' }}>
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
                {blog.blogImage?.[0]?.url && (
                  <img
                    src={blog.blogImage?.[0]?.url}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
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
                 <h6 className="line-clamp-2 mb-2">{blog.title}</h6>
                </Link>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  {truncateText(blog.content)}
                </Typography>

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
                    <Button size="small" variant="text" endIcon={<ArrowRight size={16} />} sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main' }}>
                      Read More
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Paper>
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogCard;
