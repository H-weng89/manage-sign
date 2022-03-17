module.exports = {
  publicPath: "./",
    css: {
        loaderOptions: {
          css: {},
          postcss: {
            plugins: [
              require('postcss-px2rem')({
                remUnit: 37.5
              })
           ]
         }
       }
   },
   lintOnSave:false,
devServer: {
overlay:{
 warning:false,
 errors:false
},
proxy: {
 '/api': {
   // target: 'http://172.16.15.27:8081',
   target: 'https://www.jessieback.top/',
   secure: false, // false为http访问，true为https访问
   changeOrigin: true, // 跨域访问设置，true代表跨域
   ws: true,
   pathRewrite: { // 路径改写规则
     '^/api': '/api' // 以/proxy/为开头的改写为''
   }
 }
}
}
}