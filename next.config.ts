import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID:
      process.env.CF_PAGES_COMMIT_SHA ?? String(Date.now()),
  },
};

export default nextConfig;
