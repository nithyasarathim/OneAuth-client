import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import AuthLayout from "../auth.layout";

import StepIndicator from "./components/StepIndicator";
import EmailStep from "./components/EmailVerificationStep";
import OtpStep from "./components/OtpVerificationStep";
import PasswordStep from "./components/PasswordStep";
import FinalStep from "./components/AccountCreationStep";

import {
  validateEmail,
  validateOTP,
  validatePassword,
} from "./validators/register.validator";
import {
  sendEmailVerification,
  verifyOTP,
  createAccount,
} from "./api/register.api";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const next = async () => {
    if (step === 1 && !validateEmail(email))
      return toast.error("Enter a valid email");
    if (step === 2 && !validateOTP(otp))
      return toast.error("Enter all 4 digits");
    if (step === 3 && !validatePassword(password, confirmPassword))
      return toast.error("Invalid password");

    setIsLoading(true);
      if (step === 1) {
        const res = await sendEmailVerification(email);
        if (!res.success)
          throw new Error(res.message || "Failed to verify email");
      }

      if (step === 2) {
        const res = await verifyOTP(email, otp);
        if (!res.success) throw new Error(res.message || "Invalid OTP");
      }

      if (step === 3) {
        const res = await createAccount(email, password);
        if (!res.success)
          throw new Error(res.message || "Failed to create account");
      }

      if (step === 3) {
        setStep(4);
        await new Promise((r) => setTimeout(r, 2000));
        toast.success("Account created!");
        return;
      }
      setStep(step + 1);
  };

  return (
    <AuthLayout>
      <StepIndicator step={step} />

      <p className="text-xl font-bold text-center text-gray-900 mb-8 px-6">
        {step === 4 ? "Finalizing your account..." : "Create your account"}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="px-6 space-y-7"
      >
        <AnimatePresence mode="wait">
          {step === 1 && <EmailStep email={email} setEmail={setEmail} />}
          {step === 2 && <OtpStep email={email} otp={otp} setOtp={setOtp} />}
          {step === 3 && (
            <PasswordStep
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
            />
          )}
          {step === 4 && <FinalStep />}
        </AnimatePresence>

        {step < 4 && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 font-semibold text-white bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            {!isLoading ? (
              <>
                {step === 1 && "Verify Email"}
                {step === 2 && "Verify Code"}
                {step === 3 && "Create Account"}
              </>
            ) : (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
          </button>
        )}
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
