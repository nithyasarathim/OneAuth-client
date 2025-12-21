import { Camera, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import AvatarUploadModal from "./AvatarUploadModal";

type Props = {
  profileUrl?: string;
  onAvatarUpdate?: (url: string) => void;
};

const ProfileAvatar = ({ profileUrl, onAvatarUpdate }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="relative w-fit mx-auto">
        {profileUrl ? (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            src={profileUrl}
            className="w-48 h-48 rounded-full object-cover border-2 p-1 border-sky-500"
          />
        ) : (
          <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
            <User className="w-40 h-40 text-gray-400" />
          </div>
        )}

        <button
          onClick={() => setModalOpen(true)}
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow text-sky-500"
        >
          <Camera size={16} />
        </button>
      </div>

      {modalOpen && (
        <AvatarUploadModal
          onClose={() => setModalOpen(false)}
          onUploaded={(url) => {
            onAvatarUpdate?.(url);
            setModalOpen(false);
          }}
          existingAvatar={profileUrl}
        />
      )}
    </>
  );
};

export default ProfileAvatar;
