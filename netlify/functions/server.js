import { createRequestHandler } from "@remix-run/netlify";


export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV
});
