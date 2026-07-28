/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Fixes workspace root inference on Windows when multiple lockfiles exist
  outputFileTracingRoot: path.resolve(__dirname),
};

module.exports = nextConfig;