import { Github, Linkedin, Pencil } from "lucide-react";
import type { UserInterface } from "../types/user.types";
import IconButton from "./IconButton";

const ProfileActions = ({
  user,
  switchToSettings,
}: {
  user: UserInterface["user"];
  switchToSettings?: () => void;
}) => {
  const openLink = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <IconButton
        icon={Github}
        label="GitHub"
        disabled={!user.githubUrl}
        onClick={() => openLink(user.githubUrl)}
      />

      <IconButton
        icon={Linkedin}
        label="LinkedIn"
        disabled={!user.linkedinUrl}
        onClick={() => openLink(user.linkedinUrl)}
      />

      <button
        disabled={!user.resumeUrl}
        onClick={() => openLink(user.resumeUrl)}
        className={`rounded-xl px-5 py-2.5 text-sm font-medium ${
          user.resumeUrl
            ? "bg-sky-500 text-white hover:bg-sky-600"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {user.resumeUrl ? "View Resume" : "Resume not uploaded"}
      </button>

      <button
        onClick={switchToSettings}
        className="rounded-full bg-white p-2 text-sky-500 shadow"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
};

export default ProfileActions;
