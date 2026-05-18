"use client";

import { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function FadeIn({ children, className = "", delay = 0, direction = "up" }: FadeInProps) {
  const dirClasses = {
    up: "slide-in-from-bottom-4",
    down: "slide-in-from-top-4",
    left: "slide-in-from-right-4",
    right: "slide-in-from-left-4",
    none: "",
  };

  return (
    <div
      className={`animate-in fade-in duration-500 fill-mode-backwards ${dirClasses[direction]} ${delay > 0 ? `delay-${delay}` : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode[];
  className?: string;
  baseDelay?: number;
  step?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function StaggerFadeIn({ children, className = "", baseDelay = 0, step = 100, direction = "up" }: StaggerProps) {
  return (
    <>
      {children.map((child, i) => (
        <FadeIn key={i} delay={baseDelay + i * step} direction={direction} className={className}>
          {child}
        </FadeIn>
      ))}
    </>
  );
}
