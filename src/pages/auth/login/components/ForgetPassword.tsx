import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import OtpInput from "react-otp-input";
import { Eye, EyeOff } from "lucide-react";

import { verifyEmail, verifyOtp, resetPassword } from "../api/resetpwd.api";
import RuleChip from "./RuleChip";
import {
  getForgetPasswordRuleStatus,
  validateForgetPassword,
} from "../validators/password.validator";

const inputClass =
  "w-full px-4 pb-2 border-b border-gray-300 outline-none focus:border-sky-500 transition";

interface ForgetPasswordProps {
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const ForgetPassword = ({ onBack }: ForgetPasswordProps) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const rulesStatus = getForgetPasswordRuleStatus(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!otpSent) {
        if (!email) return toast.error("Please enter your email");

        const res = await verifyEmail(email);
        if (!res.success) return toast.error(res.message!);

        setOtpSent(true);
        return toast.success(res.message!);
      }

      if (!otpVerified) {
        if (otp.length !== 4) return toast.error("Enter a 4-digit OTP");

        const res = await verifyOtp(email, otp);
        if (!res.success) return toast.error(res.message!);

        setOtpVerified(true);
        return toast.success(res.message!);
      }

      if (!validateForgetPassword(newPassword)) {
        return toast.error("Password does not meet requirements");
      }

      if (newPassword !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      const res = await resetPassword(email, newPassword);
      if (!res.success) return toast.error(res.message!);

      toast.success(res.message!);
      onBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4 space-y-5">
      {!otpSent ? (
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      ) : (
        <div className="text-center">
          <p className="text-xs text-gray-500">Enter the code sent to</p>
          <p className="text-sm font-semibold text-sky-500">{email}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!otpVerified && otpSent && (
          <motion.div
            key="otp"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex justify-center pt-4"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{ width: "55px", height: "55px" }}
                  className="text-lg font-bold text-center border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:ring-0.5 outline-none transition"
                />
              )}
              containerStyle="justify-center gap-4"
            />
          </motion.div>
        )}

        {otpVerified && (
          <motion.div
            key="password"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex flex-wrap justify-center items-center gap-2">
                <RuleChip ok={rulesStatus.uppercase} label="Uppercase" />
                <RuleChip ok={rulesStatus.lowercase} label="Lowercase" />
                <RuleChip ok={rulesStatus.number} label="Number" />
                <RuleChip ok={rulesStatus.special} label="Special" />
                <RuleChip ok={rulesStatus.length} label="8+ chars" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={
          loading ||
          (otpVerified &&
            (!validateForgetPassword(newPassword) ||
              newPassword !== confirmPassword))
        }
        className="w-full rounded-xl bg-sky-500 py-2 text-white font-semibold disabled:opacity-60"
      >
        {!otpSent
          ? "Send Code"
          : !otpVerified
            ? "Verify OTP"
            : "Update Password"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-sm text-gray-500 hover:underline"
      >
        ← Back to login
      </button>
    </form>
  );
};

export default ForgetPassword;
