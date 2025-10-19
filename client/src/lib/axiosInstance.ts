import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Exclude login/register routes from refresh logic
    const isAuthRoute =
      originalRequest.url.includes("/v1/user/login") ||
      originalRequest.url.includes("/v1/user/register") ||
      originalRequest.url.includes("/v1/user/refresh-token");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.data?.success) {
          processQueue(null, null);
          return axiosInstance(originalRequest);
        }

        const err = new Error("Refresh token failed");
        processQueue(err, null);
        return Promise.reject(err);
      } catch (err: any) {
        processQueue(err, null);
        try {
          if (
            err?.response?.status === 401 ||
            err?.response?.status === 403
          ) {
            if (typeof window !== "undefined") {
              window.location.assign("/login");
            }
          }
        } catch (_) {}
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
