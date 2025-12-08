import React from "react";
import { UserLock } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-sky-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md border border-gray-200 flex flex-col items-center gap-4">
        <UserLock className="text-sky-500" size={60} />
        <div className="flex flex-row gap-2 text-3xl font-bold items-center">
          <h1 className="text-sky-500">ONE</h1>
          <p>Account</p>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
