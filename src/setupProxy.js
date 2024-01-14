import API_HOST_URL from "./utils/api/API_HOST"
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: API_HOST_URL,
      changeOrigin: true,
    })
  );
};