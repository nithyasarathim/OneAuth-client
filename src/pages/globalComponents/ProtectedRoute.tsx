import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/axios";

interface RouteProps{
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: RouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const validate = async () => {
      try {
        await api.get("/auth/session/validate");
        if (mounted) setAuthorized(true);
      } catch {
        if (mounted) setAuthorized(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    validate();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;

  if (!authorized) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
