import type { NextConfig } from 'next';

const securityHeaders = [
  // HSTS - Force HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // XSS Protection
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Clickjacking protection
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Referrer Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Permissions Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
      style-src 'self' 'unsafe-inline' https:;
      img-src 'self' data: https:;
      font-src 'self' https:;
      connect-src 'self' https:;
      frame-src 'self' https:;
      media-src 'self' https:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
    `
      .replace(/\s+/g, ' ')
      .trim(),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  // Enable React Strict Mode for better development practices
  reactStrictMode: true,
  // Disable source maps in development to avoid parsing errors
  productionBrowserSourceMaps: false,
  // Configure Turbopack (now stable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
