import { Github, Linkedin, Camera, User, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import type { UserInterface } from "../types/user.types";

type ProfileCardProps = {
  user: UserInterface["user"];
  switchToSettings?: () => void;
};

const ProfileCard = ({ user, switchToSettings }: ProfileCardProps) => {
  const hasProfilePicture = !!user.profilePicture;
  const displayUsername = user.username || "Username not set";
  const displayEmail = user.email || "Email not available";
  const displayDepartment = user.department || "Department not specified";
  const statusAvailable =
    typeof user.isAvailable === "boolean"
      ? user.isAvailable
        ? "Available"
        : "Unavailable"
      : "Status unknown";
  const skills =
    user.skills && user.skills.length > 0 ? user.skills : ["Not specified"];
  const description =
    user.description ||
    "No description added yet. Tell others about your role, experience, and interests.";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 space-y-4 text-center"
    >
      <div className="relative w-fit mx-auto">
        {hasProfilePicture ? (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            src={user.profilePicture}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover shadow-sm border-2 p-1 border-sky-500"
          />
        ) : (
          <div className="w-48 h-48 rounded-full border-2 p-1 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            <User className="w-24 h-24 text-gray-400" />
          </div>
        )}

        <button
          className="absolute bottom-4 right-4 flex items-center justify-center border rounded-full p-2 shadow-sm border-sky-300 bg-white text-sky-500 hover:shadow-md"
          aria-label="Update profile image"
        >
          <Camera size={16} />
        </button>
      </div>

      <div className="space-y-2">
        <h1
          className={`text-2xl font-semibold ${
            user.username ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {displayUsername}
        </h1>
        <p
          className={`text-sm ${
            user.department ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {displayDepartment}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          <span
            className={`text-sm ${
              user.email ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {displayEmail}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              typeof user.isAvailable === "boolean"
                ? user.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {statusAvailable}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <IconButton
          icon={Github}
          label={user.githubUrl ? "GitHub" : "No link"}
          disabled={!user.githubUrl}
        />
        <IconButton
          icon={Linkedin}
          label={user.linkedinUrl ? "LinkedIn" : "No link"}
          disabled={!user.linkedinUrl}
        />

        <button
          disabled={!user.resumeUrl}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition shadow-sm ${
            user.resumeUrl
              ? "bg-sky-500 text-white hover:bg-sky-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {user.resumeUrl ? "View Resume" : "Resume not uploaded"}
        </button>

        <div className="relative group">
          <button
            onClick={switchToSettings}
            className="inline-flex items-center gap-1 rounded-full px-2 py-2 text-sm font-medium bg-white text-sky-500 hover:bg-gray-50 shadow transition"
            aria-label="Update profile"
          >
            <Pencil size={18} />
          </button>
          <span className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-600 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
            Update profile
          </span>
        </div>
      </div>

      <section className="bg-white/60 rounded-2xl px-6 py-3 text-left">
        <h2
          className={`text-lg font-semibold mb-3 ${
            user.description ? "text-gray-900" : "text-gray-400"
          }`}
        >
          About
        </h2>
        <p
          className={`leading-relaxed ${
            user.description ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {description}
        </p>
      </section>

      <section className="bg-white rounded-2xl px-6 py-4">
        <h2
          className={`text-lg font-semibold mb-4 text-left ${
            skills[0] !== "Not specified" ? "text-gray-900" : "text-gray-400"
          }`}
        >
          Skills
        </h2>
        <div className="flex flex-wrap justify-start gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className={`rounded-full px-3 py-1 text-sm ${
                skill !== "Not specified"
                  ? "bg-sky-100 text-sky-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </motion.section>
  );
};

const IconButton = ({
  icon: Icon,
  label,
  disabled,
}: {
  icon: React.ElementType;
  label: string;
  disabled?: boolean;
}) => (
  <div className="relative group">
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl px-3 py-2 transition shadow-sm ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white/70 hover:bg-white"
      }`}
    >
      <Icon size={18} />
    </button>
    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
      {label}
    </span>
  </div>
);

export default ProfileCard;
