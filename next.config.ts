import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Generate export build for Docker
  output: "export",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  eslint: {
    // Allows production builds even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
