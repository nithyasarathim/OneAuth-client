import { useState } from "react";
import Sidebar from "./components/SideBar";
import ProfileCard from "./components/ProfileCard";
import AccountSettings from "./components/AccountSettings";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");

  return (
    <div className="min-h-screen flex justify-center py-4">
      <div className="w-full max-w-6xl rounded-3xl">
        <div className="px-8 py-4">
          <div className="flex gap-2 text-2xl font-bold">
            <span className="text-sky-500">ONE</span>
            <span className="text-gray-900">Account</span>
          </div>
        </div>

        <div className="flex min-h-[550px]">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="flex-1 p-8 overflow-y-auto">
            {activeTab === "profile" && <ProfileCard />}
            {activeTab === "settings" && <AccountSettings />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
