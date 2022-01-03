const nextTranslate = require("next-translate");

module.exports = {
  ...nextTranslate(),
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["rebel-electric.com"],
  },
  experimental: {
    scrollRestoration: true,
  },
};
