import axiosInstance from "../configs";

export const getCategories = async () => {
  const response = await axiosInstance("/api/categories");
  return response;
};
