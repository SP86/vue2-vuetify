module.exports = {
  css: {
    extract: { ignoreOrder: true },
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    compress: true,
    disableHostCheck: true,
  },
  configureWebpack:{
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  }
}