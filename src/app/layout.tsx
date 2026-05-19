// app/layout.tsx
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReportProvider } from "@/context/ReportContext";
import { ReportProviderParameter } from "@/context/ParameterContext";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/theme-provider";
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
    document.title = "Alcestis Reporting";
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/alcestis-icon.svg';
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
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
        </ThemeProvider>
      </body>
    </html>
  );
}

