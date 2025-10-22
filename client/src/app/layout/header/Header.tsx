"use client"

import type React from "react"
import { useState } from "react"
import {
  LayoutDashboard,
  LogOut,
  Heart,
  User,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react"
import { IconButton, Menu as MuiMenu, MenuItem, Divider } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { deleteCookies } from "@/utils/delete-cookies"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/slice/authSlice"
import Link from "next/link"

function Header({ categoryData, cookiesData }: any) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useSelector((state: any) => state.auth)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    router.push("/profile")
    handleCloseMenu()
  }

  const handleDashboardClick = () => {
    router.push("/admin/dashboard")
    handleCloseMenu()
  }

  const handleWishListClick = () => {
    router.push("/user/wishlist")
    handleCloseMenu()
  }

  const handleLogoutHandler = () => {
    handleCloseMenu()
    deleteCookies()
    dispatch(logout())
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setSearchOpen(false)
    }
  }

  const isAdmin = user?.user?.role === "admin"

  const socialIcons = [
    { icon: <Instagram size={16} />, color: "bg-[#E1306C]", label: "Instagram" },
    { icon: <Facebook size={16} />, color: "bg-[#3b5998]", label: "Facebook" },
    { icon: <Twitter size={16} />, color: "bg-[#1da1f2]", label: "Twitter" },
    { icon: <Youtube size={16} />, color: "bg-[#FF0000]", label: "YouTube" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1250px] mx-auto px-4 py-3">
          {/* Top Bar: Social Icons */}
          <div className="hidden sm:flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
            <div className="flex gap-2">
              {socialIcons.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  title={s.label}
                  className={`${s.color} p-1.5 rounded-full text-white hover:scale-110 transition-transform duration-200`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 font-medium">Follow us on social media</p>
          </div>

          {/* Main Header */}
          <div className="flex justify-between items-center gap-4">
            {/* Left: Logo */}
            <Link href="/" className="sm:flex hidden items-center select-none flex-shrink-0">
              <span className="sm:text-3xl text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                vikashsharma
              </span>
              <span className="sm:text-3xl text-2xl font-semibold ml-1 text-gray-900">.dev</span>
            </Link>
             <Link href="/" className="sm:hidden flex items-center select-none flex-shrink-0">
              <span className="sm:text-3xl text-2xl sm:font-extrabold font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                vs
              </span>
              <span className="sm:text-3xl text-2xl sm:font-extrabold font-semibold ml-1 text-gray-900">.dev</span>
            </Link>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                title="Search"
              >
                <Search size={20} className="text-gray-700" />
              </button>

              {/* Notifications */}
              {/* {user && (
                <button
                  className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition relative"
                  title="Notifications"
                >
                  <Bell size={20} className="text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )} */}

              {/* User Menu */}
              {user ? (
                <>
                  <IconButton onClick={handleOpenMenu} className="p-0">
                    {user?.user?.profilePic ? (
                      <Image
                        src={user.user.profilePic || "/placeholder.svg"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-gray-200 hover:border-blue-500 transition"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                    )}
                  </IconButton>

                  <MuiMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    slotProps={{
                      paper: {
                        sx: {
                          borderRadius: 2,
                          minWidth: 240,
                          p: 0,
                          elevation: 2,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        },
                      },
                    }}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.user?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.user?.email}</p>
                    </div>
                    {isAdmin && (
                      <MenuItem onClick={handleDashboardClick}>
                        <LayoutDashboard size={18} className="mr-3 text-blue-600" />
                        <span className="text-sm">Dashboard</span>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleProfileClick}>
                      <User size={18} className="mr-3 text-gray-600" />
                      <span className="text-sm">Profile</span>
                    </MenuItem>
                    <MenuItem onClick={handleWishListClick}>
                      <Heart size={18} className="mr-3 text-red-500" />
                      <span className="text-sm">Wishlist</span>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogoutHandler} sx={{ color: "#ef4444" }}>
                      <LogOut size={18} className="mr-3" />
                      <span className="text-sm">Logout</span>
                    </MenuItem>
                  </MuiMenu>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push("/auth?mode=login")}
                    className="sm:text-sm text-xs font-medium text-gray-700 hover:text-gray-900 border border-gray-300 sm:px-3 px-2 py-1 sm:py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => router.push("/auth?mode=signup")}
                    className="sm:text-sm text-xs font-medium text-white bg-blue-600 sm:px-3 px-2 py-1 sm:py-2 rounded-lg hover:bg-blue-700 hover:text-white transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="md:hidden mt-3 pt-3 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  autoFocus
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          )}

          {/* Mobile Social Icons */}
          {mobileMenuOpen && (
            <div className="sm:hidden flex justify-center gap-2 py-3 border-t border-gray-100 mt-3">
              {socialIcons.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  title={s.label}
                  className={`${s.color} p-2 rounded-full text-white hover:scale-110 transition-transform duration-200`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
