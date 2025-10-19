import axiosInstance from "@/lib/axiosInstance";

export const fetchComments = async (
  blogId: string,
  page: number = 1,
  limit: number = 10
) => {
  const { data } = await axiosInstance.get(
    `/v1/comments/${blogId}?page=${page}&limit=${limit}`
  );
  return data;
};

export const createComment = async (blogId: string, content: string) => {
  const { data } = await axiosInstance.post(`/v1/comments/${blogId}`, {
    content,
  });
  return data;
};

export const removeComment = async (commentId: string) => {
  const { data } = await axiosInstance.delete(`/v1/comments/${commentId}`);
  return data;
};
