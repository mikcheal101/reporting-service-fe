import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProviderToggle } from "../context/SidebarContext";
import { ReportProvider } from "@/context/ReportContext";
import { ReportProviderParameter } from "@/context/ParameterContext";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import SessionTimeout from "@/components/SessionTimeout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fortuna",
  description: "Loan Management Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <AuthProvider>
            <SidebarProvider>
              <SidebarProviderToggle>
                <ReportProvider>
                  <ReportProviderParameter>
                    <div className="flex-1">
                      {children}
                      <SessionTimeout />
                    </div>
                    <Toaster />
                  </ReportProviderParameter>
                </ReportProvider>
              </SidebarProviderToggle>
            </SidebarProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
