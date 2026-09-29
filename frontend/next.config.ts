import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/standards', destination: '/industry?tab=discovery' },
      { source: '/compliance', destination: '/industry?tab=wizard' },
      { source: '/verify', destination: '/consumer' },
      { source: '/ai', destination: '/copilot' },
    ];
  },
};

export default nextConfig;
