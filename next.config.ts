import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next.js does not pick up a
  // lockfile from a parent directory when inferring the root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
