import React from "react";
import { UserLock } from "lucide-react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayoutWave = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white px-4">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(135deg,#e0f2fe,#f8fbff,#e0f2fe)",
          backgroundSize: "200% 200%",
        }}
      />

      <motion.svg
        viewBox="0 0 4000 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute"
        style={{
          width: "400vw",
          height: "130vh",
          left: "-150vw",
          top: "-15vh",
        }}
        animate={{ x: "-33.333%" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,450 C400,650 800,250 1200,350 1600,450 2000,650 2400,500 2800,350 3200,600 3600,500 4000,420 4400,600 4800,500 L4800,900 L0,900 Z"
          fill="rgba(56,189,248,0.24)"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 4000 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute"
        style={{
          width: "420vw",
          height: "140vh",
          left: "-160vw",
          top: "-20vh",
        }}
        animate={{ x: "33.333%" }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,480 C500,700 1000,380 1500,440 2000,500 2500,720 3000,560 3500,420 4000,740 4500,560 5000,440 5400,700 5800,560 L5800,900 L0,900 Z"
          fill="rgba(125,211,252,0.18)"
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-md  border-1 bg-white/50 rounded-2xl px-3 py-10 backdrop-blur-xl shadow-xs border-sky-300 flex flex-col items-center gap-4"
      >
        <UserLock size={60} className="text-sky-500" />
        <div className="flex gap-2 text-3xl font-bold">
          <span className="text-sky-500">ONE</span>
          <span>Account</span>
        </div>
        <p className="text-gray-900 text-sm">
          Sign In Once. Work Everywhere
        </p>
        <div className="w-full min-h-fit pt-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default AuthLayoutWave;
