import api from "../../utils/axios";
import handleApiError from "../../utils/apiErrorHandler";
import toast from "react-hot-toast";

const verifyPassword = async (password: string) => {
  try {
    const res = await api.post("/password/verify", { password });

    if (!res?.data?.success) {
      toast.error("Verification failed");
      return { success: false };
    }

    if (!res?.data?.verified) {
      toast.error("Current password is incorrect");
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
    const res = await api.post("/password/change", { password });

    if (!res?.data?.success) {
      toast.error("Failed to update password");
      return { success: false };
    }

    toast.success("Password changed successfully");
    return { success: true };
  } catch (err) {
    handleApiError(err);
    return { success: false };
  }
};

export { verifyPassword, changePassword };
