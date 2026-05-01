import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, KeyRound, Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { resetPassword, sendResetOtp } from "../../api/login.api";

const ForgetPassword = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailId = useId();
  const otpId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendResetOtp(email);
      if (res.success) {
        setStep(2);
        toast.success("Reset code sent to your email");
      } else {
        toast.error(res.message || "Failed to send reset code");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPassword(email, otp, newPassword);
      if (res.success) {
        toast.success("Password reset successfully");
        onBack();
      } else {
        toast.error(res.message || "Reset failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      );
    }
    if (step === 1) return "Send Reset Link";
    return "Update Password";
  };

  return (
    <div className="px-6 pb-6">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onSubmit={handleSendOtp}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor={emailId} className="text-sm font-medium text-gray-700 ml-1 cursor-pointer">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors"
                  size={18}
                />
                <input
                  id={emailId}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              {getButtonContent()}
              {!isLoading && (
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onSubmit={handleResetPassword}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label htmlFor={otpId} className="text-sm font-medium text-gray-700 ml-1 cursor-pointer">
                Verification Code
              </label>
              <input
                id={otpId}
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all text-center tracking-[0.5em] font-mono text-lg"
                maxLength={6}
                required
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor={passwordId} className="text-sm font-medium text-gray-700 ml-1 cursor-pointer">
                New Password
              </label>
              <div className="relative group">
                <KeyRound
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors"
                  size={18}
                />
                <input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor={confirmPasswordId} className="text-sm font-medium text-gray-700 ml-1 cursor-pointer">
                Confirm New Password
              </label>
              <div className="relative group">
                <KeyRound
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors"
                  size={18}
                />
                <input
                  id={confirmPasswordId}
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center"
            >
              {getButtonContent()}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 w-full text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
      >
        Back to Login
      </button>
    </div>
  );
};

export default ForgetPassword;