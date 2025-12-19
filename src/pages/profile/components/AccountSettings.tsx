import { useMemo, useState } from "react";
import Select from "react-select";
import { Github, Linkedin } from "lucide-react";

import type { UserInterface } from "../types/profile.types";
import type { ProfileFormState } from "../types/profile.types";

import departments from "../constants/departments";
import { skillsOptions } from "../constants/skills";
import { validateProfile } from "../validators/profile.validate";

import Field from "./fields/Field";
import IconInput from "./fields/IconInput";
import ResumeUpload from "./fields/ResumeUpload";

type AccountSettingsProps = {
  user?: UserInterface;
  onSaveProfile?: (updatedUser: ProfileFormState) => void;
  onUpdateResume?: (resume: File) => void;
};

const AccountSettings = ({
  user,
  onSaveProfile,
  onUpdateResume,
}: AccountSettingsProps) => {
  const [form, setForm] = useState<ProfileFormState>({
    username: user?.username ?? "",
    department: user?.department ?? "",
    githubUrl: user?.githubUrl ?? "",
    linkedinUrl: user?.linkedinUrl ?? "",
    description: user?.description ?? "",
    skills: user?.skills ?? [],
    isAvailable: user?.isAvailable ?? false,
  });

  const [resume, setResume] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "username" && value.length > 25) return;
    if (name === "description" && value.length > 500) return;

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSkillsChange = (selected: any) => {
    setForm((p) => ({
      ...p,
      skills: selected.map((s: any) => s.value),
    }));
  };

  const isChanged = useMemo(() => {
    if (!user) return false;

    const keys: (keyof ProfileFormState)[] = [
      "username",
      "department",
      "githubUrl",
      "linkedinUrl",
      "description",
      "isAvailable",
    ];

    for (const key of keys) {
      if (form[key] !== user[key]) return true;
    }

    if (
      form.skills.length !== user.skills.length ||
      !form.skills.every((s) => user.skills.includes(s))
    )
      return true;

    return false;
  }, [form, user]);

  const handleSave = () => {
    if (validateProfile(form)) {
      onSaveProfile?.(form);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <div className="rounded-3xl bg-white/80 backdrop-blur border border-gray-200 shadow-xl shadow-gray-100 p-10 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">
            Account Settings
          </h1>

          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-medium ${
                form.isAvailable ? "text-sky-500" : "text-gray-500"
              }`}
            >
              {form.isAvailable
                ? "Available for Teams"
                : "Not Available for Teams"}
            </span>

            <button
              onClick={() =>
                setForm((p) => ({
                  ...p,
                  isAvailable: !p.isAvailable,
                }))
              }
              className={`relative w-14 h-7 rounded-full transition-colors ${
                form.isAvailable ? "bg-sky-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                  form.isAvailable ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-6">
            <Field label="Username">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
              />
            </Field>

            <IconInput
              icon={<Github size={16} />}
              name="githubUrl"
              value={form.githubUrl}
              placeholder="GitHub profile link"
              onChange={handleChange}
            />

            <IconInput
              icon={<Linkedin size={16} />}
              name="linkedinUrl"
              value={form.linkedinUrl}
              placeholder="LinkedIn profile link"
              onChange={handleChange}
            />

            <Field label="Skills">
              <Select
                isMulti
                options={skillsOptions}
                value={skillsOptions.filter((s) =>
                  form.skills.includes(s.value)
                )}
                onChange={handleSkillsChange}
                className="text-sm"
                placeholder="Select your skills"
              />
            </Field>
          </div>

          <div className="space-y-6">
            <Field label="Department">
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <ResumeUpload
              resume={resume}
              setResume={setResume}
              onUpload={onUpdateResume}
            />
          </div>

          <div className="lg:col-span-3">
            <Field label="About You">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Write a short bio about yourself..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.description.length}/500
              </p>
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-1">
          <button className="px-6 py-2 rounded-xl border text-gray-600 hover:bg-gray-50 transition">
            Undo Changes
          </button>

          <button
            onClick={handleSave}
            disabled={!isChanged}
            className={`px-8 py-2 rounded-xl text-white font-medium bg-sky-500 ${
              !isChanged ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            } transition`}
          >
            Update Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
