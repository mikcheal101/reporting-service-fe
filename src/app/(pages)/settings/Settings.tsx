"use client";

import React from "react";
import { Users, Settings as SettingsIcon } from "lucide-react";
import useSettings from "@/app/hooks/settings/use-settings";

const Settings = () => {
  const { paths, pathName, handleButtonClick } = useSettings();

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center gap-1 px-4 py-2">
        {[
          {
            label: "Users Management",
            icon: <Users className="h-4 w-4" />,
            path: paths.userManagement,
          },
          {
            label: "System",
            icon: <SettingsIcon className="h-4 w-4" />,
            path: paths.system,
          },
        ].map(({ label, icon, path }) => (
          <button
            key={path}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              path === pathName
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            onClick={() => handleButtonClick(path)}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Settings;
