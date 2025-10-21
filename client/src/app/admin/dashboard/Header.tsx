"use client"

import type React from "react"

import { logout } from "@/slice/authSlice"
import { deleteCookies } from "@/utils/delete-cookies"
import { Bell, LogOut, Menu, Search, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Badge,
  Menu as MuiMenu,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material"

interface AdminHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState<null | HTMLElement>(null)
  const [notificationCount] = useState(3)

  const handleLogoutHandler = () => {
    deleteCookies()
    dispatch(logout())
    router.push("/")
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setShowUserMenu(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setShowUserMenu(null)
  }

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}>
      <Toolbar sx={{ px: 3, py: 1.5 }}>
        <Box display="flex" alignItems="center" gap={2} flex={1}>
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} size="small" sx={{ display: { lg: "none" }, color: "text.secondary" }}>
            <Menu size={20} />
          </IconButton>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Admin Dashboard
          </Typography>
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={1.5}>
          {/* Search Bar (hide on small) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TextField
              placeholder="Search..."
              size="small"
              variant="outlined"
              margin="dense"
              color="primary"
              sx={{ width: 256 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="#9CA3AF" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Notifications */}
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <Badge badgeContent={notificationCount} color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>

          {/* Settings */}
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <Settings size={20} />
          </IconButton>

          {/* User Profile */}
          <IconButton onClick={handleUserMenuOpen} size="small">
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10B981, #0D9488)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <User size={16} />
            </Box>
          </IconButton>

          {/* User Menu Dropdown */}
          <MuiMenu
            anchorEl={showUserMenu}
            open={Boolean(showUserMenu)}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleUserMenuClose}>Profile Settings</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Change Password</MenuItem>
            <MenuItem
              onClick={() => {
                handleUserMenuClose()
                handleLogoutHandler()
              }}
              sx={{ color: "error.main" }}
            >
              <LogOut size={16} style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </MuiMenu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader
