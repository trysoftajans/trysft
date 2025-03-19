import { createRequestHandler } from "@remix-run/netlify";
import * as remixBuild from "../../build/server/index.js";

export const handler = createRequestHandler({
  build: {
    ...remixBuild,
    routes: remixBuild.routes || {},
    assets: remixBuild.assets || { 
      version: "dev", 
      entry: { module: "../../build/server/entry.server.js" } // Yol düzeltildi
    }
  },
  mode: process.env.NODE_ENV,
  getLoadContext(event) {
    return {
      env: process.env
    };
  }
});