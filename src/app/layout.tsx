// app/layout.tsx
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReportProvider } from "@/context/ReportContext";
import { ReportProviderParameter } from "@/context/ParameterContext";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./context/auth.provider";
import { useEffect } from "react";
import SidebarContextProvider from "./context/sidebar.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    document.title = "Fortuna | Report Management System";
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <AuthProvider>
            <SidebarProvider>
              <SidebarContextProvider>
                <ReportProvider>
                  <ReportProviderParameter>
                    <div className="flex-1">
                      {children}
                    </div>
                    <Toaster />
                  </ReportProviderParameter>
                </ReportProvider>
              </SidebarContextProvider>
            </SidebarProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

