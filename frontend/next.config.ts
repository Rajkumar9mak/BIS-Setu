import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/standards', destination: '/industry' },
      { source: '/compliance', destination: '/industry' },
      { source: '/verify', destination: '/consumer' },
      { source: '/ai', destination: '/copilot' },
    ];
  },
};

export default nextConfig;
