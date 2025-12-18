import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

type Tab = "profile" | "settings";

type SidebarProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/session/logout");
    } finally {
      navigate("/auth/login", { replace: true });
    }
  };

  return (
    <div className="w-64 px-4 py-6 h-[90%] flex flex-col justify-between">
      <div className="space-y-1">
        <SidebarItem
          icon={User}
          label="Profile"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <SidebarItem
          icon={Settings}
          label="Account Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </div>

      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition font-medium flex items-center gap-2"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

type SidebarItemProps = {
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
};

const SidebarItem = ({
  label,
  icon: Icon,
  active,
  onClick,
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition ${
        active
          ? "bg-sky-100 text-sky-700"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
};

export default Sidebar;
