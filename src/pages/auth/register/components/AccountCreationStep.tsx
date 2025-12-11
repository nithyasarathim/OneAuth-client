import { motion } from "framer-motion";

const FinalStep = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-24 h-24 rounded-full bg-sky-500 flex items-center justify-center shadow-xl"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-14 h-14"
        >
          <path d="M20 6L9 17l-5-5" />
        </motion.svg>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-lg font-semibold text-gray-700 mt-6"
      >
        Account Created Successfully!
        <p className="text-sm text-center mt-5">Go to dashboard</p>
      </motion.p>
    </div>
  );
};

export default FinalStep;
