import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../auth.layout";
import LoginInput from "./components/LoginInput";
import { validateEmail, validatePassword } from "./validators/login.validator";
import { loginUser } from "./api/login.api";
import LoginSuccess from "./components/LoginSuccess";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginUser(email, password);

      if (!res.success) {
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch {
      toast.error("Login failed. Try again.");
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <LoginSuccess />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <p className="text-xl font-bold text-center text-gray-900 mb-8 mt-2 px-6">
        Log in to your account
      </p>

      <form onSubmit={handleSubmit} className="px-6 space-y-7">
        <LoginInput
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 font-semibold text-white bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
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
        <span
          className="font-medium px-2 text-sky-600 cursor-pointer hover:underline"
          onClick={() => navigate("/auth/register")}
        >
          Create One!
        </span>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
