import { useEffect, useMemo, useState } from "react";
import type { UserInterface, ProfileFormState } from "../types/profile.types";
import { updateProfile } from "../api/profile.api";
import { validateProfile } from "../validators/profile.validate";
import type { MultiValue } from "react-select";

export const useAccountSettingsForm = (
  user: UserInterface,
  onSaveProfile: (updated: ProfileFormState) => void
) => {
  const [form, setForm] = useState<ProfileFormState>({
    username: "",
    department: "",
    githubUrl: "",
    linkedinUrl: "",
    description: "",
    skills: [],
    isAvailable: false,
  });

  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    setForm({
      username: user.username ?? "",
      department: user.department ?? "",
      githubUrl: user.githubUrl ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
      description: user.description ?? "",
      skills: user.skills ?? [],
      isAvailable: user.isAvailable ?? false,
    });
  }, [user]);

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

  const handleSkillsChange = (
    selected: MultiValue<{ label: string; value: string }>
  ) => {
    setForm((p) => ({
      ...p,
      skills: selected.map((s) => s.value),
    }));
  };

  const isChanged = useMemo(() => {
    return (
      JSON.stringify(form) !==
      JSON.stringify({
        username: user.username ?? "",
        department: user.department ?? "",
        githubUrl: user.githubUrl ?? "",
        linkedinUrl: user.linkedinUrl ?? "",
        description: user.description ?? "",
        skills: user.skills ?? [],
        isAvailable: user.isAvailable ?? false,
      })
    );
  }, [form, user]);

  const reset = () => {
    setForm({
      username: user.username ?? "",
      department: user.department ?? "",
      githubUrl: user.githubUrl ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
      description: user.description ?? "",
      skills: user.skills ?? [],
      isAvailable: user.isAvailable ?? false,
    });
  };

  const save = async () => {
    if (cooldown) return;
    if (!validateProfile(form, user)) return;

    setCooldown(true);
    try {
      const res = await updateProfile(form);
      if (res?.success) {
        onSaveProfile(form);
      }
    } finally {
      setTimeout(() => setCooldown(false), 2000);
    }
  };

  return {
    form,
    setForm,
    cooldown,
    isChanged,
    handleChange,
    handleSkillsChange,
    reset,
    save,
  };
};
