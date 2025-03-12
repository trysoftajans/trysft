import { createRequestHandler } from "@remix-run/netlify";
import * as build from "@remix-run/dev/server-build";

// Doğru build nesnesini kontrol edin ve gerekirse düzeltin
console.log("Build nesnesi:", build);

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext(event) {
    // Eğer özel bir context gerekiyorsa buraya ekleyin
    return {};
  }
});