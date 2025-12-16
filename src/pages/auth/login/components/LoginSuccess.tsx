import { motion } from "framer-motion";

const LoginSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg viewBox="0 0 64 64" className="w-24 h-24">
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.path
          d="M20 34l8 8 16-18"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
      </svg>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-lg font-semibold text-gray-700 mt-6"
      >
        Login successful
      </motion.p>

      <p className="text-sm text-gray-500 mt-1">Redirecting you now…</p>
    </div>
  );
};

export default LoginSuccess;
