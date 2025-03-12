import { createRequestHandler } from "@remix-run/netlify";


export const handler = createRequestHandler({
 
  mode: process.env.NODE_ENV
});
