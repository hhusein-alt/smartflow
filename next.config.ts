import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // skip type checking during vercel build — ts errors wont fail deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // skip eslint during build too
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
