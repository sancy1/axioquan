// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // Remove cacheComponents as it's not a valid option
//   // Remove eslint configuration from here
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig














// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   // Add these experimental configs for Turbopack
//   experimental: {
//     turbo: {
//       // Resolve source map issues
//       resolveAlias: {
//         // Add any aliases you're using
//       },
//       // Disable problematic features
//       rules: {},
//     },
//     // Disable memory cache for now
//     isrMemoryCacheSize: 0,
//   },
//   // Disable source maps in dev
//   productionBrowserSourceMaps: false,
// }

// export default nextConfig
















/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  // Disable browser source maps (prevents source map warnings)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
