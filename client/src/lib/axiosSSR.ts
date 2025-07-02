import axios from "axios";

export const axiosSSR = (cookie: string) =>
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    withCredentials: true,
  });
