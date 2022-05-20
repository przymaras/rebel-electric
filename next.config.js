//If there is another plugin over nextTranslate - consider useing https://github.com/cyrilwanner/next-compose-plugins
const nextTranslate = require('next-translate');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: process.env.REMOVE_TEST_ATTRIBUTES === 'true',
  },
  images: {
    domains: ['rebel-electric.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
  eslint: {
    dirs: ['src'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextTranslate(nextConfig);
