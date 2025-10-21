import axiosInstance from "@/lib/axiosInstance";

export const updateUserProfile = async (formData) => {
  try {
    const response = await axiosInstance.put(
      "/v1/user/profile/update",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
    return error;
  }
};

// get profile
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`/v1/user/profile`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// blog api
export const getAllBlog = async (page, limit) => {
  const response = await axiosInstance.get(
    `/v1/blog?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getAllBlogSlug = async (slug) => {
  const response = await axiosInstance.get(`/v1/single-blog/${slug}`);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axiosInstance.get(`/v1/blog/${id}`);
  return response.data;
};

export const addBlug = async (blogData) => {
  const response = await axiosInstance.post(`/v1/admin/blog-create`, blogData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlug = async (blogData, id) => {
  const response = await axiosInstance.put(
    `/v1/admin/update-blog/${id}`,
    blogData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const deleteBlogById = async (id) => {
  const response = await axiosInstance.delete(`/v1/delete-blog/${id}`);
  return response.data;
};

// category
export const getAllcategory = async () => {
  const response = await axiosInstance.get(`/v1/category`);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`/v1/category/${id}`);
  return response.data;
};

export const addCategory = async (categoryData) => {
  let payload = categoryData;
  let headers = {};
  if (!(categoryData instanceof FormData)) {
    const fd = new FormData();
    Object.entries(categoryData || {}).forEach(([k, v]) => fd.append(k, v));
    payload = fd;
    headers = { "Content-Type": "multipart/form-data" };
  } else {
    headers = { "Content-Type": "multipart/form-data" };
  }
  const response = await axiosInstance.post(
    `/v1/admin/create-category`,
    payload,
    { headers }
  );
  return response.data;
};

export const updateCategory = async (categoryData, id) => {
  let payload = categoryData;
  let headers = {};
  if (!(categoryData instanceof FormData)) {
    const fd = new FormData();
    Object.entries(categoryData || {}).forEach(([k, v]) => fd.append(k, v));
    payload = fd;
    headers = { "Content-Type": "multipart/form-data" };
  } else {
    headers = { "Content-Type": "multipart/form-data" };
  }
  const response = await axiosInstance.put(
    `/v1/admin/update-category/${id}`,
    payload,
    { headers }
  );
  return response.data;
};

export const deleteCategoryById = async (id) => {
  const response = await axiosInstance.delete(
    `/v1/admin/delete-category/${id}`
  );
  return response.data;
};

// all count apis -
export const getAllCount = async () => {
  const response = await axiosInstance.get(`/v1/admin/allcount`);
  return response.data;
};

export const getAllUser = async () => {
  const response = await axiosInstance.get(`/v1/admin/alluser`);
  console.log("response", response);
  return response.data;
};

// wishlist
export const getBlogWishList = async (page, limit) => {
  const response = await axiosInstance.get(
    `/v1/user/blog-wishlist?page=${page}&limit=${limit}`
  );
  return response.data;
};
