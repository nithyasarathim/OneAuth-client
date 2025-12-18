import { useState } from "react";
import Sidebar from "./components/SideBar";
import ProfileCard from "./components/ProfileCard";
import AccountSettings from "./components/AccountSettings";

const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 256;
const CONTAINER_WIDTH = "70%";

type Tab = "profile" | "settings";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="min-h-screen flex justify-center mt-2">
      <div className="relative w-[70%]">
        <Header />
        <SidebarWrapper activeTab={activeTab} setActiveTab={setActiveTab} />
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
};

const Header = () => (
  <header
    className="fixed top-0 z-30 flex items-center px-8 mt-2"
    style={{ height: HEADER_HEIGHT, width: CONTAINER_WIDTH }}
  >
    <div className="flex gap-2 text-2xl font-bold">
      <span className="text-sky-500">ONE</span>
      <span className="text-gray-900">Account</span>
    </div>
  </header>
);

const SidebarWrapper = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) => (
  <aside
    className="fixed z-20 bg-white mt-2"
    style={{
      top: HEADER_HEIGHT,
      width: SIDEBAR_WIDTH,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    }}
  >
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  </aside>
);

const MainContent = ({ activeTab }: { activeTab: Tab }) => (
  <main
    style={{
      marginTop: HEADER_HEIGHT,
      marginLeft: SIDEBAR_WIDTH,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    }}
  >
    <div className="h-[90%] overflow-y-auto scrollbar-hide">
      {activeTab === "profile" && <ProfileCard />}
      {activeTab === "settings" && <AccountSettings />}
    </div>
  </main>
);

export default ProfilePage;
