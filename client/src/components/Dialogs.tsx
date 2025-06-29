"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import LoginPage from "./Login";
import SignupPage from "./SignUp";
import { X } from "lucide-react";

export function Dialogs({ open, handleClose }: any) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleSuccess = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <div className="relative">
        {/* Glassmorphism dialog card */}
        <div className="relative bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 ">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-2xl text-gray-700 hover:text-text-800 transition-all duration-100 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Tab Navigation */}
          <div className="flex bg-white/5 rounded-t-3xl">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 px-6 text-sm font-medium rounded-tl-3xl transition-all duration-300 ${
                activeTab === "login"
                  ? "bg-white/10 text-gray-600 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-gray-700 hover:bg-white/5"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-4 px-6 text-sm font-medium rounded-tr-3xl transition-all duration-300 ${
                activeTab === "signup"
                  ? "bg-white/10 text-gray-600 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-gray-700 hover:bg-white/5"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === "login" ? (
              <LoginPage onSuccess={handleSuccess} />
            ) : (
              <SignupPage
                onSuccess={handleSuccess}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  description = "Do you really want to delete?",
  onClose,
  onConfirm,
}: {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
