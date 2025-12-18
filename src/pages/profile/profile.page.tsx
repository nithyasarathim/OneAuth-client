import { useState } from "react";
import Sidebar from "./components/SideBar";
import ProfileCard from "./components/ProfileCard";
import AccountSettings from "./components/AccountSettings";

type Tab = "profile" | "settings";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="min-h-screen flex justify-center mt-2">
      <div className="relative w-[70%]">
        <header
          className="fixed top-0 z-30 flex items-center px-8 mt-2 cursor-pointer select-none"
          style={{ height: 64, width: "70%" }}
        >
          <div className="flex gap-2 text-2xl font-bold">
            <span className="text-sky-500">ONE</span>
            <span className="text-gray-900">Account</span>
          </div>
        </header>

        <aside
          className="fixed z-20 bg-white mt-2"
          style={{
            top: 64,
            width: 256,
            height: "calc(100vh - 64px)",
          }}
        >
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        <main
          style={{
            marginTop: 64,
            marginLeft: 256,
            height: "calc(100vh - 64px)",
          }}
        >
          <div className="h-[90%] overflow-y-auto scrollbar-hide">
            {activeTab === "profile" && <ProfileCard />}
            {activeTab === "settings" && <AccountSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
