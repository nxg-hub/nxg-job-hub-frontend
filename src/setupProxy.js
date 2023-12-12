const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://job-hub-591ace1cfc95.herokuapp.com',
      changeOrigin: true,
    })
  );
};