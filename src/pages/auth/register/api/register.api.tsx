import api from "../../../utils/axios";
import handleApiError from "../../../utils/apiErrorHandler";
import { toast } from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  message?: string;
}

export const sendEmailVerification = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const { data } = await api.post<ApiResponse>(
      "/auth/register/verify-email",
      { email }
    );
    if (!data.success) toast.error(data.message || "Failed to verify email");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const verifyOTP = async (
  email: string,
  otp: string
): Promise<ApiResponse> => {
  try {
    const { data } = await api.post<ApiResponse>(
      "/auth/register/verify-otp",
      { email, otp }
    );
    if (!data.success) toast.error(data.message || "Invalid OTP");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createAccount = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const { data } = await api.post<ApiResponse>(
      "/auth/register/create-account",
      { email, password }
    );
    if (!data.success) toast.error(data.message || "Failed to create account");
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
