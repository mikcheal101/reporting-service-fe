import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Generate standalone build for Docker
  output: "standalone",

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
