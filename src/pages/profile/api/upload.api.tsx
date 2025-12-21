import api from "../../utils/axios";

const uploadAvatar = async (image: string) => {
  const response = await api.post("/avatar/upload", {
    image,
  });
  if (!response?.data?.success) {
    return null;
  }
  return response.data;
};

const removeAvatar = async () => {
  const response = await api.delete("/avatar/remove");
  if (!response?.data?.success) return null;
  return response.data;
};

export { uploadAvatar, removeAvatar };

