/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.nutrangvietnam.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
    ],
  },
};

module.exports = nextConfig;
