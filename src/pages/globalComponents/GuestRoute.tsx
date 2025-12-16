import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/axios";

interface RouteProps{
    children: React.ReactNode;
}

const GuestRoute = ({ children }: RouteProps) => {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    let mounted = true;
    const validate = async () => {
      try {
        await api.get("/auth/session/validate");
        if (mounted) setHasSession(true);
      } catch {
        if (mounted) setHasSession(false);
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
  if (hasSession) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
