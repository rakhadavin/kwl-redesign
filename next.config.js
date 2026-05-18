/** module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
    images: {
      domains: ['127.0.0.1', 'localhost', 'be-kwl-dev.cs.ui.ac.id', 'kwl-dev.cs.ui.ac.id'],
    },
  } 
*/

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['localhost'],
  },
}