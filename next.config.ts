import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID:
      process.env.NEXT_PUBLIC_BUILD_ID ??
      process.env.CI_COMMIT_SHA ??
      process.env.CF_PAGES_COMMIT_SHA ??
      "dev",
  },
};

export default nextConfig;
