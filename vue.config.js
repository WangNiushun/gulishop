

module.exports = {
  lintOnSave: false,

  // 配置服务
  devServer: {
    // contentBase: "./dist",
    open: true, // ,浏览器自动打开
    quiet:true,
    // hot: true,
    port: 8080, // 端口

    // 配置代理服务器
    proxy: {
      
    "/api": {
      target: "http://182.92.128.115",  // 目标路径
      changeOrigin: true   // 协议   IP  端口  任意一个改变都会解决
    }
  }
  }
}

