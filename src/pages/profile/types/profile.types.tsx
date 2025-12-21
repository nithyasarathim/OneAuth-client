export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  department: string | null;
  role: string;
  profileUrl: string;
  skills: string[];
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProfileFormState = Pick<
  UserInterface,
  | "username"
  | "department"
  | "githubUrl"
  | "linkedinUrl"
  | "description"
  | "skills"
  | "isAvailable"
>;

export type Tab = "profile" | "settings";
