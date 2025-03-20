import { createRequestHandler } from "@remix-run/netlify";
import * as remixBuild from "../build/server/index.js";

export const handler = createRequestHandler({
  build: remixBuild,
  mode: process.env.NODE_ENV,
  getLoadContext(event) {
    return {
      env: process.env
    };
  }
});