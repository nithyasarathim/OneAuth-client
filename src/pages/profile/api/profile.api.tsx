import handleApiError from "../../utils/apiErrorHandler";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import type { AxiosResponse } from "axios";
import type { ProfileFormState, UserInterface } from "../types/profile.types";

type ProfileResponse = {
  success: boolean;
  user: UserInterface;
};

const getProfile = async (): Promise<AxiosResponse<ProfileResponse> | null> => {
  try {
    const response = await api.get<ProfileResponse>("/users/me");
    if (!response) {
      toast.error("User profile not found");
    }
    return response;
  } catch (err) {
    handleApiError(err);
    return null;
  }
};

const updateProfile = async (
  updatedUser: ProfileFormState
): Promise<UserInterface | null> => {
  try {
    const response = await api.patch<ProfileResponse>("/users/me", updatedUser);
    if (!response?.data?.success || !response.data.user) {
      toast.error("Failed to update profile");
      return null;
    }
    toast.success("Profile updated successfully");
    return response.data.user;
  } catch (err) {
    handleApiError(err);
    return null;
  }
};


export { getProfile, updateProfile};
