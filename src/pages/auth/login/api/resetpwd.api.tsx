import api from "../../../utils/axios";
import handleApiError from "../../../utils/apiErrorHandler";
import { toast } from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  message?: string;
}

const verifyEmail = async (
  email: string,
): Promise<ApiResponse> => {
  try {
    const { data } = await api.post<ApiResponse>("/auth/password/otp", {
      email,
    });
    if (!data.success) {
      toast.error(data.message || "Email verification failed");
    }
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

const verifyOtp = async(
    email: string,
    otp: string,
): Promise<ApiResponse> => {
    try {
        const { data } = await api.post<ApiResponse>("/auth/password/otp/verify", {
            email,
            otp
        });
        if (!data.success) {
            toast.error(data.message || "Otp verification failed");
        }
        return data;
    } catch (err) {
        return handleApiError(err);
    }
}

const resetPassword = async(
    email: string,
    newPassword:string
): Promise<ApiResponse> => {
    try {
        const { data } = await api.post<ApiResponse>("/auth/password/reset", {
            email, newPassword
        });
        if (!data.success) {
            toast.error(data.message || "Password reset failed");
        }
        return data;
    } catch (err) {
        return handleApiError(err);
    }
}

export {
    verifyEmail,
    verifyOtp,
    resetPassword
}