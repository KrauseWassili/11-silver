import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  images: {
    remotePatterns: [new URL("https://cdn.dummyjson.com/**")],
  },
};

export default nextConfig;
