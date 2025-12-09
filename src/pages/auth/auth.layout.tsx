import React from "react";
import { UserLock } from "lucide-react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center px-4 bg-gray-50">
      <motion.div
        layout
        className="w-full mx-w-md bg-white p-6 border rounded-sm border-gray-300 flex flex-col items-center gap-4"
      >
        <UserLock className="text-sky-500" size={60} />
        <div className="flex items-center gap-2 text-3xl font-bold">
          <h1 className="text-sky-500">ONE</h1>
          <span>Account</span>
        </div>
        <motion.div layout className="w-full min-h-[300px]">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};


export default AuthLayout;