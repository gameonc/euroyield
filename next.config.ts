import type { NextConfig } from "next";

// Access Next.js bundled webpack for IgnorePlugin
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpack = require("next/dist/compiled/webpack/webpack-lib");

const nextConfig: NextConfig = {
  // Exclude problematic packages from SSR bundling
  serverExternalPackages: [
    'pino',
    'pino-pretty',
    'thread-stream',
  ],

  // WalletConnect compatibility
  webpack: (config) => {
    // External modules that cause issues during bundling
    config.externals.push('pino-pretty', 'encoding');

    // Node.js polyfills for client-side
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Ignore test files and problematic dependencies
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(tap|tape|why-is-node-running)$/,
      })
    );

    return config;
  },

  async headers() {
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://*.supabase.co https://icons.llamao.fi;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
      connect-src 'self' https://*.supabase.co https://*.supabase.in https://*.walletconnect.com wss://*.walletconnect.com;
    `

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, "").trim(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
