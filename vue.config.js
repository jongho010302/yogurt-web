module.exports = {
  devServer: {
    port: process.env.SERVER_PORT || 3000
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true,
    },
  },
  transpileDependencies: [
    'quasar',
  ],
};
