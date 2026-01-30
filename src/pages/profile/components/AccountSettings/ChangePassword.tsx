import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Field from "./Field";
import PasswordRule from "./PasswordRule";
import {
  validatePassword,
  getPasswordRuleStatus,
} from "../../validators/password.validate";
import { verifyPassword, changePassword } from "../../api/password.api";

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const rulesStatus = getPasswordRuleStatus(newPassword);

  const handleVerifyPassword = async () => {
    if (!currentPassword || loading) return;

    setLoading(true);
    const res = await verifyPassword(currentPassword);
    setLoading(false);

    if (res.success) {
      setVerified(true);
    }
  };

  const handleChangePassword = async () => {
    if (loading) return;
    if (newPassword !== confirmPassword) return;
    if (!validatePassword(newPassword)) return;

    setLoading(true);
    const res = await changePassword(newPassword);
    setLoading(false);

    if (res.success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setVerified(false);
    }
  };

  return (
    <div className="border-t border-b border-gray-400 pt-10 pb-10">
      <h2 className="mb-8 text-center text-xl font-semibold">
        Change Password
      </h2>

      <AnimatePresence mode="wait">
        {!verified && (
          <motion.div
            key="verify"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariant}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyPassword();
              }}
              className="w-full max-w-3xl flex items-end gap-4 justify-center"
            >
              <Field label="Enter your current password">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-[300px] rounded-xl border px-4 py-3"
                />
              </Field>

              <button
                type="submit"
                disabled={!currentPassword || loading}
                className="h-[46px] mb-1 rounded-xl bg-sky-500 px-6 text-sm font-medium text-white disabled:bg-gray-300"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </motion.div>
        )}

        {verified && (
          <motion.div
            key="change"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariant}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-5">
                <Field label="New password">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                    autoFocus
                  />
                </Field>

                <Field label="Confirm new password">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </Field>

                <div className="flex justify-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={!newPassword || !confirmPassword || loading}
                    className="rounded-xl bg-sky-500 px-8 py-2.5 text-sm font-medium text-white disabled:bg-gray-300"
                  >
                    Change password
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVerified(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="rounded-xl border px-8 py-2.5 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Password must contain
                </h4>
                <PasswordRule ok={rulesStatus.length} label="At least 8 characters" />
                <PasswordRule ok={rulesStatus.uppercase} label="One uppercase letter" />
                <PasswordRule ok={rulesStatus.lowercase} label="One lowercase letter" />
                <PasswordRule ok={rulesStatus.number} label="One number" />
                <PasswordRule ok={rulesStatus.special} label="One special character" />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChangePassword;
