import { toast } from "react-hot-toast";
import type { ProfileFormState, UserInterface } from "../types/profile.types";

const githubRegex =
  /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;

const linkedinRegex =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_]+\/?$/;

export const validateProfile = (
  form: ProfileFormState,
  originalUser?: UserInterface
) => {
  if (!form.username.trim()) {
    toast.error("Username is required");
    return false;
  }

  if (form.username.length > 25) {
    toast.error("Username must be under 25 characters");
    return false;
  }

  if (!form.department) {
    toast.error("Department shouldn't be empty");
    return false;
  }

  if (form.description.length > 500) {
    toast.error("Bio must be under 500 characters");
    return false;
  }

  if (form.githubUrl && !githubRegex.test(form.githubUrl)) {
    toast.error("Invalid GitHub profile URL");
    return false;
  }

  if (form.linkedinUrl && !linkedinRegex.test(form.linkedinUrl)) {
    toast.error("Invalid LinkedIn profile URL");
    return false;
  }

  if (originalUser) {
    const keys: (keyof ProfileFormState)[] = [
      "username",
      "department",
      "githubUrl",
      "linkedinUrl",
      "description",
      "isAvailable",
    ];

    const hasChanged =
      keys.some((key) => form[key] !== originalUser[key]) ||
      form.skills.length !== originalUser.skills.length ||
      !form.skills.every((s) => originalUser.skills.includes(s));

    if (!hasChanged) {
      toast.error("No changes detected");
      return false;
    }
  }

  return true;
};
