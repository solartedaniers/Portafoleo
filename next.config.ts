import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static file serving for videos
  experimental: {
    optimizePackageImports: ['react-icons']
  },
  // Configure headers for video files
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Ensure static files are properly served
  trailingSlash: false,
  // Optimize for Vercel deployment
  output: 'standalone',
};

export default nextConfig;
