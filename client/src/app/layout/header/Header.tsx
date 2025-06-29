"use client";

import React, { useState } from "react";
import {
  ActivityIcon,
  Facebook,
  Github,
  Heart,
  Instagram,
  LayoutDashboard,
  LayoutDashboardIcon,
  Linkedin,
  LogOut,
  LucideBike,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import { Button, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { Dialogs } from "@/components/Dialogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteCookies } from "@/utils/delete-cookies";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/slice/authSlice";
import { getRoleFromJWT } from "@/middleware";
import Link from "next/link";

function Header({ categoryData, cookiesData }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useSelector((state: any) => state.auth);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    router.push("/profile");
    handleCloseMenu();
  };

  const handleDashboardClick = () => {
    router.push("/admin/dashboard");
    handleCloseMenu();
  };

  const handleWishListClick = () => {
    router.push("/user/wishlist");
    handleCloseMenu();
  };

  const handleLogoutHandler = () => {
    handleCloseMenu();
    deleteCookies();
    dispatch(logout());
  };

  // Get role from JWT
  const accessToken = cookiesData;
  const userRole = getRoleFromJWT(accessToken);
  const isAdmin = userRole === "admin";

  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 py-6 max-w-[1250px] mx-auto gap-4 sm:gap-0">
        {/* Social Icons */}
        <div className="sm:flex hidden items-center justify-center sm:justify-start gap-4 text-black">
          <div className="flex space-x-3 mt-4">
            <button className="bg-[#ff0000] p-2 rounded text-white">
              <Instagram size={18} />
            </button>
            <button className="bg-[#3b5998] p-2 rounded text-white">
              <Facebook size={18} />
            </button>
            <button className="bg-[#1da1f2] p-2 rounded text-white">
              <Twitter size={18} />
            </button>
            <button className="bg-[#ff0000] p-2 rounded text-white">
              <Youtube size={18} />
            </button>
          </div>
        </div>

        {/* Logo */}
        <Link href="/" className="text-center sm:text-left">
          <span className="sm:text-3xl text-2xl uppercase font-extrabold text-black">
            World
          </span>
          <span className="sm:text-3xl text-2xl uppercase font-extrabold text-red-600 ml-2">
            blog
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <IconButton onClick={handleOpenMenu} className="profile_pic">
                {user?.profilePic ? (
                  <Image
                    src={user?.profilePic}
                    alt="Profile"
                    width={40}
                    height={40}
                    objectFit="fill"
                    className="rounded-full"
                  />
                ) : (
                  <User />
                )}
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      borderRadius: 2,
                      padding: "0px 0",
                      minWidth: 250,
                    },
                    elevation: 1,
                  },
                }}
              >
                {isAdmin && (
                  <MenuItem onClick={handleDashboardClick}>
                    <LayoutDashboard size={18} style={{ marginRight: 8 }} />
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleProfileClick}>
                  <User size={18} style={{ marginRight: 8 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleWishListClick}>
                  <Heart size={18} style={{ marginRight: 8 }} />
                  Wishlist
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogoutHandler} sx={{ color: "red" }}>
                  <LogOut size={18} style={{ marginRight: 8 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="text"
              className="hover-underline"
              onClick={() => setOpenDialog(true)}
            >
              Sign In / Sign Up
            </Button>
          )}
        </div>
      </div>

      <div className="flex sm:hidden items-center justify-center sm:justify-start gap-4 text-black mb-4">
        <div className="flex space-x-3 mt-4">
          <button className="bg-[#ff0000] p-2 rounded text-white">
            <Instagram size={18} />
          </button>
          <button className="bg-[#3b5998] p-2 rounded text-white">
            <Facebook size={18} />
          </button>
          <button className="bg-[#1da1f2] p-2 rounded text-white">
            <Twitter size={18} />
          </button>
          <button className="bg-[#ff0000] p-2 rounded text-white">
            <Youtube size={18} />
          </button>
        </div>
      </div>

      <Divider />

      <Dialogs open={openDialog} handleClose={() => setOpenDialog(false)} />
    </>
  );
}

export default Header;
