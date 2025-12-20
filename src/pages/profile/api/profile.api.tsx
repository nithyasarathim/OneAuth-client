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
    if (!response?.data?.success) {
      toast.error("Failed to update profile");
      return null;
    }
    toast.success("Profile updated successfully");
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

export {
    getProfile,
    updateProfile
}