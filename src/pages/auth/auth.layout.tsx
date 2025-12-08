import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <div className="h-full w-full flex bg-sky-50">
      <div className="m-auto p-5 w-fit flex flex-col items-center gap-6">
        <div className="flex flex-col text-sky-500 text-3xl font-bold items-center">
          <h1>ONE</h1>
          <p className="text-3xl">Account</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
