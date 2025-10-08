/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/it/dashboards/analytics',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|it)',
        destination: '/:lang/dashboards/analytics',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|it|front-pages|favicon.ico)\\b)):path',
        destination: '/it/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
