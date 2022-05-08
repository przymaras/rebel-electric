const nextTranslate = require('next-translate');

module.exports = {
  ...nextTranslate(),
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: true,
  },
  images: {
    domains: ['rebel-electric.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
  eslint: {
    dirs: ['pages', 'src'],
  },
};
