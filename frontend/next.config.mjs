/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "shared.akamai.steamstatic.com",
      "cdn.cloudflare.steamstatic.com",
      "cdn.akamai.steamstatic.com",
      "localhost",
      "steamland.ru",
    ],
  },
  output: "standalone",
};

export default nextConfig;
