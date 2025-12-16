import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GlobalApiWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          navigate("/auth/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  return null;
};

export default GlobalApiWatcher;
