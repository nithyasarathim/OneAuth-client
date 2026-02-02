import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../auth.layout";
import LoginInput from "./components/LoginInput";
import { validateEmail, validatePassword } from "./validators/login.validator";
import { loginUser } from "./api/login.api";
import LoginSuccess from "./components/LoginSuccess";
import ForgetPassword from "./components/ForgetPassword";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !validateEmail(email) || !validatePassword(password))
      return;

    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      if (!res.success) {
        setIsLoading(false);
        return;
      }
      setIsSuccess(true);
      setTimeout(() => navigate(redirect), 1200);
    } catch {
      toast.error("Login failed. Try again.");
      setIsLoading(false);
    }
  };

  if (isSuccess)
    return (
      <AuthLayout>
        <LoginSuccess />
      </AuthLayout>
    );

  return (
    <AuthLayout>
      <p className="text-xl font-bold text-center text-gray-900 mb-7 mt-2 px-6">
        {showForgetPassword ? "Update Password" : "Log in to your account"}
      </p>

      {showForgetPassword ? (
        <ForgetPassword onBack={() => setShowForgetPassword(false)} />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="px-6 space-y-7 rounded-xl">
            <LoginInput
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 font-semibold text-white bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 rounded-xl flex items-center justify-center"
            >
              {!isLoading ? (
                "Log In"
              ) : (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?
            <button
              onClick={() =>
                navigate(
                  `/auth/register?redirect=${encodeURIComponent(redirect)}`,
                )
              }
              className="font-medium px-2 text-sky-600 hover:underline"
            >
              Create One!
            </button>
          </p>

          <p className="text-center mt-2 text-sm text-gray-600">
            Forget your Password?{" "}
            <button
              onClick={() => setShowForgetPassword(true)}
              className="text-sky-600 hover:underline"
            >
              Reset Password
            </button>
          </p>
        </>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
