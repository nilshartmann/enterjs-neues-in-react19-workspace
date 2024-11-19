import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,

  /* config options here */
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
