import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.leviathan.local"],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
