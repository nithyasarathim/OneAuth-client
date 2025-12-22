import api from "../../utils/axios";
import handleApiError from "../../utils/apiErrorHandler";
import toast from "react-hot-toast";

const verifyPassword = async (password: string) => {
  try {
    const response = await api.post("/password/verify", { password });
    if (!response?.data?.success) {
      toast.error("Failed to verify password");
      return { success: false };
    }
    if (!response?.data?.verified) {
      toast.error("Current password is wrong");
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    handleApiError(err);
    return { success: false };
  }
};

const changePassword = async (password: string) => {
  try {
    const response = await api.post("/password/change", { password });
    if (!response?.data?.success) {
      toast.error("Failed to update the new password");
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    handleApiError(err);
    return { success: false };
  }
};

export { changePassword, verifyPassword };
