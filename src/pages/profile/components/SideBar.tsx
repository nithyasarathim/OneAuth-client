import { User, Settings, LogOut } from "lucide-react";

type SidebarProps = {
  activeTab: "profile" | "settings";
  setActiveTab: (tab: "profile" | "settings") => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 px-4 py-6 h-[550px] flex flex-col justify-between">
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

      <button className="w-full text-left px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition font-medium flex items-center gap-2">
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}

function SidebarItem({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-xl transition font-medium flex items-center gap-2 ${
        active
          ? "bg-sky-100 text-sky-700"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
