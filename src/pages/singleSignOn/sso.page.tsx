import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserLock } from "lucide-react";
import { authorizeSSO } from "./api/sso.api";

type Status = "idle" | "loading" | "error" | "success";

const SSOAuthorizePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const clientId = params.get("client_id") || "";
  const redirectUri = params.get("redirect_uri") || "";
  const state = params.get("state") || "";

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const validateParams = (): string | null => {
    if (!clientId) return "Client ID is missing.";
    if (!redirectUri) return "Redirect URI is missing.";
    try {
      new URL(redirectUri);
    } catch {
      return "Redirect URI is not a valid URL.";
    }
    if (!state) return "State is missing.";
    return null;
  };

  useEffect(() => {
    const validationError = validateParams();
    if (validationError) {
      setStatus("error");
      setMessage(validationError);
      return;
    }

    const runSSO = async () => {
      try {
        setStatus("loading");
        setMessage("Authorizing application…");

        const res = await authorizeSSO({
          client_id: clientId,
          redirect_uri: redirectUri,
          state,
        });

        if (!res.success)
          throw new Error(res.message || "Authorization failed");

        setStatus("success");
        setMessage("Authorization granted!"+res.authCode);
        // window.location.href = `${redirectUri}?code=${res.authCode}&state=${state}`;
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.message || "SSO authorization failed");
      }
    };

    runSSO();
  }, [clientId, redirectUri, state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <UserLock size={60} className="text-sky-500 mb-4" />
      <div className="flex gap-2 text-3xl font-bold mb-8">
        <span className="text-sky-500">ONE</span>
        <span>Account</span>
      </div>

      <div className="max-w-md w-full">
        {status === "loading" && (
          <div className="text-center text-gray-600 font-medium">{message}</div>
        )}

        {status === "success" && (
          <div className="bg-sky-50 border border-sky-300 text-sky-800 p-4 rounded-lg text-center font-medium">
            {message}
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-lg text-center font-medium">
            [AUTHORIZATION FAILED] : {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SSOAuthorizePage;
