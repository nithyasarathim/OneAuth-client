import { motion } from "framer-motion";

const Shimmer = ({ className }: { className: string }) => (
  <div
    className={`relative overflow-hidden bg-gray-200 rounded-inherit ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
  </div>
);

const ProfileCardShimmer = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 space-y-4 text-center"
    >
      <div className="relative w-fit mx-auto">
        <div className="w-50 h-50 rounded-full ">
          <Shimmer className="w-full h-full rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Shimmer className="h-6 w-40 mx-auto rounded-md" />
        <Shimmer className="h-4 w-52 mx-auto rounded-md" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          <Shimmer className="h-4 w-40 rounded-md" />
          <Shimmer className="h-6 w-24 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Shimmer className="w-10 h-10 rounded-xl" />
        <Shimmer className="w-10 h-10 rounded-xl" />
        <Shimmer className="w-32 h-10 rounded-xl" />
      </div>

      <section className="bg-white/60 rounded-2xl px-6 py-3 text-left space-y-3">
        <Shimmer className="h-5 w-24 rounded-md" />
        <Shimmer className="h-4 w-full rounded-md" />
        <Shimmer className="h-4 w-[95%] rounded-md" />
        <Shimmer className="h-4 w-[85%] rounded-md" />
      </section>

      <section className="bg-white rounded-2xl px-6 py-4 space-y-4">
        <Shimmer className="h-5 w-20 rounded-md" />
        <div className="flex flex-wrap justify-start gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Shimmer key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </section>
    </motion.section>
  );
};

export default ProfileCardShimmer;
