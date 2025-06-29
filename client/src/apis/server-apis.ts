import { axiosSSR } from "@/lib/axiosSSR";
import { cookiesAccessToken } from "@/utils/get-cookies";

export async function fetchAllUsers() {
  const accessToken = await cookiesAccessToken();
  const response = await axiosSSR(`accessToken=${accessToken}`).get(
    "/v1/admin/alluser"
  );
  return response.data;
}

export async function fetchAllCount() {
  const accessToken = await cookiesAccessToken();
  const response = await axiosSSR(`accessToken=${accessToken}`).get(
    "/v1/admin/allcount"
  );
  return response.data;
}

export const getBlogWishList = async (page: any, limit: any) => {
  const accessToken = await cookiesAccessToken();
  const response = await axiosSSR(`accessToken=${accessToken}`).get(
    `/v1/user/blog-wishlist?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const addToWishlist = async (blogId: string) => {
  const accessToken = await cookiesAccessToken();
  const response = await axiosSSR(`accessToken=${accessToken}`).post(
    `/v1/user/add-wishlist/${blogId}`
  );
  return response.data;
};

export const removeFromWishlist = async (blogId: string) => {
  const accessToken = await cookiesAccessToken();
  const response = await axiosSSR(`accessToken=${accessToken}`).delete(
    `/v1/user/remove-wishlist/${blogId}`
  );
  return response.data;
};
