import { motion } from "framer-motion";
import OtpInput from "react-otp-input";

interface OtpProps {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
}

const smooth = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
  transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
};

const OtpStep = ({ email, otp, setOtp }: OtpProps) => (
  <motion.div key="otp" {...smooth} className="text-center space-y-7">
    <div>
      <p className="text-sm text-gray-600">We sent a code to</p>
      <p className="font-semibold text-gray-900">{email}</p>
    </div>

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
);

export default OtpStep;
