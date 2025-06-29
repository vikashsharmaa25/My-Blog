"use client";

import { enqueueSnackbar } from "notistack";

export const handleSuccess = (msg: any) => {
  enqueueSnackbar(msg, {
    variant: "success",
    autoHideDuration: 1000,
    anchorOrigin: { horizontal: "right", vertical: "top" },
  });
};

export const handleError = (error: any) => {
  enqueueSnackbar(error?.response?.data?.message, {
    variant: "error",
    autoHideDuration: 1000,
    anchorOrigin: { horizontal: "right", vertical: "top" },
  });
};
