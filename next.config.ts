import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  webpack: config => {
    config.externals.push("typescript");
    return config;
  },
};

export default nextConfig;
