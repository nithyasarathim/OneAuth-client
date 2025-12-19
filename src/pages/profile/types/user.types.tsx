export interface UserInterface {
  user: {
    _id: string;
    email: string;
    username: string;
    department: string | null;
    role: string;
    profilePicture: string;
    skills: string[];
    linkedinUrl: string;
    githubUrl: string;
    resumeUrl: string;
    description: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
