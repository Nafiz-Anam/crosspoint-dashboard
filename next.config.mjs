/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.BASEPATH || '',
  assetPrefix: process.env.ASSET_PREFIX || '',
  distDir: 'dist',
  // Exclude API routes from static export
  outputFileTracingExcludes: {
    '*': ['./src/app/api/**/*', './app/api/**/*']
  }
  // Remove redirects as they don't work with static export
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/en/dashboards/analytics',
  //       permanent: true,
  //       locale: false
  //     },
  //     {
  //       source: '/:lang(en|it)',
  //       destination: '/:lang/dashboards/analytics',
  //       permanent: true,
  //       locale: false
  //     },
  //     {
  //       source: '/((?!(?:en|it|front-pages|favicon.ico)\\b)):path',
  //       destination: '/en/:path',
  //       permanent: true,
  //       locale: false
  //     }
  //   ]
  // }
}

export default nextConfig
