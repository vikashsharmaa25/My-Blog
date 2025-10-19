"use client";

import { enqueueSnackbar } from "notistack";

export const handleSuccess = (msg: any) => {
  const text =
    typeof msg === "string"
      ? msg
      : msg?.message || "Success";
  enqueueSnackbar(text, {
    variant: "success",
    autoHideDuration: 1000,
    anchorOrigin: { horizontal: "right", vertical: "top" },
  });
};

export const handleError = (error: any) => {
  const apiMessage = error?.response?.data?.message || error?.response?.data?.error;
  const apiErrors = error?.response?.data?.errors;
  const firstFromArray = Array.isArray(apiErrors)
    ? apiErrors[0]?.msg || apiErrors[0]
    : undefined;
  const fallback =
    typeof error === "string"
      ? error
      : error?.message;
  const message = apiMessage || firstFromArray || fallback || "Something went wrong";

  enqueueSnackbar(String(message), {
    variant: "error",
    autoHideDuration: 1000,
    anchorOrigin: { horizontal: "right", vertical: "top" },
  });
};
