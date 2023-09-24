/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  devServer: {
    public: 'localhost',
    proxy: {
      '/searchservice': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/searchservice': '',
        },
        logLevel: 'debug',
      },
    },
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
