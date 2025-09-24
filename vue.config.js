const { defineConfig } = require('@vue/cli-service')
let scssVariables = require("./src/styles/variables.scss");
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer: {
    compress: true,
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    //关闭客户端报错全屏显示
    client:{
        overlay: false,
    },

    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '^/api': {
        //target: 'http://192.168.73.247:8080', //填写请求的目标地址
        target: 'http://192.168.1.43',
        //target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': '' //请求的时候使用这个api就可以
        },
        changOrigin: true //允许跨域

      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        // additionalData: `@import "~@/styles/imports.scss";`
        additionalData: Object.keys(scssVariables)
            .map((k) => `$${k.replace("_", "-")}: ${scssVariables[k]};`)
            .join("\n"),
      },
    },
  },
})
