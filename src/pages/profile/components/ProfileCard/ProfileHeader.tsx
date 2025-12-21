import type { UserInterface } from "../types/user.types";

const ProfileHeader = ({ user }: { user: UserInterface["user"] }) => {
  const status =
    typeof user.isAvailable === "boolean"
      ? user.isAvailable
        ? "Available"
        : "Unavailable"
      : "Unknown";

  return (
    <div className="space-y-2">
      <h1
        className={`text-2xl font-semibold ${
          user.username ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {user.username || "Username not set"}
      </h1>

      <p
        className={`text-sm ${
          user.department ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {user.department || "Department not specified"}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
        <span
          className={`text-sm ${
            user.email ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {user.email || "Email not available"}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === "Available"
              ? "bg-green-100 text-green-700"
              : status === "Unavailable"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
