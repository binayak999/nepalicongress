module.exports = {
  // publicPath: '/congress/',
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}