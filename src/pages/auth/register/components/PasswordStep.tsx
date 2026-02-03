import { motion } from "framer-motion";
import type { PasswordProps } from "../types/register.types";
import RuleChip from "./RuleChip";
import { getPasswordRuleStatus } from "../validators/password.validator";

const smooth = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
};

const PasswordStep = ({
  email,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}: PasswordProps) => {
  const rulesStatus = getPasswordRuleStatus(password);

  return (
    <motion.div key="password" {...smooth} className="space-y-4">
      <div className="text-center">
        <p className="text-xs text-gray-600">Choose a password for</p>
        <p className="font-semibold text-gray-900 text-sm text-sky-500">{email}</p>
      </div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create password"
        required
        className="w-full px-4 border-b border-gray-300 py-1.5 focus:ring-0.5 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        required
        className="w-full px-4 border-b border-gray-300 py-1.5 focus:ring-0.5 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
      />

      <div className="pt-2">
        <p className="text-xs font-medium text-gray-500 mb-2 text-center">
          Password must contain
        </p>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <RuleChip ok={rulesStatus.uppercase} label="Uppercase" />
          <RuleChip ok={rulesStatus.lowercase} label="Lowercase" />
          <RuleChip ok={rulesStatus.number} label="Number" />
          <RuleChip ok={rulesStatus.special} label="Special" />
          <RuleChip ok={rulesStatus.length} label="8+ chars" />
        </div>
      </div>
    </motion.div>
  );
};

export default PasswordStep;
