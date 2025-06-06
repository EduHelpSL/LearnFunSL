/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint checks will now run during build (default is false for ignoreDuringBuilds)
  // TypeScript checks will now run during build (default is false for ignoreBuildErrors)
  images: {
    unoptimized: false, // Enable Next.js Image Optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Add other remote image domains if needed in the future
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Consider adding a Content-Security-Policy (CSP) later
        ],
      },
    ];
  },
  // output: 'standalone', // Optional: for potentially smaller Vercel deployments
}

export default nextConfig
