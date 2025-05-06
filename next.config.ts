import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "pub-ba8385b85ead456fbb39dc54e4147006.r2.dev",
        pathname: '**',
      },
    ]
  }

};

export default nextConfig;
