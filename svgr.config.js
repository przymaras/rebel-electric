module.exports = {
  dimensions: false,
  titleProp: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeDesc: false,
            removeViewBox: false,
            removeTitle: false,
          },
        },
      },
    ],
  },
};
