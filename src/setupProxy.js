const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://nxg-job-hub-8758c68a4346.herokuapp.com",
      changeOrigin: true,
    })
  );
};