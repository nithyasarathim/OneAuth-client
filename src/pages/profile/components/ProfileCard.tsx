import { motion } from "framer-motion";
import type { UserInterface } from "../types/profile.types";

import ProfileAvatar from "./ProfileCard/ProfileAvatar";
import ProfileHeader from "./ProfileCard/ProfileHeader";
import ProfileActions from "./ProfileCard/ProfileActions";
import ProfileAbout from "./ProfileCard/ProfileAbout";
import ProfileSkills from "./ProfileCard/ProfileSkills";

type Props = {
  user: UserInterface;
  switchToSettings?: () => void;
  onAvatarUpdate: (url: string) => void;
};

const ProfileCard = ({ user, switchToSettings, onAvatarUpdate }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-4 space-y-4 text-center"
    >
      <ProfileAvatar
        profileUrl={user.profileUrl}
        onAvatarUpdate={onAvatarUpdate}
      />

      <ProfileHeader user={user} />
      <ProfileActions user={user} switchToSettings={switchToSettings} />
      <ProfileAbout description={user.description} />
      <ProfileSkills skills={user.skills} />
    </motion.section>
  );
};

export default ProfileCard;
