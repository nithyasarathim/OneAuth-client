import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface LoginInputProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

const smooth = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
  transition: {
    duration: 0.4,
    ease: [0.25, 0.8, 0.25, 1] as const,
  },
};

const LoginInput = ({
  email,
  password,
  setEmail,
  setPassword,
}: LoginInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div key="login-input" {...smooth} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
        className="w-full px-4 py-1.5 border-b border-gray-300 focus:ring-0.5 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-1.5 pr-10 border-b border-gray-300 focus:ring-0.5 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </motion.div>
  );
};

export default LoginInput;
