import type { AppConfig } from "@remix-run/dev";

export default {
  ignoredRouteFiles: ["**/.*"],
  // serverBuildTarget: "netlify", // Bu satırı kaldırın
  serverModuleFormat: "esm",
  serverPlatform: "node",
  // Diğer Remix ayarları...
} satisfies AppConfig;