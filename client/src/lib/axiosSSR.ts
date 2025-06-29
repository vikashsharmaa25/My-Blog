import axios from "axios";

export const axiosSSR = (cookie: string) =>
  axios.create({
    baseURL: "https://my-blog-1jl4.vercel.app/api",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    withCredentials: true,
  });
