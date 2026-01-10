// components/settings/settings-page-toolbar.tsx
"use client";

import { FaKey, FaUsers } from "react-icons/fa";

type SettingsPageToolBarProps = {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const SettingsPageToolBar = ({ view, setView }: SettingsPageToolBarProps) => {
  return (
    <div className="h-auto w-full p-2 sticky bg-[#FFFDF4] shadow-md border-b border-gray-300 top-0 z-50">
      <ul className="flex justify-end space-x-6">
        {[
          { label: "Users", icon: <FaUsers size={18} />, viewKey: "Users" },
          { label: "Roles", icon: <FaKey size={18} />, viewKey: "Roles" },
          // { label: "Policies", icon: <FaFileAlt size={18} />, viewKey: "Policies" },
        ].map(({ label, icon, viewKey }) => (
          <li key={viewKey}>
            <button
              className={`flex items-center space-x-2 py-2 px-3 rounded-md transition-all duration-150 
                bg-transparent text-gray-800 relative ${
                  view === viewKey
                    ? "text-orange-500 font-medium"
                    : "text-gray-600"
                }`}
              onClick={() => setView(viewKey)}
            >
              {icon}
              <span className="text-sm">{label}</span>
              {view === viewKey && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 rounded-sm"></span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPageToolBar;
