export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  profileUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type ProfileFormState = Pick<
  UserInterface,
  | "username"
  | "githubUrl"
  | "linkedinUrl"
  | "description"
>;

export type Tab = "profile" | "settings";
