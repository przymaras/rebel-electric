//If there is another plugin over nextTranslate - consider useing https://github.com/cyrilwanner/next-compose-plugins
const nextTranslate = require('next-translate');

const svgToMiniDataURI = require('mini-svg-data-uri');

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
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.scss$/,
        type: 'asset',
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      }
    );

    return config;
  },
};

module.exports = nextTranslate(nextConfig);
