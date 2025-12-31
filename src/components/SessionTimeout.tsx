"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export default function SessionTimeout() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const lastActivityRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Only track activity and schedule timeout when user is logged in
    if (!user) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const schedule = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      const remaining = TIMEOUT_MS - (Date.now() - lastActivityRef.current);
      timerRef.current = window.setTimeout(() => {
        // Perform logout and redirect to login screen
        logout();
        toast({
          variant: "destructive",
          title: "Session expired",
          description: "You have been logged out due to inactivity.",
        });
        router.push("/signin");
      }, Math.max(remaining, 0));
    };

    const reset = () => {
      lastActivityRef.current = Date.now();
      schedule();
    };

    const events = [
      "click",
      "keydown",
      "mousemove",
      "scroll",
      "touchstart",
      "touchmove",
      "visibilitychange",
    ];
    events.forEach((e) => window.addEventListener(e, reset));
    schedule();

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
    // Reschedule when route changes to keep timer accurate across navigations
  }, [user, logout, router, toast, pathname]);

  return null;
}

