import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/ki-prompts',
        destination: '/ki',
        permanent: true,
      },
      {
        source: '/autor',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
