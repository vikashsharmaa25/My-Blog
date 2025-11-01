"use client";

import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Calendar,
  FileText,
  Plus,
  Tag,
  Users,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "../AdminLayout";

const StatsCard = ({ stat }: any) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      borderRadius: 4,
      border: "1px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
      transition: "all 0.3s ease",
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 6px 20px rgba(33, 150, 243, 0.15)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Avatar
          sx={{
            bgcolor: stat.bgColor,
            width: 56,
            height: 56,
          }}
        >
          <stat.icon size={26} color={stat.iconColor} />
        </Avatar>
        <Chip
          icon={<TrendingUp size={14} />}
          label={stat.change}
          size="small"
          sx={{
            bgcolor: "primary.50",
            color: "primary.main",
            fontWeight: 600,
            border: "1px solid",
            borderColor: "primary.100",
          }}
        />
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight={500}
        gutterBottom
      >
        {stat.title}
      </Typography>
      <Typography variant="h4" fontWeight={700} color="text.primary">
        {stat.value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = ({ blogData, allCount }: any) => {
  const counts = allCount?.allCount || {};
  const stats = [
    {
      title: "Total Blogs",
      value: `${counts.blogs ?? 0}`,
      icon: FileText,
      change: "+12%",
      bgColor: "#E3F2FD",
      iconColor: "#1976D2",
    },
    {
      title: "Total Users",
      value: `${counts.users ?? 0}`,
      icon: Users,
      change: "+8%",
      bgColor: "#C5E1F5",
      iconColor: "#1565C0",
    },
    {
      title: "Categories",
      value: `${counts.categories ?? 0}`,
      icon: Tag,
      change: "+2",
      bgColor: "#BBDEFB",
      iconColor: "#0D47A1",
    },
  ];

  const recentBlogs = blogData?.blogs || [];

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "grey.50", minHeight: "100vh" }}>
        <Container maxWidth="xl" sx={{ py: 5 }}>
          {/* HEADER */}
          <Box mb={5}>
            <Typography
              variant="h5"
              fontWeight={600}
              color="text.primary"
              gutterBottom
            >
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back 👋 Here’s what’s happening with your blog today.
            </Typography>
          </Box>

          {/* STATS GRID */}
          <Grid container spacing={3} mb={4}>
            {stats.map((stat, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
                <StatsCard stat={stat} />
              </Grid>
            ))}
          </Grid>

          {/* MAIN CONTENT GRID */}
          <Grid container spacing={3}>
            {/* RECENT BLOGS */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    background:
                      "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                        <BarChart3 size={20} />
                      </Avatar>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="text.primary"
                      >
                        Recent Blogs
                      </Typography>
                    </Box>
                    <Link href="/admin/blogs" style={{ textDecoration: "none" }} className="lowercase">
                      <Button
                        variant="text"
                        sx={{
                          fontWeight: 600,
                          textTransform: "none",
                          color: "primary.main",
                        }}
                        endIcon={<span>→</span>}
                      >
                        View All
                      </Button>
                    </Link>
                  </Box>
                </Box>

                <Box sx={{ p: 3, maxHeight: 500, overflow: "auto" }}>
                  <Stack spacing={2}>
                    {recentBlogs.length > 0 ? (
                      recentBlogs.map((blog: any) => (
                        <Paper
                          key={blog._id}
                          elevation={0}
                          sx={{
                            p: 2.5,
                            borderRadius: 3,
                            bgcolor: "grey.50",
                            border: "1px solid",
                            borderColor: "divider",
                            transition: "all 0.25s ease",
                            "&:hover": {
                              bgcolor: "#F1F6FF",
                              transform: "translateX(4px)",
                              boxShadow:
                                "0 4px 14px rgba(33, 150, 243, 0.12)",
                            },
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="start"
                            justifyContent="space-between"
                            gap={2}
                          >
                            <Box flex={1} minWidth={0}>
                              <Link
                                href={`/blog/${blog.slug}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={600}
                                  color="text.primary"
                                  sx={{
                                    "&:hover": { color: "primary.main" },
                                    mb: 1,
                                    display: "block",
                                  }}
                                >
                                  {blog.title.length > 60
                                    ? `${blog.title.slice(0, 60)}...`
                                    : blog.title}
                                </Typography>
                              </Link>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Calendar size={14} color="#64748B" />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Date(blog.publishedDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-end"
                              gap={1}
                            >
                              <Chip
                                size="small"
                                label={blog.isPublished ? "Published" : "Draft"}
                                color={blog.isPublished ? "primary" : "warning"}
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                fontWeight={500}
                              >
                                {blog.views} views
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{ py: 4 }}
                      >
                        No recent blogs found.
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Paper>
            </Grid>

            {/* RIGHT SIDEBAR */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>
                {/* QUICK ACTIONS */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    p: 3,
                    bgcolor: "background.paper",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                      <Plus size={20} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>
                      Quick Actions
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    <Link href="/admin/create-blog" style={{ textDecoration: "none" }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Plus size={20} />}
                        sx={{
                          py: 1.8,
                          borderRadius: 3,
                          textTransform: "none",
                          bgcolor: "primary.main",
                          fontWeight: 600,
                          justifyContent: "flex-start",
                          "&:hover": { bgcolor: "primary.dark" },
                        }}
                      >
                        Add New Blog
                      </Button>
                    </Link>

                    <Link href="/admin/categories" style={{ textDecoration: "none" }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Tag size={20} />}
                        sx={{
                          py: 1.8,
                          borderRadius: 3,
                          textTransform: "none",
                          justifyContent: "flex-start",
                        }}
                      >
                        Manage Categories
                      </Button>
                    </Link>

                    <Link href="/admin/manage-user" style={{ textDecoration: "none" }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Users size={20} />}
                        sx={{
                          py: 1.8,
                          borderRadius: 3,
                          textTransform: "none",
                          justifyContent: "flex-start",
                        }}
                      >
                        Manage Users
                      </Button>
                    </Link>
                  </Stack>
                </Paper>

                {/* ACTIVITY SUMMARY */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    p: 3,
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Activity Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={2}>
                    <SummaryItem
                      label="Published Today"
                      value="3"
                      color="primary"
                    />
                    <SummaryItem
                      label="Total Views"
                      value={recentBlogs.reduce(
                        (sum: number, b: any) => sum + (b.views || 0),
                        0
                      )}
                      color="primary"
                    />
                    <SummaryItem
                      label="Draft Posts"
                      value={recentBlogs.filter((b: any) => !b.isPublished).length}
                      color="warning"
                    />
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AdminLayout>
  );
};

const SummaryItem = ({ label, value, color }: any) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Chip
      label={value}
      size="small"
      sx={{
        bgcolor: `${color}.50`,
        color: `${color}.main`,
        fontWeight: 700,
      }}
    />
  </Box>
);

export default Dashboard;
