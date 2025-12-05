import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL("https://cdn.dummyjson.com/**")],
  },
};

export default nextConfig;
