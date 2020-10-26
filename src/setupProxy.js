const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://djh20.iptime.org:6000/',
          changeOrigin: true
      })
  )
};