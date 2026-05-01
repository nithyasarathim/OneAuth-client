import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

import type { UserInterface, ProfileFormState } from "../types/profile.types";
import { updateProfile } from "../api/profile.api";
import { validateProfile } from "../validators/profile.validate";

import Field from "./AccountSettings/Field";
import IconInput from "./AccountSettings/IconInput";
import ChangePassword from "./AccountSettings/ChangePassword";

type Props = {
  user: UserInterface;
  onSaveProfile: (updated: UserInterface) => void;
};

const AccountSettings = ({ user, onSaveProfile }: Props) => {
  const [form, setForm] = useState<ProfileFormState>({
    username: "",
    githubUrl: "",
    linkedinUrl: "",
    description: "",
  });

  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    setForm({
      username: user.username ?? "",
      githubUrl: user.githubUrl ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
      description: user.description ?? "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "username" && value.length > 25) return;
    if (name === "description" && value.length > 500) return;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const isChanged =
    JSON.stringify(form) !==
    JSON.stringify({
      username: user.username ?? "",
      githubUrl: user.githubUrl ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
      description: user.description ?? "",
    });

  const handleSave = async () => {
    if (cooldown) return;
    if (!validateProfile(form, user)) return;

    setCooldown(true);
    try {
      const updatedUser = await updateProfile(form);
      if (updatedUser) {
        onSaveProfile(updatedUser);
      }
    } finally {
      setTimeout(() => setCooldown(false), 2000);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="max-w-6xl mx-auto px-6 py-14"
    >
      <div className="rounded-3xl bg-white/80 backdrop-blur space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Account Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Field label="Username">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />
            </Field>

            <IconInput
              icon={<Github size={16} />}
              name="githubUrl"
              value={form.githubUrl}
              onChange={handleChange}
              placeholder="GitHub profile link"
            />

            <IconInput
              icon={<Linkedin size={16} />}
              name="linkedinUrl"
              value={form.linkedinUrl}
              onChange={handleChange}
              placeholder="LinkedIn profile link"
            />
          </div>

          <div className="lg:col-span-3">
            <Field label="About You">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border px-4 py-3 resize-none"
              />
              <p className="text-xs text-gray-400">
                {form.description.length}/500
              </p>
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() =>
              setForm({
                username: user.username ?? "",
                githubUrl: user.githubUrl ?? "",
                linkedinUrl: user.linkedinUrl ?? "",
                description: user.description ?? "",
              })
            }
            className="px-6 py-2 border rounded-xl"
          >
            Undo
          </button>

          <button
            onClick={handleSave}
            disabled={!isChanged || cooldown}
            className={`px-8 py-2 rounded-xl text-white ${
              !isChanged || cooldown
                ? "bg-gray-300"
                : "bg-sky-500 hover:opacity-90"
            }`}
          >
            Update Profile
          </button>
        </div>
        <div className="w-[100%] items-center px-auto">
          <ChangePassword />
        </div>
      </div>
    </motion.section>
  );
};

export default AccountSettings;
