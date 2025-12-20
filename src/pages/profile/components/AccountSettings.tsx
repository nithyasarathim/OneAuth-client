import { useState } from "react";
import Select from "react-select";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

import type { UserInterface, ProfileFormState } from "../types/profile.types";
import departments from "../constants/departments";
import { skillsOptions } from "../constants/skills";

import Field from "./fields/Field";
import IconInput from "./fields/IconInput";
import ResumeUpload from "./fields/ResumeUpload";
import { useAccountSettingsForm } from "../hooks/useAccountSettingsForm";

type Props = {
  user: UserInterface;
  onSaveProfile: (updated: ProfileFormState) => void;
};

const AccountSettings = ({ user, onSaveProfile }: Props) => {
  const [resume, setResume] = useState<File | null>(null);

  const {
    form,
    setForm,
    cooldown,
    isChanged,
    handleChange,
    handleSkillsChange,
    reset,
    save,
  } = useAccountSettingsForm(user, onSaveProfile);

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
          <button
            onClick={() =>
              setForm((p) => ({ ...p, isAvailable: !p.isAvailable }))
            }
            className={`w-14 h-7 rounded-full relative ${
              form.isAvailable ? "bg-sky-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition ${
                form.isAvailable ? "translate-x-7" : ""
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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

            <Field label="Skills">
              <Select
                isMulti
                options={skillsOptions}
                value={skillsOptions.filter((s) =>
                  form.skills.includes(s.value)
                )}
                onChange={handleSkillsChange}
              />
            </Field>
          </div>

          <div className="space-y-6">
            <Field label="Department">
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <ResumeUpload resume={resume} setResume={setResume} />
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
            onClick={reset}
            className="px-6 py-2 border rounded-xl"
          >
            Undo
          </button>

          <button
            onClick={save}
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
      </div>
    </motion.section>
  );
};

export default AccountSettings;
