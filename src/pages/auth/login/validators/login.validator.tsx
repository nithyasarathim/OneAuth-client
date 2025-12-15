import toast from "react-hot-toast";

const validateEmail = (email: string): boolean => {
  if (!email) {
    toast.error("Email cannot be empty");
    return false;
  }

  const safeEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!safeEmailRegex.test(email)) {
    toast.error("Enter a valid email");
    return false;
  }

  return true;
};

const validatePassword = (password: string): boolean => {
  if (!password) {
    toast.error("Password cannot be empty");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};

export { validateEmail, validatePassword };
