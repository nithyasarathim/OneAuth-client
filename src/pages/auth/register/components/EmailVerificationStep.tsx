import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { EmailVerificationProps } from "../types/register.types";

const smooth = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
  transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] as const },
};

const EmailStep = ({ email, setEmail }: EmailVerificationProps) => {
  const navigate = useNavigate();

  return (
    <motion.div key="email" {...smooth} className="space-y-5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="w-full px-4 py-2.5 border-b border-gray-300 focus:ring-0.5 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
      />

      <p className="text-center text-sm text-gray-600">
        Already have an account?
        <button
          type="button"
          onClick={() => navigate("/auth/login")}
          className="ml-2 font-medium text-sky-600 hover:underline cursor-pointer"
        >
          Log In
        </button>
      </p>
    </motion.div>
  );
};

export default EmailStep;
