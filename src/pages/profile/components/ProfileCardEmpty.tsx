import { Github, Linkedin, Camera, User } from "lucide-react";
import { motion } from "framer-motion";

const ProfileCardEmpty = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 space-y-4 text-center"
    >
      <div className="relative w-fit mx-auto">
        <div className="w-50 h-50 rounded-full border-2 p-1 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
          <User className="w-30 h-30 text-gray-400" />
        </div>

        <button
          className="absolute bottom-4 right-4 flex items-center justify-center border border-gray-300 rounded-full bg-white p-2 text-gray-400 "
          aria-label="Update profile image"
          disabled
        >
          <Camera size={16} />
        </button>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-400">
          Username not set
        </h1>

        <p className="text-sm text-gray-400">Department not specified</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          <span className="text-sm text-gray-400">Email not available</span>

          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            Status unknown
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <MutedIconButton icon={Github} label="GitHub not linked" />
        <MutedIconButton icon={Linkedin} label="LinkedIn not linked" />

        <button
          disabled
          className="inline-flex items-center gap-2 rounded-xl bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-500 cursor-not-allowed"
        >
          Resume not uploaded
        </button>
      </div>

      <section className="bg-white/60 rounded-2xl px-6 py-3 text-left">
        <h2 className="text-lg font-semibold text-gray-400 mb-3">About</h2>

        <p className="leading-relaxed text-gray-400">
          No description added yet. Tell others about your role, experience, and
          interests.
        </p>
      </section>

      <section className="bg-white rounded-2xl px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-400 mb-4 text-left">
          Skills
        </h2>

        <div className="flex flex-wrap justify-start gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full bg-gray-100 text-gray-400 text-sm px-3 py-1"
            >
              Not specified
            </span>
          ))}
        </div>
      </section>
    </motion.section>
  );
};

const MutedIconButton = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <div className="relative group">
      <button
        disabled
        className="inline-flex items-center justify-center rounded-xl bg-gray-100 px-3 py-2 text-gray-400 cursor-not-allowed"
      >
        <Icon size={18} />
      </button>

      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </div>
  );
};

export default ProfileCardEmpty;
