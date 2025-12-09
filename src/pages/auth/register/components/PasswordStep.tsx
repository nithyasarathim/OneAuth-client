import { motion } from "framer-motion";

interface PasswordInterface {
  email: string;
  password: string;
  confirmPassword: string;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}

const smooth = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
  transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
};

const PasswordStep = ({
  email,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}: PasswordInterface) => (
  <motion.div key="password" {...smooth} className="space-y-6">
    <div className="text-center mb-10">
      <p className="text-sm text-gray-600">Choose a password for</p>
      <p className="font-semibold text-gray-900">{email}</p>
    </div>

    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Create password"
      required
      className="w-full px-4 py-1.5 border-b border-gray-300 focus:ring-0.5 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
    />

    <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm password"
      required
      className="w-full px-4 py-1.5 border-b border-gray-300 focus:ring-0.5 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
    />
  </motion.div>
);

export default PasswordStep;
