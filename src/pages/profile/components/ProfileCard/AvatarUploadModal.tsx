import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Trash2, User } from "lucide-react";
import { HqCropper } from "hq-cropper";
import toast from "react-hot-toast";
import { removeAvatar, uploadAvatar } from "../../api/upload.api";

type Props = {
  onClose: () => void;
  onUploaded: (url: string) => void;
  existingAvatar?: string;
};

type CropperInstance = ReturnType<typeof HqCropper>;

const AvatarUploadModal = ({ onClose, onUploaded, existingAvatar }: Props) => {
  const cropperRef = useRef<CropperInstance | null>(null);
  const [avatar, setAvatar] = useState(existingAvatar ?? "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (existingAvatar) {
      setAvatar(existingAvatar);
    }
  }, [existingAvatar]);

  useEffect(() => {
    if (cropperRef.current) return;

    cropperRef.current = HqCropper(
      async (base64) => {
        try {
          setUploading(true);

          const res = await uploadAvatar(base64);

          if (!res?.profileUrl) {
            throw new Error("Upload failed");
          }

          setAvatar(res.profileUrl);
          onUploaded(res.profileUrl);

          toast.success("Profile photo updated");
        } catch {
          toast.error("Avatar upload failed");
        } finally {
          setUploading(false);
        }
      },
      {
        outputSize: 256,
        portalSize: 260,
        maxFileSize: 2 * 1024 * 1024,
        allowedTypes: ["image/jpeg", "image/png", "image/webp"],
        compression: 0.9,
      },
      {
        container: ["rounded-2xl", "shadow-2xl"],
        applyButton: [
          "bg-sky-500",
          "hover:bg-sky-600",
          "text-white",
          "rounded-lg",
          "px-6",
          "py-2.5",
          "font-medium",
        ],
        cancelButton: [
          "bg-gray-100",
          "hover:bg-gray-200",
          "rounded-lg",
          "px-6",
          "py-2.5",
        ],
      },
      (error) => {
        if (!error) {
          toast.error("Image upload failed");
          return;
        }

        const message = error.toString().toLowerCase();

        if (message.includes("file size")) {
          toast.error("Image must be smaller than 2MB");
        } else if (message.includes("type")) {
          toast.error("Only JPG, PNG, or WebP images are allowed");
        } else if (message.includes("load")) {
          toast.error("Failed to load image. File may be corrupted.");
        } else {
          toast.error("Something went wrong while uploading the image");
        }
      }
    );
  }, [onUploaded]);

  const openCropper = () => cropperRef.current?.open();

  const deleteAvatar = async () => {
    try {
      setUploading(true);
      const res = await removeAvatar();
      if (!res) {
        throw new Error("Remove avatar failed");
      }
      setAvatar("");
      onUploaded("");
      toast.success("Profile photo removed");
    } catch {
      toast.error("Failed to remove profile photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="flex w-[420px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        >
          <div className="flex items-center justify-between  px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Profile photo
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-1 flex-col px-6 py-6">
            <div className="mb-8 flex justify-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="h-52 w-52 rounded-full object-cover border border-sky-500 p-2"
                />
              ) : (
                <div className="flex h-60 w-60 items-center justify-center rounded-full bg-gradient-to-br from-sky-50 to-indigo-50 ring-4 ring-sky-100">
                  <User className="h-20 w-20 text-sky-400" />
                </div>
              )}
            </div>

            <div className="mt-auto flex items-center text-center justify-between gap-3">
              <button
                onClick={openCropper}
                disabled={uploading}
                className="relative flex w-full items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
              >
                <Upload size={18} className="absolute left-6" />
                {uploading
                  ? "Uploading..."
                  : avatar
                  ? "Replace photo"
                  : "Upload photo"}
              </button>
              <button
                onClick={deleteAvatar}
                disabled={!avatar || uploading}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                  avatar
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              JPG, PNG or WebP · Up to 2MB
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AvatarUploadModal;
