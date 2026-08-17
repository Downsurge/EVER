import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fail the build on type errors rather than shipping past them.
  // Note: Next 16 removed the `eslint` key from NextConfig, and `next lint`
  // is gone with it. ESLint is not configured in this repo yet; `npm run
  // typecheck` and `npm run build` are the checks that currently run.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
