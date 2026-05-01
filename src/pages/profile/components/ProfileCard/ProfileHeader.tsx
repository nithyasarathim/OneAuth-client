import type { UserInterface } from "../../types/profile.types";

const ProfileHeader = ({ user }: { user: UserInterface }) => {
  return (
    <div className="space-y-2">
      <h1
        className={`text-2xl font-semibold ${
          user.username ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {user.username || "Username not set"}
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
        <span
          className={`text-sm ${
            user.email ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {user.email || "Email not available"}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
