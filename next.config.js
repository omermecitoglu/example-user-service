/** @type {import("next").NextConfig} */

const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
  webpack: config => {
    config.externals.push("typescript");
    return config;
  },
};

export default nextConfig;
