import handleApiError from "../../utils/apiErrorHandler";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import type { ProfileFormState } from "../types/profile.types";

const getProfile = async () => {
  try {
    const response = await api.get("/users/me");
    if (!response) {
      toast.error("User profile not found");
    }
    return response;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateProfile = async (updatedUser: ProfileFormState) => {
  try {
    const response = await api.patch("/users/me", updatedUser);
    if (!response?.data?.success || !response.data.user) {
      toast.error("Failed to update profile");
      return null;
    }
    toast.success("Profile updated successfully");
    return response.data.user;
  } catch (err) {
    return handleApiError(err);
  }
};

const verifyPassword = async (password: string) => {
  try {
    const response = await api.post("/users/verify-pwd", password);
    if (!response?.data?.success) {
      toast.error("Failed to verify password");
      return null;
    }
    if (!response?.data?.verified) {
      toast.error("Current password is wrong");
      return null;
    }
  } catch (err) {
    return handleApiError(err);
  }
};

const changePassword = async (password: string) => {
  try {
    const response = await api.post("/users/change-pwd", password);
    if (!response?.data?.success) {
      toast.error("Failed to update the new password");
      return null;
    }
    toast.success("Password has been updated successfully !");
  } catch (err) {
    return handleApiError(err);
  }
};

export { getProfile, updateProfile, verifyPassword, changePassword };
