/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa");

const { hostname } = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`);

const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true, // ensure native SWC is used
  },
  images: {
    domains: [`${hostname}`],
  },
};

const pwa = process.env.NEXT_PWA_STATUS;

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

module.exports = pwa === "1" ? pwaConfig(baseConfig) : baseConfig;
