import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/saved',
        destination: '/user',
        permanent: false,
      },
      {
        source: '/friends',
        destination: '/user',
        permanent: false,
      },
      {
        source: '/notifications',
        destination: '/user',
        permanent: false,
      },
      {
        source: '/preferences',
        destination: '/user',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
