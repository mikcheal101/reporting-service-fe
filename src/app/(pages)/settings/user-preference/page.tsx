"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserCog, Globe, Sun, Moon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
];

const TIMEZONES = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (US & Canada)" },
  { value: "America/Chicago", label: "Central Time (US & Canada)" },
  { value: "America/Denver", label: "Mountain Time (US & Canada)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
];

const ViewModeCard = ({
  label,
  desc,
  icon,
  active,
  onClick,
}: {
  label: string;
  desc: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-all ${
      active
        ? "border-primary bg-primary/5 ring-1 ring-primary"
        : "border-border hover:border-muted-foreground/30"
    }`}
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </div>
  </button>
);

export default function Page() {
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [dirty, setDirty] = useState(false);

  const handleChange = (setter: (v: any) => void) => (value: any) => {
    setter(value);
    setDirty(true);
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Preferences saved.",
      variant: "success",
    });
    setDirty(false);
  };

  return (
    <FadeIn delay={100} direction="up">
      <div className="p-4 lg:p-6">
        <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <UserCog className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                User Preferences
              </h2>
              <p className="text-sm text-muted-foreground">
                Customize your experience
              </p>
            </div>
          </div>

          {/* Display Theme */}
          <section className="mb-8">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Display Theme
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ViewModeCard
                label="Light Mode"
                desc="Use light background and dark text"
                icon={<Sun className="w-4 h-4" />}
                active={theme === "light"}
                onClick={() => {
                  setTheme("light");
                  setDirty(true);
                }}
              />
              <ViewModeCard
                label="Dark Mode"
                desc="Use dark background and light text"
                icon={<Moon className="w-4 h-4" />}
                active={theme === "dark"}
                onClick={() => {
                  setTheme("dark");
                  setDirty(true);
                }}
              />
            </div>
          </section>

          <hr className="border-t border-border mb-8" />

          {/* Language & Region */}
          <section className="mb-8">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Language & Region
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => handleChange(setLanguage)(e.target.value)}
                    className="w-full h-9 pl-9 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => handleChange(setTimezone)(e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              disabled={!dirty}
              onClick={() => {
                setLanguage("en");
                setTimezone("UTC");
                setTheme("light");
                setDirty(false);
              }}
            >
              Reset
            </Button>
            <Button onClick={handleSave} disabled={!dirty}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
