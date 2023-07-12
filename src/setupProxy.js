const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  /*
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
*/
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://todos-s2mo.onrender.com',
      changeOrigin: true,
    })
  );
};