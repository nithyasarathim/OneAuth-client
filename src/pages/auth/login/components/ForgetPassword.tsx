import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import OtpInput from "react-otp-input";
import { verifyEmail, verifyOtp, resetPassword } from "../api/resetpwd.api";
import { Eye, EyeOff } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!otpSent) {
        if (!email) return toast.error("Please enter your email");

        const res = await verifyEmail(email);
        if (!res.success) return toast.error(res.message);

        setOtpSent(true);
        return toast.success(res.message);
      }

      if (!otpVerified) {
        if (otp.length !== 4) return toast.error("Enter a 4-digit OTP");

        const res = await verifyOtp(email, otp);
        if (!res.success) return toast.error(res.message);

        setOtpVerified(true);
        return toast.success(res.message);
      }

      if (!newPassword || !confirmPassword) {
        return toast.error("Please fill both password fields");
      }

      if (newPassword !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      const res = await resetPassword(email, newPassword);
      if (!res.success) return toast.error(res.message);

      toast.success(res.message);
      onBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4 space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
        className="text-center"
      >
        {!otpSent ? (
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            disabled={loading}
          />
        ) : (
          <div>
            <p className="text-gray-500 text-xs">Enter the code sent to</p>
            <p className="text-sky-500 font-semibold text-sm">{email}</p>
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!otpVerified && otpSent && (
          <motion.div
            key="otp"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="text-center mt-6"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputType="tel"
              renderInput={(props) => (
                <input
                  {...props}
                  style={{ width: 55, height: 55 }}
                  className="text-lg font-bold text-center border-2 rounded-xl border-gray-300 focus:border-sky-500 outline-none transition"
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
              }}
            />
          </motion.div>
        )}

        {otpVerified && (
          <motion.div
            key="passwords"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-5 mt-6"
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
                onClick={() => setShowNewPassword((v) => !v)}
                className="absolute right-2 top-1 text-gray-500"
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
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-2 top-1 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 font-semibold text-white bg-sky-500 rounded-xl hover:bg-sky-600 disabled:opacity-60 transition"
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
        className="w-full text-sm text-gray-600 hover:underline"
      >
        ← Back to Login
      </button>
    </form>
  );
};

export default ForgetPassword;
