/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
    ]
  }
}

export default nextConfig
