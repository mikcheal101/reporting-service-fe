"use client";

import { Users, KeyRound } from "lucide-react";
import usePermission from "@/app/hooks/auth/use-permission";

type SettingsPageToolBarProps = {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const SettingsPageToolBar = ({ view, setView }: SettingsPageToolBarProps) => {
  const { can } = usePermission();
  const canViewUsers = can("user", "list") || can("user", "view");
  const canViewRoles = can("role", "list") || can("role", "view");

  const tabs = [
    ...(canViewUsers ? [{ label: "Users", icon: <Users className="h-4 w-4" />, viewKey: "Users" as const }] : []),
    ...(canViewRoles ? [{ label: "Roles", icon: <KeyRound className="h-4 w-4" />, viewKey: "Roles" as const }] : []),
  ];

  if (tabs.length === 0) return null;

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center gap-1 px-4 py-2">
        {tabs.map(({ label, icon, viewKey }) => (
          <button
            key={viewKey}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              view === viewKey
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            onClick={() => setView(viewKey)}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPageToolBar;
