import handleApiError from "../../utils/apiErrorHandler";
import api from "../../utils/axios";
import toast from "react-hot-toast";

export const getProfile = async () => {
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