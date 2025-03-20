/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  future: {
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true
  },
  publicPath: "/build/",
  serverBuildPath: "netlify/functions/server.js",
  assetsBuildDirectory: "build/client"
};