export interface RegisterState {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
  step: number;
  isLoading: boolean;
}

export interface StepIndicatorProps {
  step: number;
}

export interface EmailVerificationProps {
  email: string;
  setEmail: (email: string) => void;
}

export interface PasswordProps {
  email: string;
  password: string;
  confirmPassword: string;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}

export interface OtpProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
}
