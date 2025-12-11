import toast from "react-hot-toast";

export const validateEmail = (email: string) => {
  if (!email) {
    toast.error("Email cannot be empty");
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Enter a valid email");
    return false;
  }
  return true;
};

export const validateOTP = (otp: string) => {
  if (!otp) {
    toast.error("OTP cannot be empty");
    return false;
  }
  if (otp.length !== 4) {
    toast.error("Enter all 4 digits of OTP");
    return false;
  }
  return true;
};

export const validatePassword = (password: string, confirmPassword: string) => {
  if (!password) {
    toast.error("Password cannot be empty");
    return false;
  }
  if (password.length <= 6) {
    toast.error("Password must be longer than 6 characters");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  return true;
};
