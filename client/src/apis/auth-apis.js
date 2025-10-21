import axiosInstance from "@/lib/axiosInstance";

export const userRegister = async (formData) => {
  const formDataObject = new FormData();
  formDataObject.append("username", formData.username);
  formDataObject.append("fullName", formData.fullName);
  formDataObject.append("email", formData.email);
  formDataObject.append("mobile", formData.mobile);
  formDataObject.append("password", formData.password);
  formDataObject.append("profilePic", formData.profileImage);

  const response = await axiosInstance.post(
    "/v1/user/register",
    formDataObject,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );

  return response.data;
};

export const loginUser = async (identifier, password) => {
  const response = await axiosInstance.post("/v1/user/login", {
    identifier,
    password,
  });
  return response.data;
};
