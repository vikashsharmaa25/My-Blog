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
import {
  Box,
  Paper,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
} from "@mui/material";

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
    <Box display="flex" height="100vh" bgcolor={'grey.50'}>
      {/* Sidebar */}
      <Paper
        elevation={1}
        sx={{
          width: sidebarOpen ? 256 : 64,
          transition: 'width 300ms ease',
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1.5} borderBottom={1} borderColor="divider">
          <Typography variant="subtitle1" fontWeight={700} color="success.main">
            {sidebarOpen ? "Admin Panel" : "A"}
          </Typography>
          <IconButton size="small" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </IconButton>
        </Box>
        <Box flex={1} overflow="auto">
          <List disablePadding>
            {sidebarItems.map((item) => {
              const active = pathname.includes(item.id);
              const Icon = item.icon;
              return (
                <ListItemButton
                  key={item.id}
                  onClick={() => router.push(`/admin/${item.id}`)}
                  sx={{
                    py: 1.25,
                    ...(active
                      ? { bgcolor: "success.50", color: "success.main", fontWeight: 600 }
                      : {}),
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: active ? "success.main" : "text.secondary" }}>
                    <Icon size={18} />
                  </ListItemIcon>
                  {sidebarOpen && <ListItemText primary={item.label} />}
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <Divider />
        <Box px={2} py={1.5}>
          <Button
            fullWidth
            color="inherit"
            startIcon={<LogOut size={18} />}
            onClick={handleLogoutHandler}
            sx={{ justifyContent: sidebarOpen ? "flex-start" : "center", color: "text.secondary" }}
          >
            {sidebarOpen ? "Logout" : null}
          </Button>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box flex={1} overflow="auto" p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
