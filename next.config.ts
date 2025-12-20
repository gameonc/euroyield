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
      img-src 'self' blob: data: https://*.supabase.co https://icons.llamao.fi https://*.walletconnect.com https://*.walletconnect.org https://api.web3modal.org https://api.web3modal.com https://explorer-api.walletconnect.com;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-src 'self' https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.com https://*.web3modal.org;
      frame-ancestors 'none';
      upgrade-insecure-requests;
      connect-src 'self' https://*.supabase.co https://*.supabase.in https://*.walletconnect.com wss://*.walletconnect.com https://*.walletconnect.org wss://*.walletconnect.org https://*.web3modal.org https://*.web3modal.com https://pulse.walletconnect.org https://api.web3modal.org https://relay.walletconnect.org wss://relay.walletconnect.org https://explorer-api.walletconnect.com;
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
