import { motion } from "framer-motion";

const StepIndicator = ({ step }: { step: number }) => {
  const totalSteps = 4;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative mb-12 px-6 mt-4">
      <div className="absolute top-4.5 left-6 right-6 h-0.5 bg-gray-300" />

      <motion.div
        className="absolute top-4.5 left-6 h-0.5 bg-sky-500 origin-left"
        style={{ width: "calc(90% - 1.5rem)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      />

      <div className="relative flex justify-between">
        {[1, 2, 3, 4].map((num) => {
          const isActive = step === num;
          const isCompleted = step > num && num !== 4;

          return (
            <motion.div
              key={num}
              layout
              className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold mt-1 z-10 ${
                isCompleted
                  ? "bg-sky-500 text-white shadow-md"
                  : isActive
                  ? "bg-sky-500 text-white ring-2 ring-sky-100 shadow-lg"
                  : "bg-white text-gray-400 border-2 border-gray-300"
              }`}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {isCompleted ? (
                <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                num
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
