import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  message?: string;
}

function handleApiError(error: unknown): ApiResponse {
  if (error instanceof AxiosError) {
    const msg = error.response?.data?.message || "Request failed";
    toast.error(msg);
    return { success: false, message: msg };
  }

  if ((error as Error).message === "Network Error") {
    toast.error("No internet connection");
    return { success: false, message: "No internet connection" };
  }

  toast.error("Something went wrong");
  return { success: false, message: "Something went wrong" };
}

export default handleApiError;
