const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    // proxy: {
    //   '/api': {
    //     target: 'http://music.zzhitong.com',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {        //  /api 替换
    //       '^/api': ''
    //     }
    // },
    // "/blog": {
    //   // target: 'http://localhost:3000',
    //   target: 'https://biejuanle.icu',
    //   ws: true,
    //   changeOrigin: true,
    //   pathRewrite: {        //  /api 替换
    //     '^/blog': ''
    //   }
    // }
    // }
  }

})
