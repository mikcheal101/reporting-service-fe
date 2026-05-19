"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ToggleItem {
  label: string;
  key: string;
}

interface MediumItem {
  title: string;
  desc: string;
  key: string;
}

const EVENT_OPTIONS: ToggleItem[] = [
  { label: "Task is assigned to me", key: "taskAssigned" },
  { label: "A loan is created", key: "loanCreated" },
  { label: "A loan is approved for payout", key: "loanApproved" },
  { label: "Borrower is due for payment", key: "borrowerDue" },
];

const MEDIUM_OPTIONS: MediumItem[] = [
  {
    title: "Email notification",
    desc: "Receive email notifications whenever your attention is required",
    key: "email",
  },
  {
    title: "Mobile push Notification",
    desc: "Receive mobile notifications whenever your attention is required",
    key: "push",
  },
  {
    title: "Desktop Notification",
    desc: "Receive desktop notifications whenever your attention is required",
    key: "desktop",
  },
  {
    title: "In-app notification",
    desc: "Show notifications in-app",
    key: "inApp",
  },
];

const Notifications = () => {
  const [events, setEvents] = useState<Record<string, boolean>>(
    Object.fromEntries(EVENT_OPTIONS.map((opt) => [opt.key, true])),
  );
  const [mediums, setMediums] = useState<Record<string, boolean>>(
    Object.fromEntries(MEDIUM_OPTIONS.map((opt) => [opt.key, true])),
  );
  const [dirty, setDirty] = useState(false);

  const toggleEvent = (key: string) => {
    setEvents((prev) => ({ ...prev, [key]: !prev[key] }));
    setDirty(true);
  };

  const toggleMedium = (key: string) => {
    setMediums((prev) => ({ ...prev, [key]: !prev[key] }));
    setDirty(true);
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Notification preferences saved.",
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
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Notification Preferences
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose how and when you receive notifications
              </p>
            </div>
          </div>

          {/* Notify me when */}
          <section className="mb-8">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Notify me when
            </h3>
            <div className="space-y-1">
              {EVENT_OPTIONS.map(({ label, key }) => (
                <label
                  key={key}
                  className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm text-foreground">{label}</span>
                  <input
                    type="checkbox"
                    checked={events[key]}
                    onChange={() => toggleEvent(key)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                </label>
              ))}
            </div>
          </section>

          <hr className="border-t border-border mb-8" />

          {/* Medium */}
          <section>
            <h3 className="text-base font-semibold text-foreground mb-4">
              Delivery Medium
            </h3>
            <div className="space-y-1">
              {MEDIUM_OPTIONS.map(({ title, desc, key }) => (
                <label
                  key={key}
                  className="flex justify-between items-start py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {desc}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={mediums[key]}
                    onChange={() => toggleMedium(key)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary mt-1"
                  />
                </label>
              ))}
            </div>
          </section>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border">
            <Button
              variant="outline"
              disabled={!dirty}
              onClick={() => {
                setEvents(
                  Object.fromEntries(EVENT_OPTIONS.map((opt) => [opt.key, true])),
                );
                setMediums(
                  Object.fromEntries(MEDIUM_OPTIONS.map((opt) => [opt.key, true])),
                );
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
};

export default Notifications;
