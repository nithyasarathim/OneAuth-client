import { motion } from "framer-motion";

const FinalStep = () => (
  <motion.div
    key="final"
    initial={{ opacity: 0, x: 60, scale: 0.96 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: -60, scale: 0.96 }}
    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
    className="text-center py-12 flex flex-col items-center justify-center"
  >
    <svg
      className="w-16 h-16 text-sky-500 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <p className="mt-6 text-base font-medium text-gray-700">Creating your account...</p>
  </motion.div>
);

export default FinalStep;
