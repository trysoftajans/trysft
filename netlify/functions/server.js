import { createRequestHandler } from "@remix-run/netlify";





export const handler = createRequestHandler({
 
  mode: process.env.NODE_ENV,
  getLoadContext(event) {
    // Eğer özel bir context gerekiyorsa buraya ekleyin
    return {};
  }
});