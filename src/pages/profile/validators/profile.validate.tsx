import { toast } from "react-hot-toast";
import type { ProfileFormState } from "../types/user.types";

const githubRegex =
  /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;

const linkedinRegex =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_]+\/?$/;

export const validateProfile = (form: ProfileFormState) => {
  if (!form.username.trim())
    return toast.error("Username is required");

  if (form.username.length > 25)
    return toast.error("Username must be under 25 characters");

  if (form.description.length > 500)
    return toast.error("Bio must be under 500 characters");

  if (form.githubUrl && !githubRegex.test(form.githubUrl))
    return toast.error("Invalid GitHub profile URL");

  if (form.linkedinUrl && !linkedinRegex.test(form.linkedinUrl))
    return toast.error("Invalid LinkedIn profile URL");

  if (!form.department)
    return toast.error("Department is required");

  return true;
};
