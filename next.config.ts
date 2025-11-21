import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  /* SEO and Performance Optimizations */
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  /* Image Optimization */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Reduced cache TTL to 60 days (5184000 seconds). Update image URLs with version/hash when content changes to bust cache.
    minimumCacheTTL: 5184000,
  },

  /* Headers for SEO and Security */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self';",
          },
        ],
      },
    ]
  },

  /* Redirects for SEO */
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ]
  },

  /* Rewrites */
  async rewrites() {
    return {
      beforeFiles: [],
    }
  },
}

export default nextConfig
