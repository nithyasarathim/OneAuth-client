import api from "../../../utils/axios";
import handleApiError from "../../../utils/apiErrorHandler";
import { toast } from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  message?: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const { data } = await api.post<ApiResponse>("/auth/login", {
      email,
      password,
    });

    if (!data.success) {
      toast.error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
