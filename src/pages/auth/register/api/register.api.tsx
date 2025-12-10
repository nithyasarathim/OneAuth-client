// services/auth.ts
import { apiRequest } from "../../../utils/api";

export const sendEmailVerification = async (email: string) => {
  const data = await apiRequest("post", "/auth/register/verify-email", {
    body: { email },
  });
  return data;
};

export const verifyOTP = async (email: string, otp: string) => {
  const data = await apiRequest("post", "/auth/register/verify-otp", {
    body: { email, otp },
  });
  return data;
};

export const createAccount = async (email: string, password: string) => {
  const data = await apiRequest("post", "/auth/register/create-account", {
    body: { email, password },
  });
  return data;
};
