import axios from "axios";

export const axiosSSR = (cookie: string) =>
  axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    withCredentials: true,
  });
