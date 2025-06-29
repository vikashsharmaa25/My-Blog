export const successResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

export const errorResponse = (res, statusCode, message, error = null) => {
  console.error("Error:", error);
  res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.message : undefined,
  });
};
